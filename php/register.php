<?php
include '../config.php';
if(isset($_POST['uname']) && isset($_POST['psw'])) {
    $dname = $_POST['dname'];
    $uname = $_POST['uname'];
    $p = $_POST['psw'];
    $pr = $_POST['pswr'];
    if(checkPassword($p, hasha($pr))){
        $sql = "select ID from User where Username=?;";
        
        if($mysqli = connect_db()){
            if($stmt = $mysqli->prepare($sql)){
                $stmt->bind_param("s",$uname);
                $stmt->execute();
                $stmt->bind_result($ID);
                if($stmt->fetch()){
                }else{
                    $sql = "insert into User values (0,?,?,?);";
                    if($stmt = $mysqli->prepare($sql)){
                $stmt->bind_param("sss",$uname, hasha($p), $dname);
                $stmt->execute();
                $stmt->bind_result();
                if($stmt->fetch()){
                    
                }else{
                    
                
                }
            }
                
                }
            //$result = $mysqli->query($sql);
            
            }
        //print_r($mysqli->error);
        $mysqli->close();
        }
        
        
    }else{
        //Repeated Password is not the same
    }
    
    
    
}






?>