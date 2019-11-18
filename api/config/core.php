<?php
include_once '../library/php-jwt-master/src/BeforeValidException.php';
include_once '../library/php-jwt-master/src/ExpiredException.php';
include_once '../library/php-jwt-master/src/SignatureInvalidException.php';
include_once '../library/php-jwt-master/src/JWT.php';

error_reporting(E_ALL);
 
date_default_timezone_set('Europe/London');
 
$key = "fullMarksForUs";
$iss = "https://devweb2019.cis.strath.ac.uk";
$aud = "https://devweb2019.cis.strath.ac.uk";
$iat = 1356999524;
$nbf = 1357000000;

?>