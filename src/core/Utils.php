<?php

class Utils {

    public function createFolder ($directory, $permissions = 0777): void {
        if (!file_exists($directory)) {
            $mask = umask(0);
            mkdir($directory, $permissions, true);
            umask($mask);
        }
    }

    public function getRandomString ($length = 10, $type = 'all'): string {
        $chars_nums = '0123456789';
        $chars_lower = 'abcdefghijklmnopqrstuvwxyz';
        $chars_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        switch ($type) {

            case 'nums':
                $chars = $chars_nums;
                break;

            case 'lower':
                $chars = $chars_lower;
                break;

            case 'upper':
                $chars = $chars_upper;
                break;

            case 'all':
            default:
                $chars = $chars_nums . $chars_lower . $chars_upper;
                break;

        }

        $charactersLength = strlen($chars);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $chars[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function getToken ($length = 4, $separator = '-'): string {
        return self::getRandomString(($length/2), 'lower') . $separator . self::getRandomString($length, 'nums') . $separator . self::getRandomString(($length*2));
    }

    public function getClientIpAddress(): string {
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else{
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }

    public function proceed_update_row ($query, $conn, $id): int {
        // prepare
        $types = 'i';
        $args = [ $id ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $r = $stmt -> affected_rows;
        $stmt -> close();

        return $r;
    }

    public function passwordHash ($password): string {
        return password_hash($password, PASS_CRYPT, PASS_CRYPT_OPTIONS);
    }

    public function passwordVerify ($password, $passwordHash): bool {
        return password_verify($password, $passwordHash);
    }

    public function get_language_row ($conn, $id, $query) {
        $response = null;

        // prepare
        $types = 'i';
        $args = [ $id ];

        // execute
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param($types, ...$args);
        $stmt -> execute();
        $result = $stmt -> get_result();
        $stmt -> close();
        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $response = $row;
            }
        }

        return $response;
    }

    public function update_language_row ($conn, $lang, $query, $types, $args) {
        $response = null;

        // execute
        if ($conn -> connect_error) {
            $response = $conn -> connect_error;
        } else {
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param($types, ...$args);
            $stmt -> execute();
            $response = $lang;
            $stmt -> close();
        }

        return $response;
    }

}