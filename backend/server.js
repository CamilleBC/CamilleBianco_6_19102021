//Importer le package http de node
const http = require('http')
//Importer fichier où se trouve express
const app = require('./app')

//Créer fonction renvoie de port valide
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

const port = normalizePort (process.env.PORT || 3000);

//Appliquer le port
app.set('port', port)

//Créer fonction qui gère les erreurs de serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

//Créer le serveur local avec express
const server = http.createServer(app)

//Créer un écouteur d'évènement avec intégrant la fonction qui gère les erreurs
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Ecouter les requêtes envoyer avec le numéro du port
server.listen(port);