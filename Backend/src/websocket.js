const socketio = require('socket.io');

let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {

        setTimeout(() => {
            socket.emit('message', 'Hello care child');
        }, 3000);
    });
};

exports.sendMessage = (message, emailRecomendado) => {

    io.emit(message, emailRecomendado)
};

exports.notificaResposta = (message, emailUsuario) => {
    io.emit(message, emailUsuario)
}