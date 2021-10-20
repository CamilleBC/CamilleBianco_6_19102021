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

//Modifier une sauce
exports.modifySauce = (req, res, next)=>{
    //Savoir si il y a une nouvelle image
    const sauceObject = req.file ?
    //Si req.file existe (condition true)
    {...JSON.parse(req.body.sauce),
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} :
    //Si req.file n'existe pas (condition false)
    {...req.body}
    //Mettre à jour l'objet
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id : req.params.id})
        .then (function(){
            res.status(200).json({message : 'Sauce modifié.'})
        })
        .catch (function(error){
            res.status(400).json({error})
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

//Gérer les likes et dislikes
exports.updateLike = (req, res, next) =>{
    const like = req.body.like;
    const user = req.body.userId;
    const id = req.params.id;

    //Si le bouton like est cliqué
    if(like === 1){
        //Mise a jour de la sauce
        Sauce.updateOne(
            {_id : id },
            //Incrémentation du like et du user dans le tableau userLiked
            {
                $inc : {likes : +1}, 
                $push: {usersLiked : user}
            }
        )
            .then(function(){
                res.status(200).json({message : 'Like ajouté.'})
            })
            .catch(function(error){
                res.status(400).json({error})
            })
    }

    //Si le bouton dislike est cliqué
    if(like === -1){
        Sauce.updateOne(
            {_id : id },
             //Incrémentation du dislike et du user dans le tableau userDisliked
            {
                $inc : {dislikes : +1}, 
                $push: {usersDisliked : user}
            }
        )
        .then(function(){
            res.status(200).json({message : 'Dislike ajouté.'})
        })
        .catch(function(error){
            res.status(400).json({error})
        })
    }

    //Si le bouton like ou dislike est annulé
    if (like === 0){
        //On retrouve la sauce
        Sauce.findOne({_id : id})
        .then(function(sauce){
            //Si le user retire un like
            if (sauce.usersLiked.includes(user)){
                Sauce.updateOne(
                    {_id : id},
                    //Décrémentation du like et du user dans le tableau userLiked
                    {
                        $inc : { likes : -1},
                        $pull : {usersLiked : user}
                    }
                )
                .then(function(){
                    res.status(200).json({message : 'Like retiré.'})
                })
                .catch(function(error){
                    res.status(400).json({error})
                })
            }
            //Si le user retire un dislike
            if (sauce.usersDisliked.includes(user)){
                Sauce.updateOne(
                    {_id : id},
                    //Décrémentation du dislike et du user dans le tableau userDisliked
                    {
                        $inc : {dislikes : -1},
                        $pull : {usersDisliked : user}
                    }
                )
                .then(function(){
                    res.status(200).json({message : 'Dislike retiré'})
                })
                .catch(function(){
                    res.status(400).json({error})
                })
            }
        })
    }
}