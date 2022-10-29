<?php
// access.php - externally accessable
// Creates a new user or uses a existing one to send a auth mail.
// ... creating a new token and checks if a users has all required perms.

include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/users.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/token.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/whitelist.manager.php";
include_once  $_SERVER['DOCUMENT_ROOT']."/php/sql/groups.manager.php";


 ?>
