<?php

namespace model;

class Comments {

    private function getItemsChildren ($parentId, $items): array {
        $children = [];
        foreach ($items as $item) {
            if ($parentId == $item['parent']) {
                $item['children'] = self::getItemsChildren($item['id'], $items);
                $children[] = $item;
            }
        }

        return $children;
    }

    public function get ($conn, $data, $params): array {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM comments WHERE status < ?');
        $types = 'i';
        $args = [ 3 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        // request params
        $rp_assigned = $data['assigned'];
        if ($params['assigned']) $rp_assigned = $params['assigned'];
        $rp_assigned_id = $data['assigned_id'];
        if ($params['assigned_id']) $rp_assigned_id = $params['assigned_id'];
        $rp_with_children = $data['with_children'];
        if ($params['with_children']) $rp_with_children = $params['with_children'];

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                // iterate by params
                if ($rp_assigned && $rp_assigned_id) {
                    if ($rp_assigned == $row['assigned'] && $rp_assigned_id == $row['assigned_id']) {
                        $response[] = $row;
                    }
                } else {
                    $response[] = $row;
                }
            }
        }

        if ($rp_with_children) {
            $response_new = [];
            foreach ($response as $item) {
                if ($item['parent'] == 0) {
                    $item['children'] = self::getItemsChildren($item['id'], $response);
                    $response_new[] = $item;
                }
            }
            $response = $response_new;
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO comments (email, title, content, assigned, assigned_id, parent, status) VALUES (?,?,?,?,?,?,?)');
        $types = 'ssssiii';
        $args = [
            $data['email'],
            $data['title'],
            $data['content'],
            $data['assigned'],
            $data['assigned_id'],
            $data['parent'],
            1
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

        return $response; // last created ID
    }

    public function update ($conn, $data) {
        $response = [];

        // prepare
        $query = ('UPDATE comments SET title = ?, content = ?, status = ? WHERE id = ?');
        $types = 'ssii';
        $args = [
            $data['title'],
            $data['content'],
            $data['status'],
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

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE comments SET status = IF(status=1, 2, 1) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function confirm ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE comments SET status = 2 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function cancel ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE comments SET status = 0 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE comments SET status = 3 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}