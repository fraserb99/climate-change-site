<?php
class User{
 
    private $conn;
    private $table = "users";
 
    public $id;
    public $username;
    public $email;
    public $password;
 
    public function __construct($db){
        $this->conn = $db;
    }
 

	function create(){
	 
		$query = "INSERT INTO " . $this->table . "
				SET
					username = :username,
					email = :email,
					password = :password";
	 
	 
		$statement = $this->conn->prepare($query);
		
		$this->username=htmlspecialchars(strip_tags($this->username));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->password=htmlspecialchars(strip_tags($this->password));

		$statement->bindValue(':username', $this->username);
		
		$statement->bindValue(':email', $this->email);
	 
		$hash = password_hash($this->password, PASSWORD_DEFAULT);
		$statement->bindValue(':password', $hash);
	 
		if($statement->execute()){
			return true;
		}
		return false;
	}
	 
	function userExists(){
	 
		$query = "SELECT id, password, email
				FROM " . $this->table . "
				WHERE username = ?
				LIMIT 0,1";
	 
		
		$statement = $this->conn->prepare($query);
	 
		$this->username=htmlspecialchars(strip_tags($this->username));
	 
		$statement->bindParam(1, $this->username);
	 
		$statement->execute();
	 
		$numRows = $statement->rowCount();
	 
		if($numRows>0){
	 
			$row = $statement->fetch(PDO::FETCH_ASSOC);
	 
			$this->id = $row['id'];
			$this->email = $row['email'];
			$this->password = $row['password'];
	 
			return true;
		}
	 
		return false;
	}
	
	public function update(){
 
		$password_set=!empty($this->password) ? ", password = :password" : "";
		$username_set=!empty($this->username) ? ", username = :username" : "";
		$email_set=!empty($this->email) ? ", email = :email" : "";
	 
		$query = "UPDATE " . $this->table . "
				SET
					id = :id
					{$username_set}
					{$password_set}
					{$password_set}
				WHERE id = :id";
	 
		$statement = $this->conn->prepare($query);

		if(!empty($this->password)){
			$this->password=htmlspecialchars(strip_tags($this->password));
			$password_hash = password_hash($this->password, PASSWORD_BCRYPT);
			$statement->bindParam(':password', $password_hash);
		}
		if(!empty($this->username)){
			$this->username=htmlspecialchars(strip_tags($this->username));
			$statement->bindParam(':username', $this->username);
		}
		if(!empty($this->email)){
			$this->email=htmlspecialchars(strip_tags($this->email));
			$statement->bindParam(':email', $this->email);
		}
		
		$statement->bindParam(':id', $this->id);
	 
		if($statement->execute()){
			return true;
		}
	 
		return false;
	}
}
?>