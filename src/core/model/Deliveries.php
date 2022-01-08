<?php

namespace model;

class Deliveries {

    private function getUpdatedRow ($conn, $row, $languages) {
        $utils = new \Utils;
        foreach ($languages as $lang) {
            $row['lang'][$lang] = $utils -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM deliveries__' . $lang . ' WHERE id = ?'
            );
        } // Set language object

        $row['active'] = $row['active'] == 1; // Set value as boolean
        unset($row['deleted']); // Unset deleted attribute

        return $row;
    }

    public function get ($conn, $data, $params, $languages) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM deliveries WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $rp_ids = $data['ids'];
        if ($params['ids']) $rp_ids = explode(",", $params['ids']);

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($rp_ids) {
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
        $query = ('INSERT INTO deliveries (name, type, item_price, item_limit_weight, item_limit_units, active, deleted) VALUES (?,?,?,?,?,?,?)');
        $types = 'ssddiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['item_price'],
            $data['item_limit_weight'],
            $data['item_limit_units'],
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
                    'INSERT INTO deliveries__' . $lang . ' (id, title, description) VALUES (?,?,?)',
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
        $query = ('UPDATE deliveries SET name = ?, type = ?, item_price = ?, item_limit_weight = ?, item_limit_units = ?, active = ? WHERE id = ?');
        $types = 'ssddiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['item_price'],
            $data['item_limit_weight'],
            $data['item_limit_units'],
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
                    'UPDATE deliveries__' . $lang . ' SET title = ?, description = ? WHERE id = ?',
                    'ssi',
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
            $response[] = $utils -> proceed_update_row('UPDATE deliveries SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE deliveries SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}