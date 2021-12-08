<?php

namespace model;

class Menu {

    public function get ($conn, $data, $params, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM menu WHERE deleted = ?');
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
                        'SELECT * FROM menu__' . $lang . ' WHERE id = ?'
                    );
                } // Set language object
                //
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
        $query = ('INSERT INTO menu (type, name, active, deleted) VALUES (?,?,?,?)');
        $types = 'ssii';
        $args = [
            $data['type'],
            $data['name'],
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
                    'INSERT INTO menu__' . $lang . ' (id, label) VALUES (?,?)',
                    'is',
                    [
                        $response['id'],
                        $data['lang'][$lang]['label']
                    ]
                );
            }
            $stmt -> close();
        }

        return $response; // last created ID
    }

    public function update ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('UPDATE menu SET type = ?, name = ?, active = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['type'],
            $data['name'],
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
                    'UPDATE menu__' . $lang . ' SET label = ? WHERE id = ?',
                    'si',
                    [
                        $data['lang'][$lang]['label'],
                        $data['lang'][$lang]['id']
                    ]
                );
            }
            $stmt -> close();
        }

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE menu SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE menu SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}