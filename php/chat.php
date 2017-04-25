<?php
    include "../config.php";

    if(isset($_POST['id'])){
        if($mysqli = connect_db()){
            $sql = "select UID, text from chat where Chatid = ?;";
            $stmt->bind_param("i",$_POST['id']);
            $stmt->execute();
            $stmt->bind_result($UID, $text);
            echo $text[0];
        }    
    }else{
        echo "bajs";
    }
?>
