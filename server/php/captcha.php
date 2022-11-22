<?php

function post_captcha($user_response)
{
  include  $_SERVER['DOCUMENT_ROOT']."/php/credentials.php";

  $fields_string = '';
  $fields = array(
      'secret' => $c_captcha_private,
      'response' => $user_response
  );
  foreach($fields as $key=>$value)
  $fields_string .= $key . '=' . $value . '&';
  $fields_string = rtrim($fields_string, '&');

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
  curl_setopt($ch, CURLOPT_POST, count($fields));
  curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

  $result = curl_exec($ch);
  curl_close($ch);

  return json_decode($result, true);
}
//$captcha_result = post_captcha($_POST['g-recaptcha-response']);
//if ($captcha_result['success']){}
 ?>
