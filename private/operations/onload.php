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
$result = $db->GetProfilePicture($_SESSION['id']);
if ($result === false) {
    echo json_encode(array('t' => 'e'));
} else {
    echo json_encode(array('t'=>'s', 'r'=>$result));
}
