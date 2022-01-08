<?php

namespace model;

class Posts {

    private function getUpdatedRow ($conn, $row, $languages) {
        $utils = new \Utils;

        foreach ($languages as $lang) {
            $row['lang'][$lang] = $utils -> get_language_row(
                $conn,
                $row['id'],
                'SELECT * FROM posts__' . $lang . ' WHERE id = ?'
            );
        } // Set language object

        $row['media'] = $row['media'] == '' ? [] : explode(",", $row['media']); // Set value as array
        $row['attachments'] = $row['attachments'] == '' ? [] : explode(",", $row['attachments']); // Set value as array
        $row['tags'] = $row['tags'] == '' ? [] : explode(",", $row['tags']); // Set value as array
        $row['categories'] = $row['categories'] == '' ? [] : explode(",", $row['categories']); // Set value as array
        $row['links'] = $row['links'] == '' ? [] : explode(",", $row['links']); // Set value as array
        $row['template'] = $row['template'] == 1; // Set value as boolean
        $row['approved'] = $row['approved'] == 1; // Set value as boolean
        $row['active'] = $row['active'] == 1; // Set value as boolean
        unset($row['deleted']); // Unset deleted attribute

        return $row;
    }

    private function getRowSubData ($conn, $row, $languages) {
        $row['sub_media'] = [];
        $row['sub_attachments'] = [];
        $row['sub_tags'] = [];
        $row['sub_categories'] = [];
        $row['sub_links'] = [];
        $row['sub_author'] = [];

        if ($row['media']) {
            $uploads = new Uploads;
            $row['sub_media'] = $uploads -> get($conn, [ 'ids' => $row['media'] ], [], $languages);
        }
        if ($row['attachments']) {
            $uploads = new Uploads;
            $row['sub_attachments'] = $uploads -> get($conn, [ 'ids' => $row['attachments'] ], [], $languages);
        }
        if ($row['tags']) {
            $tags = new Tags;
            $row['sub_tags'] = $tags -> get($conn, [ 'ids' => $row['tags'] ], []);
        }
        if ($row['categories']) {
            $categories = new Categories;
            $row['sub_categories'] = $categories -> get($conn, [ 'ids' => $row['categories'] ], [], $languages);
        }
        if ($row['links']) {
            $row['sub_links'] = $row['links']; // TODO
        }
        if ($row['author']) {
            $users = new Users;
            $row['sub_author'] = $users -> get($conn, [ 'id' => $row['author'] ], []);
        }

        return $row;
    }

    public function get ($conn, $data, $params, $languages) {
        $response = [];

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

        // request params
        $rp_sub = $data['sub'];
        if ($params['sub']) $rp_sub = $params['sub'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                if ($rp_sub) {
                    $response[] = self::getRowSubData($conn, self::getUpdatedRow($conn, $row, $languages), $languages);
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
                   links,
                   author, 
                   approved, 
                   rating,
                   template,
                   active, 
                   deleted
                   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'sssssssssssssssssiiiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['event_start'],
            $data['event_end'],
            $data['event_location'],
            $data['event_address'],
            $data['event_country'],
            $data['event_city'],
            $data['event_zip'],
            $data['media'] ? implode(",", $data['media']) : '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
            $data['img_thumbnail'],
            $data['published'],
            $data['links'] ? implode(",", $data['links']) : '',
            $data['author'],
            $data['approved'],
            $data['rating'],
            $data['template'],
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
        $query = ('UPDATE posts SET 
                     name = ?, 
                     type = ?, 
                     categories = ?, 
                     tags = ?, 
                     event_start = ?, 
                     event_end = ?, 
                     event_location = ?, 
                     event_address = ?, 
                     event_country = ?, 
                     event_city = ?, 
                     event_zip = ?, 
                     media = ?, 
                     attachments = ?, 
                     img_main = ?, 
                     img_thumbnail = ?, 
                     published = ?, 
                     links = ?, 
                     author = ?, 
                     approved = ?, 
                     rating = ?, 
                     template = ?, 
                     active = ? 
                WHERE id = ?');
        $types = 'sssssssssssssssssiiiiii';
        $args = [
            $data['name'],
            $data['type'],
            $data['categories'] ? implode(",", $data['categories']) : '',
            $data['tags'] ? implode(",", $data['tags']) : '',
            $data['event_start'],
            $data['event_end'],
            $data['event_location'],
            $data['event_address'],
            $data['event_country'],
            $data['event_city'],
            $data['event_zip'],
            $data['media'] ? implode(",", $data['media']) : '',
            $data['attachments'] ? implode(",", $data['attachments']) : '',
            $data['img_main'],
            $data['img_thumbnail'],
            $data['published'],
            $data['links'] ? implode(",", $data['links']) : '',
            $data['author'],
            $data['approved'],
            $data['rating'],
            $data['template'],
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