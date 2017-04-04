<?php
include 'config.php';
if(isset($_POST['uname']) && isset($_POST['psw'])) {
    $u = $_POST['uname'];
    $p = $_POST['psw'];
    
    echo 'Hej ' .$u;
    
    if($mysqli = connect_db()){
        
        $result = $mysqli->query($sql);
        print_r($mysqli->error);
    }
    
    
    
    
    
}






?>