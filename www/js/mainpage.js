/**
 * Created by joel on 25/04/17.
 */
document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

var adr='http://129.88.242.113:8080';
var socket = io.connect(adr);
var tel;
var storage = window.sessionStorage;

function onDeviceReady() {
    console.log('Mainpage');
    tel = storage.getItem("tel");
    console.log("connexion socket");
    socket = io.connect(adr);
    console.log("telephone : " + tel);
    socket.emit('nouvelle_connexion', tel);
    $('#Photo').click(function(){
        takePicture();
    })
    $('#Message').click(function(){
        $('#myForm').html('<label class="form_col" for="numero">Message :</label>'
                + '<input name="message" id="message" type="text" />'
                + '<span class="form_col"></span> <input type="submit" id="sendMessage" value="Envoyer Message" />');
    })
    $('#myForm').on('submit', function(e){
        console.log($(this).serialize());
        socket.emit("NouveauMessage", $(this).serialize());
        e.preventDefault();
    })
}

1
function takePicture() {
    // on  indique  le nom de la  fonction  en cas
    // de  reussite  et en cas d echec
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL
    });
    // L image a ete  prise  avec  succes.
    // On l affiche  dans la  balise  image
    function onSuccess(imageData) {
        alert("Succes");
        //$("#myImage").attr("src", "data:image/jpeg;base64 ," +imageData)
    }
    // echec : on  affiche  le  message d erreur
    function onFail(message) {
        alert('Failed  because:'+ message);
    }
}