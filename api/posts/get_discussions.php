<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/core.php';
include_once '../config/database.php';
include_once './model/discussionDto.php';



$database = new Database();
$db = $database->connection();

$query = "SELECT *
		FROM discussions
		ORDER BY discussionId ASC";


$statement = $db->prepare($query); 

if (!$statement->execute()) {
    print_r($statement->errorInfo());
	http_response_code(401);
	echo json_encode(array("response" => "Query failed"));
	exit(0);
}else{
	
	$data = array();
	while($row = $statement->fetch()) {
		$discussion = new DiscussionDto($row);
		$query = "SELECT * FROM forum WHERE discussion = $id";
		
		$stmt = $db->prepare($query);
		
		if(!$stmt->execute()){
			http_response_code(401);
			echo json_encode(array("response" => "Query failed"));
			exit(0);
		}else{
			$count = $stmt->rowCount();
		}

		$discussion->postCount = $count;

		array_push($data, json_decode($discussion));
	}
	
		http_response_code(200);
		echo json_encode($data);
	
}		
?>