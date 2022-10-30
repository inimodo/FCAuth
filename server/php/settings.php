<?php

// If true, a mail must be contained in the 'whitelist'
// database, otherwise access will not be granted.
const $s_enableWhitelist = true;

// Time in minutes that must pass before being allowed to resend the mail.
const $s_minResendTime = 2;

// Time in minutes a token is useable after creation.
const $s_tokenLifetime = 60;
 ?>
