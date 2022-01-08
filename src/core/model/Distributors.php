<?php

namespace model;

class Distributors {

    private function getUpdatedRow ($row) {
        $row['active'] = $row['active'] == 1; // Set value as boolean
        unset($row['deleted']); // Unset deleted attribute

        return $row;
    }

    public function get ($conn, $data, $params) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM distributors WHERE deleted = ?');
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
                    if (in_array($row['id'], $rp_ids)) $response[] = self::getUpdatedRow($row);
                } else {
                    $response[] = self::getUpdatedRow($row);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO distributors (type, name, img_thumbnail, active, deleted) VALUES (?,?,?,?,?)');
        $types = 'sssii';
        $args = [
            $data['type'],
            $data['name'],
            $data['img_thumbnail'],
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

        return $response; // last created ID
    }

    public function update ($conn, $data) {
        $response = [];

        // prepare
        $query = ('UPDATE distributors SET type = ?, name = ?, img_thumbnail = ?, active = ? WHERE id = ?');
        $types = 'sssii';
        $args = [
            $data['type'],
            $data['name'],
            $data['img_thumbnail'],
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

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE distributors SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE distributors SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}