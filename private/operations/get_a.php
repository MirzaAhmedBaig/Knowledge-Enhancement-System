<?php/** * User: AamerSOHEL * Date: 30-10-2016 * Time: 01:02 PM */include_once $_SERVER['DOCUMENT_ROOT'] . '\res\user_manager.inc.php';include_once $_SERVER['DOCUMENT_ROOT'] . '\res\mysqli.inc.php';if (!isLoggedIn()) {  die();}if (!isset($_POST['qid'])) {  die();}header('Content-Type: application/json');$id = $_SESSION['id'];$qId = $_POST['qid'];$db = new Database();$result = $db->GetAnswers($id, $qId);/*$result = array (	$_POST['qid'],	"This is question?",	"This is description",	5,	"Asker",	2.4,	4,	array(              // Comment array		array(			"This comment 1",			"Aamer"		),		array(			"This comment 2",			"Aamer"		),		array(			"This comment 3",			"Aamer"		)	),	array(            // Answers array		array(			1,			"This is answer 1",			"Answer Member",			3.4,			3,			array(				array(					"This comment 1",					"Aamer"				),				array(					"This comment 2",					"Aamer"				),				array(					"This comment 3",					"Aamer"				)			)		),		array(			2,			"This is answer 2",			"Answer Member",			5,			4, array(			array(				"This comment 1",				"Aamer"			),			array(				"This comment 2",				"Aamer"			),			array(				"This comment 3",				"Aamer"			)		)		),		array(			3,			"This is answer 3",			"Answer Member",			3.4,			5.0,			array(				array(					"This comment 1",					"Aamer"				),				array(					"This comment 2",					"Aamer"				),				array(					"This comment 3",					"Aamer"				)			)		),	));*/if ($result === false) {  echo json_encode(array('t' => 'e', 'r' => 'Something went wrong'));} else {  echo json_encode(array('t' => 's', 'r' => $result));}