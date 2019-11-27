<?php

class DiscussionDto {
    public $id;
    public $name;
    public $postCount;

    public DiscussionDto($row) {
        $this->id = $row['discussionId'];
        $this->name = $row['discussionname'];
    }
}