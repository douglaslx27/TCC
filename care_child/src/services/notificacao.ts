import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function notifica(emailUsuario: string, motivo: string) {
    const emails = await AsyncStorage.getItem('email');
    let titulo;
    let corpo;

    if (motivo == 'Recomendação') {
        titulo = 'Nova Pergunta'
        corpo = 'Foi feita uma pergunta do tema que vc domina, venha conferir.'

    } else {
        titulo = 'Nova Resposta'
        corpo = 'Sua pergunta foi respondida, venha conferir.'
    }

    if (emails == emailUsuario) {

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