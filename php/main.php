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
        <!--<nav>
            <table><tr><td><?php //echo $_SESSION['DNAME']; ?></td></tr></table>
            <li>Thing</li></ul>
        </nav>-->
        
        
        <?php
            
            //echo $_SESSION['ID'];
            /* onclick="showLeft()" 
            
            <div class="button" id="BLeftBar" onclick="toggleLeft()"></div>*/
        ?>
        
        <div id="leftBar">
            <ul>
                <li id="top"><?php echo $_SESSION['DNAME']; ?></li>
                <li onclick="setHide('createChat',false)">Create Chat</li>
                <li onclick="setHide('joinChat',false);updateChatTable()">Join Chat</li>
                <li onclick="logout()">Logout</li>
            </ul>
        </div>
        <div class="button" id="BLeftBar" onclick="toggleLeft()">
            <div id="top" class="stripe"></div>
            <div class="stripe"></div>
            <div class="stripe"></div>
        </div>
        
        
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
        
         <form id="createChat" onsubmit="createChat()" class="hidden">
             <h2>Create chat</h2> <br> 
            Name<input type="text" name="Name"><br>
            Public<input type="checkbox" name="isPublic"><br>
            <input type="submit">
        </form>
        
        <form id="joinChat" onsubmit="joinChat()" class="hidden">
            <h2>Join chat</h2>  <br>  
            <!-- Id<input type="text" name="Name">
            <input type="submit"> -->
            <input type="text" onkeypress="updateChatTable()">
            <div class="button" onclick="updateChatTable()">Refresh</div>
            <table>
                <tr id="header">
                    <td>Servername</td>
                    <td>Join</td>
                </tr>
            </table>
        </form>
        
        <form id="friends">
            <table id="search">
            
            </table>
        </form>
        
        
        <script src="../js/jquery.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/main.js"></script>
    </body>
</html>