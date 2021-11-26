<?php

namespace service;

use model\Users;
use mysqli;

class DataService {

    /* !!!
    Response data for:
    - create {...} [ last id ]
    - update {...} [ affected ids ]
    - toggle [...] [ affected ids ]
    - delete [...] [ affected ids ]
    !!! */

    public function get ($model, $data = null) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            // 'data' => $data, // TODO: DEMO
            // '__model__' => $model, // TODO: DEMO
        ];

        // Model
        $Users = new Users;



        // Additional
        $languages = ['en'];
        $modules = ['crm', 'market'];


        switch ($model) {

            case 'Users':
                $response['data'] = $Users -> get($conn, $data);
                break;

        }

        return $response;
    }

    public function create ($model, $data) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
            '__model__' => $model, // TODO: DEMO
        ];

        return $response;
    }

    public function update ($model, $data) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
            '__model__' => $model, // TODO: DEMO
        ];

        return $response;
    }

    public function toggle ($model, $data) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
            '__model__' => $model, // TODO: DEMO
        ];

        return $response;
    }

    public function delete ($model, $data) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
            '__model__' => $model, // TODO: DEMO
        ];

        return $response;
    }


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

    /********** Translations **********/

    /********** Uploads **********/

    /********** Users **********/







    /********** System **********/

    /********** Settings **********/
    public function get_settings ($data) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
        ];

        return $response;
    }

    public function update_settings ($data) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
        ];

        return $response;
    }

    /********** Profile **********/
    public function user_login () {}

    public function user_logout () {}

    public function user_lost_password () {}

    public function user_lost_password_reset () {}

}