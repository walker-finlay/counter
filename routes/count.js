
window.onload = async function() {
    
var x = 0;
console.log("working")
document.getElementById("increment").addEventListener("click", async function (){
console.log("increment works");
x = x+1;
document.getElementById("cnum").innerHTML = x;

//var myJson = JSON.stringify(passHash);
/*
$.ajax({
    url: "file:///C:/Users/wesre/Downloads/280/cap-3/counter/views/index",
    type: "POST",
    data: JSON.stringify({}),
    processData: false,
    contentType: "application/json",
    complete: callback
});
*/


//document.getElementById('counterScore').innerHTML = x++;



});

document.getElementById("increment").addEventListener("click", async function (){
    console.log("increment works");
    x = x-1;
    document.getElementById("cnum").innerHTML = x;

});


};