<?php

namespace model;

class ProductsOptions {

    public function get ($conn, $data, $params, $languages): array {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM products_options WHERE deleted = ?');
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
                        'SELECT * FROM products_options__' . $lang . ' WHERE id = ?'
                    );
                } // Set language object

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
        $query = ('INSERT INTO products_options (name, type, value, active, deleted) VALUES (?,?,?,?,?)');
        $types = 'sssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['value'],
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
                    'INSERT INTO products_options__' . $lang . ' (id, label) VALUES (?,?)',
                    'is',
                    [
                        $response['id'],
                        $data['lang'][$lang]['label']
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
        $query = ('UPDATE products_options SET name = ?, type = ?, value = ?, active = ? WHERE id = ?');
        $types = 'sssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['value'],
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
                    'UPDATE products_options__' . $lang . ' SET label = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['label'],
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
            $response[] = $utils -> proceed_update_row('UPDATE products_options SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE products_options SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}