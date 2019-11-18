<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once 'model/forum_post.php';


include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

include_once '../config/jwt_validators.php';

$database = new Database();
$db = $database->connection();

$query = "SELECT *
		FROM discussions
		ORDER BY discussionid ASC";

$statement = $db->prepare($query);

if (!$statement->execute()) {
    print_r($statement->errorInfo());
	http_response_code(401);
}else{
	$data = array();
	while($row = $statement->fetch()) {
		array_push($data, array("discussionid" => $row['discussionid'],  "discussionname" => $row['name']));
	}
	http_response_code(200);
	echo json_encode($data);
}		
?>