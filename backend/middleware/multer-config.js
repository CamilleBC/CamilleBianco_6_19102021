//Importer multer 
const multer = require('multer');

//Dictionnaire des mime types
const MIME_TYPES = {
    'image/jpg' : 'jpg', 
    'image/jpeg' : 'jpg', 
    'image/png' : 'png'
};

//Objet de configuration de multer
const storage = multer.diskStorage({
    destination : function(req, file, callback){
        /*1er paramètre null pour indiquer qu'il n'y pas eu d'erreur sur la req, 
        2ème paramètre nom du dossier*/
        callback(null, 'images')
    }, 
    //Créer un nom de fichier
    filename : function(req, file, callback){
        //Récupérer le nom avec élimination des espaces. join permets de rejoindre le tableau
        const name = file.originalname.split(' ').join('_');
        //Appliquer une extension au fichier
        const extension = MIME_TYPES[file.mimetype];
        //Création du nouveau nom avec un timestamp
        callback(null, name + Date.now() + '.' + extension)
    }
})

//Exporter notre fonction storage. Single signifie fichier unique
module.exports = multer({storage}).single('image')