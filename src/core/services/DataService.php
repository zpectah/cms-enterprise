<?php

namespace service;

class DataService {

    /* !!!
    Response data for:
    - create {...} [ last id ]
    - update {...} [ affected ids ]
    - toggle [...] [ affected ids ]
    - delete [...] [ affected ids ]
    !!! */

    public function get ($model, $data = null) {
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
            '__model__' => $model, // TODO: DEMO
        ];

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





    /********** System **********/

    /********** Settings **********/
    public function get_settings () {
        $response = [
            'status' => 'ok',
        ];

        return $response;
    }

    public function update_settings () {
        $response = [
            'status' => 'ok',
        ];

        return $response;
    }

    /********** Profile **********/
    public function user_login () {}

    public function user_logout () {}

    public function user_lost_password () {}

    public function user_lost_password_reset () {}



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

}