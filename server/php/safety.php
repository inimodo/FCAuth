<?php

// Creates random id between with 8 digits.
function idCreator()
{
  return rand(10000000,99999999);
}

// Checks if a given email is valid. (Does not need to be accurate)
function checkMail($mail)
{
  return str_contains($mail,"@");
}

 ?>
