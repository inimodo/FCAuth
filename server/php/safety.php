<?php

// Creates random id between with 8 digits.
function idCreator()
{
  return rand(10000000,99999999);
}

function isExpired($date,$lifetime)
{
  $today = date("Y-m-d H:i:s",time()-(60*60));
}

// Checks if a given email is valid. (Does not need to be accurate)
function checkMail($mail)
{
  if(!str_contains($mail,"@"))return false;
  $domain = explode('@',$mail)[1];
  return gethostbyname($domain)!=$domain;
}

 ?>
