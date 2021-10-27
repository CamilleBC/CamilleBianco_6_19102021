//Importer jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        //Chercher le token dans le header
        const token = req.headers.authorization.split(' ')[1]
        //Décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
        //Récupérer le userId du token
        const userId = decodedToken.userId
        //Si le userId existe mais ne correspond pas
        if(req.body.userId && req.body.userId ==! userId){
            throw 'User ID non valable';
        }
        //Sinon passer a l'étape suivante
        else{
            next()
        }
    }
    catch(error){
        res.status(403).json({error: error | 'Requête non authentifiée.'})
    }
}