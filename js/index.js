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