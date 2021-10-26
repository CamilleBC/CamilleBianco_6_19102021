const validator = require('password-validator');

//Permets d'imposer un schéma plus sécure
const passwordSchema = new validator();

//Les paramètres obligatoires du mdp
passwordSchema
.is().min(8)                                    //Est d'une longueur minimum de 8
.has().digits()                                 //A des chiffres
.has().symbols()                                //A un caractère spéciale
.has().uppercase()                              //A des majuscules
.has().lowercase()                              //A des minuscules
.has().not().spaces()                           //N'a pas d'espaces

module.exports = passwordSchema;
