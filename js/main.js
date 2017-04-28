function refresh(){
    loadDoc("../php/chat.php", chatResponse, true, 'id=1');
}
//
function chatResponse(xhttp){
    //alert(xhttp.responseText);
    var json = xhttp.responseText;
    var array = JSON.parse(json);
    document.getElementById("chatWindow").innerHTML = "";
    array.forEach(function callback(string, i, arr){
       //var chat = document.getElementById("chatWindow").innerHTML;
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + string + "\n";
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" string + " : " + string + "\n" "</p>";
        var cookie = getCookie("uname");
        
        if(string[0] == cookie){
            addRow(cookie,string[1]);
        }else{
            addRow(string[0],string[1]);
        }
 });
}
//Send messages
function send(){
    string = document.getElementById("textFeild").value;
    loadDoc("../php/chat.php", sendResponse, true, 'message=' + string + '&cid=1');
    //var cookie = getCookie("uname");
    //addRow(cookie.valueOf, string);
    
}
//Debug for sending messages
function sendResponse(xhttp){
    alert(xhttp.responseText);
}
//Adds a row to the chat window
function addRow(user, text){
    document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" + user + ": " + text + "\n" + "</p>";
    }

// this function is taken from stackoverflow http://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}