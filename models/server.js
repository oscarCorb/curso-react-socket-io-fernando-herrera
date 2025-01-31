// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // HTTP server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server);
  }

  middleWares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    // Habilitar CORS
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // inicializar Middlewares
    this.middleWares();

    // Inicializar sockets
    this.configurarSockets();

    // inicializar servidor
    this.server.listen(this.port, () => {
      console.log('Server running on port:', this.port);
    });
  }
}

module.exports = Server;
