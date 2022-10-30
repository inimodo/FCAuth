<?php
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/settings.php";

$private_token = preg_replace('/[^a-zA-Z0-9\s]+/u','',$_GET['pvt']);

function Ask($private_token)
{
  return "{'response':true}";
}

echo Ask($private_token);
 ?>
