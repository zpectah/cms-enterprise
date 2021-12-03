<?php

class ApiRequest {

    private function is_request_authorized (): bool {
        $request_token = $_SERVER['HTTP_X_APP_TOKEN'];

        return $request_token == 'wmcyenyntbmxzanv'; // TODO
    }

    public function getResponse () {
        $dc = new \controller\DataController;
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
                case 'create_log':
                    $response = $dc -> create_log($request_data);
                    break;

                case 'get_log_list':
                    $response = $dc -> get_log_list();
                    break;

                /********** Settings **********/
                case 'get_cms_settings':
                    $response = $dc -> get_cms_settings();
                    break;

                case 'update_cms_settings':
                    $response = $dc -> update_cms_settings($request_data);
                    break;

                /********** Profile **********/
                case 'get_user_profile':
                    $response = $dc -> get_user_profile();
                    break;

                case 'update_user_profile':
                    $response = $dc -> user_update_profile($request_data);
                    break;

                case 'user_login':
                    $response = $dc -> user_login($request_data);
                    break;

                case 'user_logout':
                    $response = $dc -> user_logout();
                    break;

                case 'user_lost_password':
                    $response = $dc -> user_lost_password($request_data);
                    break;

                case 'user_lost_password_reset':
                    $response = $dc -> user_lost_password_reset($request_data);
                    break;

                case 'user_create_new_password':
                    $response = $dc -> user_create_new_password($request_data);
                    break;



                /********** CmsRequests **********/
                case 'get_cms_requests':
                    $response = $dc -> get('CmsRequests', $request_data);
                    break;

                case 'create_cms_requests':
                    $response = $dc -> create('CmsRequests', $request_data);
                    break;

                case 'update_cms_requests':
                    $response = $dc -> update('CmsRequests', $request_data);
                    break;

                case 'toggle_cms_requests':
                    $response = $dc -> toggle('CmsRequests', $request_data);
                    break;

                case 'delete_cms_requests':
                    $response = $dc -> delete('CmsRequests', $request_data);
                    break;

                /********** Categories **********/
                case 'get_categories':
                    $response = $dc -> get('Categories', $request_data);
                    break;

                case 'create_categories':
                    $response = $dc -> create('Categories', $request_data);
                    break;

                case 'update_categories':
                    $response = $dc -> update('Categories', $request_data);
                    break;

                case 'toggle_categories':
                    $response = $dc -> toggle('Categories', $request_data);
                    break;

                case 'delete_categories':
                    $response = $dc -> delete('Categories', $request_data);
                    break;

                /********** Deliveries **********/

                /********** Distributors **********/

                /********** Members **********/

                /********** Orders **********/

                /********** Pages **********/
                case 'get_pages':
                    $response = $dc -> get('Pages', $request_data);
                    break;

                case 'create_pages':
                    $response = $dc -> create('Pages', $request_data);
                    break;

                case 'update_pages':
                    $response = $dc -> update('Pages', $request_data);
                    break;

                case 'toggle_pages':
                    $response = $dc -> toggle('Pages', $request_data);
                    break;

                case 'delete_pages':
                    $response = $dc -> delete('Pages', $request_data);
                    break;

                /********** Payments **********/

                /********** Posts **********/
                case 'get_posts':
                    $response = $dc -> get('Posts', $request_data);
                    break;

                case 'create_posts':
                    $response = $dc -> create('Posts', $request_data);
                    break;

                case 'update_posts':
                    $response = $dc -> update('Posts', $request_data);
                    break;

                case 'toggle_posts':
                    $response = $dc -> toggle('Posts', $request_data);
                    break;

                case 'delete_posts':
                    $response = $dc -> delete('Posts', $request_data);
                    break;

                /********** Producers **********/

                /********** Products **********/

                /********** Stores **********/

                /********** Tags **********/
                case 'get_tags':
                    $response = $dc -> get('Tags', $request_data);
                    break;

                case 'create_tags':
                    $response = $dc -> create('Tags', $request_data);
                    break;

                case 'update_tags':
                    $response = $dc -> update('Tags', $request_data);
                    break;

                case 'toggle_tags':
                    $response = $dc -> toggle('Tags', $request_data);
                    break;

                case 'delete_tags':
                    $response = $dc -> delete('Tags', $request_data);
                    break;

                /********** Translations **********/
                case 'get_translations':
                    $response = $dc -> get('Translations', $request_data);
                    break;

                case 'create_translations':
                    $response = $dc -> create('Translations', $request_data);
                    break;

                case 'update_translations':
                    $response = $dc -> update('Translations', $request_data);
                    break;

                case 'toggle_translations':
                    $response = $dc -> toggle('Translations', $request_data);
                    break;

                case 'delete_translations':
                    $response = $dc -> delete('Translations', $request_data);
                    break;

                /********** Uploads **********/

                /********** Users **********/
                case 'get_users':
                    $response = $dc -> get('Users', $request_data);
                    break;

                case 'create_users':
                    $response = $dc -> create('Users', $request_data);
                    break;

                case 'update_users':
                    $response = $dc -> update('Users', $request_data);
                    break;

                case 'toggle_users':
                    $response = $dc -> toggle('Users', $request_data);
                    break;

                case 'delete_users':
                    $response = $dc -> delete('Users', $request_data);
                    break;

            }
        }

        return $response;
    }

}