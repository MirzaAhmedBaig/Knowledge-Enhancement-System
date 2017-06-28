<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '\res\user_manager.inc.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/res/mysqli.inc.php';

if (isLoggedIn()) {
    header("Location: /home");
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>KnowEn</title>
    <link rel="icon" href="/images/favicon.png">
    <link rel="stylesheet" href="/static/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/static/bootstrap/custom/custom.min.css"/>
    <script type="text/javascript" src="/static/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/static/bootstrap/custom/custom.min.js"></script>

    <script type='text/javascript'>
        function refreshCaptcha() {
            var img = document.images['captchaimg'];
            img.src = img.src.substring(0, img.src.lastIndexOf("?")) + "?rand=" + Math.random() * 1000;
        }
    </script>
    <style>
        .navbar-default {
            box-shadow: none;
        }

        body {
            background: url('/images/back1.jpg');
        }
    </style>
</head>

<body id="home" ng-app="mainApp">
<div class="navbar navbar-default navbar-fixed-top navbar-transparent">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#/" class="navbar-brand"><img src="/images/logo.png">
                <span style="color:#ffc75e;">know</span><span style="color: white">en</span>
            </a>
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
            <ul class="nav navbar-nav">
                <li><a href="">Whats New</a></li>
                <li><a href="">Help</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li><a href="/#register" ng-click="register"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;Signup</a>
                </li>
            </ul>

        </div>
    </div>
</div>

<div class="splash">
    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <h3>Knowledge Enhancement System</h3>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div ng-view></div>
    <script type="text/ng-template" id="login.htm">
        <br>
        <div class="row">

            <div class="col-sm-5 col-xs-12 col-md-7 col-lg-8 pull-left">
                <div  class="container-responsive">
                    <h1 class="alt-h1 text-shadow-dark text-white lh-condensed mb-3">Enhance your knowledge<br> with our website</h1>
                    <p style="font-size: 25px;">The web portal that allow people to share their knowledge, improve their knowledge by asking questions and provide an interesting platform to user. People motivates to ask question and solve answers for the sake of points.</p>
                </div>
            </div>

            <div class="col-sm-6 col-xs-12 col-md-4 col-lg-3 pull-right" style="background: #eeeeee;">
                <h2 class="form-signin-heading" style="text-align: center;">Sign In</h2>

                <form action="">
                    <label for="eid">Knowen ID</label>
                    <input type="text" id="kesid" ng-model="kesid" ng-change="error=''" class="form-control"
                           placeholder="Knowen ID" required autofocus><br>
                    <label for="pass">Password</label>
                    <input type="password" id="pass" ng-model="pass" ng-change="error=''" class="form-control"
                           placeholder="Password" required><br>

                    <div class="text-danger">{{error}}</div>
                    <input type="checkbox" value="remember_me"> Remember Me<br><br>

                    <button type="submit" ng-click="login()" ng-disabled="!isValid()" class="btn btn-success active"
                            style="width: 100%">Sign in
                    </button>

                    <p style="width: 100%;text-align: center;padding-top:8px"><a href="#register"
                                                                                 style="text-align: center">Sign
                            Up</a></p>
                </form>
            </div>
        </div>
    </script>

    <script type="text/ng-template" id="register.htm">
        <div ng-show="isRegistered">
            <br>
            <div class="row">
                <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
                    <div class="alert alert-success" style="text-align: center; font-size: 20px;">
                        <div class="alert alert-success" role="alert">
                            <h1 class="alert-heading">Well done!</h1>
                            <p style="font-size: 30px">You successfully Registered</p>
                            <p class="mb-0">To continue click <a href="#/"><b>here</b></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ng-show="!isRegistered">
        <form action="">
            <div class="row" >
                <h2 class="form-signin-heading" style="text-align: center" >Sign Up</h2><br>
                <div class="col-sm-6 col-xs-12 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-3 "style="background: #eeeeee;">
                    <br><label for="name">User Name</label>
                    <input type="text" id="name" ng-model="name" ng-change="error4=''" class="form-control"
                           placeholder="User Name" required
                           autofocus>
                    <div class="text-danger">{{error4}}</div>
                    <br>

                    <label for="eid">Email ID</label>
                    <input type="email" id="eid" ng-model="eid" class="form-control"
                           placeholder="Email ID" required autofocus><br>

                    <label for="pass">Password</label>
                    <input type="password" id="pass" ng-model="pass" ng-change="error=''" class="form-control"
                           placeholder="Password" required><br>

                    <label for="cpass">Confirm Password</label>
                    <input type="password" id="cpass" ng-model="cpass" ng-change="error2=''" class="form-control"
                           placeholder="Confirm Password" required>
                    <div class="text-danger">{{error2}}</div>
                    <br>

                    <label for="street">Street</label>
                    <input type="text" id="street" ng-model="street" class="form-control" placeholder="Street" required
                           autofocus>
                    <br>


                    <label for="city">City</label>
                    <input type="text" id="city" ng-model="city" ng-change="error6=''" class="form-control"
                           placeholder="City" required
                           autofocus>
                    <div class="text-danger">{{error6}}</div>
                    <br>

                    <label for="country">Country</label>
                    <input type="text" id="country" ng-model="country" ng-change="error7=''" class="form-control"
                           placeholder="Country"
                           required autofocus>
                    <div class="text-danger">{{error7}}</div>
                    <br>

                </div>

                <div class="col-sm-6 col-xs-12 col-md-4 col-lg-3" style="background: #eeeeee;">
                    <br><label for="nname">Nick Name</label>
                    <input type="text" id="nname" ng-model="nname" class="form-control" placeholder="Nick Name if any"
                           required autofocus><br>

                    <label for="mob">Mobile No</label>
                    <input type="number" min="0" minlength="10" maxlength="10" pattern="[0-9]{10}" id="mob"
                           ng-model="mob" ng-change="error5=''" class="form-control"
                           placeholder="Mobile Number"
                           required autofocus>
                    <div class="text-danger">{{error5}}</div>
                    <br>

                    <label for="dob">DOB</label>
                    <input type="date" id="dob" ng-model="udob" class="form-control"
                           max="<?php echo date('Y-m-d'); ?>" placeholder="Date of Birth" required
                           autofocus><br>


                    <label for="Knowen Id">Knowen Id</label>
                    <input type="text" id="kesid" ng-model="kesid" ng-change="error8=''" class="form-control"
                           placeholder="Knowen ID"
                           required autofocus>
                    <div class="text-danger">{{error1}}</div>
                    <br>

                    <img src="/captcha/captcha.php?rand=<?php echo rand(); ?>" id='captchaimg'>
                    <br><br>Can't read the image? click <a href='javascript: refreshCaptcha();'>here</a><br>
                    <label for='message'>Enter the code above here </label>
                    <input id="captcha_code" name="captcha_code" type="text" ng-model="captcha_code"
                           ng-change="error3=''" class="form-control" placeholder="Enter the code" required autofocus>
                    <div class="text-danger">{{error3}}</div>
                    <br>

                    Already Signed Up? Click <a href="#login" ng-click=""> here</a><br>
                    <button type="submit" ng-click="register()" ng-disabled="!isValid()" class="btn btn-success active"
                            style="width: 100%">Sign Up
                    </button>
                    <br><br>

                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 col-xs-12 col-md-4 col-lg-3">

                </div>
            </div>
        </form>
            </div>
    </script>
</div>

<script src="/static/angularjs/angular.min.js"></script>
<script src="/static/angularjs/angular-route.min.js"></script>
<script src="script.min.js"></script>
<script type="text/javascript" src="/static/jquery/jquery.min.js"></script>
<script type="text/javascript" src="/static/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>