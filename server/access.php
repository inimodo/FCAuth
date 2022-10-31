<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/mail/mailhandler.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

$email = preg_replace('/[^a-zA-Z0-9!#$%&-+.@\s]+/u','',$_GET['email']);

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
        return "{'response':false,'error':'Email address is not contained in the whitelist!'}";
      }
    }

    if(fetchTokenByDateAndUserId($user['id'],MIN_RESEND_TIME)!=NULl)
    {
      return "{'response':false,'error':'Slow down! Min delay between resending is ".MIN_RESEND_TIME." min.'}";
    }

    deleteOldToken($user['id']);

    addToken($user['id']);

    $token =fetchTokenByUserId($user['id']);

    if(!sendMail($token['private_token'],$email))
    {
      return "{'response':false,'error':'Email could not be sent!'}";
    }

    return "{'response':true, 'token': '".$token['public_token']."'}";
  }else
  {
    return "{'response':false,'error':'Invalid email address!'}";
  }
}

echo Access($email);
 ?>
