<?php 

// Устанавливаем заголовок Content-Type: application/json
header('Content-Type: application/json');

// Получаем данные из POST-запроса
$name = $_POST['name'] ?? 'Не указано';
$phone = $_POST['phone'] ?? 'Не указано';
$email = $_POST['email'] ?? 'Не указано';

// // Проверяем, что все поля заполнены
// if (empty($name) || empty($phone) || empty($email)) {
//     echo json_encode([
//         'success' => false,
//         'message' => 'Все поля обязательны для заполнения'
//     ]);
//     exit;
// }

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

// Включите для отладки (уберите после теста!)
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';                          // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'megapankrat@yandex.ru';            // Наш логин
$mail->Password = '';                 // Наш пароль от ящика либо пароль приложения
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('megapankrat@yandex.ru', 'Prengi');   // От кого письмо 
$mail->addAddress('megapankrat@yandex.ru');     // Add a recipient ; Кому письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = 'Пользователь оставил данные<br>' .
    'Имя: ' . htmlspecialchars($name) . '<br>' .
    'Номер телефона: ' . htmlspecialchars($phone) . '<br>' .
    'E-mail: ' . htmlspecialchars($email);
// Отправляем письмо и возвращаем JSON-ответ
if ($mail->send()) {
    echo json_encode([
        'success' => true,
        'message' => 'Письмо успешно отправлено'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка при отправке: ' . $mail->ErrorInfo
    ]);
}

exit;

?>