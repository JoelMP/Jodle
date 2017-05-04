/**
 * Created by joel on 25/04/17.
 */

var adr='http://129.88.57.104:8080';
var socket = io.connect(adr);
var tel;
var storage = window.sessionStorage;
var contacts;

document.addEventListener('deviceready', function() {
    console.log('Mainpage');
    tel = storage.getItem("tel");
    console.log("connexion socket");
    socket = io.connect(adr);
    console.log("telephone : " + tel);
    socket.emit('nouvelle_connexion', tel);
    var options = new ContactFindOptions();
    options.hasPhoneNumber = true;
    options.multiple = true;
    options.desiredFields = [navigator.contacts.fieldType.phoneNumbers];
    navigator.contacts.find([navigator.contacts.fieldType.phoneNumbers], onSuccess, onError, options);
    $('#Photo').click(function(){
        takePicture();
    });
    $('#Message').click(function(){
        $('#myForm').html('<label class="form_col" for="numero">Message :</label>'
                + '<input name="message" id="message" type="text" />'
                + '<span class="form_col"></span> <input type="submit" id="sendMessage" value="Envoyer Message" />');
    });
    $('#myForm').on('submit', function(e){
        console.log($(this).serialize());
        console.log(contacts[0].phoneNumbers);
        socket.emit('Nouveau_message', {contacts: contacts, message: $(this).serialize()});
        $('#message_envoye').html('<h5>Votre message a été envoyé : </h5><h5>' + $(this).serialize() + '</h5>');
        alert('oui');
        e.preventDefault();
    });
    socket.on('message', function(data){
        $('#message_recu').html('<h5>Vous avez un nouveau message : </h5><h5>' + data + '</h5>');
    })
})

function onSuccess(conts){
    contacts = conts;
}

function onError(err){
    alert("Problème d'accès à la liste des contacts");
}

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