<?php

namespace app\controller;

use controller\DataController;
use eftec\bladeone\BladeOne;

class ViewController {

    public $blade;

    function __construct () {
        $this -> $blade = new BladeOne(
            [
                PATH_ROOT . 'web/app/views',
                PATH_ROOT . 'web/app/views/shared',
                PATH_ROOT . 'web/app/views/content',
            ],
            PATH_ROOT . 'web/app/compiles'
        );
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
        $url_param = $language !== $cms_settings['language_default'] ? '?lang=' . $language : '';

        return [
            'current' => $language,
            'default' => $cms_settings['language_default'],
            'list' => $cms_settings['language_active'],
            'link_url_param' => $url_param,
        ];
    }

    private function get_page_data (): array {
        $rc = new RouteController;
        $dc = new DataController;
        $urlAttrs = $rc -> get_url_attrs();
        $route_object = $rc -> get_route_object();
        $cms_settings = $dc -> get_cms_settings([]);
        $page_attr = $urlAttrs[0];
        $page_object = null;
        $page_name = 'error-404';
        $page_layout = 'default';
        $model_name = null;
        if ($page_attr) {
            if ($route_object) {
                $page_object = $route_object;
                $page_name = $route_object['page']['name'];
                $page_layout = $route_object['page']['type'];
                if ($route_object['page']['type'] == 'post') $model_name = 'Posts';
                if ($route_object['page']['type'] == 'product') $model_name = 'Products';
            }
        } else {
            $page_name = 'home';
        }

        return [
            'page_object' => $page_object,
            'page_name' => $page_name,
            'page_layout' => $page_layout,
            'settings' => $cms_settings,
            'model_name' => $model_name,
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


    public function get_view_meta_data (): array {
        $utils = new \Utils;
        $pageData = self::get_page_data();
        $lng = self::get_current_language();
        $page_title = $pageData['page_object']['page']['lang'][$lng]['title']
            ? $pageData['page_object']['page']['lang'][$lng]['title'] . ' | ' . $pageData['settings']['web_meta_title']
            : $pageData['settings']['web_meta_title'];
        $page_description = $pageData['page_object']['page']['lang'][$lng]['description']
            ? $pageData['page_object']['page']['lang'][$lng]['description']
            : $pageData['settings']['web_meta_description'];
        $page_keywords = $pageData['settings']['web_meta_keywords'] ? implode(",", $pageData['settings']['web_meta_keywords']) : '';
        $page_robots = $pageData['page_object']['page']['meta_robots']
            ? $pageData['page_object']['page']['meta_robots']
            : $pageData['settings']['web_meta_robots'];
        $page_url = $utils -> getCurrentUrl();

        if ($pageData['page_object']['detail']) {
            $page_title = $pageData['page_object']['detail']['lang'][$lng]['title'] . ' | ' . $page_title;
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
        $pageData = self::get_page_data();
        $layout_name = 'full';
        $page_name = 'page.error-404';
        $lng = self::get_current_language();
        $items = $pageData['page_object']['page']['__items'];
        $context = 'page-default';
        if ($pageData['page_object']['page'] || $pageData['page_name'] == 'home') {
            if ($pageData['page_name'] == 'home') {
                $page_name = 'page.home';
                $layout_name = 'default';
                $context = 'page-static';
            } else if ($items && $pageData['page_object']['detail']) {
                $page_name = 'page.detail-' . $items['model'];
                $layout_name = 'default';
                $context = 'page-detail';
            } else {
                $page_name = 'page.' . $pageData['page_layout'];
                $layout_name = 'default';
                $context = $items ? 'page-list' : 'page-layout';
            }
        }

        echo $this -> $blade -> run($layout_name, [
            't' => self::get_translations(),                                                      // Object of translations keys defined in system
            'lang' => self::get_language_options(),                                               // Language options object { current, default, list, link_url_param }
            'menu' => self::get_menu_data(),                                                      // Object of arrays with menu defined in system { primary, secondary, tertiary, custom }

            // List from page defined category & Detail from these list
            'list_model' => $items['model'],
            'list_items' => $items['items'],
            'list_detail' => $pageData['page_object']['detail'],
            'detail_not_found' => $pageData['page_object']['should_be_detail'],
            'detail_index' => $pageData['page_object']['detail_index'],
            'detail_prev' => $pageData['page_object']['detail_prev'],
            'detail_next' => $pageData['page_object']['detail_next'],
            'detail_url_suffix' => '/detail',

            // Project
            'project_name' => $pageData['settings']['project_name'],

            // Page meta data
            'page_id' => str_replace('page.', '', $page_name),
            'page_key' => $pageData['page_name'],
            'page_name' => $page_name,
            'page_url' => $utils -> getCurrentUrl(),
            'page_context' => $context,

            // Current page view
            'title' => $pageData['page_object']['page']['lang'][$lng]['title'],
            'description' => $pageData['page_object']['page']['lang'][$lng]['description'],
            'content' => $pageData['page_object']['page']['lang'][$lng]['content'],

        ]);
    }

}