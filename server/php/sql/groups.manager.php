<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/sql/sql_access.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/safety.php";

// Creates a new unique id that does not exist in 'groups'.
function idCreator_groups()
{
  $tries = 0;
  while($tries < 4)
  {
    $id = idCreator();
    if(fetchGroupLinkById($id)==NULL)
    {
      return $id;
    }
    $tries++;
  }
}

// Gets a whitelist entry dataset from 'whitelist' by its id.
function fetchGroupLinkById($id)
{
  $querry = "SELECT `id`, `user_id`, `group_name` FROM `groups` WHERE `id`=#1";
  $querry = str_replace("#1",$id,$querry);
  $result = sqlQuerry($querry);
  if(mysqli_num_rows($result) > 0)
  {
    return  mysqli_fetch_assoc($result);
  }
  return NULL;
}

// Adds a link between a user and a perm group
function addGroupLink($user_id,$group_name)
{
  $querry = "INSERT INTO `groups`(`id`, `user_id`, `group_name`) VALUES (#1,#2,'#3')";
  $querry = str_replace("#1",idCreator_groups(),$querry);
  $querry = str_replace("#2",$user_id,$querry);
  $querry = str_replace("#3",$group_name,$querry);
  return sqlQuerry($querry);
}
?>
