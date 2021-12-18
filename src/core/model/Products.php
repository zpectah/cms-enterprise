<?php

namespace model;

class Products {

    public function get ($conn, $data, $params, $languages): array {
        $response = [];
        $utils = new \Utils;

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

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
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
                $row['active'] = $row['active'] == 1; // Set value as boolean
                unset($row['deleted']); // Unset deleted attribute

                $response[] = $row;
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
                    active, 
                    deleted
                      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssiiiiiissssssssiiiiiiii';
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
                    'INSERT INTO products__' . $lang . ' (id, title, description) VALUES (?,?,?)',
                    'iss',
                    [
                        $response['id'],
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description']
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
                    active = ? 
                WHERE id = ?');
        $types = 'ssssiiiiiissssssssiiiiiiii';
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
                    'UPDATE products__' . $lang . ' SET title = ?, description = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
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