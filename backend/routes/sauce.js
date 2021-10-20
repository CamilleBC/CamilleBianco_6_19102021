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


routeur.get('/', auth, sauceCtrl.getAllSauces);
routeur.post('/', auth, multer, sauceCtrl.createSauce);
routeur.get('/:id', auth, sauceCtrl.getOneSauce);
routeur.put('/:id', auth, multer, sauceCtrl.modifySauce );
routeur.delete('/:id', auth, sauceCtrl.deleteSauce)


module.exports = routeur;