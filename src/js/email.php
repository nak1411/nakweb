<?php
if($_POST){
    $name = $_POST['name'];
    $message = 'NAME: ' .$_POST['name'] ."\n"
	.'EMAIL: ' .$_POST['email'] ."\n"
    .'PHONE: ' .$_POST['phone']."\n"
    .$_POST['message'];

//send email
    mail('nak1411@gmail.com', $name, $message);
}
?>