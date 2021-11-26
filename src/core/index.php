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

/*
 * Model
 */
require PATH_ROOT . 'core/model/Categories.php';
require PATH_ROOT . 'core/model/Deliveries.php';
require PATH_ROOT . 'core/model/Distributors.php';
require PATH_ROOT . 'core/model/Members.php';
require PATH_ROOT . 'core/model/Menu.php';
require PATH_ROOT . 'core/model/MenuItems.php';
require PATH_ROOT . 'core/model/Orders.php';
require PATH_ROOT . 'core/model/Pages.php';
require PATH_ROOT . 'core/model/Payments.php';
require PATH_ROOT . 'core/model/Posts.php';
require PATH_ROOT . 'core/model/Producers.php';
require PATH_ROOT . 'core/model/Products.php';
require PATH_ROOT . 'core/model/ProductsOptions.php';
require PATH_ROOT . 'core/model/Stores.php';
require PATH_ROOT . 'core/model/Tags.php';
require PATH_ROOT . 'core/model/Translations.php';
require PATH_ROOT . 'core/model/Uploads.php';
require PATH_ROOT . 'core/model/Users.php';

/*
 * Modules
 */
require PATH_ROOT . 'core/module/admin/CrmDashboard.php';
require PATH_ROOT . 'core/module/admin/Dashboard.php';
require PATH_ROOT . 'core/module/admin/MarketDashboard.php';
require PATH_ROOT . 'core/module/admin/Profile.php';
require PATH_ROOT . 'core/module/admin/Settings.php';