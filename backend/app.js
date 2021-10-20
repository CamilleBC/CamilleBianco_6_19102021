//Importer express 
const express = require('express');
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

//Paramètrer les accès de notre API
app.use((req, res, next) => {
    //Permission pour tout origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Permission pour certains entêtes
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Permission pour certaines méthodes 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



//Importer le routeur User
const userRoutes = require('./routes/user')
//Importer le routeur Sauce
const sauceRoutes = require('./routes/sauce');
const bodyParser = require('body-parser');

//Transformer le corps de la requête POST en objet javascript
app.use(bodyParser.json())

//Créer le point d'accès de userRoute
app.use('/api/auth', userRoutes)
//Créer le point d'accès de userRoute
app.use('/api/sauces', sauceRoutes)

//Exporter l'application
module.exports = app;