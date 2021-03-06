<?php

namespace service;

class AuthService {

    public function get_user_session () {
        session_start();

        return $_SESSION[SESSION_USER_NAME_PREFIX];
    }
    public function get_user_token () {
        session_start();

        return $_SESSION[SESSION_USER_TOKEN_PREFIX];
    }
    public function start_user_session ($email): array {
        session_start();

        return [
            $_SESSION[SESSION_USER_TOKEN_PREFIX] = bin2hex(random_bytes(16)),
            $_SESSION[SESSION_USER_NAME_PREFIX] = $email,
        ];
    }
    public function close_user_session (): array {
        session_start();
        unset($_SESSION[SESSION_USER_TOKEN_PREFIX]);
        unset($_SESSION[SESSION_USER_NAME_PREFIX]);

        return [
            $_SESSION[SESSION_USER_TOKEN_PREFIX],
            $_SESSION[SESSION_USER_NAME_PREFIX],
        ];
    }

    public function get_member_session () {
        session_start();

        return $_SESSION[SESSION_MEMBER_NAME_PREFIX];
    }
    public function get_member_token () {
        session_start();

        return $_SESSION[SESSION_MEMBER_TOKEN_PREFIX];
    }
    public function start_member_session ($email): array {
        session_start();

        return [
            $_SESSION[SESSION_MEMBER_TOKEN_PREFIX] = bin2hex(random_bytes(16)),
            $_SESSION[SESSION_MEMBER_NAME_PREFIX] = $email,
        ];
    }
    public function close_member_session (): array {
        session_start();
        unset($_SESSION[SESSION_MEMBER_TOKEN_PREFIX]);
        unset($_SESSION[SESSION_MEMBER_NAME_PREFIX]);

        return [
            $_SESSION[SESSION_MEMBER_TOKEN_PREFIX],
            $_SESSION[SESSION_MEMBER_NAME_PREFIX],
        ];
    }

}