<?php

header("Access-Control-Allow-Origin: https://devweb2019.cis.strath.ac.uk/~pkb17140/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '/../config/database.php';
include_once '/../objects/user.php';
 
$database = new Database();
$db = $database->connection();
 
$user = new User($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$user->username = $data->username;
$userExists = $user->userExists();
 
include_once '/../config/core.php';
include_once '/../library/php-jwt-master/src/BeforeValidException.php';
include_once '/../library/php-jwt-master/src/ExpiredException.php';
include_once '/../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '/../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
if($userExists && password_verify($data->password, $user->password)){
 
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => array(
           "id" => $user->id,
           "username" => $user->username
       )
    );
 
    http_response_code(200);
 
    $jwt = JWT::encode($token, $key);
    echo json_encode(
            array(
                "response" => "Success.",
                "jwt" => $jwt
            )
        );
 
}else{
 
    http_response_code(401);
    echo json_encode(array("response" => "Failed."));
}
 


?>