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
        // $url_param = $request_url[2];

        // Switching and executing
        if ($url_base) {
            switch (strtolower($url_base)) {

                /********** System **********/

                /********** Settings **********/

                /********** Profile **********/




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