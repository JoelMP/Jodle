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
    db.addConnectedUser(numero, socket, function(error, data) {
        if (error == null) {
            console.log("utilisateur connecté")
        } else {
            console.log(error);
        }
    })
    console.log(numero);
}


module.exports = {
    addUser,
    getUser,
    addConnectedUser
}