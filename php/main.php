<?php
session_start();

if(!(isset($_SESSION['UNAME']) && isset($_SESSION['DNAME']) && isset($_SESSION['ID']))){
    header('Location:../index.php');
}
?>
<!DOCTYPE html>
<html>
    <head>
        <script>
        var name = "<?php
                echo $_SESSION['UNAME'];
            ?>";
        </script>
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
            /* onclick="showLeft()" 
            
            <div class="button" id="BLeftBar" onclick="toggleLeft()"></div>*/
        ?>
        
        <div id="leftBar">
            <ul>
                <li>Create Chat</li>
                <li>Join Chat</li>
                <li>Friends </li>
            </ul>
        </div>
        <div class="button" id="BLeftBar" onclick="toggleLeft()"></div>
        
        
        <div id="friendList"></div>
        <div id="chatRoom">
            
            <ul id="roomList"></ul>
            <h2 id="chatHeader">No room selected</h2>
            <div id="serverList"></div>
            <div id="chat">
                <div class="button" id="join"></div>
                <div class = "text" id="chatWindow"></div>
                <form  onsubmit="send()">
                    
                    <input type="text" id="textFeild">
                    <div class="button" id="send" onclick="send()">Send</div>
                </form>
                
            </div>
        </div>
        <div id="shading" class="hidden invis" onclick="hide()"></div>
        
         <form id="createChat" onsubmit="createChat()">
             Create chat <br> 
            Name<input type="text" name="Name">
            <input type="checkbox" name="isPublic">
            <input type="submit">
        </form>
        
        <form id="joinChat">
            
        </form>
        
        <form id="friends">
            
                
        </form>
        
        
        <script src="../js/jquery.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/main.js"></script>
    </body>
</html>