<?php
class PostService {
	
	
	private $conn;
	
	public function __construct($db){
			$this->conn = $db;
		}
	
	
	public function create($post){
		$query = "INSERT INTO forum
				SET
					userid = :userid,
					discussion = :discussionid,
					post = :post,
					parentPostID = :parentid"
					;
	 
	 
		$statement = $this->conn->prepare($query);
		
		$post->setUserID(htmlspecialchars(strip_tags($post->getUserID())));
		$post->setDiscID(htmlspecialchars(strip_tags($post->getDiscID())));
		$post->setPost(htmlspecialchars(strip_tags($post->getPost())));
		$post->setParent(htmlspecialchars(strip_tags($post->getParent())));
	 

		$statement->bindValue(':userid', $post->getUserID());
		$statement->bindValue(':discussionid', $post->getDiscID());
		$statement->bindValue(':post', $post->getPost());
		$statement->bindValue(':parentid', $post->getParent());
		var_dump($post->getUserID());
		var_dump($post->getDiscID());
		var_dump($post->getPost());
		var_dump($post->getParent());
		if($statement->execute()){
			return true;
		}
		print_r($statement->errorInfo());
		echo json_encode(array("response" => "Query Failed"));
		return false;
	}
	
	/*
	$query = "INSERT INTO discussions SET name = :discussionName";
			$statement = $post->conn->prepare($query);
			$statement->bindValue(':discussionName', $post->discussionName);
			if($statement->execute()) {
				return true;	
			}else{
				return false;
			}
	*/
	
	public function edit($post){
 
		
		$post_set=!empty($post->post) ? ", post = :post" : "";
	 
		$query = "UPDATE " . $post->table . "
				SET
					postid = :postid
					{$post_set}
				WHERE postid = :postid AND userid = :userid";
	 
		$statement = $post->conn->prepare($query);

		
		if(!empty($post->post)){
			$post->post=htmlspecialchars(strip_tags($post->post));
			$statement->bindValue(':post', $post->post);
		}
		
		$statement->bindValue(':postid', $post->postid);
		$statement->bindValue(':userid', $post->userid);
		
		if($statement->execute()){
			return true;
		}
	 
		return false;
	}
	public function getById($id) {
		$query = "SELECT *
				FROM forum
				WHERE postid = ?
				LIMIT 0,1";
	 
		
		$statement = $this->conn->prepare($query);
	 
		$statement->bindValue(1, $id);
	 
		$statement->execute();
	 
		if($statement->rowCount() > 0){
	 
			$row = $statement->fetch(PDO::FETCH_ASSOC);
	 
			$post = ForumPost::withRow($row);
	 
			return $post;
		}
		
		return null;
	}
}
?>