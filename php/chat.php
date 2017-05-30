<?php
    include "../config.php";
//cm is the command
    if(isset($_POST['cm'])){
        $cm = $_POST['cm'];
        //Get the messages for a chat
        if($cm == "getChat" && isset($_POST['cid'])){
            if($mysqli = connect_db()){
                $sql = "select UID, text from Message where Chatid = ?";
                if($stmt = $mysqli->prepare($sql)){
                    $stmt->bind_param("i",$_POST['cid']);
                    $stmt->execute();
                    $stmt->bind_result($UID, $text);
                    
                    $texts = array();
                    while($stmt->fetch()){
                        $sql2 = "select DisplayName from User where ID = ?";
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
                        $texts[count($texts)] = array($name, $text);
                    }
                    $json = json_encode($texts);
                    echo $json;
                }
            }    
            //Adds a message to the database
        }else if($cm == "sendMessage" && isset($_POST['message']) && $_POST['cid']){
        
            if($mysqli3 = connect_db()){
                session_start();
                echo $_POST['cid'];
                $sql = "insert into Message values (0,?,now(),?,?)";
                if($stmt3 = $mysqli3->prepare($sql)){
                    $message = $_POST['message'];
                    $id = $_SESSION['ID'];
                    $cid = $_POST['cid'];
                    $stmt3->bind_param("sii",$message,$id,$cid);
                    $stmt3->execute();
                    //$stmt3->fetch();
                    $stmt3->close();
                    $sql = "UPDATE Chat set Number = (Number + 1) where ID = ?";
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
            //Check if a chat needs updating by retrieving the update number
        }else if(isset($_POST['cid']) && $cm == "checkUpdate"){
            if($mysqli3 = connect_db()){
                $number;
                $sql = "select Number from Chat where ID = ?";
                if($stmt3 = $mysqli3->prepare($sql)){
                    
                    $cid = $_POST['cid'];
                    $stmt3->bind_param("i",$cid);
                    $stmt3->execute();
                    $stmt3->bind_result($number);
                    if($stmt3->fetch())                         
                        echo json_encode([$cid, $number]);
                    $stmt3->close();
                }
            }
            //Get all the chats that a user is member of 
        }else if(isset($_POST['id']) && $cm == "getChats"){
            if($mysqli = connect_db()){
                $id = $_POST['id'];
                $array = array(array(),array(),array());
                $cid;
            $sql = "select Chatid from MemberOf where UID1 = ?";
                if($stmt3 = $mysqli->prepare($sql)){
                    $stmt3->bind_param("i",$id);
                    $stmt3->execute();
                
                    $stmt3->bind_result($cid);
                    while($stmt3->fetch()){
                        if($mysqli2 = connect_db()){
                            $sql = "select Number, Name  from Chat where ID = ?";
                            
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
        //Creates a chat
        }else if($cm == "createChat"){
            if($mysqli = connect_db()){
                session_start();
                $name = $_POST['name'];
                $bool = $_POST['bool'];
                //if($_POST['bool'])
                //    $bool = 1;
                //else
                //    $bool = 0;
                $id = $_SESSION['ID'];
                $sql = "insert into Chat values (0,?,?,?,0)";
                if($stmt = $mysqli->prepare($sql)){
                    $stmt->bind_param("sii",$name, $bool,$id);
                    $stmt->execute();
                    echo $stmt->insert_id;
                    if($stmt->fetch()){}
                    $stmt->close();
                }
            }
            //Join a chat
        }else if($cm == "joinChat"){
                session_start();
                $cid = $_POST['cid'];
                $id = $_SESSION['ID'];
            echo 1;
                if(!memberOfChat($id,$cid)){
                    echo 2;
                    if(isPublic($cid) || isOwner($id,$cid) || isInvited($id,$cid)){
                        echo 3;
                        if($mysqli2 = connect_db()){
                            $sql2 = "insert into MemberOf values (?,?)";
                            if($stmt2 = $mysqli2->prepare($sql2)){
                                $stmt2->bind_param("ii",$id,$cid);
                                $stmt2->execute();
                                echo true;
                                $stmt2->close();
                        }
                    }
                }
            }
            //Get all the joinable chats
            }else if($cm == "updateChatTable"){
                if($mysqli = connect_db()){
                
                    session_start();
                    //impliment invided join
                    
                    $id = $_SESSION['ID'];
                    $cid;
                    $like =  "%{$_POST['like']}%";
                    //echo $like;// $_POST['like'];
                    $array = array(array(),array());
                    $sql = "select ID,Name from Chat where isPublic = 1 and Name LIKE ?";
                    if($stmt = $mysqli->prepare($sql)){
                        $stmt->bind_param("s",$like);
                        $stmt->execute();
                        $stmt->bind_result($cid,$name);
                        while($stmt->fetch()){
                            $array[0][] = $cid;
                            $array[1][] = $name;
                        }
                        $stmt->close();
                        $json = json_encode($array);
                        echo $json;
                    }
                }
        }else{
            echo "No messages";
        }
    }else{
        echo "NOOOOOS";
    }

function memberOfChat($id, $cid){
    if($mysqli = connect_db()){
        $sql = "select * from MemberOf where ChatId = ? and UID1 = ?";
        if($stmt = $mysqli->prepare($sql)){
            $stmt->bind_param("ii",$cid,$id);
            $stmt->execute();
            $stmt->bind_result($cid,$name);
             return $stmt->fetch();
                
             
             $stmt->close();
                 
            }
    }
}
function isPublic($cid){
    if($mysqli = connect_db()){
        echo 4;
        $sql = "select isPublic from Chat where ID =?";
        if($stmt = $mysqli->prepare($sql)){
            $stmt->bind_param("i",$cid);
            $stmt->execute();
            $stmt->bind_result($join);
            if($stmt->fetch()){
                return $join;
            }
            $stmt->close();
        }
        
    }
}
    function isOwner($id,$cid){
         if($mysqli = connect_db()){
        echo 4;
        $sql = "select ID from Chat where ID =? and Ownerid = ?";
        if($stmt = $mysqli->prepare($sql)){
            $stmt->bind_param("ii",$cid,$id);
            $stmt->execute();
            $stmt->bind_result($i);
            if($stmt->fetch()){
                return true;
            }else{
                return false;
            }
            $stmt->close();
        }
        
    }
    }
    function isInvited($id,$cid){
        return false;
    }
?>