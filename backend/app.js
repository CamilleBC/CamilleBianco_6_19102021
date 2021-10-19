//Importer express 
const express = require('express');
//Importer body-parser
const bodyParser = require('body-parser');
//Importer mongoose
const mongoose = require('mongoose');

//Connecter application à BDD Mongoose
mongoose.connect('mongodb+srv://Camille:yhLhpUwAl33Wp6nM@cluster0.18oz4.mongodb.net/Cluster0?retryWrites=true&w=majority', 
{useNewUrlParser : true, 
useUnifiedTopology : true})
    .then(function(){
        console.log('Connexion à MongoDB réussi.')
    })
    .catch(function(error){
        console.log('Connexion à MongoDB échoué.')
    })

//Créer l'application express
const app = express(); 

//Exporter l'application
module.exports = app;