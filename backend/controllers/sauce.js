//Importer le modèle de sauce
const Sauce = require('../models/Sauce');
//Importer filesysteme de node
const fs = require('fs');

//Créer fonction récupérer toutes les sauces
exports.getAllSauces = (req, res, next)=>{
    Sauce.find()
        .then(function(sauces){
            res.status(200).json(sauces)
        })
        .catch(function(error){
            res.status(400).json({error})
        })
}

//Créer fonction création d'une sauce
exports.createSauce = (req, res, next)=>{
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,       
        usersLiked: [],
        usersDisliked: [], 
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauce.save()
        .then(function(){
            res.status(201).json({message : 'Sauce enregistrée.'})
        })
        .catch(function(error){
            res.status(400).json({error})
        })
}

//Trouver une sauce
exports.getOneSauce = (req, res, next)=>{
    Sauce.findOne({_id : req.params.id})
        .then(function(sauce){
            res.status(200).json(sauce)
        })
        .catch(function(error){
            res.status(404).json({error})
        })
}

//Supprimer une sauce
exports.deleteSauce = (req, res, next )=>{
    Sauce.findOne({_id : req.params.id})
        .then(function(sauce){
            //Récupérer le nom du fichier
            const filename = sauce.imageUrl.split('/images/')[1]
            //Supprimer un fichier et la sauce
            fs.unlink(`images/${filename}`, () =>{
                //Supprimer la sauce sélectionnée
                Sauce.deleteOne({_id : req.params.id })
                    .then(function(){
                        res.status(200).json({message : 'Sauce supprimée.'})
                    })
                    .catch(function(error){
                        res.status(500).json({error})
                    })
            })
        })
        .catch(function(error){
            res.status(500).json({error})
        })
}