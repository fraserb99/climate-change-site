<?php

include_once '../config/core.php';
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

function decodeJWT($token) {
    global $key;
	if($token) {
		try {
			$decoded = JWT::decode($token, $key, array('HS256'));
			return $decoded;
		} catch (Exception $e) {
			http_response_code(401);
			echo json_encode(array(
				"response" => "Access Denied",
				"error" => $e->getMessage()
			));
			exit(0);
		}
	} else {
		http_response_code(401);
		echo json_encode(array("response" => "Access Denied"));
		exit(0);
	}
}

function validateJWTId($jwt, $id) {
    $jwtId = isset($jwt->data->id) ? $jwt->data->id : null;
    if ($jwtId == $id) {
        return true;
    } else {
        http_response_code(401);
        echo json_encode(array(
            'response' => 'You do not have permission to access this resource'
        ));
        exit(0);
    }
}

function getBearerToken() {
    $headers = apache_request_headers();
    $authHeader = trim(isset($headers['Authorization']) ? $headers['Authorization'] : null);
    if ($authHeader != null) {
        if (substr($authHeader, 0, 7) == 'Bearer ') {
            $token = substr($authHeader, 7);
            return $token;
        } else {
            http_response_code(401);
            echo json_encode(array(
                'response' => 'Incorrect authorization'
            ));
            exit(0);
        }
    } else {
        http_response_code(401);
        echo json_encode(array(
            'response' => 'Authorization required for this request'
        ));
        exit(0);
    }
}

?>