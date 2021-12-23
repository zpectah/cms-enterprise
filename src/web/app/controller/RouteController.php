<?php

namespace app\controller;

use controller\DataController;

class RouteController {

    public function get_url_attrs (): array {
        $request_url_trimmed = ltrim( $_SERVER['REDIRECT_URL'], "/" );
        $request_array = explode( "/", $request_url_trimmed );
        unset($request_array[0]); // unset 'web/'
        unset($request_array[1]); // unset 'www/'

        return array_values($request_array);
    }

    public function get_url_params (): array {
        return $_GET;
    }

    public function get_route_object (): array {
        $ds = new DataController;
        $urlAttrs = self::get_url_attrs();
        $route_attr = $urlAttrs[0];
        $route_detail_attr = $urlAttrs[1] == 'detail';
        $route_detail_id_attr = $urlAttrs[2];
        $route_object = [
            'page' => null,
            'detail' => null,
        ];
        if ($route_attr) {
            $pages = $ds -> get('Pages', [], [])['data'];
            foreach ($pages as $page) {
                if ($page['name'] == $route_attr) $route_object['page'] = $page;
            }
        }

        // handle if page is category or tag

        // get detail data if there is any
        //
        $route_object['detail'] = $route_detail_attr ? $route_detail_id_attr : null;

        return $route_object;
    }

    public function get_detail_route_object ($model): array {
        $ds = new DataController;
        $urlAttrs = self::get_url_attrs();
        $route_attr = $urlAttrs[0];
        $id_attr = $urlAttrs[1];
        $route_object = null;

        if ($route_attr && $id_attr) {
            $items = $model ? $ds -> get($model, [], [])['data'] : [];

            foreach ($items as $page) {
                if ($page['id'] == $id_attr || $page['name'] == $id_attr) $route_object = $page;
            }
        }




        return $route_object;
    }

}