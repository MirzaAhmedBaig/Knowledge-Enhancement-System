<?phpinclude_once $_SERVER['DOCUMENT_ROOT'] . '\res\user_manager.inc.php';include_once $_SERVER['DOCUMENT_ROOT'] . '\res\mysqli.inc.php';if(!isLoggedIn()) {	die();}header('Content-Type: application/json');$db = new Database();$result = $db->GetAllMGroups($_SESSION['id']);echo json_encode(array('t' => 's', 'r' => $result));