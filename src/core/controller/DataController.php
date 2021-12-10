<?php

namespace controller;

use model\Categories;
use model\CmsRequests;
use model\Deliveries;
use model\Distributors;
use model\Members;
use model\Menu;
use model\MenuItems;
use model\Orders;
use model\Pages;
use model\Payments;
use model\Posts;
use model\Producers;
use model\Products;
use model\ProductsOptions;
use model\Stores;
use model\Tags;
use model\Translations;
use model\Uploads;
use model\Users;
use module\admin\Profile;
use module\admin\Settings;
use module\admin\System;
use mysqli;

class DataController {

    public function get ($model, $data, $params): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [items]
        ];

        $Settings = new Settings;

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;
        $Translations = new Translations;
        $Categories = new Categories;
        $Posts = new Posts;
        $Pages = new Pages;
        $Menu = new Menu;
        $MenuItems = new MenuItems;
        $Uploads = new Uploads;
        $Members = new Members;
        $Deliveries = new Deliveries;
        $Distributors = new Distributors;
        $Orders = new Orders;
        $Payments = new Payments;
        $Producers = new Producers;
        $Products = new Products;
        $ProductsOptions = new ProductsOptions;
        $Stores = new Stores;


        // Additional
        $languages = $Settings -> get_cms_settings_languages($conn);
        $modules = $Settings -> get_cms_settings_modules($conn);

        $language_active = $languages['language_active'];

        switch ($model) {

            case 'CmsRequests':
                $response['data'] = $CmsRequests -> get($conn, $data, $params);
                break;

            case 'Users':
                $response['data'] = $Users -> get($conn, $data, $params);
                break;

            case 'Tags':
                $response['data'] = $Tags -> get($conn, $data, $params);
                break;

            case 'Translations':
                $response['data'] = $Translations -> get($conn, $data, $params, $language_active);
                break;

            case 'Categories':
                $response['data'] = $Categories -> get($conn, $data, $params, $language_active);
                break;

            case 'Posts':
                $response['data'] = $Posts -> get($conn, $data, $params, $language_active);
                break;

            case 'Pages':
                $response['data'] = $Pages -> get($conn, $data, $params, $language_active);
                break;

            case 'Menu':
                $response['data'] = $Menu -> get($conn, $data, $params, $language_active);
                break;

            case 'MenuItems':
                $response['data'] = $MenuItems -> get($conn, $data, $params, $language_active);
                break;

            case 'Uploads':
                $response['data'] = $Uploads -> get($conn, $data, $params, $language_active);
                break;

            case 'Members':
                $response['data'] = $Members -> get($conn, $data, $params);
                break;

            case 'Deliveries':
                $response['data'] = $Deliveries -> get($conn, $data, $params, $language_active);
                break;

            case 'Distributors':
                $response['data'] = $Distributors -> get($conn, $data, $params);
                break;

            case 'Orders':
                $response['data'] = $Orders -> get($conn, $data, $params);
                break;

            case 'Payments':
                $response['data'] = $Payments -> get($conn, $data, $params, $language_active);
                break;

            case 'Producers':
                $response['data'] = $Producers -> get($conn, $data, $params);
                break;

            case 'Products':
                $response['data'] = $Products -> get($conn, $data, $params, $language_active);
                break;

            case 'ProductsOptions':
                $response['data'] = $ProductsOptions -> get($conn, $data, $params, $language_active);
                break;

            case 'Stores':
                $response['data'] = $Stores -> get($conn, $data, $params, $language_active);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function create ($model, $data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> id (int)
        ];

        $Settings = new Settings;

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;
        $Translations = new Translations;
        $Categories = new Categories;
        $Posts = new Posts;
        $Pages = new Pages;
        $Menu = new Menu;
        $MenuItems = new MenuItems;
        $Uploads = new Uploads;
        $Members = new Members;
        $Deliveries = new Deliveries;
        $Distributors = new Distributors;
        $Orders = new Orders;
        $Payments = new Payments;
        $Producers = new Producers;
        $Products = new Products;
        $ProductsOptions = new ProductsOptions;
        $Stores = new Stores;


        // Additional
        $languages = $Settings -> get_cms_settings_languages($conn);
        $modules = $Settings -> get_cms_settings_modules($conn);

        $language_active = $languages['language_active'];

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

            case 'Translations':
                $response['data'] = $Translations -> create($conn, $data, $language_active);
                break;

            case 'Categories':
                $response['data'] = $Categories -> create($conn, $data, $language_active);
                break;

            case 'Posts':
                $response['data'] = $Posts -> create($conn, $data, $language_active);
                break;

            case 'Pages':
                $response['data'] = $Pages -> create($conn, $data, $language_active);
                break;

            case 'Menu':
                $response['data'] = $Menu -> create($conn, $data, $language_active);
                break;

            case 'MenuItems':
                $response['data'] = $MenuItems -> create($conn, $data, $language_active);
                break;

            case 'Uploads':
                $response['data'] = $Uploads -> create($conn, $data, $language_active);
                break;

            case 'Members':
                $response['data'] = $Members -> create($conn, $data);
                break;

            case 'Deliveries':
                $response['data'] = $Deliveries -> create($conn, $data, $language_active);
                break;

            case 'Distributors':
                $response['data'] = $Distributors -> create($conn, $data);
                break;

            case 'Orders':
                $response['data'] = $Orders -> create($conn, $data);
                break;

            case 'Payments':
                $response['data'] = $Payments -> create($conn, $data, $language_active);
                break;

            case 'Producers':
                $response['data'] = $Producers -> create($conn, $data);
                break;

            case 'Products':
                $response['data'] = $Products -> create($conn, $data, $language_active);
                break;

            case 'ProductsOptions':
                $response['data'] = $ProductsOptions -> create($conn, $data, $language_active);
                break;

            case 'Stores':
                $response['data'] = $Stores -> create($conn, $data, $language_active);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function update ($model, $data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> rows (int)
        ];

        $Settings = new Settings;

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;
        $Translations = new Translations;
        $Categories = new Categories;
        $Posts = new Posts;
        $Pages = new Pages;
        $Menu = new Menu;
        $MenuItems = new MenuItems;
        $Uploads = new Uploads;
        $Members = new Members;
        $Deliveries = new Deliveries;
        $Distributors = new Distributors;
        $Orders = new Orders;
        $Payments = new Payments;
        $Producers = new Producers;
        $Products = new Products;
        $ProductsOptions = new ProductsOptions;
        $Stores = new Stores;


        // Additional
        $languages = $Settings -> get_cms_settings_languages($conn);
        $modules = $Settings -> get_cms_settings_modules($conn);

        $language_active = $languages['language_active'];

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

            case 'Translations':
                $response['data'] = $Translations -> update($conn, $data, $language_active);
                break;

            case 'Categories':
                $response['data'] = $Categories -> update($conn, $data, $language_active);
                break;

            case 'Posts':
                $response['data'] = $Posts -> update($conn, $data, $language_active);
                break;

            case 'Pages':
                $response['data'] = $Pages -> update($conn, $data, $language_active);
                break;

            case 'Menu':
                $response['data'] = $Menu -> update($conn, $data, $language_active);
                break;

            case 'MenuItems':
                $response['data'] = $MenuItems -> update($conn, $data, $language_active);
                break;

            case 'Uploads':
                $response['data'] = $Uploads -> update($conn, $data, $language_active);
                break;

            case 'Members':
                $response['data'] = $Members -> update($conn, $data);
                break;

            case 'Deliveries':
                $response['data'] = $Deliveries -> update($conn, $data, $language_active);
                break;

            case 'Distributors':
                $response['data'] = $Distributors -> update($conn, $data);
                break;

            case 'Orders':
                $response['data'] = $Orders -> update($conn, $data);
                break;

            case 'Payments':
                $response['data'] = $Payments -> update($conn, $data, $language_active);
                break;

            case 'Producers':
                $response['data'] = $Producers -> update($conn, $data);
                break;

            case 'Products':
                $response['data'] = $Products -> update($conn, $data, $language_active);
                break;

            case 'ProductsOptions':
                $response['data'] = $ProductsOptions -> update($conn, $data, $language_active);
                break;

            case 'Stores':
                $response['data'] = $Stores -> update($conn, $data, $language_active);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function toggle ($model, $data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [id]
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;
        $Translations = new Translations;
        $Categories = new Categories;
        $Posts = new Posts;
        $Pages = new Pages;
        $Menu = new Menu;
        $MenuItems = new MenuItems;
        $Uploads = new Uploads;
        $Members = new Members;
        $Deliveries = new Deliveries;
        $Distributors = new Distributors;
        $Orders = new Orders;
        $Payments = new Payments;
        $Producers = new Producers;
        $Products = new Products;
        $ProductsOptions = new ProductsOptions;
        $Stores = new Stores;


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

            case 'Translations':
                $response['data'] = $Translations -> toggle($conn, $data);
                break;

            case 'Categories':
                $response['data'] = $Categories -> toggle($conn, $data);
                break;

            case 'Posts':
                $response['data'] = $Posts -> toggle($conn, $data);
                break;

            case 'Pages':
                $response['data'] = $Pages -> toggle($conn, $data);
                break;

            case 'Menu':
                $response['data'] = $Menu -> toggle($conn, $data);
                break;

            case 'MenuItems':
                $response['data'] = $MenuItems -> toggle($conn, $data);
                break;

            case 'Uploads':
                $response['data'] = $Uploads -> toggle($conn, $data);
                break;

            case 'Members':
                $response['data'] = $Members -> toggle($conn, $data);
                break;

            case 'Deliveries':
                $response['data'] = $Deliveries -> toggle($conn, $data);
                break;

            case 'Distributors':
                $response['data'] = $Distributors -> toggle($conn, $data);
                break;

            case 'Orders':
                $response['data'] = $Orders -> toggle($conn, $data);
                break;

            case 'Payments':
                $response['data'] = $Payments -> toggle($conn, $data);
                break;

            case 'Producers':
                $response['data'] = $Producers -> toggle($conn, $data);
                break;

            case 'Products':
                $response['data'] = $Products -> toggle($conn, $data);
                break;

            case 'ProductsOptions':
                $response['data'] = $ProductsOptions -> toggle($conn, $data);
                break;

            case 'Stores':
                $response['data'] = $Stores -> toggle($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function delete ($model, $data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [id]
        ];

        // Model
        $CmsRequests = new CmsRequests;
        $Users = new Users;
        $Tags = new Tags;
        $Translations = new Translations;
        $Categories = new Categories;
        $Posts = new Posts;
        $Pages = new Pages;
        $Menu = new Menu;
        $MenuItems = new MenuItems;
        $Uploads = new Uploads;
        $Members = new Members;
        $Deliveries = new Deliveries;
        $Distributors = new Distributors;
        $Orders = new Orders;
        $Payments = new Payments;
        $Producers = new Producers;
        $Products = new Products;
        $ProductsOptions = new ProductsOptions;
        $Stores = new Stores;


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

            case 'Translations':
                $response['data'] = $Translations -> delete($conn, $data);
                break;

            case 'Categories':
                $response['data'] = $Categories -> delete($conn, $data);
                break;

            case 'Posts':
                $response['data'] = $Posts -> delete($conn, $data);
                break;

            case 'Pages':
                $response['data'] = $Pages -> delete($conn, $data);
                break;

            case 'Menu':
                $response['data'] = $Menu -> delete($conn, $data);
                break;

            case 'MenuItems':
                $response['data'] = $MenuItems -> delete($conn, $data);
                break;

            case 'Uploads':
                $response['data'] = $Uploads -> delete($conn, $data);
                break;

            case 'Members':
                $response['data'] = $Members -> delete($conn, $data);
                break;

            case 'Deliveries':
                $response['data'] = $Deliveries -> delete($conn, $data);
                break;

            case 'Distributors':
                $response['data'] = $Distributors -> delete($conn, $data);
                break;

            case 'Orders':
                $response['data'] = $Orders -> delete($conn, $data);
                break;

            case 'Payments':
                $response['data'] = $Payments -> delete($conn, $data);
                break;

            case 'Producers':
                $response['data'] = $Producers -> delete($conn, $data);
                break;

            case 'Products':
                $response['data'] = $Products -> delete($conn, $data);
                break;

            case 'ProductsOptions':
                $response['data'] = $ProductsOptions -> delete($conn, $data);
                break;

            case 'Stores':
                $response['data'] = $Stores -> delete($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function confirm ($model, $data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [id]
        ];

        // Model
        $Orders = new Orders;

        switch ($model) {

            case 'Orders':
                $response['data'] = $Orders -> confirm($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    public function cancel ($model, $data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $response = [
            'status' => 'ok',
            'data' => [], // data -> [id]
        ];

        // Model
        $Orders = new Orders;

        switch ($model) {

            case 'Orders':
                $response['data'] = $Orders -> cancel($conn, $data);
                break;

        }

        $conn -> close();

        return $response;
    }

    /********** System **********/
    public function create_log ($data) {
        $System = new System;

        return $System -> create_log($data);
    }
    public function get_log_list ($params): array {
        $System = new System;

        return $System -> get_log_list($params);
    }

    /********** Settings **********/
    public function get_cms_settings ($params): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Settings = new Settings;
        $response = $Settings -> get_cms_settings($conn, $params);
        $conn -> close();

        return $response;
    }
    public function update_cms_settings ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Settings = new Settings;
        $response = $Settings -> update_cms_settings($conn, $data);
        $conn -> close();

        return $response;
    }

    /********** Profile **********/
    public function get_user_profile ($params) {
        $conn = new mysqli(...CFG_DB_CONN);
        $Profile = new Profile;
        $response = $Profile -> get_user_profile($conn, $params);
        $conn -> close();

        return $response;
    }
    public function user_update_profile ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Profile = new Profile;
        $response = $Profile -> user_update_profile($conn, $data);
        $conn -> close();

        return $response;
    }
    public function user_login ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Profile = new Profile;
        $response = $Profile -> user_login($conn, $data);
        $conn -> close();

        return $response;
    }
    public function user_logout (): array {
        $Profile = new Profile;

        return $Profile -> user_logout();
    }
    public function user_lost_password ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Profile = new Profile;
        $response = $Profile -> user_lost_password($conn, $data);
        $conn -> close();

        return $response;
    }
    public function user_lost_password_reset ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Profile = new Profile;
        $response = $Profile -> user_lost_password_reset($conn, $data);
        $conn -> close();

        return $response;
    }
    public function user_create_new_password ($data): array {
        $conn = new mysqli(...CFG_DB_CONN);
        $Profile = new Profile;
        $response = $Profile -> user_create_new_password($conn, $data);
        $conn -> close();

        return $response;
    }

}