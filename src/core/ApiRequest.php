<?php

class ApiRequest {

    private function is_request_authorized (): bool {
        $as = new \service\AuthService;
        $request_token = $_SERVER['HTTP_X_APP_TOKEN'];
        $user_token = $as -> get_user_token();

        $is_valid = ($request_token !== '' && $request_token == $user_token);

        // TODO
        // For web purpose should create another token

        return $is_valid;
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
            'parsed' => $_GET['parsed'],
            'lang' => $_GET['lang'],
            'sub' => $_GET['sub'],
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

                /********** Settings (**) **********/
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

                case 'install_language':
                    if ($request_is_authorized) {
                        $response = $dc -> install_language($request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'install_module':
                    if ($request_is_authorized) {
                        $response = $dc -> install_module($request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Search **********/
                case 'search':
                    $response = $dc -> search($params);
                    break;

                /********** Profile (*) **********/
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

                /********** Categories (*) **********/
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

                /********** Deliveries (*) **********/
                case 'get_deliveries':
                    $response = $dc -> get('Deliveries', $request_data, $params);
                    break;

                case 'create_deliveries':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Deliveries', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_deliveries':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Deliveries', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_deliveries':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Deliveries', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_deliveries':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Deliveries', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Distributors (*) **********/
                case 'get_distributors':
                    $response = $dc -> get('Distributors', $request_data, $params);
                    break;

                case 'create_distributors':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Distributors', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_distributors':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Distributors', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_distributors':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Distributors', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_distributors':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Distributors', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Members (*) **********/
                case 'get_members':
                    $response = $dc -> get('Members', $request_data, $params);
                    break;

                case 'create_members':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Members', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_members':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Members', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_members':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Members', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_members':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Members', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Menu (*) **********/
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

                /********** MenuItems (*) **********/
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

                /********** Orders (*) **********/
                case 'get_orders':
                    $response = $dc -> get('Orders', $request_data, $params);
                    break;

                case 'create_orders':
//                    if ($request_is_authorized) {
//                        $response = $dc -> create('Orders', $request_data);
//                    } else {
//                        $response['status'] = 'unauthorized';
//                    }
                    $response = $dc -> create('Orders', $request_data);
                    break;

                case 'update_orders':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Orders', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_orders':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Orders', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_orders':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Orders', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'confirm_orders':
                    if ($request_is_authorized) {
                        $response = $dc -> confirm('Orders', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'cancel_orders':
                    if ($request_is_authorized) {
                        $response = $dc -> cancel('Orders', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Pages (*) **********/
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

                /********** Payments (*) **********/
                case 'get_payments':
                    $response = $dc -> get('Payments', $request_data, $params);
                    break;

                case 'create_payments':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Payments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_payments':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Payments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_payments':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Payments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_payments':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Payments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Posts (*) **********/
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

                /********** Producers (*) **********/
                case 'get_producers':
                    $response = $dc -> get('Producers', $request_data, $params);
                    break;

                case 'create_producers':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Producers', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_producers':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Producers', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_producers':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Producers', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_producers':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Producers', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Products Options (*) **********/
                case 'get_products_options':
                    $response = $dc -> get('ProductsOptions', $request_data, $params);
                    break;

                case 'create_products_options':
                    if ($request_is_authorized) {
                        $response = $dc -> create('ProductsOptions', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_products_options':
                    if ($request_is_authorized) {
                        $response = $dc -> update('ProductsOptions', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_products_options':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('ProductsOptions', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_products_options':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('ProductsOptions', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Products (*) **********/
                case 'get_products':
                    $response = $dc -> get('Products', $request_data, $params);
                    break;

                case 'create_products':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Products', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_products':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Products', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_products':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Products', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_products':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Products', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Stores (*) **********/
                case 'get_stores':
                    $response = $dc -> get('Stores', $request_data, $params);
                    break;

                case 'create_stores':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Stores', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_stores':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Stores', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_stores':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Stores', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_stores':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Stores', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                /********** Tags (*) **********/
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

                /********** Translations (*) **********/
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

                /********** Uploads (*) **********/
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

                /********** Users (**) **********/
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

                /********** Comments (*) **********/
                case 'get_comments':
                    $response = $dc -> get('Comments', $request_data, $params);
                    break;

                case 'create_comments':
                    if ($request_is_authorized) {
                        $response = $dc -> create('Comments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'update_comments':
                    if ($request_is_authorized) {
                        $response = $dc -> update('Comments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'toggle_comments':
                    if ($request_is_authorized) {
                        $response = $dc -> toggle('Comments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'delete_comments':
                    if ($request_is_authorized) {
                        $response = $dc -> delete('Comments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'confirm_comments':
                    if ($request_is_authorized) {
                        $response = $dc -> confirm('Comments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

                case 'cancel_comments':
                    if ($request_is_authorized) {
                        $response = $dc -> cancel('Comments', $request_data);
                    } else {
                        $response['status'] = 'unauthorized';
                    }
                    break;

            }
        }

        /** LEGEND
         - (*) Partial or base authorization
         - (**) Full authorization
        **/

        return $response;
    }

}