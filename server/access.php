<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/mail/mailhandler.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

//https://stackoverflow.com/questions/55250688/fetch-doesnt-send-post-data
$_POST = json_decode(file_get_contents('php://input'), true);

$email = preg_replace('/[^a-zA-Z0-9!#$%&-+.@\s]+/u','',$_POST['email']);

function Access($email)
{
  if(checkMail($email))
  {
    $user = fetchUserByMail($email);
    if($user == NULL)
    {
      addUser($email);
      $user = fetchUserByMail($email);

      addGroupLink($user['id'],"default");
    }

    if(ENABLE_WHITELIST)
    {
      if(fetchWEntryByUserId($user['id'])==NULL)
      {
        return '{"response":false,"error":"Email address is not contained in the whitelist!"}';
      }
    }

    deleteOldToken($user['id']);

    addToken($user['id']);

    $token =fetchTokenByUserId($user['id']);

    if(!sendMail($token['private_token'],$email))
    {
      return '{"response":false,"error":"Email could not be sent!"}';
    }

    return '{"response":true, "token": "'.$token['public_token'].'"}';
  }else
  {
    return '{"response":false,"error":"Invalid email address! Mail:'.$_POST['email'].'"}';
  }
}

echo Access($email);
 ?>
