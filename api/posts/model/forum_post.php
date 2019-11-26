<?php
class ForumPost {
		
	

 
    private $postId;
    private $userId;
    private $discussionId;
	private $discussionName;
	private $parentid;
	private $post;
	private $likes;
	
    public function __construct(){
			
		}
	
	
	public static function withRow($row) {
		$post = new self();
		$post->setID($row['postId']);
		$post->setuserId($row['userId']);
		$post->setPost($row['post']);
		$post->setParent($row['parentpostId']);

		return $post;
	}
	public function getID(){
		return $this->postId;
	}
	public function getuserId(){
		return $this->userId;
	}
	public function getDiscussion(){
		return $this->discussionName;
	}
	public function setDiscID($id){
		$this->discussionId = $id;
	}
	public function getDiscID(){
		return $this->discussionId;
	}
	public function getPost(){
		return $this->post;
	}
	public function setID($id){
		$this->postId = $id;
	}
	public function setuserId($id){
		$this->userId = $id;
	}
	public function setDiscussion($disc){
		$this->discussionName = $disc;
	}
	public function setPost($post){
		$this->post = $post;
	}
	public function getParent(){
		return $this->parentid;
	}
	public function setParent($id){
		$this->parentid = $id;
	}
	public function setLikes($int){
			$this->likes = $int;
	}
	public function getLikes(){
			return $this->likes;
	}
}
?>