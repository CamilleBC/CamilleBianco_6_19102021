
# Projet 6 Openclassrooms : Construire une API sécurisée pour une application d’avis gastronomique

**Objectif** : Développer l'API d'une application d’évaluation de sauces piquantes.  

## Cachier des charges

### Fonctionnalités

* Page d'inscription : Chiffrer le mot de passe de l'utilisateur, et ajouter l'utilisateur à la base de données.
* Page d'athentification : Vérifier les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la basede données et un jeton Web JSON signé contenant également
l'identifiant userID.
* Page de vue des sauces : Renvoier le tableau de toutes les sauces dans la base de données. 
* Page de la sauce : Renvoier les informations de la sauce avec l'ID fourni. Pouvoir like et dislike la sauce avec une mise a jour dans la base de donné.
* Page d'ajout de la sauce : Capturer et enregistrer l'image, analyser la sauce et l'enregistrer dans la base de données. Ajouter comme informations pour la sauce les likes et dislikes (mis à 0) et 
insérer les tableaux où seront mis les utilisateurs ayant like ou dislike le produit.
* Page de modification de la sauce : Mettre à jour la sauce avec l'identifiant fourni. Si une image est téléchargée, elle est aussi mis a jour. Pouvoir supprimer la sauce avec l'ID fourni.

### Contrainte technique

* Utiliser des pratiques de codes sécurisés.
* Les donnés des utilisateurs doivent être protégés que ce soit côté API ou côté base de données
* L'API doit respecter les standards de l'OSWASP.
* Le projet est hébergé sur un serveur Node.js
* La base de donnés doit être sur MongoDB.
* Le serveur est codé grâce au framework Express.
* Il faut utiliser le plugin Mongoose pour garantir que toutes les erreurs de la base de donnés soient signalées.
* Le front-end étant déjà réaliser, il ne doit pas y avoir de régression sur ce côté.

## Langages, technologies et logiciels utilisés

### Languages

```
Javascript
```

### Technologies

```
Framework : Express ;
Serveur : NodeJS ;
Base de données : MongoDB avec le pack Mongoose pour des schémas de données stricts.
```

### Logiciels

```
Visual Studio Code (VSC) avec le plugins : Live server
Git et Github
```

## Utilisation du projet

### Prérequis

Avoir installé : 

* NodeJS
* Angular CLI
* node-sass
* nodemon
* npm

### Installation

1. Clonez le repository.
2. A l'intérieur du dossier Web-Developer-P6, utilisez la commande `ng serve`. 
3. Aller sur le lien http://localhost:4200/. 
4. Pour lancer le serveur, depuis le dossier backend utilisez la commande `nodemon server`. 
