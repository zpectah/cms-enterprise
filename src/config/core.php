<?php

require_once PATH_ROOT . 'config/database.php';
require_once PATH_ROOT . 'config/env.php';

$JSON_ENV = json_decode(file_get_contents(PATH_ROOT . 'config/environmental.json'), true);
$JSON_OPTIONS = json_decode(file_get_contents(PATH_ROOT . 'config/options.json'), true);
$JSON_PROJECT = json_decode(file_get_contents(PATH_ROOT . 'config/project.json'), true);
$JSON_LOCALES = json_decode(file_get_contents(PATH_ROOT . 'config/locales.json'), true);

$utils = new Utils;

const ENV =                                               BUILD['env'];                                                 // Environment
const TIMESTAMP =                                         BUILD['timestamp'];                                           // Build timestamp
const PASS_CRYPT =                                        PASSWORD_ARGON2ID;
const PASS_CRYPT_OPTIONS = [
    'memory_cost' =>                                      2048,
    'time_cost' =>                                        4,
    'threads' =>                                          3
];
define( "TMP_TOKEN",                                      $utils -> getRandomString(16, 'lower'));          // Temporary view token
define( "CMS_NAME",                                       $JSON_PROJECT['admin']['name']);                              // App name (E-mails, ...etc)
define( "CFG_ENV",                                        $JSON_ENV[ ENV ] );                                           // Config for each environment
define( "CFG_DB_SQL",                                     $DATABASE[ ENV ]['SQL'] );                                    // Database config for each environment
const CFG_DB_CONN = [                                                                                                   // Database config object for each environment
    CFG_DB_SQL['server'],
    CFG_DB_SQL['user'],
    CFG_DB_SQL['password'],
    CFG_DB_SQL['name'],
    CFG_DB_SQL['port'],
];
const SESSION_USER_NAME_PREFIX =                          'cms_enterprise_user';                                        // Admin user session key
const SESSION_USER_TOKEN_PREFIX =                         'cms_enterprise_token';                                       // Admin user token session key
const SESSION_MEMBER_NAME_PREFIX =                        'cms_enterprise_member';                                      // Admin user session key
const SESSION_MEMBER_TOKEN_PREFIX =                       'cms_enterprise_member_token';                                // Admin user token session key
define( "PATH_UPLOADS",                                   PATH_ROOT . $JSON_PROJECT['path']['uploads'] );
define( "UPLOADS_PATH",                                   '/' . $JSON_PROJECT['path']['uploads'] );
define( "PATH_LOGS",                                      PATH_ROOT . $JSON_PROJECT['path']['logs'] );
define( "PATH_ASSETS",                                    PATH_ROOT . $JSON_PROJECT['path']['assets'] );
define( "UPLOADS_IMAGE_FORMATS",                          $JSON_OPTIONS['model']['Uploads']['image']['format'] );
const URL_USER_LOST_PASSWORD_TOKEN =                      CFG_ENV['root'] . 'admin/lost-password/token/';
const URL_MEMBER_LOST_PASSWORD_TOKEN =                    CFG_ENV['root'] . 'lost-password/token/';
define("ADMIN_VIEW", [
    'meta' => [
        'title' =>                                        $JSON_PROJECT['admin']['meta']['title'],
        'description' =>                                  $JSON_PROJECT['admin']['meta']['description'],
        'robots' =>                                       $JSON_PROJECT['admin']['meta']['robots'],
        'author' =>                                       $JSON_PROJECT['admin']['meta']['author'],
        'lang' =>                                         $JSON_PROJECT['admin']['meta']['lang'],
        'keywords' =>                                     $JSON_PROJECT['admin']['meta']['keywords'],
        'charset' =>                                      $JSON_PROJECT['admin']['meta']['charset'],
        'viewport' =>                                     $JSON_PROJECT['admin']['meta']['viewport'],
        'url' =>                                          CFG_ENV['root'] . $JSON_PROJECT['path']['admin'],
    ],
    'scripts' =>                                          CFG_ENV['admin']['scripts'],
    'hash' =>                                             $utils -> getRandomString(16, 'lower'),
]);
define("WEB_VIEW", [
    'meta' => [
        'title' =>                                        $JSON_PROJECT['web']['meta']['title'],
        'description' =>                                  $JSON_PROJECT['web']['meta']['description'],
        'robots' =>                                       $JSON_PROJECT['web']['meta']['robots'],
        'author' =>                                       $JSON_PROJECT['web']['meta']['author'],
        'lang' =>                                         $JSON_PROJECT['web']['meta']['lang'],
        'keywords' =>                                     $JSON_PROJECT['web']['meta']['keywords'],
        'charset' =>                                      $JSON_PROJECT['web']['meta']['charset'],
        'viewport' =>                                     $JSON_PROJECT['web']['meta']['viewport'],
        'url' =>                                          CFG_ENV['root'],
    ],
    'styles' =>                                           CFG_ENV['web']['styles'],
    'scripts' =>                                          CFG_ENV['web']['scripts'],
    'hash' =>                                             $utils -> getRandomString(16, 'lower'),
]);
define("TEMPLATE_ROOT_PATH",                              PATH_ROOT . $JSON_PROJECT['web']['templates_root']);
define("TEMPLATE_COMPILED_PATH",                          PATH_ROOT . $JSON_PROJECT['web']['templates_compiled']);
define("DEFAULT_UNITS",                                   $JSON_PROJECT['units']);
define("WEB_PAGE_KEYS",                                   $JSON_PROJECT['web']['page_keys']);
define("WEB_PAGE_DETAIL_KEYS",                            $JSON_PROJECT['web']['page_detail_keys']);
define("WEB_PAGE_BASKET_KEYS",                            $JSON_PROJECT['web']['page_basket_keys']);
