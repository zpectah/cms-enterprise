<?php

namespace model;

class Orders {

    public function get ($conn, $data, $params) {
        $response = [];

        // prepare
        $query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM orders WHERE status < ?');
        $types = 'i';
        $args = [ 3 ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();

        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $row['items'] = $row['items'] == '' ? [] : explode(",", $row['items']); // Set value as array

                $response[] = $row;
            }
        }

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        // prepare
        $query = ('INSERT INTO orders (
                    type, 
                    name, 
                    email,
                    phone,
                    customer_name,
                    country,
                    city,
                    address,
                    zip,
                    delivery,
                    payment,
                    description,
                    company_name,
                    company_id,
                    delivery_country,
                    delivery_city,
                    delivery_address,
                    delivery_zip,
                    items,
                    price_total,
                    status
                    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        $types = 'sssssssssssssssssssdi';
        $args = [
            $data['type'],
            $data['name'],
            $data['email'],
            $data['phone'],
            $data['customer_name'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['delivery'],
            $data['payment'],
            $data['description'],
            $data['company_name'],
            $data['company_id'],
            $data['delivery_country'],
            $data['delivery_city'],
            $data['delivery_address'],
            $data['delivery_zip'],
            $data['items'] ? implode(",", $data['items']) : '',
            $data['price_total'],
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
        $query = ('UPDATE orders SET 
                    type = ?, 
                    name = ?, 
                    email = ?, 
                    phone = ?, 
                    customer_name = ?, 
                    country = ?, 
                    city = ?, 
                    address = ?, 
                    zip = ?, 
                    delivery = ?, 
                    payment = ?, 
                    description = ?, 
                    company_name = ?, 
                    company_id = ?, 
                    delivery_country = ?, 
                    delivery_city = ?, 
                    delivery_address = ?, 
                    delivery_zip = ?, 
                    items = ?, 
                    price_total = ?, 
                    status = ?
                WHERE id = ?');
        $types = 'sssssssssssssssssssdii';
        $args = [
            $data['type'],
            $data['name'],
            $data['email'],
            $data['phone'],
            $data['customer_name'],
            $data['country'],
            $data['city'],
            $data['address'],
            $data['zip'],
            $data['delivery'],
            $data['payment'],
            $data['description'],
            $data['company_name'],
            $data['company_id'],
            $data['delivery_country'],
            $data['delivery_city'],
            $data['delivery_address'],
            $data['delivery_zip'],
            $data['items'] ? implode(",", $data['items']) : '',
            $data['price_total'],
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
            $response[] = $utils -> proceed_update_row('UPDATE orders SET status = IF(status=2, 1, 2) WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function confirm ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE orders SET status = 2 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function cancel ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE orders SET status = 0 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];
        $utils = new \Utils;

        foreach ($data as $id) {
            $response[] = $utils -> proceed_update_row('UPDATE orders SET status = 3 WHERE id = ?', $conn, $id);
        }

        return $response; // list of affected ids
    }

}