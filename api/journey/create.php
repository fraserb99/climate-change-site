<?php
include_once '../config/corspolicy.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../config/jwt_validators.php';

include_once 'models/Journey.php';
include_once 'JourneyService.php';
include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


$database = new Database();
$db = $database->connection();

$JourneyService = new JourneyService($db);

$data = json_decode(file_get_contents("php://input"));
$token = getBearerToken();
$jwt = decodeJWT($token);


$journeyInput = Journey::fromInput($data);
validateJWTId($jwt, $journeyInput->userId);

$journey = $JourneyService->create_journey($journeyInput);

echo json_encode($journey);