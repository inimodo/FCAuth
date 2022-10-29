<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/sql/sql_access.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/safety.php";


// Creates a new unique id that does not exist in 'whitelist'.
function idCreator_whitelist()
{
  $tries = 0;
  while($tries < 4)
  {
    $id = idCreator();
    if(fetchWEntryById($id)==NULL)
    {
      return $id;
    }
    $tries++;
  }
}

// Gets a whitelist entry dataset from 'whitelist' by its id.
function fetchWEntryById($id)
{
  $querry = "SELECT `id`, `user_id` FROM `whitelist` WHERE `id`=#1";
  $querry = str_replace("#1",$id,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) > 0)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Adds a user to the whitlist by its id
function addWEntry($user_id)
{
  $querry = "INSERT INTO `whitelist`(`id`, `user_id`) VALUES (#1,#2)";
  $querry = str_replace("#1",idCreator_whitelist(),$querry);
  $querry = str_replace("#2",$user_id,$querry);
  return sqlQuerry($querry);
}

// Removes a user from the whitelist
function remWEntry($user_id)
{
  $querry = "DELETE FROM `whitelist` WHERE `user_id`=#1";
  $querry = str_replace("#1",$user_id,$querry);
  return sqlQuerry($querry);
}

?>
