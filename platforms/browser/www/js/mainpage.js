/**
 * Created by joel on 25/04/17.
 */
document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

var adr='http://129.88.57.90:8080';
var socket = io.connect(adr);


function onDeviceReady() {
    alert('Mainpage');
    socket.emit('nouvelle_connexion', tel);
}



