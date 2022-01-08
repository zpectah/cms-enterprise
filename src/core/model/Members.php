<?php

namespace model;

class Members {

    private function getUpdatedRow ($row, $rp_withPassword) {
        if (!$rp_withPassword) unset($row['password']); // Unset password attribute
        unset($row['deleted']); // Unset deleted attribute
        $row['active'] = $row['active'] == 1; // Set value as boolean
        $row['subscription'] = $row['subscription'] == 1; // Set value as boolean
        $row['phone_alt'] = $row['phone_alt'] == '' ? [] : explode(",", $row['phone_alt']); // Set value as array
        $row['email_alt'] = $row['email_alt'] == '' ? [] : explode(",", $row['email_alt']); // Set value as array

        return $row;
    }

    public function get ($conn, $data, $params) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM members WHERE deleted = ?');
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

    public function create ($conn, $data, $attrs) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('INSERT INTO members (
                email, 
                type, 
                password, 
                phone,
                nick_name, 
                first_name, 
                middle_name, 
                last_name, 
                position,
                country,
                city,
                address,
                zip,
                phone_alt,
                email_alt,
                description,
                subscription,
                active, 
                deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssssssssssssssiii';
        $args = [
            $data['email'],
            $data['type'],
            $utils -> passwordHash($data['password']),
            $data['phone'],
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['position'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['phone_alt'] ? implode(",", $data['phone_alt']) : '',
            $data['email_alt'] ? implode(",", $data['email_alt']) : '',
            $data['description'],
            $data['subscription'],
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

    public function update ($conn, $data, $attrs) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $password = $data['password'];
        $query = $password ? ('UPDATE members SET 
                email = ?, 
                type = ?, 
                password = ?, 
                phone = ?,                    
                nick_name = ?, 
                first_name = ?, 
                middle_name = ?, 
                last_name = ?, 
                position = ?,
                country = ?, 
                city = ?, 
                address = ?, 
                zip = ?, 
                phone_alt = ?, 
                email_alt = ?,                   
                description = ?, 
                subscription = ?,
                active = ? 
            WHERE id = ?')
            : ('UPDATE members SET 
                email = ?, 
                type = ?, 
                phone = ?,                  
                nick_name = ?, 
                first_name = ?, 
                middle_name = ?, 
                last_name = ?, 
                position = ?, 
                country = ?, 
                city = ?, 
                address = ?, 
                zip = ?, 
                phone_alt = ?, 
                email_alt = ?,  
                description = ?, 
                subscription = ?,
                active = ? 
            WHERE id = ?');
        $types = $password ? 'ssssssssssssssssiii' : 'sssssssssssssssiii';
        $args = $password ? [
            $data['email'],
            $data['type'],
            $utils -> passwordHash($data['password']),
            $data['phone'],
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['position'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['phone_alt'] ? implode(",", $data['phone_alt']) : '',
            $data['email_alt'] ? implode(",", $data['email_alt']) : '',
            $data['description'],
            $data['subscription'],
            $data['active'],
            $data['id']
        ] : [
            $data['email'],
            $data['type'],
            $data['phone'],
            $data['nick_name'],
            $data['first_name'],
            $data['middle_name'],
            $data['last_name'],
            $data['position'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['phone_alt'] ? implode(",", $data['phone_alt']) : '',
            $data['email_alt'] ? implode(",", $data['email_alt']) : '',
            $data['description'],
            $data['subscription'],
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
            $response[] = $utils -> proceed_update_row('UPDATE members SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE members SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}