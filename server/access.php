<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

$email = preg_replace('/[^a-zA-Z0-9!#$%&-+.@\s]+/u','',$_GET['email']);

function Access($email)
{
  if(checkMail($email))
  {
    $response = fetchUserByMail($email);
    if($response == NULL)
    {
      addUser($email);
      $response = fetchUserByMail($email);
    }
    if($s_enableWhitelist)
    {
      if(fetchWEntryByUserId($response['user_id'])==NULL)
      {
        return "{'response':false,'error':'Email address is not contained in the whitelist!'}";
      }
    }
    $now = date("Y-m-d H:i:s",time()-(60*$s_minResendTime));
    if()//To be continued ...

  }else
  {
    return "{'response':false,'error':'Invalid email address!'}";
  }
  return "{'response':true}";
}

echo Access($email);
 ?>
