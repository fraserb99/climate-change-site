<?php
include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../config/jwt_validators.php';

include_once 'post_service.php';
include_once 'model/forum_post.php';
include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


$database = new Database();
$db = $database->connection();
	 
$post_service = new PostService($db);
$post = new ForumPost();
	 
$data = json_decode(file_get_contents("php://input"));

$token = getBearerToken();
$jwt = decodeJWT($token);
validateJWTId($jwt, $data->userId);
	
	 
$post->setuserId($data->userId);
$post->setDiscID($data->discussionId);
$post->setPost($data->post);
$post->setParent($data->parentId);
 

if(!empty($post->getuserId())){
	if(!empty($post->getPost())){
		if($post->getParent() >= 0){
			if(!empty($post->getDiscID())){
				if($post_service->create($post)){
					http_response_code(200);
					echo json_encode(array("post" => $post->getPost()));
				}
			}else{
				http_response_code(400);
				echo json_encode(array("response" => "Empty Discussion ID Field"));
			}
		}else{
			http_response_code(400);
			echo json_encode(array("response" => "Empty Parent ID Field"));
		}
	}else{
		http_response_code(400);
		echo json_encode(array("response" => "Empty Post Field"));
}
}else{
	http_response_code(400);
	echo json_encode(array("response" => "Empty User ID Field"));
}


?>