<?php
/**
 * Created by IntelliJ IDEA.
 * User: AHMED
 * Date: 04-11-2016
 * Time: 08:27 PM
 */
include_once $_SERVER['DOCUMENT_ROOT'] . '\res\user_manager.inc.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '\res\mysqli.inc.php';

if (!isLoggedIn()) {
    die();
}

header('Content-Type: application/json');
$db = new Database();
$result = $db->imgUpload($_SESSION['id'],$_POST['image']);
if ($result === false) {
    echo json_encode(array('t' => 'e'));
} else {
    echo json_encode(array('t'=>'s', 'r'=>$result));
}
