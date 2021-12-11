<?php

namespace module\admin;

use service\LogService;

class System {

    public function create_log ($data) {
        $ls = new LogService;

        return $ls -> create($data['user'], $data['method'], $data['status']);
    }

    public function get_log_list ($params) {
        $ls = new LogService;

        return $ls -> getList();
    }

    private function createLanguageTables ($conn, $tablePrefix, $lang_default, $lang_new) {
        $response = null;
        $tableName_from = $tablePrefix . '__' . $lang_default;
        $tableName_to = $tablePrefix . '__' . $lang_new;

        // prepare
        $query = ("CREATE TABLE $tableName_to LIKE $tableName_from");

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> execute();
            $response = $stmt -> affected_rows;
            $stmt -> close();
        }

        return $response;
    }

    private function copyLanguageTables ($conn, $tablePrefix, $lang_default, $lang_new) {
        $response = null;
        $tableName_from = $tablePrefix . '__' . $lang_default;
        $tableName_to = $tablePrefix . '__' . $lang_new;

        // prepare
        $query = ("INSERT $tableName_to SELECT * FROM $tableName_from");

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> execute();
            $response = $stmt -> affected_rows;
            $stmt -> close();
        }

        return $response;
    }

    public function install_language ($conn, $modules, $data) {
        $response = [
            'lang' => $data['lang_new'],
            'status' => 'error'
        ];
        $crm_installed = $modules['module_crm_installed'];
        $market_installed = $modules['module_market_installed'];
        $tables = [
            'categories',
            'menu_items',
            'menu',
            'pages',
            'posts',
            'translations',
            'uploads'
        ];
        $tables_crm = $crm_installed ? [] : [];
        $tables_market = $market_installed ? [
            'deliveries',
            'payments',
            'products',
            'stores'
        ] : [];
        $lang_default = $data['lang_default'];
        $lang_new = $data['lang_new'];

        // Common tables
        $executed = [];
        foreach ($tables as $item) {
            $executed[] = self::createLanguageTables($conn, $item, $lang_default, $lang_new);
            $executed[] = self::copyLanguageTables($conn, $item, $lang_default, $lang_new);
        }
        $response['status'] = count($tables) == (count($executed)/2) ? 'done' : 'error';

        // Crm tables
        if ($crm_installed) {
            $executed_crm = [];
            foreach ($tables_crm as $item) {
                $executed_crm[] = self::createLanguageTables($conn, $item, $lang_default, $lang_new);
                $executed_crm[] = self::copyLanguageTables($conn, $item, $lang_default, $lang_new);
            }
            $response['status'] = count($tables_crm) == (count($executed_crm)/2) ? 'done' : 'error';
        }

        // Market tables
        if ($market_installed) {
            $executed_market = [];
            foreach ($tables_market as $item) {
                $executed_market[] = self::createLanguageTables($conn, $item, $lang_default, $lang_new);
                $executed_market[] = self::copyLanguageTables($conn, $item, $lang_default, $lang_new);
            }
            $response['status'] = count($tables_market) == (count($executed_market)/2) ? 'done' : 'error';
        }

        return $response;
    }

    private function createModuleTable ($conn, $module, $languages) {
        $response = [];
        $queries_crm = [];
        $queries_market = [];

        // prepare crm queries
        $queries_crm[] = "CREATE TABLE `members` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `email` text NOT NULL,
          `phone` text NOT NULL,
          `password` text NOT NULL,
          `nick_name` text NOT NULL,
          `first_name` text NOT NULL,
          `middle_name` text NOT NULL,
          `last_name` text NOT NULL,
          `country` text NOT NULL,
          `city` text NOT NULL,
          `address` text NOT NULL,
          `zip` text NOT NULL,
          `phone_alt` text NOT NULL,
          `email_alt` text NOT NULL,
          `description` text NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

        // prepare market queries
        $queries_market[] = "CREATE TABLE `deliveries` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `item_price` int(11) NOT NULL,
          `item_limit_weight` int(11) NOT NULL,
          `item_limit_units` int(11) NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `distributors` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `img_thumbnail` text NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `orders` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `email` text NOT NULL,
          `phone` text NOT NULL,
          `customer_name` text NOT NULL,
          `country` text NOT NULL,
          `city` text NOT NULL,
          `address` text NOT NULL,
          `zip` text NOT NULL,
          `delivery` text NOT NULL,
          `payment` text NOT NULL,
          `description` text NOT NULL,
          `items` text NOT NULL,
          `price_total` int(11) NOT NULL,
          `status` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `payments` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `item_price` int(11) NOT NULL,
          `item_limit_weight` int(11) NOT NULL,
          `item_limit_units` int(11) NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `producers` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `img_thumbnail` text NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `products` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `categories` text NOT NULL,
          `tags` text NOT NULL,
          `item_price` int(11) NOT NULL,
          `item_discount` int(11) NOT NULL,
          `item_weight` int(11) NOT NULL,
          `item_depth` int(11) NOT NULL,
          `item_height` int(11) NOT NULL,
          `item_width` int(11) NOT NULL,
          `related` text NOT NULL,
          `gallery` text NOT NULL,
          `attachments` text NOT NULL,
          `img_main` text NOT NULL,
          `img_thumbnail` text NOT NULL,
          `producers` text NOT NULL,
          `distributors` text NOT NULL,
          `options` text NOT NULL,
          `rating` int(11) NOT NULL,
          `manager` int(11) NOT NULL,
          `is_new` int(11) NOT NULL,
          `is_used` int(11) NOT NULL,
          `is_unboxed` int(11) NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `products_options` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $queries_market[] = "CREATE TABLE `stores` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `type` varchar(32) NOT NULL,
          `name` text NOT NULL,
          `country` text NOT NULL,
          `city` text NOT NULL,
          `address` text NOT NULL,
          `zip` text NOT NULL,
          `location` text NOT NULL,
          `phone` text NOT NULL,
          `email` text NOT NULL,
          `attachments` text NOT NULL,
          `img_main` text NOT NULL,
          `img_thumbnail` text NOT NULL,
          `active` int(11) NOT NULL,
          `deleted` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

        // prepare language queries
        foreach ($languages as $lang) {
            $queries_market[] = "CREATE TABLE `deliveries__$lang` (
              `id` int(11) NOT NULL,
              `title` text NOT NULL,
              `description` text NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
            $queries_market[] = "CREATE TABLE `payments__$lang` (
              `id` int(11) NOT NULL,
              `title` text NOT NULL,
              `description` text NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
            $queries_market[] = "CREATE TABLE `products__$lang` (
              `id` int(11) NOT NULL,
              `title` text NOT NULL,
              `description` text NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
            $queries_market[] = "CREATE TABLE `stores__$lang` (
              `id` int(11) NOT NULL,
              `title` text NOT NULL,
              `description` text NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        }

        // proceed
        if ($module == 'crm') {
            foreach ($queries_crm as $query) {
                // execute
                if ($conn -> connect_error) {
                    $response = $conn -> connect_error;
                } else {
                    $stmt = $conn -> prepare($query);
                    $stmt -> execute();
                    $response[] = $stmt -> affected_rows;
                    $stmt -> close();
                }
            }
        } else if ($module == 'market') {
            foreach ($queries_market as $query) {
                // execute
                if ($conn -> connect_error) {
                    $response = $conn -> connect_error;
                } else {
                    $stmt = $conn -> prepare($query);
                    $stmt -> execute();
                    $response[] = $stmt -> affected_rows;
                    $stmt -> close();
                }
            }
        }

        return $response;
    }

    public function install_module ($conn, $languages, $data) {
        $response = [
            'module' => $data['module'],
            'status' => self::createModuleTable($conn, $data['module'], $languages)
        ];

        return $response;
    }

    public function repair_language_tables ($conn, $data) { return null; }

    public function export_sql_dump () { return null; }

    public function import_sql_dump () { return null; }


}