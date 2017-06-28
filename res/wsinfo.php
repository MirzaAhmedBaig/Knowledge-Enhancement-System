<?php
header('Content-Type: application/json');

$info = array(
	'name' => 'KES',
	'url' => 'http://www.kes.com',
	'time' => time(),
	'author' => 'Aamer Sohel',
	'tech' => array(
		'client' => 'jQuery, js, html, css',
		'server' => 'php, json, mysql'
	),
	'start_date' => '04/06/2016'
);

echo json_encode($info);

?>