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
            'lang' => $_GET['lang'],
            'page' => $_GET['page'],
            'limit' => $_GET['limit'],
            'search' => $_GET['search'],
            'oid' => $_GET['oid'],
            'order_status' => $_GET['order_status'],
        ];
    }

    private function get_category_items ($typeId): array {
        $dc = new DataController;
        $category = $dc -> get('Categories', [ 'id' => $typeId ], [])['data'];
        $model = $category['type'];
        $items = [];
        if ($model == 'posts') {
            $posts = $dc -> get('Posts', [ 'sub' => true ], [])['data'];
            foreach ($posts as $post) {
                $today = strtotime(date('Y-m-d H:i:s'));
                $published = strtotime($post['published']);
                if (in_array($category['id'], $post['categories'])
                    && $post['active']
                    && $post['approved']
                    && ($today >= $published)
                ) $items[] = $post;
            }
        } else if ($model == 'products') {
            $products = $dc -> get('Products', [ 'sub' => true ], [])['data'];
            foreach ($products as $product) {
                if (in_array($category['id'], $product['categories'])
                    && $product['active']
                ) $items[] = $product;
            }
        }

        return [
            'model' => $model,
            'items' => $items,
            'category_id' => $category['id'],
        ];
    }

    public function get_route_detail ($items, $attrId): array {
        $response = [
            'detail' => null,
            'detail_index' => null,
            'detail_prev' => null,
            'detail_next' => null,
        ];
        foreach ($items as $item) {
            if (($attrId == $item['id'] || $attrId == $item['name']) && $item['active']) {
                $response['detail'] = $item;
                $index = array_search($item, $items);
                $response['detail_index'] = $index;
                if($index > 0 ) $response['detail_prev'] = $items[ $index -1 ];
                if($index < count($items) -1 ) $response['detail_next'] = $items[ $index +1 ];
            }
        }

        return $response;
    }

    public function get_route_object (): array {
        $dc = new DataController;
        $urlAttrs = self::get_url_attrs();
        $route_attr = $urlAttrs[0];
        $route_detail_attr = $urlAttrs[1] == 'detail';
        $route_detail_id_attr = $urlAttrs[2];
        $response = [
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
                    if ($page['type'] == 'category') {
                        $page['__items'] = self::get_category_items($page['type_id']);
                        if ($route_detail_attr && $route_detail_id_attr) {
                            $response['should_be_detail'] = true;
                            $response = array_merge($response, self::get_route_detail($page['__items']['items'], $route_detail_id_attr));
                        }
                    }
                    $response['page'] = $page;
                }
            }
        }

        return $response;
    }

}