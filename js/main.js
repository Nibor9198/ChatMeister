//The worker (a thread for js)
var w;
//Default value for chat id, does not correspond to a chat.
var chosen = 0;
//When the document has loaded run this
$(document).ready(function(){
    //Prevent the default form triggers
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
  
    //Checks if the browser have support for Workers
    if (typeof(Worker) !== "undefined") {
        //Creates worker
        w = new Worker("../js/chatWorker.js");
        
        //When the worker responds do this
        w.onmessage = function(event){
            var id = event.data;
            //Returns the update number of the chat with id id to checkUpdate()
            loadDoc("../php/Chat.php",checkUpdate, true,"cid=" + id + "&cm=checkUpdate");
        }
        //Update the list of chatrooms
        updateChatList();
        
        
   
} else {
    alert("This Web browser does not have suppport for this application");
    // Sorry! No Web Worker support..
}
    setTimeout(scrollDown(), 1000);
    
});
//Makes the newest messages visable
function scrollDown(){
    var scroll = document.getElementById("chatWindow");
    scroll.scrollTop = scroll.scrollHeight;
    
}
//Checks if the chatwindow is or almost is scrolled down
function isScrolledDown(){
    var scroll = document.getElementById("chatWindow");
    return (scroll.scrollTop > scroll.scrollHeight - 500);
}
//Check if the update number for a chat has changed. If it has changed, update the chat 
function checkUpdate(xhttp){
    var a =  JSON.parse(xhttp.responseText);
    
    //If there is no cookie for this chat, create one.
    if(getCookie(a[0]) == undefined){
        createCookie(a[0], a[1] - 1);
    }
    //If the number has changed 
    if(getCookie(a[0]) != a[1]) {
        //Update the cookie
        createCookie(a[0], a[1]);
        //If the chat that needs updating is the one that is currently displayed, refresh the chatwindow.
        if(a[0] == chosen){
            refresh(a[0]);
        //Otherwise just mark the chat in the chatlist
        }else if(a[0] != chosen){
            document.getElementById("li" + a[0]).className = "notice";
        }
        
    }
    
    
}
//Retrieves the full chat from the database
function refresh(id){
    loadDoc("../php/chat.php", chatResponse, true, 'cm=getChat&cid=' + id);
}
//Replaces the text in the chatwindow
function chatResponse(xhttp){
    var json = xhttp.responseText;
    var array = JSON.parse(json);
    var chatString = "";
    array.forEach(function callback(string, i, arr){
        
        //Replace your displayname with You: and add the chat messages to the chatwindow using the chatSyntax method 
        var cookie = getCookie("dname");
        if(string[0] == cookie){
            chatString = chatSyntax(chatString,"You",string[1]);
        }else{
            chatString = chatSyntax(chatString, string[0],string[1]);
        }
 });
        
        document.getElementById("chatWindow").innerHTML = chatString;
        //If the chat window is scrolled down, keep it scrolled down as new messages come in
        if(isScrolledDown())
            scrollDown();
    
}
//Send messages
function send(){
    //Only send messages if a chat has been chosen
    if(chosen != 0){
        //Get the message
        string = document.getElementById("textFeild").value;
        //Reset the textfeild
        document.getElementById("textFeild").value = "";
        //Only send messages if the message is not empty
        if(string != "" && string != " ")
            loadDoc("../php/chat.php", sendResponse, true, 'cm=sendMessage&message=' + string + '&cid=' + chosen);
    }
}
//Refresh the chat after sending a message
function sendResponse(xhttp){
    refresh(chosen);
}

//Syntax the messages
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

//Toggle the leftbar
function toggleLeft(){
    var string;
    if(document.getElementById("leftBar").className == ""){
         document.getElementById("leftBar").className = "extended";
    }else{
         document.getElementById("leftBar").className = "";
    }
}
//Ask the server for an updated chatlist
function updateChatList(){
    loadDoc("../php/Chat.php", updateChatListRe, true, "cm=getChats&id=" + getCookie("id"));
}
//repöaces the old chat list
function updateChatListRe(xhttp){
    clearRoomList();
    var array = JSON.parse(xhttp.responseText);
    for (i = 0; i < array[0].length; i++) {
        createCookie(array[0][i], array[1][i]);
        w.postMessage([0,array[0][i]]);
        addToRoomList(array[0][i], array[2][i]);
        
    }
    setChosen(array[0][0]);
    refresh(chosen);
}
function addChat(){
    
}
//Changes the chosen chat, the chat visable in the chatwindow
function setChosen(id){
    var old = chosen;
    chosen = id;
    refresh(chosen);
    if(old != 0)
        document.getElementById("li" + old).className = "";
    document.getElementById("li" + chosen).className = "chosen";
    document.getElementById("chatHeader").innerHTML = document.getElementById("li" + chosen).innerHTML;
}
//Clears the roomlist
function clearRoomList(){
    document.getElementById("roomList").innerHTML = "";
}
//Adds a chatroom to the roomlist
function addToRoomList(id, name){
    room = document.getElementById("roomList");
    room.innerHTML = room.innerHTML + "<li id='li" + id + "' onclick='setChosen( " + id + ")'>" + name + "</li>";
}
//get all the input elements from a element with id id
function getInputs(id){
    var form = document.getElementById(id);
    return form.getElementsByTagName("input");
}
//Creates a chat
function createChat(){
    var a = getInputs("createChat");
    var name = a[0].value;
    var isPublic =a[1].checked;
    loadDoc("../php/chat.php",createChatRe, true, "cm=createChat&name="+name+"&bool="+isPublic);
}
//Joins the chat that the user just created
function createChatRe(xhttp){
    joinChat(xhttp.responseText);
}
//Joins a chat
function joinChat(cid){
    loadDoc("../php/chat.php",joinChatRe, true, "cm=joinChat&cid="+cid);
}
//Updates the chatlist after the user has joined a new chat
function joinChatRe(xhttp){
    updateChatList();
}
//Updates the chatTable
function updateChatTable(){
    loadDoc("../php/chat.php", updateChatTableRe, true, "cm=updateChatTable");
}
//Inserts the joinable chats into the chattable
function updateChatTableRe(xhttp){
    var a =  JSON.parse(xhttp.responseText);
    var table = document.getElementById("joinChat").getElementsByTagName("table")[0];
        table.innerHTML = "";
    for (i = 0; i < a[0].length; i++) {
        table.innerHTML = table.innerHTML + 
            "<tr><td>"+ a[1][i] +"</td><td class='button' onclick='joinChat("+ a[0][i] +")'>Join</td></tr>";
        
    }
}

//Don't mind this
function toggleChat(){
    if (chosen == 1){
        chosen = 2;
    }else{
        chosen = 1;
    }
    refresh(chosen);
}





