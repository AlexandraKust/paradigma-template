<?php
require 'class.phpmailer.php';
require 'class.smtp.php';

// данные
$phone = $_POST['phone'];


if ($_POST['formname'] == 'callback') {
$msg = '
Пользователь заказал обратный звонок. <br>
Телефон: <b>' . $phone .' </b><br>
';
}

// Настройки
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
//$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'example@gmail.com'; //  логин
$mail->Password = 'password'; //  пароль
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('formsajt987@gmail.com', 'Форма с сайта'); // Ваш Email
$mail->addAddress('gmail@gmail.com'); // Email получателя

// Письмо
$mail->isHTML(true);
$mail->Subject = 'Форма с сайта '; // Заголовок письма
$mail->Body = $msg;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success"; } 
else {$result = "error";}


// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>
