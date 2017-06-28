<?php
/**
 * User: AamerSOHEL
 * Date: 30-06-2016
 * Time: 05:10 PM
 */
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Error</title>
  <link rel="icon" href="/images/favicon.ico">
  <link rel="stylesheet" href="/static/coremine/css/coremine.min.css"/>
  <link rel="stylesheet" href="style.min.css"/>
</head>
<body>
<div style="
background-color: white;
border: 1px solid #c2ccd1;
-moz-border-radius: 8px;
-webkit-border-radius: 8px;
border-radius: 8px;
display: block;
padding: 10px;
margin:50px auto;
max-width: 500px;
min-height: 300px;
">
  <?php
  if(!isset($_GET['err'])) {
	echo '<h1 class="text-danger">Unknown Error</h1>';
  } else {
	?>
	<h1 class="text-danger"><?=$_GET['err']?></h1>
	<p>
	  <?php
	  switch($_GET['err']) {
		case 403:
		  echo 'Sorry you can\'t access this resource.';
		  break;
		case 404:
		  echo 'You have entered wrong url, please insert valid url.';
		  echo '<br/><a href="' .WS_URL. '">Click Here</a> to goto homepage.' ;
		  break;
	  }
	  ?>
	</p>
	<?php
  }
  ?>
</div>
</body>
</html>
