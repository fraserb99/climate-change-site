<?php
include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../config/jwt_validators.php';

include_once 'model/forum_post.php';
include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


$database = new Database();
$db = $database->connection();
	 


	 
$data = json_decode(file_get_contents("php://input"));

$token = getBearerToken();
$jwt = decodeJWT($token);
validateJWTId($jwt, $data->userid);

$discussion = $data->discussion;
	 

if(!empty($discussion)){
	if(createDiscussion($db, $discussion)){
			http_response_code(200);
	}
}else{
	http_response_code(400);
	echo json_encode(array("response" => "Empty User ID Field"));
}


function createDiscussion($db, $discussion){
		$query = "INSERT INTO discussions
				SET
					name = :discussion
					";
	 
	 
		$statement = $db->prepare($query);
	 
		$discussion = htmlspecialchars(strip_tags($discussion));
		

		$statement->bindValue(':discussion', $discussion);
		
		
		if($statement->execute()){
			return true;
		}
		print_r($statement->errorInfo());
		echo json_encode(array("response" => "Query Failed"));
		return false;
}

?>