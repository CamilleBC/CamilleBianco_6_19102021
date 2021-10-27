//Importer express
const express = require('express');

//Créer le routeur
const routeur = express.Router();

//Importer le fichier controller
const userCtrl = require('../controllers/user');
//Importer le middleware verifyPassword
const verifyPassword = require('../middleware/passwordVerify');

routeur.post('/signup', verifyPassword, userCtrl.signup);
routeur.post('/login', userCtrl.login)

module.exports = routeur;