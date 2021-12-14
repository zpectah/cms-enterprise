<?php

namespace service;

class LogService {

    public function getList () {
        return null;
    }

    public function create ( $method, $status, $content) {
        $response = [
            'status' => 'ok',
            'file' => null,
        ];
        $utils = new \Utils;
        $utils -> createFolder(PATH_LOGS);
        $ip = $utils -> getClientIpAddress();
        $browser = $utils -> getBrowser();

        $log = '[' . date("G:i:s") . '][' . $ip . '][' . $browser['platform'] .  '][' . $browser['name'] . ' v' . $browser['version'] . '][' . $method . '][' . $status . '][' . $content . '];' . PHP_EOL;

        $response['file'] = file_put_contents(PATH_LOGS . date("Y-n-j").'.log', $log, FILE_APPEND);

        return $response;
    }

}