<?php
    include "../config.php";
    if(isset($_POST['cm'])){
        $cm = $_POST['cm'];
        if($cm == "getChat" && isset($_POST['cid'])){
            if($mysqli = connect_db()){
                $sql = "select UID, text from message where Chatid = ?";
                if($stmt = $mysqli->prepare($sql)){
                    $stmt->bind_param("i",$_POST['cid']);
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
        }else if($cm == "sendMessage" && isset($_POST['message']) && $_POST['cid']){
        
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
                        $stmt3->close();
                    }
                }
        
            }
        }else if(isset($_POST['cid']) && $cm == "checkUpdate"){
            if($mysqli3 = connect_db()){
                $number;
                $sql = "select number from chat where id = ?";
                if($stmt3 = $mysqli3->prepare($sql)){
                    
                    $cid = $_POST['cid'];
                    $stmt3->bind_param("i",$cid);
                    $stmt3->execute();
                    $stmt3->bind_result($number);
                    if($stmt3->fetch())                         echo json_encode([$cid, $number]);
                    $stmt3->close();
                }
            }
        }else if(isset($_POST['id']) && $cm == "getChats"){
            if($mysqli = connect_db()){
                $id = $_POST['id'];
                $array = array(array(),array(),array());
                $cid;
            $sql = "select Chatid from memberof where UID1 = ?";
                if($stmt3 = $mysqli->prepare($sql)){
                    $stmt3->bind_param("i",$id);
                    $stmt3->execute();
                
                    $stmt3->bind_result($cid);
                    while($stmt3->fetch()){
                        if($mysqli2 = connect_db()){
                            $sql = "select Number, Name  from chat where ID = ?";
                            
                            if($stmt2 = $mysqli2->prepare($sql)){
                                
                                $stmt2->bind_param("i",$cid);
                                $stmt2->execute();
                                
                                $stmt2->bind_result($num,$name);
                                if($stmt2->fetch()){
                                
                                    array_push($array[0],$cid);
                                    array_push($array[1],$num);
                                     array_push($array[2],$name);
                                }
                                $stmt2->close();
                            }
                                //array_push($array,$cid);
                        }
                    }
                    $json = json_encode($array);
                    echo $json;
                    $stmt3->close();
                }
            }
        
        }else if($cm == "createChat"){
            if($mysqli = connect_db()){
                session_start();
                $name = $_POST['name'];
                
                if($_POST['bool'])
                    $bool = 1;
                else
                    $bool = 0;
                $id = $_SESSION['ID'];
               // echo $name, 
                $sql = "insert into chat values (0,?,?,?,0)";
                if($stmt = $mysqli->prepare($sql)){
                    $stmt->bind_param("sii",$name, $bool,$id);
                    $stmt->execute();
                    if($stmt->fetch()){}
                    $stmt->close();
                }
            }
        }else if($cm == "joinChat"){
            if($mysqli = connect_db()){
                
                session_start();
                $cid = $_POST['cid'];
                $id = $_SESSION['ID'];
                $join = false;
                $sql = "select isPublic from chat where ID =?";
                if($stmt = $mysqli->prepare($sql)){
                    $stmt->bind_param("i",$cid);
                    $stmt->execute();
                    $stmt->bind_result($join);
                    if($stmt->fetch()){}
                    $stmt->close();
                }
                if(!$join){
                    //Invite implimentation needed
                //   $sql = "select INVITOR from invited where ID =? and where Chatid = ?";
               // if($stmt = $mysqli->prepare($sql)){
               //     $stmt->bind_param("i",$cid);
                //    $stmt->execute();
               //     $stmt->bind_param($join);
               //     if($stmt->fetch()){}
               //     $stmt->close();
                }
            
                if($join){
                    
                    if($mysqli2 = connect_db()){
                        $sql2 = "insert into memberOf values (?,?)";
                        if($stmt2 = $mysqli2->prepare($sql2)){
                            $stmt2->bind_param("ii",$id,$cid);
                            $stmt2->execute();
                            echo true;
                            $stmt2->close();
                        }
                    }else
                        echo false;
                }
            }
            }else{
            echo "No messages";
        }
    }else{
        echo "NOOOOOS";
    }
?>