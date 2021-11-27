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

        // request params
        $rp_id = $data['id'];
        $rp_email = $data['email'];
        $rp_withPassword = $data['withPassword'];

        if ($result -> num_rows > 0) {
            // iterate by params
            if ($rp_id) {
                while($row = $result -> fetch_assoc()) {
                    if ($rp_id == $row['id']) {
                        if (!$rp_withPassword) unset($row['password']);

                        $row['active'] = $row['active'] == 1;

                        unset($row['deleted']);

                        $response = $row;
                    }
                }
            } else if ($rp_email) {
                while($row = $result -> fetch_assoc()) {
                    if ($rp_email == $row['email']) {
                        if (!$rp_withPassword) unset($row['password']);

                        $row['active'] = $row['active'] == 1;

                        unset($row['deleted']);

                        $response = $row;
                    }
                }
            } else {
                while($row = $result -> fetch_assoc()) {
                    if (!$rp_withPassword) unset($row['password']);

                    $row['active'] = $row['active'] == 1;

                    unset($row['deleted']);

                    $response[] = $row;
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO users (email, type, password, nick_name, first_name, middle_name, last_name, user_level, user_group, img_avatar, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'sssssssissii';
        $args = [
            $data['email'],
            $data['type'],
            password_hash($data['password'], PASS_CRYPT, PASS_CRYPT_OPTIONS),
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['user_level'],
            $data['user_group'],
            $data['img_avatar'],
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

    public function update ($conn, $data) {
        $response = [];

        // prepare
        $password = $data['password'];
        $query = $password ? ('UPDATE users SET email = ?, type = ?, password = ?, nick_name = ?, first_name = ?, middle_name = ?, last_name = ?, user_level = ?, user_group = ?, img_avatar = ?, active = ? WHERE id = ?')
            : ('UPDATE users SET email = ?, type = ?, nick_name = ?, first_name = ?, middle_name = ?, last_name = ?, user_level = ?, user_group = ?, img_avatar = ?, active = ? WHERE id = ?');
        $types = $password ? 'sssssssissii' : 'ssssssissii';
        $args = $password ? [
            $data['email'],
            $data['type'],
            password_hash($data['password'], PASS_CRYPT, PASS_CRYPT_OPTIONS),
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['user_level'],
            $data['user_group'],
            $data['img_avatar'],
            $data['active'],
            $data['id']
        ] : [
            $data['email'],
            $data['type'],
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['user_level'],
            $data['user_group'],
            $data['img_avatar'],
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
            $response[] = $utils -> proceed_update_row('UPDATE users SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE users SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}