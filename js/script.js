//shadeTrigg is a value to created to make sure that the secound delayed setShade2 method does not trigger if the setShade method has been triggered a secound time.
var shadeTrigg = 0;

//The AJAX function
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
//Gets a cookie by name
// This function is taken from stackoverflow http://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
//Creates a cookie
function createCookie(name, value){
    document.cookie = name + "=" + value;
}

// a AJAX test function
//function testfunc(xhttp){
//    document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + xhttp.responseText;
//}

//Logout
function logout(){
    loadDoc("../php/logout.php", function none(){}, true, "");
    location.replace("../index.php");
}
//Disables or Enables all inputs that are child to the id identified element
function setDisabled(id, bool){
    Array.from(document.getElementById(id).getElementsByTagName("input")).forEach( function callback(element, i, arr){
        
        element.disabled = bool;//prop("disabled", bool);
        if(!bool)
            getInputs(id)[0].focus();
    });
}
//Hides or Shows the id identified element
function setHide(id, bool){
    if(bool)
        document.getElementById(id).className = "hidden";
    else{
        document.getElementById(id).className = "";
    }
    setDisabled(id,bool);
    setShade(!bool);
}
//Hides or shows the shading
function setShade(bool){
    shadeTrigg++;
    
    var trigg = shadeTrigg;
    document.getElementById("shading").className = "invis";
    setTimeout(setShade2,250,bool,trigg);

}
function setShade2(bool,nr){
    
    if(shadeTrigg == nr){
        
        if(bool){
            document.getElementById("shading").className = "";
        }else{
            document.getElementById("shading").className = "invis       hidden";
        }
    }
}
//Get all the input elements from a element with id id
function getInputs(id){
    var form = document.getElementById(id);
    return form.getElementsByTagName("input");
}
function isInputsNotEmpty(id){
    var arr = getInputs(id);
    bool = true;
    for(var i = 0; i < arr.length; i++){
        
        if (arr[i].value == "" && arr[i].type !== "submit"){
            
            bool = false;
        }
    }
    return bool;
}
