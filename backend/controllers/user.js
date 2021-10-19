//Importer le modèle user
const User = require('../models/User');
//Importer le package de cryptage bcrypt
const bcrypt = require('bcrypt');
//Importer le package de créateur et vérificateur de token jsonwebtoken
const jwt = require('jsonwebtoken');

//Créer et exporter la fonction signup
exports.signup = (req, res, next)=>{
    //Hasher le mdp
    bcrypt.hash(req.body.password, 10)
        //Résolution de la promesse avec retour du mdp hasher
        .then(function(hash){
            //Création du nouvel utilisateur
            const user = new User({
                email : req.body.email, 
                password : hash
            })
            //Sauvegarde de l'utilisateur dans le BDD
            user.save()
                .then(function(){
                    //Si utilisateur sauvegardé
                    res.status(200).json({message : 'Utilisateur créé.'})
                })
                .catch(function(error){
                    //Si erreur lors de la sauvegarde
                    res.status(400).json({error})
                })
        })
        //Si erreur lors du hashage
        .catch(function(error){
            res.status(500).json({error})
        })
}