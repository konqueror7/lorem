<?php

$txt = '';
$success = false;

$name = '';
if (!empty($_POST["name"])) {
    $name = htmlspecialchars($_POST["name"]);
}


if (isset($_POST["email"]) && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $success_email = true;
} else {
    $txt .= 'E-mail address '.$_POST["email"].' is wrong.<br>';
    $success_email = false;
}

if (!isset($_POST["accept"])) {
    $success_accept = false;
    $txt .= 'Confirm the consent to data processing<br>';
} else {
    $success_accept = true;
}

if ($success_accept && $success_email) {
    mail('info@agency-mst.com', 'Хочу петь басом!', $_POST["email"]);
    $success = true;
    $txt = 'Your message is sent';
}

$msgArr = ['success' => $success, 'txt' => $txt, 'email' => $_POST["email"]];

echo trim(json_encode($msgArr));