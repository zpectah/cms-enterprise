<?php

namespace model;

class Products {

    private function getUpdatedRow ($conn, $row, $languages): array {
        $utils = new \Utils;

        foreach ($languages as $lang) {
            $row['lang'][$lang] = $utils -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM products__' . $lang . ' WHERE id = ?'
            );
        } // Set language object

        $row['producers'] = $row['producers'] == '' ? [] : explode(",", $row['producers']); // Set value as array
        $row['distributors'] = $row['distributors'] == '' ? [] : explode(",", $row['distributors']); // Set value as array
        $row['related'] = $row['related'] == '' ? [] : explode(",", $row['related']); // Set value as array
        $row['gallery'] = $row['gallery'] == '' ? [] : explode(",", $row['gallery']); // Set value as array
        $row['attachments'] = $row['attachments'] == '' ? [] : explode(",", $row['attachments']); // Set value as array
        $row['tags'] = $row['tags'] == '' ? [] : explode(",", $row['tags']); // Set value as array
        $row['categories'] = $row['categories'] == '' ? [] : explode(",", $row['categories']); // Set value as array
        $row['options'] = $row['options'] == '' ? [] : explode(",", $row['options']); // Set value as array
        $row['template'] = $row['template'] == 1; // Set value as boolean
        $row['is_new'] = $row['is_new'] == 1; // Set value as boolean
        $row['is_used'] = $row['is_used'] == 1; // Set value as boolean
        $row['is_unboxed'] = $row['is_unboxed'] == 1; // Set value as boolean
        $row['in_stock'] = $row['in_stock'] == 1; // Set value as boolean
        $row['active'] = $row['active'] == 1; // Set value as boolean
        unset($row['deleted']); // Unset deleted attribute

