var express = require('express');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var bodyParser = require('body-parser')  // envoie des paramètres en POST
var router = require('./routes/routes');
var fonctions = require('./fonctions');



app.use(bodyParser.urlencoded({     // pour gérer les URL-encoded bodies (envoie formulaire en POST)
  extended: true
})); 
app.use('/api/', router);

// Chargement de socket.io
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    console.log("io.sockets.on")
    var id = socket.id;
    socket.on('nouvelle_connexion', function(numero) {
        console.log("socket.on('nouvelle_connexion')")
        fonctions.addConnectedUser(numero, id);
        fonctions.getMessages(numero, id);
        socket.emit('message',"test");
    });
    
    socket.on('disconnect', function() {
        fonctions.deleteConnexion(id);
    })
});




server.listen(8080); // démarrage du serveur sur le port 8080

console.log("Serveur démarré sur le port 8080");
