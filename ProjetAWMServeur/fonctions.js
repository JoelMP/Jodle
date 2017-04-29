var db = require('./db/pg_base.js')

function addUser(req, res) {
    
    var username = req.body.username;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var numero = req.body.numero;
    var localisation = req.body.localisation;
    
    db.addUser(username, nom, prenom, numero, localisation, function(error,data)
     {
         if (error == null)
         {
             res.status(200);
         }
         else
         {
             console.log(error);
             res.status(500).send(error);
         }
    })
}

function getUser(req, res) {
    console.log('oui');
    var numero = req.body.numero;
    db.getUser(numero, function(error, data) {
        if (error == null) {
            res.status(200);
        } else {
            console.log(error);
            res.status(500).send(error);
        }
    })
}


function addConnectedUser(numero, socket) {
    db.addConnectedUser(numero, socket, function(error, data) {
        if (error == null) {
            console.log("utilisateur connecté")
        } else {
            console.log(error);
        }
    })
}

module.exports = {
    getUser,
    addUser
};