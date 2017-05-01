var express = require('express');
var router = express.Router();
var fonctions = require('../fonctions.js');

router.get('/utilisateur/:id', fonctions.getUser);
router.post('/utilisateur/', fonctions.addUser);
router.post('/message/', fonctions.sendMessage);

        
module.exports = router
