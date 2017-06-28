<?php
/**
 * Created by IntelliJ IDEA.
 * User: AHMED
 * Date: 30-10-2016
 * Time: 09:11 PM
 */

include_once $_SERVER['DOCUMENT_ROOT'] . '\res\user_manager.inc.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '\res\mysqli.inc.php';

if (!isLoggedIn()) {
    die();
}
header('Content-Type: application/json');

$db = new Database();
$result = $db->UpdateInfo(
    $_SESSION['id'],
    $_POST['nname'],
    $_POST['mob'],
    $_POST['street'],
    $_POST['city']
);
if ($result === true) {
    echo json_encode(array('t' => 's', 'r' => 'Success'));
} else {
    echo json_encode(array('t' => 'e', 'r' => $result));
}

