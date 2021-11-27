<?php

namespace model;

class Users {

    public function get ($conn, $data) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM users WHERE deleted = ?');
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
                if (!$data['withPassword']) unset($row['password']);

                $row['active'] = $row['active'] == 1;

                unset($row['deleted']);

                $response[] = $row;
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        return $response; // last created ID
    }

    public function update ($conn, $data) {
        $response = [];

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data) {
        $response = [];

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];

        return $response; // list of affected ids
    }

}