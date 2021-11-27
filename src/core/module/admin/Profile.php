<?php

namespace module\admin;

use model\CmsRequests;
use model\Users;
use service\AuthService;
use service\EmailService;

class Profile {

    public function get_user_profile ($conn) {
        $response = null;
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
                    unset($row['password']);
                    unset($row['deleted']);

                    $response = $row;
                }
            }
        }

        return $response;
    }

    public function user_update_profile ($conn, $data) {
        $Users = new Users;

        return $Users -> update($conn, $data);
    }

    public function user_login ($conn, $data) {
        $response = [
            'message' => 'user_not_found',
            'session' => null,
        ];
        $as = new AuthService;
        $Users = new Users;

        // Form data
        $email = $data['email'];
        $password = $data['password'];

        // User object
        $user = $Users -> get($conn, ['email' => $email, 'withPassword' => true]);

        if ($user) {
            $response['message'] = 'user_password_not_match';

            if ($user['active'] == 0) {
                $response['message'] = 'user_not_active';
            } else if ($user['deleted'] == 1) {
                $response['message'] = 'user_is_deleted';
            } else if (password_verify($password, $user['password'])) {
                $response['message'] = 'user_login_success';
                $response['session'] = $as -> start_user_session($email);
            }
        }

        return $response;
    }

    public function user_logout () {
        $as = new AuthService;

        return $as -> close_user_session();
    }

    public function user_lost_password ($conn, $data) {
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

        if ($user) {
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

    public function user_lost_password_reset ($conn, $data) {
        $response = [
            'message' => 'user_password_reset_error',
            'email' => null,
            'row' => null,
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
                if ($request_row['status'] == 0) {
                    $user_row = $Users -> get($conn, ['email' => $request_row['value']]);
                    if ($user_row) {
                        $tmp_password = $utils -> getToken(3, '');
                        $hash_password = password_hash($tmp_password, PASS_CRYPT, PASS_CRYPT_OPTIONS);
                        $user_row['password'] = $hash_password;

                        $response['email'] = $es -> sendStyledMessage(
                            $user_row['email'],
                            "New password",
                            "<div>This is your new password: <b>" . $tmp_password ."</b> <br /> Keep it safe, or change after login</div>",
                            null,
                            'password_reset'
                        );
                        $response['row'] = $CmsRequests -> update($conn, [
                            'status' => 1,
                            'token' => $request_row['token']
                        ]);
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