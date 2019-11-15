<?php

header("Access-Control-Allow-Origin: https://devweb2019.cis.strath.ac.uk/~pkb17140/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '/../config/database.php';
include_once '/../objects/user.php';
 
$database = new Database();
$db = $database->connection();
 
$user = new User($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$user->username = $data->username;
$user->email = $data->email;
$user->password = $data->password;
 
if(!empty($user->username) && !empty($user->password) && !empty($user->email) && $user->create()){
	
    http_response_code(200);
    echo json_encode(array("response" => "Success"));
	
}
 
else{
	
    http_response_code(400);
    echo json_encode(array("response" => "Failed"));
	
}
?>