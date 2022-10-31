<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

$private_token = preg_replace('/[^a-zA-Z0-9\s]+/u','',$_GET['pvt']);

function Validate($private_token)
{
  $token = fetchTokenByPVT($private_token);
  if($token == NULL)
  {
    return "{'response':false, 'error':'Unkown token.'}";
  }

  if(fetchTokenByDateAndUserId($token['user_id'],TOKEN_LIFETIME)==NULL)
  {
    return "{'response':false, 'error':'Expired token.'}";
  }

  validateToken($private_token);

  return "{'response':true}";
}

echo Validate($private_token);
 ?>
