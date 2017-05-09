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
        
        //w.postMessage([0,2]);
        w.onmessage = function(event){
            var id = event.data[0];
            //console.log("ID = " + id);
            loadDoc("../php/Chat.php",checkUpdate, true,"cid=" + id + "&cm=checkUpdate");
        }
        loadDoc("../php/Chat.php", addChatResponse, true, "cm=getChats&id=" + getCookie("id"));
        
    // Yes! Web worker support!
    // Some code.....
} else {
    alert("NO!");
    // Sorry! No Web Worker support..
} 
});

function checkUpdate(xhttp){
    console.log( "apa " + xhttp.responseText);
    var a =  JSON.parse(xhttp.responseText);
    //console.log("knas" + getCookie("Bababer"));
    console.log("Update: " + a[0]);
    if(getCookie(a[0]) == undefined){
        createCookie(a[0], a[1] - 1);
    }
    if(getCookie(a[0]) != a[1]) {
        
        createCookie(a[0], a[1]);
        if(a[0] == chosen){
            refresh(a[0]);
        }else{
            console.log(a[0] + "is not chosen");
        }
        
    }
    
    
}

function refresh(id){
    loadDoc("../php/chat.php", chatResponse, true, 'cm=getChat&cid=' + id);
}
function chatResponse(xhttp){
    console.log(xhttp.responseText);
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
    if(chosen != 0){
        string = document.getElementById("textFeild").value;
        document.getElementById("textFeild").value = "";
        loadDoc("../php/chat.php", sendResponse, true, 'cm=sendMessage&message=' + string + '&cid=' + chosen);
        //var cookie = getCookie("uname");
        //addRow(cookie.valueOf, string);
    }
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

function addChatResponse(xhttp){
    console.log(xhttp.responseText);
    var array = JSON.parse(xhttp.responseText);
    for (i = 0; i < array[0].length; i++) {
        createCookie(array[0][i], array[1][i]);
        w.postMessage([0,array[0][i]]);
        // Id två som kommer till workern är undefined
        chosen = array[0][0];
    }
    refresh(chosen);
}
function addChat(){
    
}
function toggleChat(){
    if (chosen == 1){
        chosen = 2;
    }else{
        chosen = 1;
    }
    refresh(chosen);
}