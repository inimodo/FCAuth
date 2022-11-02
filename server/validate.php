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
    return false;
  }

  if(fetchTokenByDateAndUserId($token['user_id'],TOKEN_LIFETIME)==NULL)
  {
    return false;
  }

  validateToken($private_token);

  return true;
}

if(Validate($private_token))
{
  $path = $_SERVER['DOCUMENT_ROOT'].'/php/html/validation_okay.html';
  $file = fopen($path,"r");
  $body= fread($file,filesize($path));
  fclose($file);
  echo $body;
}else
{
  $path = $_SERVER['DOCUMENT_ROOT'].'/php/html/validation_failed.html';
  $file = fopen($path,"r");
  $body= fread($file,filesize($path));
  fclose($file);
  echo $body;
}
 ?>
