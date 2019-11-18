<?php
class User{
 
    private $id;
    private $username;
    private $email;
    private $password;
 
	public function __construct(){
	}

	public static function withRow($row) {
		$user = new self();
		$user->setID($row['id']);
		$user->setUsername($row['username']);
		$user->setEmail($row['email']);
		$user->setPassword($row['password']);

		return $user;
	}
	
	public function getID(){
	   return $this->id;
	}
	public function getUsername(){
	   return $this->username;
	}
	public function getEmail(){
	   return $this->email;
	}
	public function getPassword(){
	   return $this->password;
	}
	public function setID($id){
		$this->id = $id;
	}
	public function setEmail($email){
	   $this->email = $email;
	}
	public function setPassword($password){
	   $this->password = $password;
	}
	public function setUsername($username) {
	   $this->username = $username;
	}
}
?>