var pgp = require('pg-promise')(/*options*/);
var dbconfig = require('../config/settings.js').settings;

var db = pgp(dbconfig);

function getUser(contact, callback)
{
    var requete = `select numero from utilisateurs where numero = '${contact}'`;
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                console.log("requête ok")
                console.log(data);
                callback(null, data)
    })
            .catch(function(error)  {
                console.log("requête pas ok")
                console.log(error);
                callback(error, null)
    })    
}


function addUser(username, nom, prenom, numero, callback)
{
    var requete = `INSERT INTO utilisateurs (username, nom, prenom, numero) VALUES ('${username}', '${nom}', '${prenom}', '${numero}')`;
    console.log("nouvel utilisateur : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                console.log("db.none.then addUser");
                callback(null, data)
    })
            .catch(function(error)  {
                console.log("db.none.catch addUser");
                callback(error, null)
    })    
}


function addConnectedUser(num, sock, callback)
{
    var requete = `INSERT INTO connexions (numero, socket) VALUES ('${num}', '${sock}')`;
    console.log("nouvelle connexion : " + requete);
    
    db.none(requete, null)
            .then(function ()  {
                callback(null);
    })
            .catch(function(error)  {
                callback(error);
    })    
}


function deleteConnectedUser(id, callback)
{
    var requete = `DELETE FROM connexions WHERE socket='${id}'`;
    console.log("suppression connexion : " + requete);
    
    db.none(requete, null)
            .then(function ()  {
                callback(null)
    })
            .catch(function(error)  {
                callback(error)
    })    
}


function addMessage(numero, message, callback)
{
    var requete = `INSERT INTO messages (numero, message) VALUES ('${numero}', '${message}')`;
    console.log("nouveau message : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function deleteMessage(numero, socket, callback)
{
    var requete = `DELETE FROM messages WHERE numero=${numero}`;
    console.log("supprimer connexion : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function existingContact(numero, callback) {
    var requete = `SELECT socket FROM connexions WHERE numero=${numero}`;
    console.log("check contact : " + requete);
    
    db.one(requete, null)
            .then(function (data) {
                callback(null, data);
    })
            .catch(function(error) {
                callback(error, null);
    })
}

function getMessages(numero, callback) {
    var requete = `SELECT message FROM messages WHERE numero=${numero}`
    console.log("messages : " + requete);
    
    db.any(requete, null)
            .then(function (data) {
                callback(null, data);
    })
            .catch(function(error) {
                callback(error, null);
    })
}


module.exports = {
    getUser,
    addUser,
    addConnectedUser,
    addMessage,
    deleteConnectedUser,
    deleteMessage,
    existingContact,
    getMessages
}
