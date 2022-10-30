<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/sql/sql_access.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/safety.php";

// Creates a new unique id that does not exist in 'users'.
function idCreator_users()
{
  $tries = 0;
  while($tries < 4)
  {
    $id = idCreator();
    if(fetchUserById($id)==NULL)
    {
      return $id;
    }
    $tries++;
  }
}

// Gets a users dataset from 'users' by its id.
function fetchUserByMail($mail)
{
  $querry = "SELECT `id`, `mail`, `joined` FROM `users` WHERE `mail`='#1'";
  $querry = str_replace("#1",$mail,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) > 0)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Gets a users dataset from 'users' by its id.
function fetchUserById($id)
{
  $querry = "SELECT `id`, `mail`, `joined` FROM `users` WHERE `id`='#1'";
  $querry = str_replace("#1",$id,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) > 0)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Adds a new user to 'users' database with unique key(id).
function addUser($mail)
{
  $querry = "INSERT INTO `users`(`id`, `mail`, `joined`) VALUES (#1,'#2',NOW())";
  $querry = str_replace("#1",idCreator_users(),$querry);
  $querry = str_replace("#2",$mail,$querry);
  return sqlQuerry($querry);
}


 ?>
