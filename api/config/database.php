<?php
class Database {
	
private $server = "devweb2019.cis.strath.ac.uk";
private $db = "pkb17140";
private $user = "pkb17140";
private $pass = "Resh2yaiw5ie";
	
public $conn;

public function connection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->server . ";dbname=" . $this->db, $this->user $this->pass);
        }catch(PDOException $exception){
            echo "Error Cinnecting: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>