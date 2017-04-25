<?php
    include "../config.php";

    if(isset($_POST['id'])){
        if($mysqli = connect_db()){
            $sql = "select UID, text from message where Chatid = ?";
            if($stmt = $mysqli->prepare($sql)){
                $stmt->bind_param("i",$_POST['id']);
                $stmt->execute();
                $stmt->bind_result($UID, $text);
                
                $texts = [];
                while($stmt->fetch()){
                    $sql2 = "select DisplayName from user where ID = ?";
                    $name = "fail";
                    if($stmt2 = $mysqli->prepare($sql2)){
                        $stmt2->bind_param("i", $UID);
                        $stmt2->execute();
                        $stmt2->bind_result($name);
                        $stmt2->fetch();
                        
                        
                    }
                    $texts[] = $name . ": " . $text;
                }
                $json = json_encode($texts);
                echo $json;
            }
        }    
    }else{
        echo "bajs";
    }
?>