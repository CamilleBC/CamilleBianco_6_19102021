//Importer express
const express = require('express');
//Créer le routeur
const routeur = express.Router()

//Multer
const multer = require('../middleware/multer-config')
//Auth
const auth = require('../middleware/auth')


//Importer le fichier controller
const sauceCtrl = require('../controllers/sauce');


routeur.get('/', sauceCtrl.getAllSauces);
routeur.post('/', multer, sauceCtrl.createSauce);
routeur.get('/:id', sauceCtrl.getOneSauce);
routeur.delete('/:id', sauceCtrl.deleteSauce)


module.exports = routeur;