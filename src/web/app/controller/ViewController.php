<?php

namespace app\controller;

use controller\DataController;
use eftec\bladeone\BladeOne;
use service\AuthService;

class ViewController {

    public $blade;

    function __construct () {
        $this -> $blade = new BladeOne(
            TEMPLATE_ROOT_PATH,
            TEMPLATE_COMPILED_PATH
        );
    }

    private function get_modules_options (): array {
        $dc = new DataController;
        $cms_settings = $dc -> get_cms_settings([]);

        return [
            // 'crm_installed' => $cms_settings['module_crm_installed'],
            // 'market_installed' => $cms_settings['module_market_installed'],
            'crm_active' => $cms_settings['module_crm_active'],
            'market_active' => $cms_settings['module_market_active'],
            'members_register_active' => $cms_settings['members_register_active'],
            'members_login_active' => $cms_settings['members_login_active'],
            'members_lostPassword_active' => $cms_settings['members_lostPassword_active'],
            'members_profile_active' => $cms_settings['members_profile_active'],
        ];
    }
    private function get_current_language (): string {
        $rc = new RouteController;
        $dc = new DataController;
        $cms_settings = $dc -> get_cms_settings([]);
        $urlParams = $rc -> get_url_params();
        $lang_attr = $urlParams['lang'];
        $language = $cms_settings['language_default'];
        if ($lang_attr && in_array($lang_attr, $cms_settings['language_active'])) $language = $lang_attr;

        return $language;
    }
    private function get_language_options (): array {
        $dc = new DataController;
        $cms_settings = $dc -> get_cms_settings([]);
        $language = self::get_current_language();
        $default_language = $cms_settings['language_default'];
        $url_param = $language !== $default_language ? '?lang=' . $language : '';
        $current_url = explode("?", $_SERVER['REQUEST_URI']);
        $menu = [];
        foreach ($cms_settings['language_active'] as $lang) {
            $params = $lang !== $default_language ? '?lang=' . $lang : '';
            $menu[] = [
                'key' => $lang,
                'path' => $current_url[0] . $params,
                'active' => $lang == $language,
            ];
        }

        return [
            'current' => $language,
            'default' => $cms_settings['language_default'],
            'list' => $cms_settings['language_active'],
            'link_url_param' => $url_param,
            'menu' => $menu
        ];
    }
    private function get_page_data (): array {
        $rc = new RouteController;
        $dc = new DataController;
        $urlAttrs = $rc -> get_url_attrs();
        $urlParams = $rc -> get_url_params();
        $route_object = $rc -> get_route_object();
        $cms_settings = $dc -> get_cms_settings([]);
        $page_attr = $urlAttrs[0];
        $page_object = null;
        $page_name = $page_attr ? $page_attr : WEB_PAGE_KEYS['error-404'];
        $page_layout = 'default';
        $model_name = null;
        if ($page_attr) {
            if ($route_object['page']) {
                $page_object = $route_object;
                $page_name = $route_object['page']['name'];
                $page_layout = $route_object['page']['type'];
                if ($route_object['page']['type'] == 'post') $model_name = 'Posts';
                if ($route_object['page']['type'] == 'product') $model_name = 'Products';
            }
        } else {
            $page_name = WEB_PAGE_KEYS['home'];
        }

        return [
            'page_object' => $page_object,
            'page_name' => $page_name,
            'page_layout' => $page_layout,
            'settings' => $cms_settings,
            'model' => $model_name,
            'url_params' => $urlParams,
            'url_attrs' => $urlAttrs,
        ];
    }
    private function get_single_detail_data (): array {
        $rc = new RouteController;
        $dc = new DataController;
        $urlAttrs = $rc -> get_url_attrs();
        $model_attr = $urlAttrs[1];
        $id_attr = $urlAttrs[2];
        $model = null;
        $detail = null;
        if ($model_attr == WEB_PAGE_DETAIL_KEYS['posts']) {
            $items = $dc -> get('Posts', [ 'sub' => true ], [])['data'];
            $today = strtotime(date('Y-m-d H:i:s'));
            foreach ($items as $item) {
                $published = strtotime($item['published']);
                if (($id_attr == $item['id'] || $id_attr == $item['name'])
                    && $item['active']
                    && $item['approved']
                    && ($today >= $published)
                ) {
                    $model = $model_attr;
                    $detail = $item;
                }
            }
        } else if ($model_attr == WEB_PAGE_DETAIL_KEYS['products']) {
            $items = $dc -> get('Products', [ 'sub' => true ], [])['data'];
            foreach ($items as $item) {
                if (($id_attr == $item['id'] || $id_attr == $item['name'])
                    && $item['active']
                ) {
                    $model = $model_attr;
                    $detail = $item;
                }
            }
        }

        return [
            'model' => $model,
            'data' => $detail,
        ];
    }
    private function get_item_link ($pageId): string {
        $dc = new DataController;
        $pages = $dc -> get('Pages', [], [])['data'];
        $response = '/';

        foreach ($pages as $page) {
            if ($pageId == $page['id']) $response .= $page['name'];
        }

        return $response;
    }
    private function build_sorter ($key): \Closure {
        return function ($a, $b) use ($key) {
            return strnatcmp($a[$key], $b[$key]);
        };
    }
    private function get_menu_item_object ($item, $items, $url, $langParams) {
        $item['children'] = self::get_menu_items_children($item['id'], $items);
        if ($item['type'] == 'page') $item['__path'] = self::get_item_link($item['page']);
        if ($url == $item['__path'] . $langParams
            || $url == $item['path_url'] . $langParams
            || strpos($url, $item['__path']) !== false
        ) $item['is_selected'] = true;

        return $item;
    }
    private function get_menu_items_children ($parentId, $items): array {
        $response = [];
        $lang_params = self::get_language_options()['link_url_param'];
        $current_url = $_SERVER['REQUEST_URI'];
        foreach ($items as $item) {
            if ($item['active'] && $item['parent'] == $parentId) $response[] = self::get_menu_item_object($item, $items, $current_url, $lang_params);
        }
        usort($response, self::build_sorter('item_order'));

        return $response;
    }
    private function get_menu_items ($menuId): array {
        $response = [];
        $lang_params = self::get_language_options()['link_url_param'];
        $dc = new DataController;
        $menuItems = $dc -> get('MenuItems', [ 'menuId' => $menuId ], [])['data'];
        $current_url = $_SERVER['REQUEST_URI'];
        foreach ($menuItems as $item) {
            if ($item['active'] && $item['parent'] == '') $response[] = self::get_menu_item_object($item, $menuItems, $current_url, $lang_params);
        }
        usort($response, self::build_sorter('item_order'));

        return $response;
    }
    private function get_menu_data (): array {
        $response = [
            'primary' => [],
            'secondary' => [],
            'tertiary' => [],
            'custom' => []
        ];
        $dc = new DataController;
        $menu = $dc -> get('Menu', [], [])['data'];
        foreach ($menu as $item) {
            if ($item['active']) {
                $item['menu_items'] = self::get_menu_items($item['id']);
                $response[$item['type']][$item['name']] = $item;
            }
        }

        return $response;
    }
    private function get_translations (): array {
        $response = [];
        $dc = new DataController;
        $lng = self::get_current_language();
        foreach ($dc -> get('Translations', [], [])['data'] as $item) {
            $response[$item['name']] = $item['lang'][$lng]['value'];
        }

        return $response;
    }
    private function get_t ($key) {
        $translations = self::get_translations();
        $value = $key;
        if ($translations[$key]) $value = $translations[$key];

        return $value;
    }
    private function get_tags_from_id ($ids): array {
        $dc = new DataController;
        $response = [];
        $tags = $dc -> get('Tags', [], [])['data'];
        foreach ($tags as $tag) {
            foreach ($ids as $id) {
                if ($id == $tag['id']) $response[] = $tag['name'];
            }
        }

        return $response;
    }
    private function get_static_page_data ($pageName, $pageData, $detailData, $items): array {
        $modules = self::get_modules_options();
        if ($pageName == WEB_PAGE_KEYS['home']) { // Static page: Home
            $response = [
                'name' => 'page.home',
                'layout' => 'default',
                'context' => 'page-static',
            ];
        } else if ($pageName == WEB_PAGE_KEYS['basket']
            && $modules['market_active']
        ) { // Static page: Market basket
            $response = [
                'name' => 'page.basket',
                'layout' => 'default',
                'context' => 'page-basket',
            ];
        } else if ($pageName == WEB_PAGE_KEYS['search']) { // Static page: Search results
            $response = [
                'name' => 'page.search-results',
                'layout' => 'default',
                'context' => 'page-search',
            ];
        } else if ($pageName == WEB_PAGE_KEYS['profile']
            && $modules['crm_active']
            && $modules['members_profile_active']
        ) { // Static page: Members profile
            $response = [
                'name' => 'page.members-profile',
                'layout' => 'default',
                'context' => 'page-profile',
            ];
        } else if ($pageName == WEB_PAGE_KEYS['registration']
            && $modules['crm_active']
            && $modules['members_register_active']
        ) { // Static page: Members registration
            $response = [
                'name' => 'page.members-registration',
                'layout' => 'default',
                'context' => 'page-registration',
            ];
        } else if ($pageName == WEB_PAGE_KEYS['lost-password']
            && $modules['crm_active']
            && $modules['members_lostPassword_active']
        ) { // Static page: Members lost password
            $response = [
                'name' => 'page.members-lostpassword',
                'layout' => 'default',
                'context' => 'page-lost-password',
            ];
        } else if ($pageName == WEB_PAGE_KEYS['detail']
            && $detailData['data']
        ) { // Single detail (Posts, Products) without context
            $response = [
                'name' => 'page.detail-' . $detailData['model'],
                'layout' => 'default',
                'context' => 'page-single-detail',
            ];
        } else if ($items && $pageData['page_object']['detail']) { // Detail page (from category context)
            $response = [
                'name' => 'page.detail-' . $items['model'],
                'layout' => 'default',
                'context' => 'page-category-detail',
            ];
        } else { // Default page / page with list
            $response = [
                'name' => 'page.' . $pageData['page_layout'],
                'layout' => 'default',
                'context' => $items ? 'page-category' : 'page-default',
            ];
        }

        return $response;
    }
    private function get_static_meta (): array {
        $rc = new RouteController;
        $urlAttrs = $rc -> get_url_attrs();
        $pageData = self::get_page_data();
        $modules = self::get_modules_options();
        $pageAttr = $urlAttrs[0];
        $response = [
            'title' => $pageData['settings']['web_meta_title'],
            'robots' => $pageData['settings']['web_meta_robots'],
        ];
        if ($pageAttr == WEB_PAGE_KEYS['basket'] && $modules['market_active']) {
            $response['title'] = self::get_t('page.title.basket') . ' | ' . $pageData['settings']['web_meta_title'];
            $response['robots'] = 'none';
        } else if ($pageAttr == WEB_PAGE_KEYS['search']) {
            $response['title'] = self::get_t('page.title.search') . ' | ' . $pageData['settings']['web_meta_title'];
            if ($pageData['url_params']['search']) $response['title'] = self::get_t('page.title.search_results') . ': ' . $pageData['url_params']['search'] . ' | ' . $pageData['settings']['web_meta_title'];
            $response['robots'] = 'all';
        } else if ($pageAttr == WEB_PAGE_KEYS['registration']
            && $modules['crm_active']
            && $modules['members_register_active']
        ) {
            $response['title'] = self::get_t('page.title.registration') . ' | ' . $pageData['settings']['web_meta_title'];
            $response['robots'] = 'all';
        } else if ($pageAttr == WEB_PAGE_KEYS['profile']
            && $modules['crm_active']
            && $modules['members_profile_active']
        ) {
            $response['title'] = self::get_t('page.title.profile') . ' | ' . $pageData['settings']['web_meta_title'];
            $response['robots'] = 'none';
        } else if ($pageAttr == WEB_PAGE_KEYS['lost-password']
            && $modules['crm_active']
            && $modules['members_lostPassword_active']
        ) {
            $response['title'] = self::get_t('page.title.lost-password') . ' | ' . $pageData['settings']['web_meta_title'];
            $response['robots'] = 'none';
        }

        return $response;
    }
    private function get_search_result ():array {
        $dc = new DataController;
        $rc = new RouteController;
        $urlParams = $rc -> get_url_params();
        $lng = self::get_current_language();
        $results = [];
        if ($urlParams['search']) $results = $dc -> search([
            'search' => $urlParams['search'],
            'lang' => $lng,
        ]);

        return $results;
    }
    private function get_basket_options (): array {
        $rc = new RouteController;
        $urlAttrs = $rc -> get_url_attrs();
        $step_attr = $urlAttrs[1];

        return [
            // list | summary | confirmation | finish = success/error
            'step' => $step_attr,
        ];
    }
    private function get_member_options (): array {
        $dc = new DataController;
        $as = new AuthService;
        $pageData = self::get_page_data();
        $token = ($pageData['url_attrs'][1] == WEB_PAGE_KEYS['token'] && $pageData['url_attrs'][2]) ? $pageData['url_attrs'][2] : null;
        $request = $dc -> get('CmsRequests', [ 'token' => $token ], [])['data'];
        $member_object = $dc -> get_member_profile([]);
        $is_member_logged_in = $member_object['email'];
        $modules = self::get_modules_options();
        $response = [
            'lost_password_token' => null,
            'lost_password_request' => null,
            'member_token' => null,
            'member_logged_in' => false,
            'member' => null,
        ];
        if ($modules['crm_active']) {
            $response = [
                'lost_password_token' => $token,
                'lost_password_request' => $request,
                'member_token' => $as -> get_member_token(),
                'member_logged_in' => $is_member_logged_in,
                'member' => $member_object,
            ];
        }

        return $response;
    }
    private function get_posts_list ($limit, $offset, $type): array {
        $dc = new DataController;
        $posts = $dc -> get('Posts', [], [])['data'];
        $response_tmp = [];
        $today = strtotime(date('Y-m-d H:i:s'));
        foreach ($posts as $item) {
            $published = strtotime($item['published']);
            if ($item['active']
                && $item['approved']
                && ($today >= $published)
            ) {
                if ($type === 'all') {
                    $response_tmp[] = $item;
                } else if ($type == $item['type']) {
                    $response_tmp[] = $item;
                }
            }
        }
        $response_tmp = array_reverse($response_tmp);
        if ($limit === 0) {
            $response = $response_tmp;
        } else {
            $response = array_slice($response_tmp, $offset, $limit);
        }

        return $response;
    }
    private function get_products_list ($limit, $offset, $type): array {
        $dc = new DataController;
        $products = $dc -> get('Products', [], [])['data'];
        $modules = self::get_modules_options();
        $response_tmp = [];
        if ($modules['market_active']) {
            foreach ($products as $item) {
                if ($item['active']) {
                    if ($type === 'all') {
                        $response_tmp[] = $item;
                    } else if ($type == $item['type']) {
                        $response_tmp[] = $item;
                    }
                }
            }
            $response_tmp = array_reverse($response_tmp);
            if ($limit === 0) {
                $response = $response_tmp;
            } else {
                $response = array_slice($response_tmp, $offset, $limit);
            }
        } else {
            $response = $response_tmp;
        }

        return $response;
    }
    private function get_link_url_params (): string {
        $lngOptions = self::get_language_options();
        $params = '';
        if ($lngOptions['link_url_param']) $params .= $lngOptions['link_url_param'];

        return $params;
    }
    private function get_sidebar_widget (): array {
        $pageData = self::get_page_data();
        $modules = self::get_modules_options();
        $response = [
            'search' => true,
            'member' => false,
            'last-posts' => true,
            'basket' => false,
            'subscription' => false,
            'menu' => true,
        ];
        if ($modules['crm_active']) {
            $response['member'] = true;
            $response['subscription'] = true;
        }
        if ($modules['market_active']) {
            $response['basket'] = $pageData['page_name'] !== WEB_PAGE_KEYS['basket'];
        }

        return $response;
    }
    private function get_content_options (): array {
        $dc = new DataController;
        $cms_settings = $dc -> get_cms_settings([]);

        return [
            'mode' => [
                'debug' => $cms_settings['web_mode_debug'],
                'maintenance' => $cms_settings['web_mode_maintenance'],
            ],
            'comments' => [
                'active' => $cms_settings['comments_global_active'],
                'anonymous_active' => $cms_settings['comments_anonymous_active'],
            ]
        ];
    }

