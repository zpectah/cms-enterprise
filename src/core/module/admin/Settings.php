<?php

namespace module\admin;

class Settings {

    public function get_cms_settings ($conn): array {
        $sql = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM cms_settings');
        $result = $conn -> query($sql);
        $response = [];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                switch ($row['format']) {

                    case 'boolean':
                        $nv = $row['value'] == 'true';
                        break;

                    case 'array':
                        $nv = $row['value'] ? explode(",", $row['value']) : [];
                        break;

                    case 'json':
                    default:
                        $nv = $row['value'];
                        break;

                }

                $response[$row['name']] = $nv;
            }
        }

        return $response;
    }

    public function update_cms_settings ($conn, $fields) {
        $response = [];

        foreach ($fields as $key => $value) {
            // prepare
            $query = ('SELECT * FROM cms_settings WHERE name = ?');
            $types = 's';
            $args = [ $key ];

            // execute
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $result = $stmt -> get_result();
            $stmt -> close();

            while ($row = $result -> fetch_assoc() ) {
                switch ($row['format']) {

                    case 'array':
                        $new_value = $value ? implode(",", $value) : '';
                        break;

                    case 'boolean':
                        $new_value = $value ? 'true' : 'false';
                        break;

                    case 'json':
                    default:
                        $new_value = $value;
                        break;

                }

                // prepare
                $query2 = ('UPDATE cms_settings SET value = ? WHERE name = ?');
                $types2 = 'ss';
                $args2 = [ $new_value, $key ];

                // execute
                if ($conn -> connect_error) {
                    $response = $conn -> connect_error;
                } else {
                    $stmt2 = $conn -> prepare($query2);
                    $stmt2 -> bind_param($types2, ...$args2);
                    $stmt2 -> execute();
                    $response[ $key ] = $stmt2 -> affected_rows;
                    $stmt2 -> close();
                }

            }
        }

        return $response;
    }

    public function get_cms_settings_languages ($conn) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM cms_settings WHERE context = ?');
        $types = 's';
        $args = [ 'language' ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($row['name'] == 'language_default') $response['default'] = $row['value'];
                if ($row['name'] == 'language_installed') $response['installed'] = explode(",", $row['value']);
                if ($row['name'] == 'language_active') $response['active'] = explode(",", $row['value']);
            }
        }

        return $response;
    }

    public function get_cms_settings_modules ($conn) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM settings_cms WHERE context = ?');
        $types = 's';
        $args = [ 'module' ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $nv = $row['value'] == 'true';

                $response[$row['name']] = $nv;
            }
        }

        return $response;
    }

}