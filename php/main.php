<?php
session_start();

if(!(isset($_SESSION['UNAME']) && isset($_SESSION['DNAME']) && isset($_SESSION['ID']))){
    header('Location:../index.php');
    echo 'hej';
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
            <ul><li><?php echo $_SESSION['DNAME']; ?></li><li>Thing</li></ul>
        </nav>
        
        
        <?php
            
            //echo $_SESSION['ID'];
            
        ?>
    
    <script src="../js/script.js"></script>
    </body>
</html>