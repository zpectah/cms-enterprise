<?php

namespace model;

class Posts {

    public function get ($conn, $data, $languages) {
        $response = [];
        $utils = new \Utils;

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM posts WHERE deleted = ?');
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
                        'SELECT * FROM posts__' . $lang . ' WHERE id = ?'
                    );
                }

                $row['tags'] = explode(",", $row['tags']);
                $row['categories'] = explode(",", $row['categories']);
                $row['approved'] = $row['approved'] == 1;
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
        $query = ('INSERT INTO posts (
                   name, 
                   type, 
                   categories, 
                   tags, 
                   event_start, 
                   event_end, 
                   event_location, 
                   event_address, 
                   event_country, 
                   event_city, 
                   event_zip, 
                   media, 
                   attachments, 
                   img_main, 
                   img_thumbnail, 
                   published, 
                   author, 
                   approved, 
                   rating, 
                   active, 
                   deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'ssssssssssssssssiiiii';
        $args = [
            $data['name'],
            $data['type'],
            // $data['categories'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            // $data['tags'],
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['event_start'],
            $data['event_end'],
            $data['event_location'],
            $data['event_address'],
            $data['event_country'],
            $data['event_city'],
            $data['event_zip'],
            $data['media'],
            $data['attachments'],
            $data['img_main'],
            $data['img_thumbnail'],
            $data['published'],
            $data['author'],
            $data['approved'],
            $data['rating'],
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
                    'INSERT INTO posts__' . $lang . ' (id, title, description, content) VALUES (?,?,?,?)',
                    'isss',
                    [
                        $response['id'],
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
                        $data['lang'][$lang]['content'],
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
        $query = ('UPDATE posts SET name = ?, type = ?, categories = ?, tags = ?, event_start = ?, event_end = ?, event_location = ?, event_address = ?, event_country = ?, event_city = ?, event_zip = ?, media = ?, attachments = ?, img_main = ?, img_thumbnail = ?, published = ?, author = ?, approved = ?, rating = ?, active = ? WHERE id = ?');
        $types = 'ssssssssssssssssiiiii';
        $args = [
            $data['name'],
            $data['type'],
            // $data['categories'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            // $data['tags'],
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['event_start'],
            $data['event_end'],
            $data['event_location'],
            $data['event_address'],
            $data['event_country'],
            $data['event_city'],
            $data['event_zip'],
            $data['media'],
            $data['attachments'],
            $data['img_main'],
            $data['img_thumbnail'],
            $data['published'],
            $data['author'],
            $data['approved'],
            $data['rating'],
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
                    'UPDATE posts__' . $lang . ' SET title = ?, description = ?, content = ? WHERE id = ?',
                    'sssi',
                    [
                        $data['lang'][$lang]['title'],
                        $data['lang'][$lang]['description'],
                        $data['lang'][$lang]['content'],
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
            $response[] = $utils -> proceed_update_row('UPDATE posts SET active = IF(active=1, 0, 1) WHERE id = ?', $conn, $id);
        }

        return $response;
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE posts SET deleted = 1 WHERE id = ?', $conn, $id);
        }

        return $response;
    }

}