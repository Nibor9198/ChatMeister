function refresh(){
    loadDoc("../php/chat.php", chatResponse, true, 'id=1');
}

function chatResponse(xhttp){
    //alert(xhttp.responseText);
    var json = xhttp.responseText;
    var array = JSON.parse(json);
    document.getElementById("chatWindow").innerHTML = "";
    array.forEach(function callback(string, i, arr){
       //var chat = document.getElementById("chatWindow").innerHTML;
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + string + "\n";
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" string + " : " + string + "\n" "</p>";
        
        
        document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" + string[0] + ": " + string[1] + "\n" + "</p>"
    });
}

function send(){
    
    string = document.getElementById("textFeild").innerHTML;
    loadDoc("../php/chat.php", chatResponse, true, 'message=' + string);
}