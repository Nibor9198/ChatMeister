<?php
session_start();

if(!(isset($_SESSION['UNAME']) && isset($_SESSION['DNAME']) && isset($_SESSION['ID']))){
    header('Location:../index.php');
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/main.css">
    </head>
    <body>
        <nav>
            <!--<table><tr><td><?php //echo $_SESSION['DNAME']; ?></td></tr></table>-->
            <ul><li><?php echo $_SESSION['DNAME']; ?></li><li>Thing</li><li onclick="logout()">Logout</li></ul>
        </nav>
        
        
        <?php
            
            //echo $_SESSION['ID'];
            
        ?>
        <div id="serverList"></div>
        <div id="friendList"></div>
        <div id="chatRoom">
            <div id="roomList">
            </div>
            <div id = "chat">
                <div class = "text" id="chatWindow"></div>
                <div class="text" id="textFeild"></div>
                <div class="button"></div>
            </div>
        </div>
    <script src="../js/script.js"></script>
    <script src="../js/main.js"></script>
    </body>
</html>