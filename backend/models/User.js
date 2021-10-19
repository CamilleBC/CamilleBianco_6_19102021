//Importer mongoose
const mongoose = require('mongoose'); 

//Importer uniqueValidator
const uniqueValidator = require('mongoose-unique-validator');

//Créer le schéma
const userSchema = mongoose.Schema({
    email : {type : String, unique : true, required : true}, 
    password : {type : String, required : true}
});

//Permettre un user unique
userSchema.plugin(uniqueValidator); 

//Exporter le schéma
module.exports = mongoose.model('User', userSchema)
