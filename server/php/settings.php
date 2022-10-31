<?php
define("DEBUG", true);

// If true, a mail must be contained in the 'whitelist'
// database, otherwise access will not be granted.
define("ENABLE_WHITELIST", false);

// Time in minutes that must pass before being allowed to resend the mail.
define("MIN_RESEND_TIME",2);

// Time in minutes a token is useable after creation.
define("TOKEN_LIFETIME",60);
 ?>
