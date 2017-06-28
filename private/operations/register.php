<?php
/**
 * User: AHMED
 */

include_once $_SERVER['DOCUMENT_ROOT'] . '/res/mysqli.inc.php';

header('Content-Type: application/json');

session_start();

if (empty($_SESSION['captcha_code']) || strcasecmp($_SESSION['captcha_code'], $_POST['cap']) != 0) {
    $msg = "The Validation code does not match!";
    echo json_encode(array('t' => 'x', 'r' => $msg));
} else {
    $db = new Database();
    $result = $db->CreateAccount(
        $_POST['id'],
        $_POST['pass'],
        $_POST['name'],
        $_POST['nname'],
        $_POST['dob'],
        $_POST['eid'],
        $_POST['mob'],
        $_POST['street'],
        $_POST['city'],
        $_POST['country']
    );
    if ($result === true) {
        echo json_encode(array('t' => 's', 'r' => 'Success'));
    } else {
        echo json_encode(array('t' => 'e', 'r' => $result));
    }

}
