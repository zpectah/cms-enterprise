<?php

namespace module\admin;

use service\LogService;

class System {

    public function create_log ($data) {
        $ls = new LogService;

        return $ls -> create($data['user'], $data['method'], $data['status']);
    }

    public function get_log_list () {
        $ls = new LogService;

        return $ls -> getList();
    }


    public function install_language ($conn, $data) {
        return [];
    }

    public function install_module ($conn, $data) {
        return [];
    }

    public function repair_language_tables ($conn, $data) {
        return [];
    }

    public function export_sql_dump () { return; }

    public function import_sql_dump () { return; }


}