<?php

/*
 * Composer
 */
require PATH_ROOT . 'vendor/autoload.php';

/*
 * Utils
 */
require PATH_ROOT . 'core/Utils.php';

/*
 * Configs and Constants
 */
require PATH_ROOT . 'config/core.php';

/*
 * API request handler
 */
require PATH_ROOT . 'core/Request.php';

/*
 * Services
 */
require PATH_ROOT . 'core/services/AuthService.php';
require PATH_ROOT . 'core/services/DataService.php';
require PATH_ROOT . 'core/services/LogService.php';
require PATH_ROOT . 'core/services/EmailService.php';
