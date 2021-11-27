<?php

header("Access-Control-Allow-Headers: content-type, origin, accept, X-App-Token");
header("Content-Type: multipart/form-data");

const PATH_ROOT = '../';
require PATH_ROOT . 'core/index.php';

$request = new ApiRequest;

print_r( json_encode($request -> getResponse(), JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) );
