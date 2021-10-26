const passwordSchema = require('../models/Password');
const Password = require('../models/Password');

module.exports = (req, res, next) =>{
    if(Password.validate(req.body.password) === false){
        res.writeHead(404, 
            {message : 'Le mot de passe doit contenir : 8 caractères sans espaces avec au minimum 1 majuscule, 1 minuscule, 1 symboles.'}, )
        res.end('Format de mot de passe incorrecte');

    }
    else{
        next();
    }
};