<?php
include 'config.php';
if(isset($_POST['user']) && isset($_POST['pass'])) {
    $u = $_POST['user'];
    $p = $_POST['pass'];
    $sql = 
    if($mysqli = connect_db()){
    $result = $mysqli->query($sql);
    print_r($mysqli->error);
    }
}






?>