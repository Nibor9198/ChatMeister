<?php
    include "../config.php";
    
    if(isset($_POST['id'])){
        if($mysqli = connect_db()){
            $sql = "select UID, text from message where Chatid = ?";
            if($stmt = $mysqli->prepare($sql)){
                $stmt->bind_param("i",$_POST['id']);
                $stmt->execute();
                $stmt->bind_result($UID, $text);
                
                $texts = array();
                while($stmt->fetch()){
                    $sql2 = "select DisplayName from user where ID = ?";
                    $name = "Herobrine";
                    if($mysqli2 = connect_db()){
                        if($stmt2 = $mysqli2->prepare($sql2)){
                            $stmt2->bind_param("i", $UID);
                            $stmt2->execute();
                            $stmt2->bind_result($name);
                            $stmt2->fetch();
                            $stmt2->close();
                        }
                    }
                    
                    //$texts[] = $name . ": " . $text;
                    $texts[count($texts)] = array($name, $text);
                }
                $json = json_encode($texts);
                echo $json;
            }
        }    
    }else if(isset($_POST['message']) && $_POST['cid']){
        
        if($mysqli3 = connect_db()){
            session_start();
            echo $_POST['cid'];
         $sql = "insert into message values (0,?,now(),?,?)";
            if($stmt3 = $mysqli3->prepare($sql)){
                $message = $_POST['message'];
                $id = $_SESSION['ID'];
                $cid = $_POST['cid'];
                $stmt3->bind_param("sii",$message,$id,$cid);
                $stmt3->execute();
                //$stmt3->fetch();
                $stmt3->close();
                $sql = "UPDATE chat set number = (number + 1) where ID = ?";
                if($stmt3 = $mysqli3->prepare($sql)){
                    $message = $_POST['message'];
                    $id = $_SESSION['ID'];
                    $cid = $_POST['cid'];
                    $stmt3->bind_param("i", $cid);
                    $stmt3->execute();
                    //$stmt3->fetch();
                    $stmt3->close();
                }
            }
        
        }
    }else if(isset($_POST['cid'])){
        if($mysqli3 = connect_db()){
            echo $_POST['cid'];
         $sql = "select number from chat where id = ?";
            if($stmt3 = $mysqli3->prepare($sql)){
                $message = $_POST['message'];
                $cid = $_POST['cid'];
                $stmt3->bind_param("i",$cid);
                $stmt3->execute();
                //$stmt3->fetch();
                $stmt3->close();
            }
    }else {
        echo "No messages";
    }
    
?>