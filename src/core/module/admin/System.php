<?php

namespace module\admin;

use service\LogService;

class System {

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


    public function create_log ($data) {
        $ls = new LogService;

        return $ls -> create($data['user'], $data['method'], $data['status']);
    }

    public function get_log_list ($params) {
        $ls = new LogService;

        return $ls -> getList();
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

    public function install_module ($conn, $modules, $data) {
        return [];
    }

    public function repair_language_tables ($conn, $data) {
        return [];
    }

    public function export_sql_dump () { return; }

    public function import_sql_dump () { return; }


}