import { notifica } from '../services/notificacao';
import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.109:3333', {
    autoConnect: false,
});

function connect() {
    if (!socket.connected) {
        socket.connect();
        socket.on('message', text => {
            console.log(text);
        });
    }
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

function socketRecomendacao(funcaoCallBack: Function) {

    socket.on('Recomendação', data => {
        notifica(data.email, 'Recomendação');
        funcaoCallBack();
    });
}

function socketNotificaResposta() {
    socket.on('Notificar_Usuario', data => {
        notifica(data.email_usuario, 'Notificar_Usuario');
        //funcaoCallBack();
    })
}

export {
    connect,
    disconnect,
    socketRecomendacao,
    socketNotificaResposta
};