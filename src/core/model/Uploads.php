<?php

namespace model;

class Uploads {

    public function get ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM uploads WHERE deleted = ?');
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
                        'SELECT * FROM uploads__' . $lang . ' WHERE id = ?'
                    );
                }

                $row['tags'] = explode(",", $row['tags']);
                $row['categories'] = explode(",", $row['categories']);
                $row['active'] = $row['active'] == 1;

                unset($row['deleted']);

                $response[] = $row;
            }
        }

        return $response;
    }

    public function create ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('INSERT INTO uploads (name, type, extension, file_name, file_mime, file_size, categories, tags, active, deleted) VALUES (?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssssssii';
        $args = [
            $data['name'],
            $data['type'],

            $data['extension'],
            $data['file_name'],
            $data['file_mime'],
            $data['file_size'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',

            $data['active'],
            0
        ];

        // upload result
        $uploadedFile = $utils -> upload_file($data['fileBase64'], $data['name'], $data['extension'], $data['type']);

        // execute
        if ($uploadedFile) {
            if ($conn -> connect_error) {
                $response = $conn -> connect_error;
            } else {
                $stmt = $conn -> prepare($query);
                $stmt -> bind_param($types, ...$args);
                $stmt -> execute();
                $response['id'] = $stmt -> insert_id;
                $response['uploads'] = $uploadedFile;
                foreach ($languages as $lang) {
                    $response['lang'][] = $utils -> update_language_row(
                        $conn,
                        $lang,
                        'INSERT INTO uploads__' . $lang . ' (id, label, description) VALUES (?,?,?)',
                        'is',
                        [
                            $response['id'],
                            $data['lang'][$lang]['label'],
                            $data['lang'][$lang]['description']
                        ]
                    );
                }
                $stmt -> close();
            }
        } else {
            $response['message'] = 'Error while uploading';
        }

        return $response;
    }

    public function update ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('UPDATE uploads SET categories = ?, tags = ?, active = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
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
                    'UPDATE uploads__' . $lang . ' SET label = ?, description = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['label'],
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
            $response[] = $utils -> proceed_update_row('UPDATE uploads SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE uploads SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}