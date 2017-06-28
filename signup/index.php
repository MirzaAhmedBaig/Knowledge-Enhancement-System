<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . '/res/mysqli.inc.php';
?>

<?php session_start();

if(isset($_POST['Submit'])){
    // code for check server side validation
    if(empty($_SESSION['captcha_code'] ) || strcasecmp($_SESSION['captcha_code'], $_POST['captcha_code']) != 0){
        $msg="<span style='color:red'>The Validation code does not match!</span>";// Captcha verification is incorrect.
	} else {// Captcha verification is Correct. Final Code Execute here!
	  	$db = new Database();
	  	$res = $db->CreateAccount(
			$_POST['user_email'],
			$_POST['user_password'],
			$_POST['user_name'],
			$_POST['nick_name'],
			$_POST['user_dob'],
			$_POST['user_email'],
			$_POST['user_mobile'],
			$_POST['user_street'],
			$_POST['user_city'],
			$_POST['user_country']
		);
	  	if($res === true) {
		  die('Thank you for registration. Click <a href="/">Here</a> to sign in.');
		} else {
		  die($res);
		}
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/images/favicon.ico">

    <title>KES | 2016</title>


    <link href="regis.min.css" rel="stylesheet">
    <link href="/static/css/sticky-footer-navbar.min.css" rel="stylesheet">
    <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<!--    <link href="/static/css/signin.css" rel="stylesheet">-->

    <script type='text/javascript'>
        function refreshCaptcha(){
            var img = document.images['captchaimg'];
            img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
        }
    </script>


</head>

<body>

<nav class="navbar navbar-light pos-f-t bg-faded navbar-static-top">
    <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header"
            aria-controls="navbar-header">
        &#9776;
    </button>
    <div class="collapse navbar-toggleable-xs" id="navbar-header">

        <a class="navbar-brand" href="#"><img src="/images/kes1.ico"></a>
        <ul class="nav  navbar-nav" style="font-size: 20px">
            <li class="nav-item active">
                <a class="nav-link" href="/">Home </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
            </li>

        </ul>

        <form class="form-inline pull-xs-right">
            <button class="btn btn-outline-success" type="button">Log In</button>
            <a href="/signup">
                <button class="btn btn-outline-success active" type="button"
                ">Sign Up</button></a>
        </form>
    </div>
</nav>
<div class="container">
    <form action="<?=$_SERVER['PHP_SELF']?>" class="form-signin" method="post">

        <h1>Sign Up</h1>

        <fieldset>
            <!--        <legend><span class="number">1</span>Your basic info</legend>-->
            <label for="name">Name:</label>
            <input type="text" id="name" name="user_name" required autofocus>

            <label for="name">Nick Name:</label>
            <input type="text" id="nick" name="nick_name" required autofocus>

            <label for="mail">Email:</label>
            <input type="email" id="mail" name="user_email" required autofocus>

            <label for="password">Password:</label>
            <input type="password" id="password" name="user_password" required autofocus>

            <label for="confirmpassword">Confirm Password:</label>
            <input type="password" id="confirmpassword" name="user_cpassword" required autofocus>

            <label for="number">Mobile No:</label>
            <input type="number" id="mobile" name="user_mobile" required autofocus>

            <label for="date">DOB:</label>
            <input type="date" id="dob" name="user_dob" required autofocus>

			<label for="user_street">Street:</label>
			<input type="text" id="user_street" name="user_street" required autofocus>

			<label for="user_city">City:</label>
			<input type="text" id="user_city" name="user_city" required autofocus>


		  <label for="user_country">Country:</label>
            <input type="text" id="user_country" name="user_country" required autofocus>

            <img src="/captcha/captcha.php?rand=<?php echo rand();?>" id='captchaimg'>
            <br><br>
            <label for='message'>Enter the code above here :</label>
            <input id="captcha_code" name="captcha_code" type="text" required autofocus>
            <?php if(isset($msg)){
                echo $msg;
            } ?>
            <br>
            Can't read the image? click <a href='javascript: refreshCaptcha();'>here</a><br><br>

        </fieldset>

        <button type="submit" name="Submit" class="btn btn-lg btn-outline-success active btn-block" onclick="return validate();">Sign Up</button>
    </form>
</div>

<footer class="footer">
    <div class="container">
        <span class="text-muted">Copyright � 2016 MGM'S COE. All rights reserved.</span>
    </div>
</footer>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"
        integrity="sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY"
        crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="/static/js/jquery.min.js"><\/script>')</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"
        integrity="sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB"
        crossorigin="anonymous"></script>
<script src="/static/bootstrap/js/bootstrap.min.js"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="/static/js/ie10-viewport-bug-workaround.min.js"></script>

</body>
</html>
