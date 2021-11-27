<?php

namespace service;

use model\CmsRequests;
use model\Tags;
use model\Users;
use module\admin\Profile;
use mysqli;

class DataService {

    /* !!!
    Response data for:
    - create {...} [ last id ]
    - update {...} [ affected ids ]
    - toggle [...] [ affected ids ]
    - delete [...] [ affected ids ]
    !!! */

    public function get ($model, $data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [items]
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;



        // Additional
        $languages = ['en'];
        $modules = ['crm', 'market'];


        switch ($model) {

            case 'CmsRequests':
                $response['data'] = $CmsRequests -> get($conn, $data);
                break;

            case 'Users':
                $response['data'] = $Users -> get($conn, $data);
                break;

            case 'Tags':
                $response['data'] = $Tags -> get($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function create ($model, $data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> id (int)
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;



        // Additional
        $languages = ['en'];
        $modules = ['crm', 'market'];


        switch ($model) {

            case 'CmsRequests':
                $response['data'] = $CmsRequests -> create($conn, $data);
                break;

            case 'Users':
                $response['data'] = $Users -> create($conn, $data);
                break;

            case 'Tags':
                $response['data'] = $Tags -> create($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function update ($model, $data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> rows (int)
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;



        // Additional
        $languages = ['en'];
        $modules = ['crm', 'market'];


        switch ($model) {

            case 'CmsRequests':
                $response['data'] = $CmsRequests -> update($conn, $data);
                break;

            case 'Users':
                $response['data'] = $Users -> update($conn, $data);
                break;

            case 'Tags':
                $response['data'] = $Tags -> update($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function toggle ($model, $data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [id]
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;


        switch ($model) {

            case 'CmsRequests':
                $response['data'] = $CmsRequests -> toggle($conn, $data);
                break;

            case 'Users':
                $response['data'] = $Users -> toggle($conn, $data);
                break;

            case 'Tags':
                $response['data'] = $Tags -> toggle($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function delete ($model, $data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [id]
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;


        switch ($model) {

            case 'CmsRequests':
                $response['data'] = $CmsRequests -> delete($conn, $data);
                break;

            case 'Users':
                $response['data'] = $Users -> delete($conn, $data);
                break;

            case 'Tags':
                $response['data'] = $Tags -> delete($conn, $data);
                break;

        }

        $conn -> close();

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
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
        ];

        $conn -> close();

        return $response;
    }

    public function update_settings ($data) {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => $data, // TODO: DEMO
        ];

        $conn -> close();

        return $response;
    }

    /********** Profile **********/
    public function get_user_profile () {
        $conn = new mysqli(...CFG_DB_CONN);

        $Profile = new Profile;
        $response = $Profile -> get_user_profile($conn);

        $conn -> close();

        return $response;
    }

    public function user_update_profile ($data) {
        $conn = new mysqli(...CFG_DB_CONN);

        $Profile = new Profile;
        $response = $Profile -> user_update_profile($conn, $data);

        $conn -> close();

        return $response;
    }

    public function user_login ($data) {
        $conn = new mysqli(...CFG_DB_CONN);

        $Profile = new Profile;
        $response = $Profile -> user_login($conn, $data);

        $conn -> close();

        return $response;
    }

    public function user_logout () {
        $Profile = new Profile;

        return $Profile -> user_logout();
    }

    public function user_lost_password ($data) {
        $conn = new mysqli(...CFG_DB_CONN);

        $Profile = new Profile;
        $response = $Profile -> user_lost_password($conn, $data);

        $conn -> close();

        return $response;
    }

    public function user_lost_password_reset ($data) {
        $conn = new mysqli(...CFG_DB_CONN);

        $Profile = new Profile;
        $response = $Profile -> user_lost_password_reset($conn, $data);

        $conn -> close();

        return $response;
    }

}