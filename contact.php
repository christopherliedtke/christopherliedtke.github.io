<?php

$name = htmlspecialchars(stripslashes(trim($_POST['name'])));
$email = htmlspecialchars(stripslashes(trim($_POST['email'])));
$phone = htmlspecialchars(stripslashes(trim($_POST['phone'])));
$subject = htmlspecialchars(stripslashes(trim($_POST['subject'])));
$message = htmlspecialchars(stripslashes(trim($_POST['message'])));

$formcontent = '<html><body>';
$formcontent .= " <p>Von: $name</p>
  <p>Telefonnummer: $phone</p>
  <p>E-Mail Adresse: $email</p>
  <h2>Nachricht:</h2>
  <p>$message \n \n</p>";
$formcontent .= '</body></html>';

$recipient = "christopherliedtke@gmx.com";

// To send HTML mail, the Content-type header must be set
$mailheader  = 'MIME-Version: 1.0' . "\r\n";
$mailheader .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Create email headers
$mailheader .= 'From: '.$email."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($recipient, $subject, $formcontent, $mailheader) or die('Fehler!');
echo "Danke für Ihre Nachricht!";

?>
