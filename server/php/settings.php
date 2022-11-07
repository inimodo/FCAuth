<?php
define("DEBUG", false);

// If true, a mail must be contained in the 'whitelist'
// database, otherwise access will not be granted.
define("ENABLE_WHITELIST", false);

define("SERVER_DOMAIN","https://www.ucpsystems.com/");

// Time in minutes a token is useable after creation.
define("TOKEN_LIFETIME",30);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
 ?>
