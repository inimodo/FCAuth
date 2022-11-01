<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

//https://stackoverflow.com/questions/55250688/fetch-doesnt-send-post-data
$_POST = json_decode(file_get_contents('php://input'), true);

$public_token = preg_replace('/[^a-zA-Z0-9\s]+/u','',$_POST['pbt']);
$perms = preg_replace('/[^A-Z_\s]+/u','',$_POST['perms']);

function Check($public_token,$perms)
{
  $token = fetchTokenByPBT($public_token);
  if($token == NULL)
  {
    return '{"response":false, "error:"Unkown token."}';
  }

  if(fetchTokenByDateAndUserId($token['user_id'],TOKEN_LIFETIME)==NULL)
  {
    return '{"response":false, "error":"Expired token."}';
  }
  if(!$token['valid'])
  {
    return '{"response":false,"error":"Invalid token!"}';
  }

  $grouplink = fetchGroupLinkByUserId($token['user_id']);
  if($grouplink == NULL)
  {
    return '{"response":false,"error":"User has no group!"}';
  }
  while($groups = mysqli_fetch_assoc($grouplink))
  {
    if(groupHasPerm($groups['group_name'],$perms))
    {
      return '{"response":true}';
    }
  }

  return '{"response":false,"error":"User does not have these permissions!"}';
}

echo Check($public_token,$perms);
 ?>