    public function get_view_meta_data (): array {
        $utils = new \Utils;
        $pageData = self::get_page_data();
        $singleDetailData = self::get_single_detail_data();
        $lng = self::get_current_language();
        $page_title = $pageData['page_object']['page']['lang'][$lng]['title']
            ? $pageData['page_object']['page']['lang'][$lng]['title'] . ' | ' . $pageData['settings']['web_meta_title']
            : self::get_static_meta()['title'];
        $page_description = $pageData['page_object']['page']['lang'][$lng]['description']
            ? $pageData['page_object']['page']['lang'][$lng]['description']
            : $pageData['settings']['web_meta_description'];
        $page_keywords = $pageData['settings']['web_meta_keywords'] ? implode(",", $pageData['settings']['web_meta_keywords']) : '';
        $page_robots = $pageData['page_object']['page']['meta_robots']
            ? $pageData['page_object']['page']['meta_robots']
            : self::get_static_meta()['robots'];
        $page_url = $utils -> getCurrentUrl();

        if ($pageData['page_object']['detail']) {
            $page_title = $pageData['page_object']['detail']['lang'][$lng]['title'] . ' | ' . $page_title;
            if ($pageData['page_object']['detail']['lang'][$lng]['description']) $page_description = substr($pageData['page_object']['detail']['lang'][$lng]['description'],0,150);
            if ($pageData['page_object']['detail']['tags']) $page_keywords .= ',' . implode(",", self::get_tags_from_id($pageData['page_object']['detail']['tags']));
        } else if ($singleDetailData['data']) {
            $page_title = $singleDetailData['data']['lang'][$lng]['title'] . ' | ' . $pageData['settings']['web_meta_title'];
            if ($singleDetailData['data']['lang'][$lng]['description']) $page_description = substr($singleDetailData['data']['lang'][$lng]['description'],0,150);
            if ($singleDetailData['data']['tags']) $page_keywords .= ',' . implode(",", self::get_tags_from_id($singleDetailData['data']['tags']));
        }

        return [
            'title' => $page_title,
            'description' => $page_description,
            'keywords' => $page_keywords,
            'robots' => $page_robots,
            'url' => $page_url,
        ];
    }

