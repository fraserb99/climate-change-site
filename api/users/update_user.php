<?php
header("Access-Control-Allow-Origin: https://devweb2019.cis.strath.ac.uk/~pkb17140/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


include_once '../config/database.php';
include_once 'model/user.php';
include_once 'validate_token.php';
include_once 'user_service.php';



 
$database = new Database();
$db = $database->getConnection();

$userService = new UserService($db);
$user = new User();
$data = json_decode(file_get_contents("php://input"));

if(validate($data)){
		
		$user->setUsername($data->username);
		$user->setEmail($data->email);
		$user->setPassword($data->password);
		$user->setID($decoded->data->id);

		if($userService->update($user)){
			
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
			echo json_encode(
					array(
						"jwt" => $jwt
					)
				);
				
		}else{
			http_response_code(401);
			echo json_encode(array("response" => "Failed, couldn't update user for some reason."));
		}
  
}else{
	http_response_code(401);
	echo json_encode(array("response" => "Access Denied."));
}
 
?>