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

function loginUser(){
    var form = document.getElementById("login");
    //console.log($form.elements.namedItem("uname").value);
    //console.log($form.elements.namedItem("psw").value);
    //loadDoc(url, cFunction, isPOST, message)
    //var $obj = {"uname" : $form.elements.namedItem("uname").value, "pwd" : $form.elements.namedItem("psw").value};
    
    loadDoc("php/login.php", loginResponse, true, 'uname=' + form.elements.namedItem("uname").value + '&psw=' + form.elements.namedItem("psw").value);
}
function loginResponse(xhttp){
    alert(xhttp.responseText);
    if(xhttp.responseText == 1){
        var current = String(window.location);
        
        //var url = current.substring(0, current.length - 9) + 'php/main.php';
        //location.replace(url);
        location.replace('php/main.php');
        //alert(url);
        //<?php header('location : ../php/main.php'); ?>
    }
}
function registerUser(){
    var form = document.getElementById("register");
    
    loadDoc("php/register.php", loginResponse, true, 'uname=' + form.elements.namedItem("uname").value + '&psw=' + form.elements.namedItem("psw").value + "&dname="+ form.elements.namedItem("dname").value + "&pswr=" + form.elements.namedItem("pswr").value);
}

