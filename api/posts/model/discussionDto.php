<?php

class DiscussionDto {
    public $id;
    public $name;
    public $postCount;

    public function __construct($row) {
        $this->id = $row['discussionId'];
        $this->name = $row['discussionname'];
    }
}