<?php
/**
 * Created by IntelliJ IDEA.
 * User: AamerSOHEL
 * Date: 10-06-2016
 * Time: 08:25 PM
 */

require $_SERVER['DOCUMENT_ROOT'] . '/res/libs/sql/core.inc.php';

header('Content-Type: application/json');
$db = new mysqli(MYSQL_URI, MYSQL_USR, MYSQL_PWD, MYSQL_DBN, MYSQL_PORT) or die('MYSQL CONNECTION FAILED');
$result = $db->query('select * from countries');
echo json_encode($result->fetch_all(1));
$db->close();