var express = require('express');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var bodyParser = require('body-parser')  // envoie des paramètres en POST
var router = require('./routes/routes');
var fonctions = require('./fonctions')


app.use(bodyParser.urlencoded({     // pour gérer les URL-encoded bodies (envoie formulaire en POST)
  extended: true
})); 
app.use('/api/', router);

// Chargement de socket.io
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {     //à l'ouverture de la socket
    console.log("io.sockets.on")
    var id = socket.id;
    
    socket.on('nouvelle_connexion', function(numero) {          //Permet d'obtenir le numéro de téléphone du client connecté
        console.log("socket.on('nouvelle_connexion')")
        fonctions.getMessages(numero, id, function(message) {
            console.log("envoie du message")
            socket.emit('message', message);
            fonctions.addConnectedUser(numero, id);
        });
        
        
    })
    
    socket.on('Nouveau_message', function(donnees) {            //Lorsque le client appuie sur envoyer un message
        console.log("Nouveau_message");
        fonctions.sendMessage(donnees.contacts, donnees.message, function(id, message) {    //La liste de contacts est récupérée et recoupée avec la base de données ensuite
            console.log("socket.emit du message")
            //io.sockets.connected[id].emit('message', message);  
            //socket.broadcast.to(id).emit('message', message);
            //socket.to(id).emit('message', message);
            //socket.emit('message', message);
        });
    })
    
    socket.on('disconnect', function() {
        fonctions.deleteConnexion(id);
    })
    
    
});





server.listen(8080); // démarrage du serveur sur le port 8080


console.log("Serveur démarré sur le port 8080");


