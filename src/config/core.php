<?php

require_once PATH_ROOT . 'config/database.php';
require_once PATH_ROOT . 'config/env.php';

$JSON_ENV = json_decode(file_get_contents(PATH_ROOT . 'config/environmental.json'), true);
$JSON_OPTIONS = json_decode(file_get_contents(PATH_ROOT . 'config/options.json'), true);
$JSON_PROJECT = json_decode(file_get_contents(PATH_ROOT . 'config/project.json'), true);




const ENV =                                               BUILD['env'];
const TIMESTAMP =                                         BUILD['timestamp'];
const PASS_CRYPT =                                        PASSWORD_ARGON2I;
const PASS_CRYPT_OPTIONS = [
    'memory_cost' =>                                      2048,
    'time_cost' =>                                        4,
    'threads' =>                                          3
];
define( "CFG_ENV",                                        $JSON_ENV[ ENV ] );
define( "CFG_DB_SQL",                                     $DATABASE[ ENV ]['SQL'] );
const CFG_DB_CONN = [
    CFG_DB_SQL['server'],
    CFG_DB_SQL['user'],
    CFG_DB_SQL['password'],
    CFG_DB_SQL['name'],
    CFG_DB_SQL['port'],
];
define("PATHS", [
    'admin' =>                                            $JSON_PROJECT['path']['admin'],
    'api' =>                                              $JSON_PROJECT['path']['api'],
    'web' =>                                              $JSON_PROJECT['path']['web'],
    'assets' =>                                           $JSON_PROJECT['path']['assets'],
    'uploads' =>                                          $JSON_PROJECT['path']['uploads'],
    'logs' =>                                             $JSON_PROJECT['path']['logs'],
]);
define("ADMIN_VIEW", [
    'meta' => [
        'title' => $JSON_PROJECT['admin']['meta']['title'],
        'description' => $JSON_PROJECT['admin']['meta']['description'],
        'robots' => $JSON_PROJECT['admin']['meta']['robots'],
        'author' => $JSON_PROJECT['admin']['meta']['author'],
        'lang' => $JSON_PROJECT['admin']['meta']['lang'],
        'keywords' => $JSON_PROJECT['admin']['meta']['keywords'],
        'charset' => $JSON_PROJECT['admin']['meta']['charset'],
        'viewport' => $JSON_PROJECT['admin']['meta']['viewport'],
        'url' => CFG_ENV['root'] . $JSON_PROJECT['path']['admin'],
    ],
    'scripts' => CFG_ENV['admin']['scripts'],
]);
define("WEB_VIEW", [
    'meta' => [
        'title' => $JSON_PROJECT['web']['meta']['title'],
        'description' => $JSON_PROJECT['web']['meta']['description'],
        'robots' => $JSON_PROJECT['web']['meta']['robots'],
        'author' => $JSON_PROJECT['web']['meta']['author'],
        'lang' => $JSON_PROJECT['web']['meta']['lang'],
        'keywords' => $JSON_PROJECT['web']['meta']['keywords'],
        'charset' => $JSON_PROJECT['web']['meta']['charset'],
        'viewport' => $JSON_PROJECT['web']['meta']['viewport'],
        'url' => CFG_ENV['root'],
    ],
    'styles' => CFG_ENV['web']['styles'],
    'scripts' => CFG_ENV['web']['scripts'],
]);
