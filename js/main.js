var w;
var chosen = 0;
$(document).ready(function(){
   $("#chat").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation();
    });
    $("#createChat").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation();
        alert("Helo");
   });
    $("#joinChat").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation(); 
   });  
       $("#friends").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation(); 
   }); 
  
    //Creates a worker
    if (typeof(Worker) !== "undefined") {
        w = new Worker("../js/chatWorker.js");
        
        //w.postMessage([0,2]);
        w.onmessage = function(event){
            var id = event.data;
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
    setTimeout(scrollDown(), 1000);
    
});

function scrollDown(){
    var scroll = document.getElementById("chatWindow");
    scroll.scrollTop = scroll.scrollHeight;
    
}
function isScrolledDown(){
    var scroll = document.getElementById("chatWindow");
    return (scroll.scrollTop > scroll.scrollHeight - 500);
}

function checkUpdate(xhttp){
    var a =  JSON.parse(xhttp.responseText);
    //a[0] is the chat id
    //a[1] is the chat updatenumber
    
    //console.log( "apa " + a);
    //console.log("knas" + getCookie("Bababer"));
    // console.log("Update: " + a[0]);
    
    //If there is no cookie for this chat, create one.
    if(getCookie(a[0]) == undefined){
        createCookie(a[0], a[1] - 1);
    }
    //if the 
    if(getCookie(a[0]) != a[1]) {
       
        
        createCookie(a[0], a[1]);
        if(a[0] == chosen){
            refresh(a[0]);
        }else if(a[0] != chosen){
            document.getElementById("li" + a[0]).className = "notice";
        }
        
    }
    
    
}

function refresh(id){
    loadDoc("../php/chat.php", chatResponse, true, 'cm=getChat&cid=' + id);
}
function chatResponse(xhttp){
    var bool = isScrolledDown();
    console.log(xhttp.responseText);
    var json = xhttp.responseText;
    var array = JSON.parse(json);
    var chatString = "";
    array.forEach(function callback(string, i, arr){
       //var chat = document.getElementById("chatWindow").innerHTML;
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + string + "\n";
        
        //document.getElementById("chatWindow").innerHTML = document.getElementById("chatWindow").innerHTML + "<p>" string + " : " + string + "\n" "</p>";
        var cookie = getCookie("dname");
        
        if(string[0] == cookie){
            chatString = chatSyntax(chatString,"You",string[1]);
        }else{
            chatString = chatSyntax(chatString, string[0],string[1]);
        }
 });
        document.getElementById("chatWindow").innerHTML = chatString;
        //console.log(bool);
        if(bool)
            scrollDown();
    
}
//Send messages
function send(){
    if(chosen != 0){
        string = document.getElementById("textFeild").value;
        document.getElementById("textFeild").value = "";
        if(string != "")
            loadDoc("../php/chat.php", sendResponse, true, 'cm=sendMessage&message=' + string + '&cid=' + chosen);
        //var cookie = getCookie("uname");
        //addRow(cookie.valueOf, string);
    }
}
//Debug for sending messages
function sendResponse(xhttp){
    //alert(xhttp.responseText);
    refresh(chosen);
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
        addToRoomList(array[0][i], array[2][i]);
        setChosen(array[0][0]);
    }
    refresh(chosen);
}
function addChat(){
    
}
function setChosen(id){
    var old = chosen;
    chosen = id;
    refresh(chosen);
    if(old != 0)
        document.getElementById("li" + old).className = "";
    document.getElementById("li" + chosen).className = "chosen";
    document.getElementById("chatHeader").innerHTML = document.getElementById("li" + chosen).innerHTML;
}
function addToRoomList(id, name){
    room = document.getElementById("roomList");
    room.innerHTML = room.innerHTML + "<li id='li" + id + "' onclick='setChosen( " + id + ")'>" + name + "</li>";
}

function createChat(){
    
    //getElementsByName returns undefined
    var name = document.getElementsByName("CreateName").value;
    var isPublic = document.getElementsByName("CreateisPublic").value;
    console.log(name + " " + isPublic);
}

function toggleChat(){
    if (chosen == 1){
        chosen = 2;
    }else{
        chosen = 1;
    }
    refresh(chosen);
}





