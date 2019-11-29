<?php

class likeDto {
    public $id;
    public $userId;
    public $postId;

    public function __construct($row) {
        $this->id = $row['id'];
        $this->userId = $row['userId'];
        $this->postId = $row['postId'];
    }
}