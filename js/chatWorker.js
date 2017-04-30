var alive = false;
var chosen = 0;

function checkChat(id){
    console.log("Checking " + id);
    //alert("Checking " + id);
    if(id = chosen){
        
    }
    if(alive) setTimeout("checkChat(" +id +")", 500);
}
onmessage = function(e){
    console.log("Message received");
    console.log(e.data);
    //data[0] = start a chatChecker with id data[1]
    if(e.data[0] == 0){
        alive = true;
        checkChat(e.data[1]);
    } 
}