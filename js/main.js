function refresh(){
    alert("hello");
    loadDoc("../php/chat.php", chatResponse, true, 'id=1');
}

function chatResponse(xhttp){
    alert(xhttp.responseText);
    
}