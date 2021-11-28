<?php

namespace model;

class CmsRequests {

    public function get ($conn, $data) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM cms_requests');
        $types = '';
        $args = [];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // params
        $rp_id = $data['id'];
        $rp_token = $data['token'];

        if ($result -> num_rows > 0) {
            // iterate by params
            if ($rp_id) {
                while($row = $result -> fetch_assoc()) {
                    if ($rp_id == $row['id']) $response = $row;
                }
            } else if ($rp_token) {
                while($row = $result -> fetch_assoc()) {
                    if ($rp_token == $row['token']) $response = $row;
                }
            } else {
                while($row = $result -> fetch_assoc()) {
                    $response[] = $row;
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO cms_requests (type, context, value, token, status) VALUES (?,?,?,?,?)');
        $types = 'ssssi';
        $args = [
            $data['type'],
            $data['context'],
            $data['value'],
            $data['token'],
            1
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
        $query = ('UPDATE cms_requests SET status = ? WHERE token = ?');
        $types = 'is';
        $args = [
            $data['status'],
            $data['token']
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

        foreach ($data as $token) {
            $response[] = $utils -> proceed_update_row('UPDATE cms_requests SET status = IF(status=1, 2, 1) WHERE id = ?', $conn, $token);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $token) {
            $response[] = $utils -> proceed_update_row('UPDATE cms_requests SET status = 3 WHERE token = ?', $conn, $token);
        }

        return $response; // list of affected ids
    }

}