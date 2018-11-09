<?php
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];

  $email_subject = "New Message"
  $to = "justin@nakdev.net"
  $headers = "From: ".$email;
  $txt = "You have mail from ".$name.".\n\n".$message;

  mail($to, $email_subject, $txt, $headers);

  header("Location: index.html");
?>