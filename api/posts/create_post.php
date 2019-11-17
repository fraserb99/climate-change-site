<?php
header("Access-Control-Allow-Origin: https://devweb2019.cis.strath.ac.uk/~pkb17140/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '/../config/database.php';
include_once '/../objects/user.php';
include_once 'validate_token.php';


$database = new Database();
$db = $database->connection();
	 
$post = new ForumPost($db);
	 
$data = json_decode(file_get_contents("php://input"));

if(validate($data)){
	
	 
	$post->setUserID($decoded->data->userid);
	$post->setDiscussion($data->discussion);
	$post->setDiscID($data->discussionid);
	$post->setPost($data->post);
	$post->setParent($data->parentid);
	 
	if(!empty($post->getUserID()) && !empty($post->getDiscussion()) && !empty($post->getPost()) && !empty($post->getParent()) && !empty($post->getDiscID()) && $post->create()){
		
		http_response_code(200);
		echo json_encode(array("response" => "Success"));
		
	}else{
		
		http_response_code(400);
		echo json_encode(array("response" => "Failed"));
		
	}
}

?>