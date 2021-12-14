<?php

use Gumlet\ImageResize;

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

    public function getBrowser() {
        $u_agent = $_SERVER['HTTP_USER_AGENT'];
        $bname = 'Unknown';
        $platform = 'Unknown';
        $version= "";

        //First get the platform?
        if (preg_match('/linux/i', $u_agent)) {
            $platform = 'linux';
        }elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
            $platform = 'mac';
        }elseif (preg_match('/windows|win32/i', $u_agent)) {
            $platform = 'windows';
        }

        // Next get the name of the useragent yes seperately and for good reason
        if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)){
            $bname = 'Internet Explorer';
            $ub = "MSIE";
        }elseif(preg_match('/Firefox/i',$u_agent)){
            $bname = 'Mozilla Firefox';
            $ub = "Firefox";
        }elseif(preg_match('/OPR/i',$u_agent)){
            $bname = 'Opera';
            $ub = "Opera";
        }elseif(preg_match('/Chrome/i',$u_agent) && !preg_match('/Edge/i',$u_agent)){
            $bname = 'Google Chrome';
            $ub = "Chrome";
        }elseif(preg_match('/Safari/i',$u_agent) && !preg_match('/Edge/i',$u_agent)){
            $bname = 'Apple Safari';
            $ub = "Safari";
        }elseif(preg_match('/Netscape/i',$u_agent)){
            $bname = 'Netscape';
            $ub = "Netscape";
        }elseif(preg_match('/Edge/i',$u_agent)){
            $bname = 'Edge';
            $ub = "Edge";
        }elseif(preg_match('/Trident/i',$u_agent)){
            $bname = 'Internet Explorer';
            $ub = "MSIE";
        }

        // finally get the correct version number
        $known = array('Version', $ub, 'other');
        $pattern = '#(?<browser>' . join('|', $known) .
            ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
        if (!preg_match_all($pattern, $u_agent, $matches)) {
            // we have no matching number just continue
        }
        // see how many we have
        $i = count($matches['browser']);
        if ($i != 1) {
            //we will have two since we are not using 'other' argument yet
            //see if version is before or after the name
            if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
                $version= $matches['version'][0];
            }else {
                $version= $matches['version'][1];
            }
        }else {
            $version= $matches['version'][0];
        }

        // check if we have a number
        if ($version==null || $version=="") {$version="?";}

        return array(
            'userAgent' => $u_agent,
            'name'      => $bname,
            'version'   => $version,
            'platform'  => $platform,
            'pattern'    => $pattern
        );
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

    public function put_file($fileName, $fileData, $filePath) {
        $file = $filePath . $fileName;

        if (!file_exists($filePath)) mkdir($filePath, 0777, true);

        return file_put_contents($file, $fileData);
    }

    public function put_custom_image($width, $height, $key, $imageData, $pathPrefix, $fileName, $quality, $crop = false) {
        $image = ImageResize::createFromString($imageData);

        if ($crop) {
            $image -> crop($width, $height, true, ImageResize::CROPCENTER);
        } else {
            $image -> resizeToBestFit($width, $height);
        }

        $image -> quality_jpg = $quality;
        $file_path = $pathPrefix . $key . '/';
        $response[$key] = self::put_file($fileName, $image, $file_path);

        return $response;
    }

    public function upload_file($file_object, $cropped_file_object, $name, $ext, $type) {
        $response = null;

        $file_path = null;
        $file_parts = explode(";base64,", $file_object);
        $file_base64 = base64_decode($file_parts[1]);

        if ($type !== 'unknown') $file_path = PATH_UPLOADS . $type . '/';

        if ($file_path) {

            // Save original file
            $response['original'] = self::put_file($name . '.' . $ext, $file_base64, $file_path);

            if ($type == 'image') {

                // Save cropped image
                if ($cropped_file_object) {
                    $file_cropped_parts = explode(";base64,", $cropped_file_object);
                    $file_cropped_base64 = base64_decode($file_cropped_parts[1]);
                    $response['cropped'] = self::put_file($name . '.' . $ext, $file_cropped_base64, $file_path . 'cropped/');
                }

                // Save by defined sizes and options
                foreach (UPLOADS_IMAGE_FORMATS as $v) {
                    $response[$v['key']] = self::put_custom_image(
                        $v['width'],
                        $v['height'],
                        $v['key'],
                        $file_base64,
                        $file_path,
                        $name . '.' . $ext,
                        $v['quality'],
                        $v['crop']
                    );
                }

            }

        }

        return $response;
    }

}