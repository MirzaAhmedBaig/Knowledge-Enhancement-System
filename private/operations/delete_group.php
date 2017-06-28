<?php
/**
 * User: Mirza Ahmed Baig
 * Date: 10-10-2016
 * Time: 09:51 PM
 */

include_once $_SERVER['DOCUMENT_ROOT'] . '\res\user_manager.inc.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '\res\mysqli.inc.php';

if(!isLoggedIn()) {
    die();
}

if(!isset($_POST['gid'])) {
    die();
}

header('Content-Type: application/json');


$groupId = $_POST['gid'];
$db = new Database();
$result = $db->DeleteGroup($_SESSION['id'],$groupId);

if($result === false) {
    echo json_encode(array('t' => 'e', 'r' => 'Something went wrong'));
} else {
    echo json_encode(array('t' => 's'));
}

