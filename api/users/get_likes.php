<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once 'model/user.php';
include_once 'user_service.php';
include_once 'model/likeDto.php';

include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

include_once '../config/jwt_validators.php';

$database = new Database();
$db = $database->connection();

$userService = new UserService($db);

$token = getBearerToken();
$jwt = decodeJWT($token);
$id = $jwt->data->id;

if ($id) {
    $query = "SELECT * from likes 
        WHERE userId = ?";

    $stmt = $db->prepare($query);
    $stmt->bindValue(1, $id);

    if (!$stmt->execute()) {
        print_r($stmt->errorInfo());
        http_response_code(500);
        echo json_encode(array("response" => "Query failed"));
        exit(0);
    } else {
        $likes = array();
        while ($row = $stmt->fetch()) {
            $like = new likeDto($row);
            array_push($likes, $like);
        }
        echo json_encode($likes);
    }
}