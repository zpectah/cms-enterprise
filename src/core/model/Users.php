<?php

namespace model;

class Users {

    public function get ($conn, $data) {
        $response = [
            [
                'id' => 1,
				'type' => 'default',
				'email' => 'user1@email.test',
				'password' => 'password',
				'nick_name' => 'user1',
				'first_name' => 'User 1',
				'middle_name' => '',
				'last_name' => '',
				'user_level' => 3,
				'user_group' => 'default',
				'img_avatar' => '',
				'active' => true,
            ],
            [
                'id' => 2,
                'type' => 'default',
                'email' => 'user2@email.test',
                'password' => 'password',
                'nick_name' => 'user2',
                'first_name' => 'User 2',
                'middle_name' => '',
                'last_name' => '',
                'user_level' => 2,
                'user_group' => 'default',
                'img_avatar' => '',
                'active' => false,
            ],
            [
                'id' => 3,
                'type' => 'default',
                'email' => 'user3@email.test',
                'password' => 'password',
                'nick_name' => 'user3',
                'first_name' => 'User 3',
                'middle_name' => '',
                'last_name' => '',
                'user_level' => 5,
                'user_group' => 'default',
                'img_avatar' => '',
                'active' => true,
            ],
            [
                'id' => 4,
                'type' => 'default',
                'email' => 'user4@email.test',
                'password' => 'password',
                'nick_name' => 'user4',
                'first_name' => 'User 4',
                'middle_name' => '',
                'last_name' => '',
                'user_level' => 3,
                'user_group' => 'default',
                'img_avatar' => '',
                'active' => true,
            ],
            [
                'id' => 5,
                'type' => 'default',
                'email' => 'user5@email.test',
                'password' => 'password',
                'nick_name' => 'user5',
                'first_name' => 'User 5',
                'middle_name' => '',
                'last_name' => '',
                'user_level' => 7,
                'user_group' => 'default',
                'img_avatar' => '',
                'active' => true,
            ]
        ];

        return $response;
    }

    public function create ($conn, $data) {
        $response = [];

        return $response; // last created ID
    }

    public function update ($conn, $data) {
        $response = [];

        return $response; // list of affected ids
    }

    public function toggle ($conn, $data) {
        $response = [];

        return $response; // list of affected ids
    }

    public function delete ($conn, $data) {
        $response = [];

        return $response; // list of affected ids
    }

}