    public function render_page () {
        $utils = new \Utils;
        $lng = self::get_current_language();
        $pageData = self::get_page_data();
        $singleDetailData = self::get_single_detail_data();
        $items = $pageData['page_object']['page']['__items'];
        $modules = self::get_modules_options();
        $sidebar_widget = self::get_sidebar_widget();
        $with_sidebar = true;
        $layout_name = 'full';
        $page_name = 'page.error-404';
        $context = 'page-default';
        $common_options = [
            'units' => DEFAULT_UNITS,
            'page_keys' => WEB_PAGE_KEYS,
            'page_detail_keys' => WEB_PAGE_DETAIL_KEYS,
            'page_basket_keys' => WEB_PAGE_BASKET_KEYS,
        ];

        if ($pageData['page_object']['page']
            || $pageData['page_name'] == WEB_PAGE_KEYS['home']
            || ($pageData['page_name'] == WEB_PAGE_KEYS['basket'] && $modules['market_active'] )
            || $pageData['page_name'] == WEB_PAGE_KEYS['search']
            || ($pageData['page_name'] == WEB_PAGE_KEYS['registration'] && $modules['crm_active'] && $modules['members_register_active'])
            || ($pageData['page_name'] == WEB_PAGE_KEYS['profile'] && $modules['crm_active'] && $modules['members_profile_active'])
            || ($pageData['page_name'] == WEB_PAGE_KEYS['lost-password'] && $modules['crm_active'] && $modules['members_lostPassword_active'])
            || ($pageData['page_name'] == WEB_PAGE_KEYS['detail'] && $singleDetailData['data'])
        ) {
            $pd = self::get_static_page_data($pageData['page_name'], $pageData, $singleDetailData, $items);
            $page_name = $pd['name'];
            $layout_name = $pd['layout'];
            $context = $pd['context'];
        }

        $render_data = [
            't' => function ($key) { return self::get_t($key); },                                 // Function with return key if no value exist
            'lang' => self::get_language_options(),                                               // Language options object { current, default, list, link_url_param }
            'lng' => self::get_language_options()['current'],                                     // Current language ... for content conditions
            'urlPar' => self::get_link_url_params(),                                              // String with link url params, like ?lang=...
            'uploadsPfx' => UPLOADS_PATH,                                                         // Uploads root path prefix
            'menu' => self::get_menu_data(),                                                      // Object of arrays with menu defined in system { primary, secondary, tertiary, custom }

            // Dynamic lists
            'get_posts_list' => function ($limit = 0, $offset = 0, $type = 'all') { return self::get_posts_list($limit, $offset, $type); },
            'get_products_list' => function ($limit = 0, $offset = 0, $type = 'all') { return self::get_products_list($limit, $offset, $type); },
            // List from page defined category & Detail data from list or single
            'list_model' => $items['model'],
            'list_items' => $items['items'],
            'detail_model' => $items['model'] ? $items['model'] : $singleDetailData['model'],
            'detail_data' => $pageData['page_object']['detail'] ? $pageData['page_object']['detail'] : $singleDetailData['data'],
            'detail_url_suffix' => '/' . WEB_PAGE_KEYS['detail'],
            'category_id' => $items['category_id'],
            // ... available only when category is in context |-->
            'detail_not_found' => $pageData['page_object']['should_be_detail'],
            'detail_index' => $pageData['page_object']['detail_index'],
            'detail_prev' => $pageData['page_object']['detail_prev'],
            'detail_next' => $pageData['page_object']['detail_next'],
            // -->|

            // Options object
            'common_options' => $common_options,
            'modules_options' => $modules,
            'member_options' => self::get_member_options(),
            'content_options' => self::get_content_options(),
            'basket_options' => $pageData['page_name'] == 'basket' ? self::get_basket_options() : null,

            // Search results
            'search_results' => self::get_search_result(),

            // Project
            'project_name' => $pageData['settings']['project_name'],

            // Page meta data
            'page_id' => str_replace('page.', '', $page_name),
            'page_key' => $pageData['page_name'],
            'page_name' => $page_name,
            'page_url' => $utils -> getCurrentUrl(),
            'page_context' => $context,
            'page_token_temporary' => TMP_TOKEN,
            'sidebar_widget' => $sidebar_widget,

            // Current page view
            'title' => $pageData['page_object']['page']['lang'][$lng]['title'],
            'description' => $pageData['page_object']['page']['lang'][$lng]['description'],
            'content' => $pageData['page_object']['page']['lang'][$lng]['content'],
            'view_with_sidebar' => $with_sidebar,
            'elements' => $pageData['page_object']['page']['page_elements'],

            // Dynamic variables
            'url_params' => $pageData['url_params'],
            'url_attrs' => $pageData['url_attrs'],

        ];

        echo $this -> $blade -> run($layout_name, $render_data);
    }

}