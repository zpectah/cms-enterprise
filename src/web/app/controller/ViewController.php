<?php

namespace app\controller;

use eftec\bladeone\BladeOne;

class ViewController {

    public $blade;

    function __construct () {
        $this -> $blade = new BladeOne(
            PATH_ROOT . 'web/app/views',
            PATH_ROOT . 'web/app/compiles'
        );
    }

    private function get_url_attrs (): array {
        $request_url_trimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
        $request_array = explode( "/", $request_url_trimmed );
        unset($request_array[0]); // unset 'web/'
        unset($request_array[1]); // unset 'www/'

        return array_values($request_array);
    }

    private function get_url_params (): array {
        return $_GET;
    }

    private function get_page_data (): array {
        $urlAttrs = self::get_url_attrs();
        $urlParams = self::get_url_params();

        return [];
    }



    public function get_view_meta_data (): array {
        $urlAttrs = self::get_url_attrs();
        $urlParams = self::get_url_params();

        // WEB_VIEW['meta']['title']

        return [
            'title' => 'Title by page params',
            'description' => '... by page params',
            'keywords' => '... by page params',
            'robots' => '... by page params',
            'url' => '... by page params',
        ];
    }

    public function render_page () {
        $urlAttrs = self::get_url_attrs();
        $urlParams = self::get_url_params();
        $pageData = self::get_page_data();

        $view_name = 'default';

        echo $this -> $blade -> run($view_name, [
            'consumer' => 'rastafarai',

            'show_header' => true,
            'show_footer' => true,
        ]);
    }

}