        return $row;
    }

    private function getRowSubData ($conn, $row, $languages) {
        $row['sub_producers'] = [];
        $row['sub_distributors'] = [];
        $row['sub_related'] = [];
        $row['sub_gallery'] = [];
        $row['sub_attachments'] = [];
        $row['sub_tags'] = [];
        $row['sub_categories'] = [];
        $row['sub_options'] = [];
        $row['sub_manager'] = [];

        if ($row['producers']) {
            $producers = new Producers;
            $row['sub_producers'] = $producers -> get($conn, [ 'ids' => $row['producers'] ], []);
        }
        if ($row['distributors']) {
            $distributors = new Distributors;
            $row['sub_distributors'] = $distributors -> get($conn, [ 'ids' => $row['distributors'] ], []);
        }
        if ($row['related']) {
            $row['sub_related'] = self::get($conn, [ 'ids' => $row['related'] ], [], $languages);
        }
        if ($row['gallery']) {
            $uploads = new Uploads;
            $row['sub_gallery'] = $uploads -> get($conn, [ 'ids' => $row['gallery'] ], [], $languages);
        }
        if ($row['attachments']) {
            $uploads = new Uploads;
            $row['sub_attachments'] = $uploads -> get($conn, [ 'ids' => $row['attachments'] ], [], $languages);
        }
        if ($row['tags']) {
            $tags = new Tags;
            $row['sub_tags'] = $tags -> get($conn, [ 'ids' => $row['tags'] ], []);
        }
        if ($row['categories']) {
            $categories = new Categories;
            $row['sub_categories'] = $categories -> get($conn, [ 'ids' => $row['categories'] ], [], $languages);
        }
        if ($row['options']) {
            $options = new ProductsOptions;
            $row['sub_options'] = $options -> get($conn, [ 'ids' => $row['options'] ], [], $languages);
        }
        if ($row['manager']) {
            $users = new Users;
            $row['sub_manager'] = $users -> get($conn, [ 'id' => $row['manager'] ], []);
        }

        return $row;
    }

    public function get ($conn, $data, $params, $languages): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM products WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $rp_sub = $data['sub'];
        if ($params['sub']) $rp_sub = $params['sub'];
        $rp_ids = $data['ids'];
        if ($params['ids']) $rp_ids = explode(",", $params['ids']);

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($rp_sub) {
                    $response[] = self::getRowSubData($conn, self::getUpdatedRow($conn, $row, $languages), $languages);
                } else if ($rp_ids) {
                    if (in_array($row['id'], $rp_ids)) $response[] = self::getUpdatedRow($conn, $row, $languages);
                } else {
                    $response[] = self::getUpdatedRow($conn, $row, $languages);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('INSERT INTO products (
                    name, 
                    type, 
                    categories,
                    tags,
                    item_price,
                    item_discount,
                    item_weight,
                    item_depth,
                    item_height,
                    item_width,
                    related,
                    gallery,
                    attachments,
                    img_main,
                    img_thumbnail,
                    producers,
                    distributors,
                    options,
                    rating,
                    manager,
                    template,
                    is_new,
                    is_used,
                    is_unboxed,
                    in_stock,
                    active, 
                    deleted
                      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssddddddssssssssiiiiiiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['item_price'],
            $data['item_discount'],
            $data['item_weight'],
            $data['item_depth'],
            $data['item_height'],
            $data['item_width'],
            $data['related'] ? implode(",", $data['related']) : '',
            $data['gallery'] ? implode(",", $data['gallery']) : '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
            $data['img_thumbnail'],
            $data['producers'] ? implode(",", $data['producers']) : '',
            $data['distributors'] ? implode(",", $data['distributors']) : '',
            $data['options'] ? implode(",", $data['options']) : '',
            $data['rating'],
            $data['manager'],
            $data['template'],
            $data['is_new'],
            $data['is_used'],
            $data['is_unboxed'],
            $data['in_stock'],
            $data['active'],
            0
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['id'] = $stmt -> insert_id;
            foreach ($languages as $lang) {
                $response['lang'][] = $utils -> update_language_row(
                    $conn,
                    $lang,
                    'INSERT INTO products__' . $lang . ' (id, title, description, content) VALUES (?,?,?,?)',
                    'isss',
                    [
                        $response['id'],
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
                        $data['lang'][$lang]['content']
                    ]
                );
            }
            $stmt -> close();
        }

        return $response;
    }

    public function update ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('UPDATE products SET 
                    name = ?, 
                    type = ?, 
                    categories = ?, 
                    tags = ?, 
                    item_price = ?, 
                    item_discount = ?, 
                    item_weight = ?, 
                    item_depth = ?, 
                    item_height = ?, 
                    item_width = ?, 
                    related = ?, 
                    gallery = ?, 
                    attachments = ?, 
                    img_main = ?, 
                    img_thumbnail = ?, 
                    producers = ?, 
                    distributors = ?, 
                    options = ?,
                    rating = ?, 
                    manager = ?, 
                    template = ?,                    
                    is_new = ?, 
                    is_used = ?, 
                    is_unboxed = ?,  
                    in_stock = ?,
                    active = ? 
                WHERE id = ?');
        $types = 'ssssddddddssssssssiiiiiiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['item_price'],
            $data['item_discount'],
            $data['item_weight'],
            $data['item_depth'],
            $data['item_height'],
            $data['item_width'],
            $data['related'] ? implode(",", $data['related']) : '',
            $data['gallery'] ? implode(",", $data['gallery']) : '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
            $data['img_thumbnail'],
            $data['producers'] ? implode(",", $data['producers']) : '',
            $data['distributors'] ? implode(",", $data['distributors']) : '',
            $data['options'] ? implode(",", $data['options']) : '',
            $data['rating'],
            $data['manager'],
            $data['template'],
            $data['is_new'],
            $data['is_used'],
            $data['is_unboxed'],
            $data['in_stock'],
            $data['active'],
            $data['id']
        ];

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response['rows'] = $stmt -> affected_rows;
            foreach ($languages as $lang) {
                $response['lang'][] = $utils -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE products__' . $lang . ' SET title = ?, description = ?, content = ? WHERE id = ?',
                    'sssi',
                    [
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
                        $data['lang'][$lang]['content'],
                        $data['lang'][$lang]['id']
                    ]
                );
            }
            $stmt -> close();
        }

        return $response;
    }

    public function toggle ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE products SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE products SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}