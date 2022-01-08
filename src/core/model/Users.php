<?php

namespace model;

class Users {

    private function getUpdatedRow ($row, $rp_withPassword) {
        if (!$rp_withPassword) unset($row['password']); // Unset password attribute
        unset($row['deleted']); // Unset deleted attribute
        $row['active'] = $row['active'] == 1; // Set value as boolean

        return $row;
    }

    public function get ($conn, $data, $params) {
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
        if ($params['id']) $rp_id = $params['id'];
        $rp_email = $data['email'];
        if ($params['email']) $rp_email = $params['email'];
        $rp_withPassword = $data['withPassword'];
        if ($params['withPassword']) $rp_withPassword = $params['withPassword'];
        $rp_checkExist = $data['check_exist'];
        if ($params['check_exist']) $rp_checkExist = $params['check_exist'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                // iterate by params
                if ($rp_id) {
                    if ($rp_id == $row['id']) {
                        if ($rp_checkExist) {
                            $response['exist'] = true;
                        } else {
                            $response = self::getUpdatedRow($row, $rp_withPassword);
                        }
                    }
                } else if ($rp_email) {
                    if ($rp_email == $row['email']) {
                        if ($rp_checkExist) {
                            $response['exist'] = true;
                        } else {
                            $response = self::getUpdatedRow($row, $rp_withPassword);
                        }
                    }
                } else {
                    $response[] = self::getUpdatedRow($row, $rp_withPassword);
                }
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('INSERT INTO users (
                email, 
                type, 
                password, 
                nick_name, 
                first_name, 
                middle_name, 
                last_name, 
                user_level, 
                user_group, 
                img_avatar, 
                description, 
                active, 
                deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'sssssssisssii';
        $args = [
            $data['email'],
            $data['type'],
            $utils -> passwordHash($data['password']),
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['user_level'],
            $data['user_group'],
            $data['img_avatar'],
            $data['description'],
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
        $utils = new \Utils;

        // prepare
        $password = $data['password'];
        $query = $password ? ('UPDATE users SET 
                email = ?, 
                type = ?, 
                password = ?, 
                nick_name = ?, 
                first_name = ?, 
                middle_name = ?, 
                last_name = ?, 
                user_level = ?, 
                user_group = ?, 
                img_avatar = ?, 
                description = ?, 
                active = ? 
            WHERE id = ?')
            : ('UPDATE users SET 
                email = ?, 
                type = ?, 
                nick_name = ?, 
                first_name = ?, 
                middle_name = ?, 
                last_name = ?, 
                user_level = ?, 
                user_group = ?, 
                img_avatar = ?, 
                description = ?, 
                active = ? 
            WHERE id = ?');
        $types = $password ? 'sssssssisssii' : 'ssssssisssii';
        $args = $password ? [
            $data['email'],
            $data['type'],
            $utils -> passwordHash($data['password']),
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['user_level'],
            $data['user_group'],
            $data['img_avatar'],
            $data['description'],
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
            $data['description'],
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