$(document).ready(function(){
   $("#login").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation();
   });
    $("#register").on("submit", function(event){
       event.preventDefault();
       event.stopPropagation(); 
   });
});

function hide(){
    setHide("login",true);
    setHide("register", true);
    setShade(false);
}
//Login
function loginUser(){
    var form = document.getElementById("login");
    //console.log($form.elements.namedItem("uname").value);
    //console.log($form.elements.namedItem("psw").value);
    //loadDoc(url, cFunction, isPOST, message)
    //var $obj = {"uname" : $form.elements.namedItem("uname").value, "pwd" : $form.elements.namedItem("psw").value};
    if(isInputsNotEmpty("login")){
        loadDoc("php/login.php", loginResponse, true, 'uname=' + form.elements.namedItem("uname").value + '&psw=' + form.elements.namedItem("psw").value);
    }
}
//Login response
function loginResponse(xhttp){
    //Checks if the login was succesfull
    if(xhttp.responseText == 1){
        var current = String(window.location);
        location.replace('php/main.php');
    }else{
        alert("Wrong username or password");
    }
}
//Register
function registerUser(){
    
    var form = document.getElementById("register");
    if(isInputsNotEmpty("register")){
       loadDoc("php/register.php", registerResponse, true, 'uname=' + form.elements.namedItem("uname").value + '&psw=' + form.elements.namedItem("psw").value + "&dname="+ form.elements.namedItem("dname").value + "&pswr=" + form.elements.namedItem("pswr").value); 
    }
    
}
function registerResponse(xhttp){
    if(xhttp.responseText !== ""){
        alert(xhttp.responseText);
    }
}

