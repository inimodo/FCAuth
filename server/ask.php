<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";


$public_token = preg_replace('/[^a-zA-Z0-9\s]+/u','',$_GET['pbt']);

function Ask($public_token)
{
  $token = fetchTokenByPBT($public_token);
  if($token == NULL)
  {
    return "{'response':false, 'error':'Unkown token.'}";
  }

  if(fetchTokenByDateAndUserId($token['user_id'],TOKEN_LIFETIME)==NULL)
  {
    return "{'response':false, 'error':'Expired token.'}";
  }
  if(!$token['valid'])
  {
    return "{'response':true,'valid':false}";
  }
  return "{'response':true,'valid':true}";
}

echo Ask($public_token);
 ?>
