<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/core.php';
include_once '../config/database.php';



$database = new Database();
$db = $database->connection();

$query = "SELECT *
		FROM discussions
		ORDER BY discussionid ASC";


$statement = $db->prepare($query); 

if (!$statement->execute()) {
    print_r($statement->errorInfo());
	http_response_code(401);
	echo json_encode(array("response" => "Query failed"));
	exit(0);
}else{
	
	$data = array();
	while($row = $statement->fetch()) {
		$id = $row['discussionid'];
		$query = "SELECT * FROM forum WHERE discussion = $id";
		
		$stmt = $db->prepare($query);
		
		if(!$stmt->execute()){
			http_response_code(401);
			echo json_encode(array("response" => "Query failed"));
			exit(0);
		}else{
			$count = $stmt->rowCount();
		}
		array_push($data, array("discussionid" => $id,  "discussionname" => $row['name'], "posts" => $count));
	}
	
		http_response_code(200);
		echo json_encode($data);
	
}		
?>