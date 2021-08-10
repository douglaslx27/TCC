import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import UserImg from '../assets/Douglas.png';
import fonts from '../styles/fonts';
import api from "../services/api";

function reduzTexto(texto: string) {
    let textoSaida = texto.substr(0, 15);

    return textoSaida
}

function formataData(data: string) {
    let ano = data.substr(0, 10);
    let hora = data.substr(11);

    let anoHora = [ano, hora];

    return anoHora;
}

interface PerguntasProps {
    id: number;
    email_usuario: string;
    conteudo: string;
    datapost: string;
}
interface UsuariosProps {
    nome: string;
    sexo: string;
    email: string;
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
    let anoHora = formataData(dados.datapost);

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
                    source={UserImg}
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
                    {anoHora[1]}
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
        marginLeft: 20,
        marginRight: 20,
        fontFamily: fonts.text
    }
})