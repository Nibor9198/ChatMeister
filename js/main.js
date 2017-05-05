var w;
var chosen = 0;
$(document).ready(function(){
   $("#chat").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation();
   });
    //Creates a worker
    if (typeof(Worker) !== "undefined") {
        w = new Worker("../js/chatWorker.js");
        w.postMessage([0,1]);
        //w.postMessage([0,2]);
        w.onmessage = function(event){
            var id = event.data[0];
            loadDoc("../php/Chat.php",checkUpdate, true,"cid=" + id + "&cm=checkUpdate");
        }
        loadDoc("../php/Chat.php", addChatResponse, true, "cm=addChat");
        
    // Yes! Web worker support!
    // Some code.....
} else {
    alert("NO!");
    // Sorry! No Web Worker support..
} 
});

function checkUpdate(xhttp){
    console.log("Update: " + xhttp.responseText);
}

function refresh(){
    loadDoc("../php/chat.php", chatResponse, true, 'cm=getChat&cid=1');
}
//
function chatResponse(xhttp){
    //alert(xhttp.responseText);
    var json = xhttp.responseText;
    var array = JSON.parse(json);
    var chatString = "";
    array.forEach(function callback(string, i, arr){
       //var chat = document.getElementById("chatWindow").innerHTML;
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + string + "\n";
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" string + " : " + string + "\n" "</p>";
        var cookie = getCookie("uname");
        
        if(string[0] == cookie){
            chatString = chatSyntax(chatString,cookie,string[1]);
        }else{
            chatString = chatSyntax(chatString, string[0],string[1]);
        }
 });
    if (!(chatString == document.getElementById("chatWindow").innerHTML)){
        document.getElementById("chatWindow").innerHTML = chatString;
        
    }
}
//Send messages
function send(){
    string = document.getElementById("textFeild").value;
    document.getElementById("textFeild").value = "";
    loadDoc("../php/chat.php", sendResponse, true, 'cm=sendMessage&message=' + string + '&cid=1');
    //var cookie = getCookie("uname");
    //addRow(cookie.valueOf, string);
    
}
//Debug for sending messages
function sendResponse(xhttp){
    alert(xhttp.responseText);
}
//Adds a row to the chat window
//function addRow(user, text){
//    document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" + user + ": " + text + "\n" + "</p>";
//    }
//
function chatSyntax(string, user, text){
   return string + "<p>" + user + ": " + text + "\n" + "</p>";
    
    }
function setChat(index){
    chosen = index;
}


//function showLeft(){
//    document.getElementById("leftBar").className = "extended";
//    console.log("Hello");
//    document.getElementById("BLeftBar").onclick = "hideLeft()";
    
//}
//function hideLeft(){
//    document.getElementById("leftBar").className = ""
//    document.getElementById("BLeftBar").onclick = showLeft();
//}
function toggleLeft(){
    var string;
    if(document.getElementById("leftBar").className == ""){
         document.getElementById("leftBar").className = "extended";
    }else{
         document.getElementById("leftBar").className = "";
    }
}

function addChatResponse(){
    
}
function addChat(){
    
}