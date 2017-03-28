<?php

if(isset($_POST['apa']) && isset($_POST['gurka'])) {
		echo  "Hej " . $_POST['apa'] .  " ". $_POST['gurka'];
	}else if($_GET['apa']){
    echo $_GET['apa'];
} else{
    echo "Banan";
}

?>