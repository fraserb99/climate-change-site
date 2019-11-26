<?php
class PostService {
	
	
	private $conn;
	
	public function __construct($db){
			$this->conn = $db;
		}
	
	
	public function create($post){
		$query = "INSERT INTO forum
				SET
					userId = :userId,
					discussion = :discussionId,
					post = :post,
					parentpostId = :parentid"
					;
	 
	 
		$statement = $this->conn->prepare($query);
		
		$post->setuserId(htmlspecialchars(strip_tags($post->getuserId())));
		$post->setDiscID(htmlspecialchars(strip_tags($post->getDiscID())));
		$post->setPost(htmlspecialchars(strip_tags($post->getPost())));
		$post->setParent(htmlspecialchars(strip_tags($post->getParent())));
	 

		$statement->bindValue(':userId', $post->getuserId());
		$statement->bindValue(':discussionId', $post->getDiscID());
		$statement->bindValue(':post', $post->getPost());
		$statement->bindValue(':parentid', $post->getParent());
		if($statement->execute()){
			return true;
		}
		print_r($statement->errorInfo());
		echo json_encode(array("response" => "Query Failed"));
		return false;
	}
	
	
	public function edit($post){
 
		
		$post_set=!empty($post->post) ? ", post = :post" : "";
	 
		$query = "UPDATE " . $post->table . "
				SET
					postId = :postId
					{$post_set}
				WHERE postId = :postId AND userId = :userId";
	 
		$statement = $post->conn->prepare($query);

		
		if(!empty($post->post)){
			$post->post=htmlspecialchars(strip_tags($post->post));
			$statement->bindValue(':post', $post->post);
		}
		
		$statement->bindValue(':postId', $post->getpostId());
		$statement->bindValue(':userId', $post->getuserId());
		
		if($statement->execute()){
			return true;
		}
	 
		return false;
	}
	public function getById($id) {
		$query = "SELECT *
				FROM forum
				WHERE postId = ?
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
	
	public function getLikes($post){
		$query = "SELECT *
				FROM likes				
				WHERE 
					postId = :postId";
				
		$statement = $this->conn->prepare($query);
		
		$statement->bindValue(':postId', $post->getID());
		
		if (!$statement->execute()) {
			print_r($statement->errorInfo());
			return -1; 
		}else{
			$count = 0;
			while($row = $statement->fetch()) {
				$count++;
			}
			return $count;
		}		
	}
}
?>