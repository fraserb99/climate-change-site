<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/core.php';
include_once '../config/database.php';
include_once 'model/user.php';
include_once 'user_service.php'; 

include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

$database = new Database();
$db = $database->connection();
 
$user = new User();
$userService = new UserService($db);

$data = json_decode(file_get_contents("php://input"));
 
$user->setUsername($data->username);
$user->setEmail($data->email);
$user->setPassword($data->password);
 
if(!empty($user->getUsername()) && !empty($user->getPassword()) && !empty($user->getEmail())){
	if(!($userService->userExists($user))){
		if($userService->create($user)){
			$token = array(
				"iss" => $iss,
				"aud" => $aud,
				"iat" => $iat,
				"nbf" => $nbf,
				"data" => array(
					"id" => $user->getID(),
					"username" => $user->getUsername()
				)
			 );
		  
			$jwt = JWT::encode($token, $key);
			http_response_code(200);
			echo json_encode(array(
				"jwt" => $jwt
			));
		}else{
			echo json_encode(array("response" => "Failed to query database."));
		}
    
	}else{
		http_response_code(400);
    echo json_encode(array("response" => "User already exists."));
	}
}else{
	
    http_response_code(400);
    echo json_encode(array("response" => "Empty Fields."));
	
}
?>