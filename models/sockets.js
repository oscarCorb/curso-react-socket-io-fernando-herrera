class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }

  socketsEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      // Escuchar "mensaje-to-server"
      socket.on('mensaje-to-server', (data) => {
        console.log(data);
        this.io.emit('mensaje-from-server', data);
      });
    });
  }
}

module.exports = Sockets;
