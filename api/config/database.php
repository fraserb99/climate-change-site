<?php
class Database {
	
private $server = "devweb2019.cis.strath.ac.uk";
private $db = "cs312ab";
private $user = "cs312ab";
private $pass = "chio9PeNeXei";
	
public $conn;

public function connection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->server . ";dbname=" . $this->db, $this->user, $this->pass);
        }catch(PDOException $exception){
            echo "Error Cinnecting: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>