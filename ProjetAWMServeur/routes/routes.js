var express = require('express');
var router = express.Router();
var fonctions = require('../fonctions');


router.get('/utilisateur/:id', fonctions.getUser);
router.post('/utilisateur/', fonctions.addUser);

        
module.exports = router;
