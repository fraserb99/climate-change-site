<?php

class PostDto {
    public $id;
    public $userId;
    public $discussionId;
	public $parentId;
	public $message;
    public $likes;
    
    public function __construct($row) {
        $this->id = $row['postId'];
        $this->userId = $row['userId'];
        $this->$discussionId = $row['discussionId'];
        $this->parentId = $row['parentpostId'];
        $this->message = $row['post'];
    }
}