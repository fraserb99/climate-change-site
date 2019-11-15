<?php
class ForumPost {
		
	private $conn;
    private $table = "forum";
 
    private $forumID;
    private $userID;
    private $discussion;
	private $post;
 
    public function __construct($db){
        $this->conn = $db;
    }
	
	
	public function create(){
		$query = "INSERT INTO " . $this->table . "
				SET
					userid = :userID,
					discussion = :discussion,
					post = :post";
	 
	 
		$statement = $this->conn->prepare($query);
		
		$this->userID=htmlspecialchars(strip_tags($this->userID));
		$this->discussion=htmlspecialchars(strip_tags($this->discussion));
		$this->post=htmlspecialchars(strip_tags($this->post));
	 

		$statement->bindParam(':userID', $this->userID);
		$statement->bindParam(':discussion', $this->discussion);
		$statement->bindParam(':post', $this->post);
	 
		if($statement->execute()){
			return true;
		}
		return false;
	}
	
	
	
	
	public function getID(){
		return $this->forumID;
	}
	public function getUserID(){
		return $this->userID;
	}
	public function getDiscussion(){
		return $this->discussion;
	}
	public function getPost(){
		return $this->post;
	}
	public function setID($id){
		$this->forumID = $id;
	}
	public function setUserID($id){
		$this->userID = $id;
	}
	public function setDiscussion($disc){
		$this->discussion = $disc;
	}
	public function setPost($post){
		$this->post = $post;
	}
}
?>