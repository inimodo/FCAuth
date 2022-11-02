<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once  $_SERVER['DOCUMENT_ROOT'].'/php/mail/phpmailer/Exception.php';
require_once  $_SERVER['DOCUMENT_ROOT'].'/php/mail/phpmailer/PHPMailer.php';
require_once  $_SERVER['DOCUMENT_ROOT'].'/php/mail/phpmailer/SMTP.php';
require_once  $_SERVER['DOCUMENT_ROOT'].'/php/settings.php';

function sendMail($private_token,$email)
{
  include  $_SERVER['DOCUMENT_ROOT']."/php/credentials.php";
  $mail = new PHPMailer();
	$mail->isSMTP();
	$mail->Host = $c_mail_server;
	$mail->SMTPAuth = true;
	$mail->Username = $c_mail_name;
	$mail->Password = $c_mail_password;
	$mail->SMTPSecure = 'tls';
	$mail->Port = $c_mail_port;
	$mail->setFrom($c_mail_name, 'fcAuth');
	$mail->addAddress($email, $email);
	$mail->isHTML(true);
	$mail->Subject = "fcAuth Request";
	$mail->Body = mailBody($private_token);
	if(!$mail->send()){
		echo $mail->ErrorInfo;
    return false;
	}
  return true;
}

function mailBody($private_token)
{
  $path = $_SERVER['DOCUMENT_ROOT'].'/php/html/mailbody.html';
  $file = fopen($path,"r");
  $body= fread($file,filesize($path));
  fclose($file);
  $body = str_replace("#1",SERVER_DOMAIN."validate.php?pvt=".$private_token,$body);
  $body = str_replace("#2",$_SERVER['GEOIP_COUNTRY_NAME'],$body);
  $body = str_replace("#3",$_SERVER['GEOIP_COUNTRY_CODE'],$body);
  $body = str_replace("#4",$_SERVER['GEOIP_CONTINENT_CODE'],$body);
  $body = str_replace("#5",$_SERVER['GEOIP_ADDR'],$body);
  $date = date("Y-m-d H:i:s",$_SERVER['REQUEST_TIME']);
  $body = str_replace("#6",$date,$body);
  return $body;
}

 ?>
