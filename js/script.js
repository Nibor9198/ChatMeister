
function loadDoc(url, cFunction, isPOST, message) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    if(isPOST){
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(message);
    }else{
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}





//AJAX test function
function testfunc(xhttp){
    document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + xhttp.responseText;
}
function logout(){
    loadDoc("../php/logout.php", function none(){}, true, "");
    location.replace("../index.php");
}