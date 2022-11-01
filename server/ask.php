<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

//https://stackoverflow.com/questions/55250688/fetch-doesnt-send-post-data
$_POST = json_decode(file_get_contents('php://input'), true);

$public_token = preg_replace('/[^a-zA-Z0-9\s]+/u','',$_POST['pbt']);

function Ask($public_token)
{
  $token = fetchTokenByPBT($public_token);
  if($token == NULL)
  {
    return '{"response":false, "error":"Unkown token."}';
  }

  if(fetchTokenByDateAndUserId($token['user_id'],TOKEN_LIFETIME)==NULL)
  {
    return '{"response":false, "error":"Expired token."}';
  }
  if(!$token['valid'])
  {
    return '{"response":false,"error":"Not yet validated!"}';
  }
  return '{"response":true,"valid":true}';
}

echo Ask($public_token);
 ?>
