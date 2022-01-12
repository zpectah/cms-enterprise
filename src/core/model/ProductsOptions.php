<?php

namespace model;

class ProductsOptions {

    private function getUpdatedRow ($row) {
        $row['active'] = $row['active'] == 1; // Set value as boolean
        unset($row['deleted']); // Unset deleted attribute

        return $row;
    }

    public function get ($conn, $data, $params, $languages): array {
        $response = [];

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

        // request params
        $rp_ids = $data['ids'];
        if ($params['ids']) $rp_ids = explode(",", $params['ids']);
        $rp_ids_parsed = [];
        if ($rp_ids) {
            foreach ($rp_ids as $tem) {
                $v = preg_split("/:/", $tem);
                $rp_ids_parsed[] = [
                    'id' => $v[0],
                    'value' => $v[1],
                ];
            }
        }
        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($rp_ids) {
                    if (in_array($row['id'], $rp_ids)) {
                        foreach ($rp_ids_parsed as $item) {
                            if ($row['id'] == $item['id']) {
                                $_row = self::getUpdatedRow($row);
                                $_row['value'] = substr($item['value'], 1, -1);
                                $response[] = $_row;
                            }
                        }
                    }
                } else {
                    $response[] = self::getUpdatedRow($row);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data, $languages) {
        $response = [];

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