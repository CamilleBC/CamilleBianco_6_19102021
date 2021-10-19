//Importer express
const express = require('express');
//Créer le routeur
const routeur = express.Router()
//Importer le fichier controller
const userCtrl = require('../controllers/user')

routeur.post('/signup', userCtrl.signup);
routeur.post('/login', userCtrl.login)

module.exports = routeur;