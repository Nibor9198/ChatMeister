<?php
include '../config.php';
if(isset($_POST['uname']) && isset($_POST['psw'])) {
    $u = $_POST['uname'];
    $p = $_POST['psw'];
    $sql = "select ID,Password,DisplayName  from user where Username = ?;";
    if($mysqli = connect_db()){
        if($stmt = $mysqli->prepare($sql)){
            $hp = hasha($p);
            $stmt->bind_param("s",$u);
            $stmt->execute();
            $stmt->bind_result($ID, $Pass, $dn);
            if($stmt->fetch()){
                if(checkPassword($p, $Pass)){
                    session_start();
                    $_SESSION['ID'] = $ID;
                    $_SESSION['UNAME'] = $u;
                    $_SESSION['DNAME'] = $dn;
                    echo 1;
                    setcookie("uname", $_SESSION['UNAME'], time() + 2 * 3600,"/");
                    setcookie("id", $_SESSION['ID'], time() + 2 * 3600,"/");
                    
                    setcookie("dname", $_SESSION['DNAME'], time() + 2 * 3600,"/");
                    
                }else{
                    echo $hp . ' ' . $Pass;
                    
                    echo 0;
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