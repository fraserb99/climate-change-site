<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once 'model/forum_post.php';
include_once 'post_service.php';

include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

include_once '../config/jwt_validators.php';

$database = new Database();
$db = $database->connection();

$postService = new PostService($db);

$id = strip_tags(isset($_GET['discussionid']) ? $_GET['discussionid'] : null);

if ($id != null) {
	
    $query = "SELECT *
				FROM forum				
				WHERE discussionid = ?
				ORDER BY time";
	
	$statement = $db->prepare($query);
	
	if (!$statement->execute()) {
		print_r($statement->errorInfo());
		http_response_code(401);
	}else{
		$data = array();
		while($row = $statement->fetch()) {
			$post = new ForumPost();
			$post->setID($row['postid']);
			$likes = $postService->getLikes($post);
			if($likes === -1) {
				http_response_code(401);
				echo json_encode(array("response" => "Query failed"));
				exit(0);
			}
			array_push($data, array("postid" => $row['postid'],  "userid" => $row['userid']), "parent" => $row['parentPostID'], "post" => $row['post'], "likes" => $likes, "time" => $row['time']);
		}
		http_response_code(200);
		echo json_encode($data);
	}		
} else {
    http_response_code(400);
}


$user = $userService->getById($id);
    if ($user != null) {
        http_response_code(200);
        echo json_encode(array(
            'user' => array(
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail()
            )
        ));
    } else {
        http_response_code(404);
        echo json_encode(array(
            'response' => 'User not found'
        ));
    }
	
?>