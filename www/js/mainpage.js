/**
 * Created by joel on 25/04/17.
 */
document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

var adr='http://129.88.57.97:8080';
var socket = io.connect(adr);
var tel;
var  storage = window.sessionStorage;

function onDeviceReady() {
    alert('Mainpage');
    tel = storage.getItem("tel");
    console.log("connexion socket");
    socket = io.connect(adr);
    console.log("telephone : " + tel);
    socket.emit('nouvelle_connexion', tel);
    
    
}

