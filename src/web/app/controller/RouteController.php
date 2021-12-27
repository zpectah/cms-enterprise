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
                // TODO: check published date
                if (in_array($category['id'], $post['categories']) && $post['active']) $items[] = $post;
            }
        } else if ($model == 'products') {
            $products = $dc -> get('Products', [], [])['data'];
            foreach ($products as $product) {
                if (in_array($category['id'], $product['categories']) && $product['active']) $items[] = $product;
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
        $route_detail_attr = $urlAttrs[1] == 'detail';
        $route_detail_id_attr = $urlAttrs[2];
        $route_object = [
            'page' => null,
            'detail' => null,
            'detail_index' => null,
            'detail_prev' => null,
            'detail_next' => null,
            'should_be_detail' => null,
        ];
        if ($route_attr) {
            $pages = $dc -> get('Pages', [], [])['data'];
            foreach ($pages as $page) {
                if ($page['active'] && $page['name'] == $route_attr) {
                    if ($page['type'] == 'category') $page['__items'] = self::get_category_items($page['type_id']);
                    if ($route_detail_attr && $route_detail_id_attr) {
                        $route_object['should_be_detail'] = true;
                        foreach ($page['__items']['items'] as $item) {
                            if (($route_detail_id_attr == $item['id'] || $route_detail_id_attr == $item['name']) && $item['active']) {
                                $route_object['detail'] = $item;
                                $index = array_search($item, $page['__items']['items']);
                                $route_object['detail_index'] = $index;
                                if($index > 0 ) $route_object['detail_prev'] = $page['__items']['items'][ $index -1 ];
                                if($index < count($page['__items']['items']) -1 ) $route_object['detail_next'] = $page['__items']['items'][ $index +1 ];
                            }
                        }
                    }
                    $route_object['page'] = $page;
                }
            }
        }

        return $route_object;
    }

}