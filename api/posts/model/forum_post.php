<?php
class ForumPost {
		
	

 
    private $postid;
    private $userid;
    private $discussionid;
	private $discussionName;
	private $parentid;
	private $post;
 
    public function __construct(){
			
		}
	
	
	public static function withRow($row) {
		$post = new self();
		$post->setID($row['postid']);
		$post->setUserID($row['userid']);
		$post->setPost($row['post']);
		$post->setParent($row['parentPostID']);

		return $post;
	}
	public function getID(){
		return $this->forumid;
	}
	public function getUserID(){
		return $this->userid;
	}
	public function getDiscussion(){
		return $this->discussionName;
	}
	public function setDiscID($id){
		$this->discussionid = $id;
	}
	public function getDiscID(){
		return $this->discussionid;
	}
	public function getPost(){
		return $this->post;
	}
	public function setID($id){
		$this->forumid = $id;
	}
	public function setUserID($id){
		$this->userid = $id;
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
}
?>