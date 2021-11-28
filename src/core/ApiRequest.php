<?php

class ApiRequest {

    private function is_request_authorized () {
        $request_token = $_SERVER['HTTP_X_APP_TOKEN'];

        return $request_token == 'wmcyenyntbmxzanv'; // TODO
    }

    public function getResponse () {
        $ds = new service\DataService;
        $response = [
            'status' => 'error',
            'data' => null,
        ];

        // Request
        $request_is_authorized = self::is_request_authorized();
        $request_url_trimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
        $request_url = explode( "/", $request_url_trimmed );
        $request_data_raw = json_decode(file_get_contents('php://input'));
        $request_data = json_decode(json_encode($request_data_raw), true);

        if (!$request_is_authorized) {
            $response['status'] = 'unauthorized';

            return $response;
        }

        // Parsed url and additional params
        $url_base = $request_url[1];

        // Switching and executing
        if ($url_base) {
            switch (strtolower($url_base)) {

                /********** System **********/

                /********** Settings **********/

                /********** Profile **********/
                case 'get_user_profile':
                    $response = $ds -> get_user_profile();
                    break;

                case 'update_user_profile':
                    $response = $ds -> user_update_profile($request_data);
                    break;

                case 'user_login':
                    $response = $ds -> user_login($request_data);
                    break;

                case 'user_logout':
                    $response = $ds -> user_logout();
                    break;

                case 'user_lost_password':
                    $response = $ds -> user_lost_password($request_data);
                    break;

                case 'user_lost_password_reset':
                    $response = $ds -> user_lost_password_reset($request_data);
                    break;



                /********** CmsRequests **********/
                case 'get_cms_requests':
                    $response = $ds -> get('CmsRequests', $request_data);
                    break;

                case 'create_cms_requests':
                    $response = $ds -> create('CmsRequests', $request_data);
                    break;

                case 'update_cms_requests':
                    $response = $ds -> update('CmsRequests', $request_data);
                    break;

                case 'toggle_cms_requests':
                    $response = $ds -> toggle('CmsRequests', $request_data);
                    break;

                case 'delete_cms_requests':
                    $response = $ds -> delete('CmsRequests', $request_data);
                    break;

                /********** Categories **********/

                /********** Deliveries **********/

                /********** Distributors **********/

                /********** Members **********/

                /********** Orders **********/

                /********** Pages **********/

                /********** Payments **********/

                /********** Posts **********/

                /********** Producers **********/

                /********** Products **********/

                /********** Stores **********/

                /********** Tags **********/
                case 'get_tags':
                    $response = $ds -> get('Tags', $request_data);
                    break;

                case 'create_tags':
                    $response = $ds -> create('Tags', $request_data);
                    break;

                case 'update_tags':
                    $response = $ds -> update('Tags', $request_data);
                    break;

                case 'toggle_tags':
                    $response = $ds -> toggle('Tags', $request_data);
                    break;

                case 'delete_tags':
                    $response = $ds -> delete('Tags', $request_data);
                    break;

                /********** Translations **********/

                /********** Uploads **********/

                /********** Users **********/
                case 'get_users':
                    $response = $ds -> get('Users', $request_data);
                    break;

                case 'create_users':
                    $response = $ds -> create('Users', $request_data);
                    break;

                case 'update_users':
                    $response = $ds -> update('Users', $request_data);
                    break;

                case 'toggle_users':
                    $response = $ds -> toggle('Users', $request_data);
                    break;

                case 'delete_users':
                    $response = $ds -> delete('Users', $request_data);
                    break;

            }
        }




        return $response;
    }

}