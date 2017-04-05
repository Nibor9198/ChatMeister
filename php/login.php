<?php
include '../config.php';
if(isset($_POST['uname']) && isset($_POST['psw'])) {
    $u = $_POST['uname'];
    $p = $_POST['psw'];
    $sql = "select ID,Password from user where Username = ?;";
    if($mysqli = connect_db()){
        if($stmt = $mysqli->prepare($sql)){
            $hp = hasha($p);
            $stmt->bind_param("s",$u);
            $stmt->execute();
            $stmt->bind_result($ID, $Pass);
            if($stmt->fetch()){
                if(checkPassword($p, $Pass)){
                    echo $ID;
                    echo 'YES';
                }else{
                    echo $hp . ' ' . $Pass;
                    
                    echo -1;
                    echo 'NO';
                }
            }else{
                echo 'no fetch';
            }
            //$result = $mysqli->query($sql);
            $mysqli->close();
        }
        //print_r($mysqli->error);
    }
}






?>