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
$userId = htmlspecialchars(strip_tags($jwt->data->id));
validateJWTId($jwt, $userId);
$postId = isset($data->postId) ? htmlspecialchars(strip_tags($data->postId)) : "";
if(empty($postId)){
	http_response_code(401);
	echo json_encode(array("response" => "no post id given"));
	exit(0);
}

$query = "SELECT *
				FROM likes
				WHERE userId = :userId AND postId = :postId";
	 
		
$statement = $db->prepare($query);

$statement->bindValue(":userId", $userId);
$statement->bindValue(":postId", $postId);

if($statement->execute()){
	if($statement->rowCount() > 0){
		http_response_code(401);
		echo json_encode(array("response" => "Already liked"));
		exit(0);
	}else{
		$query = "INSERT INTO likes
		SET
			userId = :userId,
			postId = :postId";

		$statement = $db->prepare($query);

		$statement->bindValue(':userId', $userId);
		$statement->bindValue(':postId', $postId);
		
		if($statement->execute()){
			http_response_code(200);
			echo json_encode(array("response" => "Liked"));
		}else{
			http_response_code(401);
			echo json_encode(array("response" => "Failed to query database"));
		}
	}
}else{
	http_response_code(401);
	echo json_encode(array("response" => "Query failed"));
	exit(0);
}

?>