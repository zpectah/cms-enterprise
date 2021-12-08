<?php

namespace model;

class Stores {

    public function get ($conn, $data, $params, $languages): array {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM stores WHERE deleted = ?');
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
                        'SELECT * FROM stores__' . $lang . ' WHERE id = ?'
                    );
                } // Set language object

                $row['phone'] = $row['phone'] == '' ? [] : explode(",", $row['phone']); // Set value as array
                $row['email'] = $row['email'] == '' ? [] : explode(",", $row['email']); // Set value as array
                $row['attachments'] = $row['attachments'] == '' ? [] : explode(",", $row['attachments']); // Set value as array//
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
        $query = ('INSERT INTO stores (name, type, country, city, address, zip, location, phone, email, attachments, img_main, img_thumbnail, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssssssssssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['location'],
            $data['phone'] ? implode(",", $data['phone']) : '',
            $data['email'] ? implode(",", $data['email']) : '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
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
            foreach ($languages as $lang) {
                $response['lang'][] = $utils -> update_language_row(
                    $conn,
                    $lang,
                    'INSERT INTO stores__' . $lang . ' (id, title, description) VALUES (?,?,?)',
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
        $query = ('UPDATE stores SET name = ?, type = ?, country = ?, city = ?, address = ?, zip = ?, location = ?, phone = ?, email = ?, attachments = ?, img_main = ?, img_thumbnail = ?, active = ? WHERE id = ?');
        $types = 'ssssssssssssii';
        $args = [
            $data['name'],
            $data['type'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['location'],
            $data['phone'] ? implode(",", $data['phone']) : '',
            $data['email'] ? implode(",", $data['email']) : '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
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
            foreach ($languages as $lang) {
                $response['lang'][] = $utils -> update_language_row(
                    $conn,
                    $lang,
                    'UPDATE stores__' . $lang . ' SET title = ?, description = ? WHERE id = ?',
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
            $response[] = $utils -> proceed_update_row('UPDATE stores SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE stores SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}