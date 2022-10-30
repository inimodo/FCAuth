<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/sql/sql_access.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/safety.php";

// Creates a 254 char long random token
function tokenCreator()
{
  $token ="";
  for ($index=0; $index < 254; $index++) {
    $randi =rand(0,100)%3;
    if($randi==0){
      $token.=chr(rand(65,90));

    }else if($randi==1){
      $token.=chr(rand(97,122));

    }else if($randi==2){
      $token.=chr(rand(48,57));
    }
  }
  return $token;
}

// Creates a new unique id that does not exist in 'token'.
function idCreator_token()
{
  $tries = 0;
  while($tries < 4)
  {
    $id = idCreator();
    if(fetchTokenById($id)==NULL)
    {
      return $id;
    }
    $tries++;
  }
}

// Gets a token dataset from 'token' by its id.
function fetchTokenByDateAndUserId($user_id,$date)
{
  $querry = "SELECT `id`, `private_token`,`public_token`, `user_id`, `made`, `valid` FROM `token` WHERE `user_id`='#1' AND  `made` > '#2'";
  $querry = str_replace("#1",$user_id,$querry);
  $querry = str_replace("#2",$date,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) > 0)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Gets a token dataset from 'token' by its id.
function fetchTokenById($id)
{
  $querry = "SELECT `id`, `private_token`,`public_token`, `user_id`, `made`, `valid` FROM `token` WHERE `id`='#1'";
  $querry = str_replace("#1",$id,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) > 0)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Gets a token id by its token
function fetchTokenByPBT($public_token)
{
  $querry = "SELECT `id`, `private_token`,`public_token`, `user_id`, `made`, `valid` FROM `token` WHERE `public_token`='#1'";
  $querry = str_replace("#1",$public_token,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) == 1)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Gets a token id by its token
function fetchTokenByPVT($private_token)
{
  $querry = "SELECT `id`, `private_token`,`public_token`, `user_id`, `made`, `valid` FROM `token` WHERE `private_token`='#1'";
  $querry = str_replace("#1",$private_token,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) == 1)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Adds a new user to 'users' database with unique key(id).
function addToken($user_id)
{
  $querry = "INSERT INTO `token`(`id`, `private_token`,`public_token`, `user_id`, `made`, `valid`) VALUES (#1,'#2','#3',#4,NOW(),false)";
  $querry = str_replace("#1",idCreator_token(),$querry);
  $querry = str_replace("#2",tokenCreator(),$querry);
  $querry = str_replace("#3",tokenCreator(),$querry);
  $querry = str_replace("#4",$user_id,$querry);
  return sqlQuerry($querry);
}


 ?>
