import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

import socketio from 'socket.io-client';

async function notifica(emailUsuario: string, motivo: string) {
    const emails = await AsyncStorage.getItem('email');
    let titulo;
    let corpo;
    console.log(emailUsuario);
    console.log(emails)

    if (motivo == 'Recomendação') {
        titulo = 'Nova Pergunta'
        corpo = 'Foi feita uma pergunta do tema q vc domina, venha conferir.'
        console.log(titulo);
    } else {
        titulo = 'Nova Resposta'
        corpo = 'Sua pergunta foi rspondida, venha conferir.'
        console.log(titulo);
    }

    if (emails == emailUsuario) {
        console.log('Strings iguais');
        Notifications.scheduleNotificationAsync({
            content: {
                title: titulo,
                body: corpo,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: {
                seconds: 10
            }
        });
    }
}

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

function socketRecomendacao(teste: Function) {

    socket.on('Recomendação', data => {
        teste(data.email);
    });

}

function socketNotificaResposta(teste: Function) {
    socket.on('Notificar_Usuario', data => {
        teste(data)
    })
}

export {
    connect,
    disconnect,
    socketRecomendacao,
    socketNotificaResposta
};