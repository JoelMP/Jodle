var db = require('./db/pg_base.js')


function addUser(req, res) {
    
    var username = req.body.username;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var numero = req.body.numero;
    //var localisation = req.body.localisation;
    
    db.addUser(username, nom, prenom, numero, function(error,data)          //Ajout des informations d'un utilisateur à l'inscription
     {
         console.log("fonction addUser après requête")
         if (error == null)
         {
            console.log("addUser data : " + data); 
            res.sendStatus(200);
         }
         else
         {
             console.log("erreur add user : " + error);
             res.status(500).send(error);
         }
    })
}


//Retourne le même numéro de téléphone si l'utilisateur est dans la base de données, une erreur sinon
function getUser(req, res) {
    
    const id = req.params.id;
    
    db.getUser(id, function(error, data) {
        console.log("erreur getUser : " + error);
        console.log("data getUser : " + data.numero);
        if (error == null) {
            res.status(200).json({           
                num : data.numero            
            })
        } else {
            res.status(500).send("Erreur : " + error);
        }
    })
}


function addConnectedUser(numero, socket) {
    console.log("addConnectedUser");
    db.addConnectedUser(numero, socket, function(error) {
        if (error == null) {
            console.log("utilisateur connecté")
        } else {
            console.log(error);
        }
    })
    console.log(numero);
}

function sendMessage(contacts, message, callback) {
    
    var contact='0682071261';
    var source;
    for (var i = 0; i < contacts.length; i++) {
        //Pour chaque numéro du répertoire :
       contact=contacts[i];
        console.log("contact : " + contact);
        db.existingContact(contact, function(error, socket) {
            
            
            //Cette partie n'est utilisable que si l'on parvient à effectuer un socket.emit sur un id particulier de socket (cf socket.on('Nouveau_Message') dans main.js)
            /*if (error == null) {
                console.log("socket id : " + socket)
                //io.sockets.connected[socket].emit('message', message);
                callback(socket, message);
                console.log("message envoyé");

            } else { //Message rentré dans la base de données
                console.log("message à envoyer à : " + contact);
                db.addMessage(contact, message, function(error) {
                    if (error == null) {
                        console.log("message ajouté");
                    } else {
                        console.log("erreur ajout message : " + error);
                    }
                })
            }*/
            
            //On rentre tous les messages dans la base de données, ils sont récupérés régulièrement par le client
            
                db.addMessage(contact, message, function(error) {
                        if (error == null) {
                            console.log("message ajouté");
                        } else {
                            console.log("erreur ajout message : " + error);
                        }
                })
            
        })
    }
}


//Récupérer les messages en attente pour un utilisateur
function getMessages(numero, socket, callback) {
    
    db.getMessages(numero, function(error, data) {
        
        if (error == null) {
            for (var i=0; i<data.length; i++) {
                console.log(data)
                var message = data[i].message;
                console.log(message)
                message="test"
                console.log(message);
                callback(socket, message);
            }
        }
    })
}

//Lorsque la socket se ferme
function deleteConnexion(id) {
    db.deleteConnectedUser(id, function(error) {
        
        if (error == null) {
            console.log("connexion supprimée");
        } else {
            console.log("erreur suppression connexion : " + error);
        }
    })
}

module.exports = {
    addUser,
    getUser,
    addConnectedUser,
    sendMessage,
    getMessages,
    deleteConnexion
}