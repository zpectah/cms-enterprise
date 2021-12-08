<?php

class ApiRequest {

    private function is_request_authorized (): bool {
        $as = new \service\AuthService;
        $request_token = $_SERVER['HTTP_X_APP_TOKEN'];
        $user_token = $as -> get_user_token();

        // TODO - for web purpose should create another token

        return ($request_token !== '' && $request_token == $user_token);
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

        // Parsed url params
        $url_base = $request_url[1];

        // Parsed additional get params
        $params = [
            'id' => $_GET['id'],
            'name' => $_GET['name'],
            'email' => $_GET['email'],
            'withPassword' => $_GET['withPassword'],
            'token' => $_GET['token'],
        ];

        // Switching and executing
        if ($url_base) {
            switch (strtolower($url_base)) {

                /********** System **********/
                case 'create_log':
                    $response = $dc -> create_log($request_data);
                    break;

                case 'get_log_list':
                    $response = $dc -> get_log_list($params);
                    break;

                /********** Settings (*) **********/
                case 'get_cms_settings':
                    if ($request_is_authorized) {
                        $response = $dc -> get_cms_settings($params);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_cms_settings':
                    if ($request_is_authorized) {
                        $response = $dc -> update_cms_settings($request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Profile **********/
                case 'get_user_profile':
                    $response = $dc -> get_user_profile($params);
                    break;

                case 'update_user_profile':
                    if ($request_is_authorized) {
                        $response = $dc -> user_update_profile($request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
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
                    $response = $dc -> get('CmsRequests', $request_data, $params);
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
                    $response = $dc -> get('Categories', $request_data, $params);
                    break;

                case 'create_categories':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Categories', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_categories':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Categories', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_categories':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Categories', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_categories':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Categories', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Deliveries **********/

                /********** Distributors **********/

                /********** Members **********/

                /********** Menu & MenuItems **********/
                case 'get_menu':
                    $response = $dc -> get('Menu', $request_data, $params);
                    break;

                case 'create_menu':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Menu', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_menu':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Menu', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_menu':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Menu', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_menu':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Menu', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'get_menu_items':
                    $response = $dc -> get('MenuItems', $request_data, $params);
                    break;

                case 'create_menu_items':
                    if ($request_is_authorized) {
                        $response = $dc -> create('MenuItems', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_menu_items':
                    if ($request_is_authorized) {
                        $response = $dc -> update('MenuItems', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_menu_items':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('MenuItems', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_menu_items':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('MenuItems', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Orders **********/

                /********** Pages **********/
                case 'get_pages':
                    $response = $dc -> get('Pages', $request_data, $params);
                    break;

                case 'create_pages':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Pages', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_pages':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Pages', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_pages':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Pages', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_pages':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Pages', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Payments **********/

                /********** Posts **********/
                case 'get_posts':
                    $response = $dc -> get('Posts', $request_data, $params);
                    break;

                case 'create_posts':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Posts', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_posts':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Posts', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_posts':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Posts', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_posts':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Posts', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Producers **********/

                /********** Products **********/

                /********** Stores **********/

                /********** Tags **********/
                case 'get_tags':
                    $response = $dc -> get('Tags', $request_data, $params);
                    break;

                case 'create_tags':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Tags', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_tags':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Tags', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_tags':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Tags', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_tags':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Tags', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Translations **********/
                case 'get_translations':
                    $response = $dc -> get('Translations', $request_data, $params);
                    break;

                case 'create_translations':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Translations', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_translations':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Translations', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_translations':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Translations', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_translations':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Translations', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Uploads **********/
                case 'get_uploads':
                    $response = $dc -> get('Uploads', $request_data, $params);
                    break;

                case 'create_uploads':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Uploads', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_uploads':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Uploads', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_uploads':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Uploads', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_uploads':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Uploads', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Users (*) **********/
                case 'get_users':
                    if ($request_is_authorized) {
                        $response = $dc -> get('Users', $request_data, $params);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'create_users':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Users', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_users':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Users', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_users':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Users', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_users':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Users', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

            }
        }

        return $response;
    }

}