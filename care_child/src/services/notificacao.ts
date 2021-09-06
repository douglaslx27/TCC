import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export {
    notifica
}