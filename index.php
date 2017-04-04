<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/index.css">
         
    </head>
    <body>
        <div id="buttonDiv">
            <div class="button" id="loginB" onclick="showLogin()"><h1>LOGIN</h1></div>
            <div class="button" id="registerB" onclick="showRegister()"><h1>REGISTER</h1></div>
        </div>
        <div class="invis hidden" id="shading" onclick="hide()"></div>
        <form class="hidden" id="login" onsubmit="loginUser();">
            <h1>Login</h1>
            <h3>Username:</h3>
            <input type="text" name="uname">
            <h3>Password:</h3>
            <input type="password" name="psw">
            <input type="submit" name="Login" onsubmit="return login();">
        </form>
        <form class="hidden" id="register">
            <h1>Register</h1>
            <h3>Display Name:</h3>
            <input type="text" name="uname">
            <h3>Username:</h3>
            <input type="text" name="uname">
            <h3>Password:</h3>
            <input type="password" name="psw">
            <h3>Repeat Password:</h3>
            <input type="password" name="psw">
        </form>
        <!--
        Ajax Test buttons
        <button onclick="loadDoc('test.php', testfunc, true, 'apa=Hah&gurka=BA')">Hello</button>
        <button onclick="loadDoc('test.php?apa=hei', testfunc, false, '')">Hello</button>-->
        
        
       <script src="js/jquery.js"></script>
        <script src="js/script.js"></script>
        <script src="js/index.js"></script>
        </body>
</html>