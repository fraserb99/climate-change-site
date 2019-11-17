<?php
class ForumPost {
		
	private $conn;
    private $table = "forum";
 
    private $postid;
    private $userid;
    private $discussionid;
	private $discussionName;
	private $parentid;
	private $post;
 
    public function __construct($db){
        $this->conn = $db;
    }
	
	
	public function create(){
		$query = "INSERT INTO " . $this->table . "
				SET
					userid = :userid,
					discussion = :discussionid,
					post = :post,
					parentPostID = :parentid"
					;
	 
	 
		$statement = $this->conn->prepare($query);
		
		$this->userid=htmlspecialchars(strip_tags($this->userid));
		$this->discussionid=htmlspecialchars(strip_tags($this->discussionid));
		$this->post=htmlspecialchars(strip_tags($this->post));
		$this->parentid=htmlspecialchars(strip_tags($this->parentid));
	 

		$statement->bindValue(':userid', $this->userid);
		$statement->bindValue(':discussionid', $this->discussionid);
		$statement->bindValue(':post', $this->post);
		$statement->bindValue(':parentid', $this->parentid);
	 
		if($statement->execute()){
			$query = "INSERT INTO discussions SET name = :discussionName";
			$statement = $this->conn->prepare($query);
			$statement->bindValue(':discussionName', $this->discussionName);
			if($statement->execute()) {
				return true;	
			}else{
				return false;
			}
		}
		return false;
	}
	
	public function edit(){
 
		
		$post_set=!empty($this->post) ? ", post = :post" : "";
	 
		$query = "UPDATE " . $this->table . "
				SET
					postid = :postid
					{$post_set}
				WHERE postid = :postid AND userid = :userid";
	 
		$statement = $this->conn->prepare($query);

		
		if(!empty($this->post)){
			$this->post=htmlspecialchars(strip_tags($this->post));
			$statement->bindValue(':post', $this->post);
		}
		
		$statement->bindValue(':postid', $this->postid);
		$statement->bindValue(':userid', $this->userid);
		
		if($statement->execute()){
			return true;
		}
	 
		return false;
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