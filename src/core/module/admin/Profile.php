<?php

namespace module\admin;

use model\CmsRequests;
use model\Users;
use service\AuthService;
use service\EmailService;

class Profile {

    // Returns user profile object when logged in, else returns null
    public function get_user_profile ($conn, $params) {
        $response = 'anonymous';
        $as = new AuthService;
        $email = $as -> get_user_session();

        if ($email) {
            // prepare
            $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE email = ?');
            $types = 's';
            $args = [ $email ];

            // execute
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $result = $stmt -> get_result();
            $stmt -> close();

            if ($result -> num_rows > 0) {
                while($row = $result -> fetch_assoc()) {
                    unset($row['password']); // Unset password attribute
                    unset($row['deleted']); // Unset deleted attribute
                    $row['active'] = $row['active'] == 1; // Set value as boolean

                    $response = $row;
                }
            }
        }

        return $response;
    }

    // Update profile data when user is logged in
    public function user_update_profile ($conn, $data): array {
        $Users = new Users;

        return $Users -> update($conn, $data);
    }

    // User check and log in
    public function user_login ($conn, $data): array {
        $response = [
            'message' => 'user_not_found',
            'session' => null,
        ];
        $as = new AuthService;
        $Users = new Users;
        $utils = new \Utils;

        // Form data
        $email = $data['email'];
        $password = $data['password'];

        // User object
        $user = $Users -> get($conn, ['email' => $email, 'withPassword' => true]);

        if ($user !== 'anonymous') {
            $response['message'] = 'user_password_not_match';

            if ($user['active'] == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user['deleted'] == 1) {
                $response['message'] = 'user_is_deleted';
            } else if ($utils -> passwordVerify($password, $user['password'])) {
                $response['session'] = $as -> start_user_session($email);
                $response['message'] = 'user_login_success';
            }
        }

        return $response;
    }

    // User log out / destroys all sessions
    public function user_logout (): array {
        $as = new AuthService;

        return $as -> close_user_session();
    }

    // Create new request item for password reset and send email message
    public function user_lost_password ($conn, $data): array {
        $response = [
            'message' => 'user_not_found',
            'email' => null,
            'row' => null,
        ];
        $es = new EmailService;
        $Users = new Users;
        $CmsRequests = new CmsRequests;
        $utils = new \Utils;

        $email = $data['email'];
        $user = $Users -> get($conn, ['email' => $email]);

        if ($user !== 'anonymous') {
            if ($user['active'] == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user['deleted'] == 1) {
                $response['message'] = 'user_is_deleted';
            } else {
                $token = $utils -> getToken(16, '');
                $confirm_url = URL_USER_LOST_PASSWORD_TOKEN . $token;

                $response['email'] = $es -> sendStyledMessage(
                    $email,
                    "Lost password request",
                    "<div>Confirm password reset<br /><a href='" . $confirm_url ."' target='_blank'>this link</a></div>",
                    null,
                    'lost_password'
                );
                $response['row'] = $CmsRequests -> create($conn, [
                    'type' => 'user',
                    'context' => 'lost_password',
                    'value' => $email,
                    'token' => $token
                ]);
                $response['message'] = 'request_was_send';
            }
        }

        return $response;
    }

    // User create his own new password, checked by token
    public function user_create_new_password ($conn, $data): array {
        $response = [
            'message' => 'user_password_reset_error',
            'request' => null,
            'user' => null,
        ];
        $Users = new Users;
        $CmsRequests = new CmsRequests;

        $rd_password_raw = $data['password'];
        $rd_token = $data['token'];

        if ($rd_token) {
            $request_row = $CmsRequests -> get($conn, ['token' => $rd_token]);

            if ($request_row) {

                if ($request_row['status'] == 1) {
                    $user_row = $Users -> get($conn, ['email' => $request_row['value']]);
                    $user_row['password'] = $rd_password_raw;

                    $response['user'] = $Users -> update($conn, $user_row);
                    $response['request'] = $CmsRequests -> update($conn, [
                        'status' => 2,
                        'token' => $rd_token
                    ]);

                    $response['message'] = 'user_password_reset_success';
                } else {
                    $response['message'] = 'user_password_already_reset';
                }
            } else {
                $response['message'] = 'request_not_found';
            }
        } else {
            $response['message'] = 'token_not_found';
        }

        return $response;
    }

    // User request for reset, generate new password and send email message
    public function user_lost_password_reset ($conn, $data): array {
        $response = [
            'message' => 'user_password_reset_error',
            'email' => null,
            'request' => null,
            'user' => null,
        ];
        $es = new EmailService;
        $Users = new Users;
        $CmsRequests = new CmsRequests;
        $utils = new \Utils;

        $token = $data['token'];
        $request_row = $CmsRequests -> get($conn, ['token' => $token]);

        if ($token) {
            if ($request_row) {
                if ($request_row['status'] == 1) {
                    $user_row = $Users -> get($conn, ['email' => $request_row['value']]);
                    if ($user_row) {
                        $tmp_password = $utils -> getToken(4, '');
                        $response['email'] = $es -> sendStyledMessage(
                            $user_row['email'],
                            "New password",
                            "<div>This is your new password: <b>" . $tmp_password .  "</b><br /> Keep it safe, or change after login</div>",
                            null,
                            'password_reset'
                        );

                        $response['request'] = $CmsRequests -> update($conn, [
                            'status' => 2,
                            'token' => $request_row['token']
                        ]);
                        $user_row['password'] = $tmp_password;
                        $response['user'] = $Users -> update($conn, $user_row);
                        $response['message'] = 'user_password_reset_success';
                    }
                } else {
                    $response['message'] = 'user_password_already_reset';
                }
            } else {
                $response['message'] = 'request_not_found';
            }
        } else {
            $response['message'] = 'token_not_found';
        }

        return $response;
    }

}