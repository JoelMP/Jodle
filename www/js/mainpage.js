/**
 * Created by joel on 25/04/17.
 */
document.addEventListener('deviceready', onDeviceReady, false);
var storage = window.sessionStorage;

function onDeviceReady() {
    document.querySelector('.numero').innerHTML = 'Votre numero : ' + storage.getItem("numero");
}