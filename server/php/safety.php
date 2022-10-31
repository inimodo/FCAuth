<?php

// Creates random id between with 8 digits.
function idCreator()
{
  return rand(10000000,99999999);
}

// Checks if a given email is valid. (Does not need to be accurate)
function checkMail($mail)
{
  if(!str_contains($mail,"@"))return false;
  $domain = explode('@',$mail)[1];
  return gethostbyname($domain)!=$domain;
}

// Checks if a group has a perm key
function groupHasPerm($group,$perm)
{
  $file = fopen($_SERVER['DOCUMENT_ROOT']."/php/permissions.json","r") or die("Fatal Error! Permissions could not be loaded.");
  $json = json_decode(fread($file,filesize($_SERVER['DOCUMENT_ROOT']."/php/permissions.json")),true);
  fclose($file);
  foreach ($json[$group] as $value) {
    if($value == $perm)
    {
      return true;
    }
  }
  return false;
}

 ?>
