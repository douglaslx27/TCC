import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import fonts from '../styles/fonts';
import api from "../services/api";
import { formataData } from "../services/formatarDatas";
import { PerguntasProps, UsuariosProps } from "../libs/props";
import avatar from "../assets/avatar.png";

function reduzTexto(texto: string) {
    let textoSaida = texto.substring(0, 18);

    return textoSaida
}

export function Pergunta(dados: PerguntasProps) {

    const [usuario, setUsuario] = useState<UsuariosProps>();

    useEffect(() => {
        async function buscaUsuario(email: string) {
            const { data } = await api.get('/usuarios', { params: { email } });

            setUsuario(data);
        }
        buscaUsuario(dados.email_usuario);

    }, []);

    let perguntaReduzida = reduzTexto(dados.conteudo);

    let dataHora = formataData(dados.datapost);

    const navigation = useNavigation();

    function handleRespostas(pergunta: PerguntasProps) {
        navigation.navigate('Respostas', { pergunta, usuario });
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity

                activeOpacity={0.6}
                style={styles.button}
                onPress={() => handleRespostas(dados)}
            >
                <Image
                    source={!usuario?.imagem ? avatar : { uri: `data:image/jpg;base64,${usuario?.imagem}` }}
                    style={styles.image}
                />
                <View style={styles.subContainer}>
                    <Text style={styles.userName}>
                        {usuario?.nome}
                    </Text>
                    <Text style={styles.text}>

                        {perguntaReduzida + [' ...']}
                    </Text>
                </View>

                <Text style={styles.dataHora}>
                    {dataHora.substring(0, 5)}{"\n"}
                    {dataHora.substring(6, 17)}
                </Text>

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: 'white',
        paddingVertical: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 20
    },
    subContainer: {
        marginLeft: 20,
        flex: 2
    },
    userName: {
        fontSize: 20,
        color: 'white',
        fontFamily: fonts.userName
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontFamily: fonts.question
    },
    dataHora: {
        fontSize: 10,
        color: 'white',
        marginLeft: 10,
        marginRight: 20,
        fontFamily: fonts.text
    }
})