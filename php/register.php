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
                    echo "1";
                }else{
                    $sql = "insert into User values (0,?,?,?);";
                    if($stmt = $mysqli->prepare($sql)){
                        $hash = hasha($p);
                        $stmt->bind_param("sss",$uname,$hash, $dname);
                        $stmt->execute();
                        echo 0;            
                    }
                
                }
            }
        $mysqli->close();
        }
        
        
    }else{
        //Repeated Password is not the same
        echo"2";
    }
    
    
    
}






?>