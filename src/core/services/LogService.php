<?php

namespace service;

class LogService {

    public function getList () {
        return null;
    }

    public function create ($user, $method, $status) {
        $log = date("G:i:s e") . ' [' . $user . '][' . $_SERVER['REMOTE_ADDR'] . '][' . $method . ':' . $status . '];' . PHP_EOL;

        if (!file_exists(PATH_LOGS)) mkdir(PATH_LOGS, 0777, true);

        return file_put_contents(PATH_LOGS . date("j.n.Y").'.log', $log, FILE_APPEND);
    }

}