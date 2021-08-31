import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

import socketio from 'socket.io-client';

//const [recomendacao, setRecomendacao] = useState<string>();

async function notifica(recomendacao: string) {
    const emails = await AsyncStorage.getItem('email');
    //let recomenda = recomendacao;
    console.log(recomendacao);
    console.log(emails)
    if (emails == recomendacao) {
        console.log('Strings iguais');
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Nova pergunta',
                body: "Foi feita uma pergunta do tema q vc domina, venha conferir.",
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

function socketRecomendacao() {

    socket.on('Recomendação', data => {
        //console.log(socket.sendBuffer);
        console.log('###################');
        notifica(data.email);
        //socket.sendBuffer = [];

    });
}

export {
    connect,
    disconnect,
    socketRecomendacao
};