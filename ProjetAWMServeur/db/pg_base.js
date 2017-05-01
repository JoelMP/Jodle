var pgp = require('pg-promise')(/*options*/);
var dbconfig = require('../config/settings.js').settings;

var db = pgp(dbconfig);

function getUser(contact, callback)
{
    var requete = `select username, nom, prenom, numero, localisation from utilisateurs where numero = ${contact}`;
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                console.log("requête ok")
                callback(null, data)
    })
            .catch(function(error)  {
                console.log("requête pas ok")
                callback(error, null)
    })    
}


function addUser(username, nom, prenom, numero, localisation, callback)
{
    var requete = `INSERT INTO utilisateurs (username, nom, prenom, numero) VALUES ('${username}', '${nom}', '${prenom}', '${numero}', '${localisation}')`;
    console.log("nouvel utilisateur : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}


function addConnectedUser(num, sock, callback)
{
    var requete = `INSERT INTO connexions (numero, socket) VALUES ('${num}', '${sock}')`;
    console.log("nouvelle connexion : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                callback(null, data);
    })
            .catch(function(error)  {
                callback(error, null);
    })    
};


function deleteConnectedUser(numero, callback)
{
    var requete = `DELETE FROM connexions WHERE numero=${numero}`;
    console.log("suppression connexion : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
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
    var requete = `DELETE FROM connexions WHERE numero=${numero}`;
    console.log("supprimer connexion : " + requete);
    
    db.none(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}


module.exports = {
    getUser,
    addUser,
    addConnectedUser,
    addMessage,
    deleteConnectedUser,
    deleteMessage
}