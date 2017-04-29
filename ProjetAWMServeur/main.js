var express = require('express');
var app = express(); // creation du serveur
var server = require('http').createServer(app);

var session = require('express-session')

// Chargement de socket.io
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

server.listen(8080); // démarrage du serveur sur le port 8080

console.log("Serveur démarré sur le port 8080");
