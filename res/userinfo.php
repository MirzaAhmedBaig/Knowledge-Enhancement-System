<?php
/**
 * Created by IntelliJ IDEA.
 * User: AamerSOHEL
 * Date: 10-06-2016
 * Time: 08:25 PM
 */

require $_SERVER['DOCUMENT_ROOT'] . '/res/libs/sql/core.inc.php';

$db = new mysqli(MYSQL_URI, MYSQL_USR, MYSQL_PWD, MYSQL_DBN) or die('MYSQL CONNECTION FAILED');
$data = rand(1000,9999);
$db->query("insert into temp values(null,'$data')");

echo "{$db->affected_rows} Row(s) Affected<br/>Inserted $data at {$db->insert_id} location";

$db->close();