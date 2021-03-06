<?php

namespace model;

class Translations {

    private function getUpdatedRow ($conn, $row, $languages): array {
        $utils = new \Utils;
        foreach ($languages as $lang) {
            $row['lang'][$lang] = $utils -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM translations__' . $lang . ' WHERE id = ?'
            );
        } // Set language object

        $row['active'] = $row['active'] == 1; // Set value as boolean
        unset($row['deleted']); // Unset deleted attribute

        return $row;
    }

    public function get ($conn, $data, $params, $languages): array {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM translations WHERE deleted = ?');
        $types = 'i';
        $args = [ 0 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $rp_parsed = $params['parsed'] or $data['parsed'];
        $rp_lang = $params['lang'] or $data['lang'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($rp_parsed == 'true' and $rp_lang) {
                    $r = self::getUpdatedRow($conn, $row, $languages);
                    $response[$row['name']] = $r['lang'][$rp_lang]['value'];
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
        $query = ('INSERT INTO translations (name, type, active, deleted) VALUES (?,?,?,?)');
        $types = 'ssii';
        $args = [
            $data['name'],
            $data['type'],
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
                    'INSERT INTO translations__' . $lang . ' (id, value) VALUES (?,?)',
                    'is',
                    [
                        $response['id'],
                        $data['lang'][$lang]['value']
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
        $query = ('UPDATE translations SET name = ?, type = ?, active = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['name'],
            $data['type'],
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
                    'UPDATE translations__' . $lang . ' SET value = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['value'],
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
            $response[] = $utils -> proceed_update_row('UPDATE translations SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE translations SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}