var express = require('express');
var router = express.Router();
var fonctions = require('../fonctions.js');

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

router.get('/utilisateur/:id', fonctions.getUser);
router.post('/utilisateur/', fonctions.addUser);

        
module.exports = router
