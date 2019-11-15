<?php
class User{
 
    private $conn;
    private $table = "members";
 
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
 

    $statement->bindParam(':username', $this->firstname);
    
    $statement->bindParam(':email', $this->email);
 
    $hash = password_hash($this->password, PASSWORD_DEFAULT);
    $statement->bindParam(':password', $hash);
 
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
 
// update() method will be here
}