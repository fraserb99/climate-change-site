<?php
class UserService{
 
    private $conn;
   
 
    public function __construct($db){
        $this->conn = $db;
    }
 

	function create($user){
	 
		$query = "INSERT INTO users
				SET
					username = :username,
					email = :email,
					password = :password";
	 
	 
		$statement = $this->conn->prepare($query);
		
		$user->setUsername(htmlspecialchars(strip_tags($user->getUsername())));
		$user->setEmail(htmlspecialchars(strip_tags($user->getEmail())));
		$user->setPassword(htmlspecialchars(strip_tags($user->getPassword())));

		$statement->bindValue(':username', $user->getUsername());
		
		$statement->bindValue(':email', $user->getEmail());
	 
		$hash = password_hash($user->getPassword(), PASSWORD_DEFAULT);
		$statement->bindValue(':password', $hash);
	 
		if($statement->execute()){
			return true;
		}
		return false;
	}
	 
	function userExists($user){
	 
		$query = "SELECT id, password, email
				FROM users
				WHERE username = ?
				LIMIT 0,1";
	 
		
		$statement = $this->conn->prepare($query);
	 
		$user->setUsername(htmlspecialchars(strip_tags($user->getUsername())));
	 
		$statement->bindValue(1, $user->getUsername());
	 
		$statement->execute();
	 
		$numRows = $statement->rowCount();
	 
		if($numRows>0){
	 
			$row = $statement->fetch(PDO::FETCH_ASSOC);
	 
			$user->setID($row['id']);
			$user->setEmail($row['email']);
			$user->setPassword($row['password']);
	 
			return true;
		}
		
		
		return false;
	}
	
	public function update($user){
 
		$username_set=!empty($user->getUsername()) ? ", username = :username" : "";
		$email_set=!empty($user->getEmail()) ? ", email = :email" : "";
	 
		$query = "UPDATE users
				SET
					id = :id
					{$username_set}
					{$email_set}
					
				WHERE id = :id";
	 
		$statement = $this->conn->prepare($query);
	/*
		if(!empty($user->getPassword())){
			$user->setPassword(htmlspecialchars(strip_tags($user->getPassword())));
			$password_hash = password_hash($user->getPassword(), PASSWORD_BCRYPT);
			$statement->bindValue(':password', $password_hash);
		}
		*/
		if(!empty($user->getUsername())){
			$user->setUsername(htmlspecialchars(strip_tags($user->getUsername())));
			$statement->bindValue(':username', $user->getUsername());
		}
		if(!empty($user->getEmail())){
			$user->setEmail(htmlspecialchars(strip_tags($user->getEmail())));
			$statement->bindValue(':email', $user->getEmail());
		}
		
		$statement->bindValue(':id', $user->getID());
	 
		if($statement->execute()){
			return true;
		}
	 
		return false;
	}

	public function getById($id) {
		$query = "SELECT *
				FROM users
				WHERE id = ?
				LIMIT 0,1";
	 
		
		$statement = $this->conn->prepare($query);
	 
		$statement->bindValue(1, $id);
	 
		$statement->execute();
	 
		if($statement->rowCount() > 0){
	 
			$row = $statement->fetch(PDO::FETCH_ASSOC);
	 
			$user = User::withRow($row);
	 
			return $user;
		}
		
		return null;
	}
}
?>