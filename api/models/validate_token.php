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

$data = json_decode(file_get_contents("php://input"));
 
$jwt=isset($data->jwt) ? $data->jwt : ""; //gets the jwt
 
if($jwt){
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256')); //decodes the jwt
        http_response_code(200);
        echo json_encode(array(
            "response" => "Success.",
            "data" => $decoded->data
        ));
    }catch (Exception $e){
		http_response_code(401);
		echo json_encode(array(
			"response" => "Failed.",
			"error" => $e->getMessage()
		));
	} 
}else{
    http_response_code(401);
    echo json_encode(array("response" => "Failed."));
}
 

?>