var pgp = require('pg-promise')(/*options*/);
var dbconfig = require('../config/settings.js').settings;

var db = pgp(dbconfig);

function isFriend(contact, callback)
{
    var requete = `select username, nom, prenom, numero, localisation from www.utilisateurs where numero = ${contact}`;
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}
