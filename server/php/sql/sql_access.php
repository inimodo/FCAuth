<?php

// Base function for sql access.
function sqlQuerry($querry)
{
  include  $_SERVER['DOCUMENT_ROOT']."/php/credentials.php";
  $connection = new mysqli(
    $c_sql_server,
    $c_sql_user,
    $c_sql_password,
    $c_sql_database
  );
  if(!$connection)
  {
    die("Fatal error! Could not connect to database. Aborting.");
  }
  echo "<br>".$querry."<br>";
  $result = mysqli_query($connection,$querry);
  return $result;
}
?>
