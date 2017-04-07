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



function showLogin(){
    document.getElementById("login").className = "";
    showShade();
}
function hideLogin(){
    document.getElementById("login").className = "hidden";
    hideShade();
}
function hide(){
    document.getElementById("login").className = "hidden";
    document.getElementById("register").className = "hidden";
    hideShade();
}
function showRegister(){
    document.getElementById("register").className = "";
    showShade();
}
function hideRegister(){
    document.getElementById("register").className = "hidden";
    hideShade();
}
function showShade(){
    document.getElementById("shading").className = "";
}
function hideShade(){
    document.getElementById("shading").className = "invis";
    setTimeout(hideShade2,500);
}
function hideShade2(){
    document.getElementById("shading").className = "invis hidden";
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
        
        var url = current.substring(0, current.length - 9) + 'php/main.php';
        location.replace(url);
        alert(url);
        //<?php header('location : ../php/main.php'); ?>
    }
}
function registerUser(){
    var form = document.getElementById("register");
    
    loadDoc("php/register.php", loginResponse, true, 'uname=' + form.elements.namedItem("uname").value + '&psw=' + form.elements.namedItem("psw").value + "&dname="+ form.elements.namedItem("dname").value + "&pswr=" + form.elements.namedItem("pswr").value);
}