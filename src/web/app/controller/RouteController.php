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
        return [
            'lang' => $_GET['lang']
        ];
    }

    private function get_category_items ($typeId): array {
        $dc = new DataController;
        $category = $dc -> get('Categories', [ 'id' => $typeId ], [])['data'];
        $model = $category['type'];
        $items = [];
        if ($model == 'posts') {
            $posts = $dc -> get('Posts', [], [])['data'];
            foreach ($posts as $post) {
                if (in_array($category['id'], $post['categories'])) $items[] = $post;
            }
        } else if ($model == 'products') {
            $products = $dc -> get('Products', [], [])['data'];
            foreach ($products as $product) {
                if (in_array($category['id'], $product['categories'])) $items[] = $product;
            }
        }

        return [
            'model' => $model,
            'items' => $items,
        ];
    }

    public function get_route_object (): array {
        $dc = new DataController;
        $urlAttrs = self::get_url_attrs();
        $route_attr = $urlAttrs[0];
        // $route_detail_attr = $urlAttrs[1] == 'detail';
        // $route_detail_id_attr = $urlAttrs[2];
        $route_object = [
            'page' => null,
            'detail' => null,
        ];
        if ($route_attr) {
            $pages = $dc -> get('Pages', [], [])['data'];
            foreach ($pages as $page) {
                if ($page['type'] == 'category') {
                    $page['__items'] = self::get_category_items($page['type_id']);
                }

                if ($page['active'] && $page['name'] == $route_attr) $route_object['page'] = $page;
            }
        }

        // handle if page is category or tag

        // get detail data if there is any
        //
        // $route_object['detail'] = $route_detail_attr ? $route_detail_id_attr : null;

        return $route_object;
    }

    // TODO
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