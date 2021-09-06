import React, { useState, useEffect } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { Title } from '../components/Title';

import { Pergunta } from '../components/Pergunta';
import { Feather } from '@expo/vector-icons';
import fonts from '../styles/fonts';

import api from '../services/api';
import { connect, disconnect, socketRecomendacao } from '../services/socket';
import { notifica } from '../services/notificacao';
import { PerguntasProps } from '../libs/props';

export function Perguntas() {

    const navigation = useNavigation();
    const [perguntas, setPerguntas] = useState<PerguntasProps[]>([]);
    const [visible, setVisible] = useState(false);
    const [conteudo, setConteudo] = useState<string>();
    const [reload, setReload] = useState(false)



    useEffect(() => {
        async function listPerguntas() {
            connect();
            const { data } = await api.get('/perguntas');
            setPerguntas(data);
            setReload(false)
        }
        listPerguntas();
        console.log('Chamando socketRecomendacao');
        socketRecomendacao(notificacao);

    }, [reload]);

    function notificacao(emailNotificacao: string) {
        notifica(emailNotificacao, 'Recomendação')
        setReload(true);
    }

    function handleChangeConteudo(conteudoS: string) {
        setConteudo(conteudoS);
    }

    async function loadEmail() {
        const emails = await AsyncStorage.getItem('email');
        if (!emails) {
            navigation.navigate('Cadastro');
        } else {
            setVisible(true);

        }
    }

    async function fazerPergunta() {
        const email = await AsyncStorage.getItem('email');
        console.log(conteudo)
        console.log(email)
        if (conteudo) {
            await api.post('/perguntas', {
                email_usuario: email,
                conteudo: conteudo
            });

            navigation.navigate('Perguntas');
        }
        setVisible(false);
        //disconnect();
    }

    return (
        <LinearGradient
            colors={['rgba(45,222,200,0.97)', 'rgba(15,30,40,0.97)']}
            style={styles.container}
        >

            <Title />

            <FlatList
                data={perguntas}
                renderItem={({ item }) => (

                    <Pergunta
                        id={item.id}
                        email_usuario={item.email_usuario}
                        conteudo={item.conteudo}
                        datapost={item.datapost}
                    />
                )}
                showsVerticalScrollIndicator={false}

            />


            {
                visible &&
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={"Escreva uma pergunta"}
                        multiline={true}
                        onChangeText={handleChangeConteudo}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => fazerPergunta()}
                    >
                        <Feather
                            name="send"
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>


                </View>
            }
            {
                !visible &&
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={() => loadEmail()}
                >
                    <Feather
                        name="plus"
                        style={styles.buttonIcon}

                    />
                    <Text style={styles.buttonText}>
                        Nova Pergunta
                    </Text>
                </TouchableOpacity>
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10
    },
    sendButton: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 25
    },
    input: {
        borderWidth: 1,
        width: 250,
        height: 50,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white'
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        alignItems: 'center',
        paddingBottom: 15,
        alignSelf: 'flex-end',
        right: 20,
        bottom: 10,
        height: 90,
        width: 90,
        borderRadius: 45,
        position: 'absolute'
    },
    buttonIcon: {
        fontSize: 30,
        color: 'white',
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: fonts.text
    }
});
