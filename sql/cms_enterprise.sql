SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `parent` varchar(32) NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `categories__cs`;
CREATE TABLE `categories__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `categories__en`;
CREATE TABLE `categories__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cms_requests`;
CREATE TABLE `cms_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `context` text NOT NULL,
  `value` text NOT NULL,
  `token` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cms_settings`;
CREATE TABLE `cms_settings` (
  `name` varchar(32) NOT NULL,
  `value` text NOT NULL,
  `format` varchar(32) NOT NULL,
  `context` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `cms_settings` (`name`, `value`, `format`, `context`) VALUES
('project_name',	'YOUR PROJECT NAME',	'string',	'cms'),
('language_installed',	'en,cs',	'array',	'language'),
('language_active',	'cs,en',	'array',	'language'),
('language_default',	'cs',	'string',	'language'),
('web_meta_title',	'YOUR WEB TITLE',	'string',	'web'),
('web_meta_description',	'YOUR WEB META DESCRIPTION',	'string',	'web'),
('web_meta_robots',	'all',	'string',	'web'),
('web_meta_keywords',	'key1,key2,key3',	'array',	'web'),
('web_mode_maintenance',	'true',	'boolean',	'web'),
('web_mode_debug',	'true',	'boolean',	'web'),
('form_email_sender',	'noreply@your-project.example',	'string',	'web'),
('form_email_recipients',	'noreply@example.example',	'array',	'web'),
('company_name',	'YOUR COMPANY NAME',	'string',	'company'),
('company_description',	'YOUR COMPANY DESCRIPTION',	'string',	'company'),
('company_id',	'ID123456789',	'string',	'company'),
('company_address',	'YOUR COMPANY ADDRESS 333/10',	'string',	'company'),
('company_city',	'YOUR COMPANY CITY',	'string',	'company'),
('company_country',	'YOUR COMPANY COUNTRY',	'string',	'company'),
('company_zip',	'CZ465465456',	'string',	'company'),
('company_location',	'14.449727369517,50.045754221915',	'array',	'company'),
('company_email',	'example2@example.example,example3@example.example',	'array',	'company'),
('company_phone',	'420123456789,420987654321',	'array',	'company'),
('company_bank',	'0000/0000',	'string',	'company'),
('module_crm_installed',	'true',	'boolean',	'module'),
('module_crm_active',	'true',	'boolean',	'module'),
('module_market_installed',	'true',	'boolean',	'module'),
('module_market_active',	'true',	'boolean',	'module'),
('content_redactor_approval',	'true',	'boolean',	'content'),
('comments_global_active',	'true',	'boolean',	'web'),
('comments_anonymous_active',	'true',	'boolean',	'web'),
('members_register_active',	'true',	'boolean',	'module'),
('members_login_active',	'true',	'boolean',	'module'),
('members_lostPassword_active',	'true',	'boolean',	'module'),
('members_profile_active',	'true',	'boolean',	'module');

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `assigned` text NOT NULL,
  `assigned_id` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `deliveries`;
CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `item_price` float NOT NULL,
  `item_limit_weight` float NOT NULL,
  `item_limit_units` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `deliveries__cs`;
CREATE TABLE `deliveries__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `deliveries__en`;
CREATE TABLE `deliveries__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `distributors`;
CREATE TABLE `distributors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `password` text NOT NULL,
  `nick_name` text NOT NULL,
  `first_name` text NOT NULL,
  `middle_name` text NOT NULL,
  `last_name` text NOT NULL,
  `position` text NOT NULL,
  `country` text NOT NULL,
  `city` text NOT NULL,
  `address` text NOT NULL,
  `zip` text NOT NULL,
  `phone_alt` text NOT NULL,
  `email_alt` text NOT NULL,
  `description` text NOT NULL,
  `subscription` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `page` varchar(32) NOT NULL,
  `path_url` text NOT NULL,
  `menu` varchar(32) NOT NULL,
  `parent` varchar(32) NOT NULL,
  `item_order` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu_items__cs`;
CREATE TABLE `menu_items__cs` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu_items__en`;
CREATE TABLE `menu_items__en` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu__cs`;
CREATE TABLE `menu__cs` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `menu__en`;
CREATE TABLE `menu__en` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
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
  `company_name` text NOT NULL,
  `company_id` text NOT NULL,
  `delivery_country` text NOT NULL,
  `delivery_city` text NOT NULL,
  `delivery_address` text NOT NULL,
  `delivery_zip` text NOT NULL,
  `items` text NOT NULL,
  `price_total` float NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `type_id` tinytext NOT NULL,
  `name` text NOT NULL,
  `meta_robots` varchar(32) NOT NULL,
  `page_elements` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pages__cs`;
CREATE TABLE `pages__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pages__en`;
CREATE TABLE `pages__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `item_price` float NOT NULL,
  `item_limit_weight` float NOT NULL,
  `item_limit_units` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `payments__cs`;
CREATE TABLE `payments__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `payments__en`;
CREATE TABLE `payments__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `categories` text NOT NULL,
  `tags` text NOT NULL,
  `event_start` text NOT NULL,
  `event_end` text NOT NULL,
  `event_location` text NOT NULL,
  `event_address` text NOT NULL,
  `event_country` text NOT NULL,
  `event_city` text NOT NULL,
  `event_zip` text NOT NULL,
  `media` text NOT NULL,
  `attachments` text NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `published` text NOT NULL,
  `links` text NOT NULL,
  `author` int(11) NOT NULL,
  `approved` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `template` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `posts__cs`;
CREATE TABLE `posts__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `posts__en`;
CREATE TABLE `posts__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `producers`;
CREATE TABLE `producers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `categories` text NOT NULL,
  `tags` text NOT NULL,
  `item_price` float NOT NULL,
  `item_discount` float NOT NULL,
  `item_weight` float NOT NULL,
  `item_depth` float NOT NULL,
  `item_height` float NOT NULL,
  `item_width` float NOT NULL,
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
  `template` int(11) NOT NULL,
  `is_new` int(11) NOT NULL,
  `is_used` int(11) NOT NULL,
  `is_unboxed` int(11) NOT NULL,
  `in_stock` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products_options`;
CREATE TABLE `products_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `value` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products__cs`;
CREATE TABLE `products__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products__en`;
CREATE TABLE `products__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `stores__cs`;
CREATE TABLE `stores__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `stores__en`;
CREATE TABLE `stores__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `translations__cs`;
CREATE TABLE `translations__cs` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `translations__en`;
CREATE TABLE `translations__en` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `file_name` text NOT NULL,
  `file_extension` tinytext NOT NULL,
  `file_mime` tinytext NOT NULL,
  `file_size` tinytext NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `uploads__cs`;
CREATE TABLE `uploads__cs` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `uploads__en`;
CREATE TABLE `uploads__en` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `nick_name` text NOT NULL,
  `first_name` text NOT NULL,
  `middle_name` text NOT NULL,
  `last_name` text NOT NULL,
  `user_group` text NOT NULL,
  `img_avatar` text NOT NULL,
  `description` text NOT NULL,
  `user_level` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `type`, `email`, `password`, `nick_name`, `first_name`, `middle_name`, `last_name`, `user_group`, `img_avatar`, `description`, `user_level`, `active`, `deleted`) VALUES
(1,	'default',	'admin@user.demo',	'$argon2id$v=19$m=2048,t=4,p=3$UlAySWhiMDBiNGN0Zy9Beg$IfTz+NwKWvltE7HXSHwvOFCfdLWZuLNo+MWuwynZyUY',	'admin',	'',	'',	'',	'company',	'',	'',	7,	1,	0);

-- (admin@user.demo : admin123)
