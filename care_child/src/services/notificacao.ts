import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function notifica(emailUsuario: string, motivo: string) {
    console.log('---NOTIFICACAO---', emailUsuario);
    console.log('---MOTIVO---', motivo);

    const emails = await AsyncStorage.getItem('email');
    let titulo;
    let corpo;
    console.log('Email do dispositivo', emails);

    if (motivo == 'Recomendação') {
        titulo = 'Nova Pergunta'
        corpo = 'Foi feita uma pergunta do tema que vc domina, venha conferir.'

    } else {
        titulo = 'Nova Resposta'
        corpo = 'Sua pergunta foi respondida, venha conferir.'
        console.log('---ELSE---');
    }

    if (emails == emailUsuario) {
        console.log(emails, '=> =>', emailUsuario);
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

export {
    notifica
}