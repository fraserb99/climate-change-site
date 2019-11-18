<?php

include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once 'model/user.php';
include_once 'user_service.php';

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

$id = strip_tags(isset($_GET['id']) ? $_GET['id'] : null);

if ($id != null) {
    $token = getBearerToken($id);
    $jwt = decodeJWT($token);
    validateJWTId($jwt, $id);
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
} else {
    http_response_code(400);
}