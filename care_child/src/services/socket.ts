import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        funcaoCallBack(data.email);
    });
}

function socketNotificaResposta(funcaoCallBack: Function) {
    socket.on('Notificar_Usuario', data => {
        funcaoCallBack(data)
    })
}

export {
    connect,
    disconnect,
    socketRecomendacao,
    socketNotificaResposta
};