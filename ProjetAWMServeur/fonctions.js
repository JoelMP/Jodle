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
             console.log(data);
         }
         else
         {
             console.log("erreur add user : " + error);
             res.status(500).send(error);
         }
    })
}

function getUser(req, res) {
    
    const id = req.params.id;
    
    db.getUser(id, function(error, data) {
        if (error == null) {
            res.status(200).json({
                username : data.username,
                nom : data.nom,            
                prenom : data.prenom,            
                numero : data.numero            
            })
        } else {
            res.status(500).send("Erreur : " + error);
        }
    })
}


function addConnectedUser(numero, socket) {
    db.addConnectedUser(numero, socket, function(error) {
        if (error == null) {
            console.log("utilisateur connecté")
        } else {
            console.log(error);
        }
    })
    console.log(numero);
}

function sendMessage(req, res) {
    
    var contact;
    var message = req.body.message;
    
    //Pour chaque numéro du répertoire :
    db.existingContact(contact, function(error, socket) {
        
        if (error == null) {
            io.sockets.connected[socket].emit('message', message);
            console.log("message envoyé");
            res.sendStatus(200);
            
        } else {
            db.addMessage(contact, message, function(error) {
                if (error == null) {
                    console.log("message ajouté");
                    res.sendStatus(200);
                } else {
                    console.log("erreur ajout message : " + error);
                    res.status(500).send(error);
                }
            })
        }
    })
    
}

function getMessages(numero, ) {
    
    db.getMessages(numero, function(error, data) {
        
        if (error == null) {
            for (var i=0; i<data.length; i++) {
                var message = data[i].message;
                console.log(message);
                io.sockets.connected[socket].emit('message', message);
            }
        }
    })
}

module.exports = {
    addUser,
    getUser,
    addConnectedUser,
    sendMessage,
    getMessages
}