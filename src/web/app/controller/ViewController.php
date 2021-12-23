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

    private function get_page_data (): array {
        $rc = new RouteController;
        $dc = new DataController;
        $urlAttrs = $rc -> get_url_attrs();
        $urlParams = $rc -> get_url_params();
        $route_object = $rc -> get_route_object();
        $cms_settings = $dc -> get_cms_settings([]);
        $page_attr = $urlAttrs[0];
        $lang_attr = $urlParams['lang'];
        $language = $cms_settings['language_default'];
        if ($lang_attr) {
            foreach ($cms_settings['language_default'] as $lng) {
                if ($lng == $lang_attr) $language = $lang_attr;
            }
        }
        $page_object = null;
        $page_name = 'error-404';
        $page_layout = 'default';
        $model_name = null;
        if ($page_attr) {
            if ($route_object) {
                $page_object = $route_object;
                $page_name = $route_object['page']['name'];
                $page_layout = $route_object['page']['type'];
                $model_name = $route_object['page']['type'] == 'post' ? 'Posts' : $route_object['page']['type'] == 'product' ? 'Products' : null;
            }
        } else {
            $page_name = 'home';
        }

        return [
            'page_object' => $page_object,
            'page_name' => $page_name,
            'page_layout' => $page_layout,
            'language' => $language,
            'settings' => $cms_settings,
            'model_name' => $model_name,
        ];
    }



    public function get_view_meta_data (): array {
        $utils = new \Utils;
        $pageData = self::get_page_data();
        $page_title = $pageData['page_object']['page']['lang'][$pageData['language']]['title']
            ? $pageData['page_object']['page']['lang'][$pageData['language']]['title'] . ' | ' . $pageData['settings']['web_meta_title']
            : $pageData['settings']['web_meta_title'];
        $page_description = $pageData['page_object']['page']['lang'][$pageData['language']]['description']
            ? $pageData['page_object']['page']['lang'][$pageData['language']]['description']
            : $pageData['settings']['web_meta_description'];
        $page_keywords = $pageData['settings']['web_meta_keywords'] ? implode(",", $pageData['settings']['web_meta_keywords']) : '';
        $page_robots = $pageData['page_object']['page']['meta_robots']
            ? $pageData['page_object']['page']['meta_robots']
            : $pageData['settings']['web_meta_robots'];
        $page_url = $utils -> getCurrentUrl();

        return [
            'title' => $page_title,
            'description' => $page_description,
            'keywords' => $page_keywords,
            'robots' => $page_robots,
            'url' => $page_url,
        ];
    }

    public function render_page () {
        $pageData = self::get_page_data();
        $layout_name = 'full';
        $page_name = 'page.error-404';
        if ($pageData['page_object']['page'] || $pageData['page_name'] == 'home') {
            $layout_name = 'default';
            if ($pageData['page_name'] == 'home') {
                $page_name = 'page.home';
            } else {
                $page_name = 'page.' . $pageData['page_layout'];
            }
        }

        echo $this -> $blade -> run($layout_name, [
            'consumer' => 'rastafarai',

            'page_data' => $pageData,

            'view_id' => $pageData['page_layout'],
            'page_view' => $page_name,
            'show_sidebar' => true,
            'show_header' => true,
            'show_footer' => true,
        ]);
    }

}