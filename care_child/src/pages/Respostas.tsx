import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import api from '../services/api';
import fonts from '../styles/fonts';
import { Header } from '../components/Header';
import { Resposta } from '../components/Resposta';
import { useRoute } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { PerguntasProps, RespostasProps, UsuariosProps } from '../libs/props';

interface Params {
    pergunta: PerguntasProps
}

interface ParamsUser {
    usuario: UsuariosProps
}

export function Respostas() {

    const route = useRoute();
    const navigation = useNavigation();

    const { pergunta } = route.params as Params;
    const { usuario } = route.params as ParamsUser;

    const [resposta, setResposta] = useState<RespostasProps[]>([]);
    const [conteudo, setConteudo] = useState<string>();
    const [visible, setVisible] = useState(false);


    async function listRespostas() {
        let id_pergunta = pergunta.id;
        let { data } = await api.get('/respostas', { params: { id_pergunta } });
        setResposta(data);
        //setReload(false);
    }

    useEffect(() => {
        listRespostas();
        //socketNotificaResposta(listRespostas);

    }, []);

    /* async function notificacao(emailNotificacao: string) {
         await listRespostas(pergunta.id);
         await notifica(emailNotificacao, 'Notificar_Usuario');
         //setReload(true)
     }*/

    async function loadEmail() {
        const emails = await AsyncStorage.getItem('email');
        if (!emails) {
            navigation.navigate('Cadastro_NS');
        } else {
            setVisible(true);
        }
    }

    function handleChangeConteudo(conteudoS: string) {
        setConteudo(conteudoS);
    }
    function handleInputBlur() {
        if (!conteudo)
            setVisible(false);
    }

    async function criarResposta() {

        const email = await AsyncStorage.getItem('email');

        if (conteudo) {
            await api.post('/respostas', {
                email_usuario: email,
                id_pergunta: pergunta.id,
                conteudo: conteudo
            });
        }
        listRespostas();
        setVisible(false);
    }

    return (
        <LinearGradient
            colors={['rgba(45,222,200,0.97)', 'rgba(15,30,40,0.97)']}
            style={styles.container}
        >
            <Header
                nome={usuario.nome}
                sexo={usuario.sexo}
                email={usuario.email}
                imagem={usuario.imagem}
            />

            <View style={styles.pergunta}>

                <Text style={styles.text}>
                    {pergunta.conteudo}
                </Text>

            </View>
            <FlatList
                data={resposta}
                renderItem={({ item }) => (
                    <Resposta
                        id={item.id}
                        email_usuario={item.email_usuario}
                        id_pergunta={item.id_pergunta}
                        conteudo={item.conteudo}
                        datapost={item.datapost}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.inputContainer}>
                {
                    visible ?
                        <View style={styles.subInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Escreva uma resposta"}
                                multiline={true}
                                onBlur={handleInputBlur}
                                onChangeText={handleChangeConteudo}
                            />
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={() => criarResposta()}
                            >
                                <Feather
                                    name="send"
                                    style={styles.buttonIcon}
                                />
                            </TouchableOpacity>


                        </View>

                        :

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
                                Criar Resposta
                            </Text>
                        </TouchableOpacity>
                }
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pergunta: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 2,
        borderRadius: 20,
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.text,
        paddingHorizontal: 10
    },
    inputContainer: {
        alignItems: 'center'
    },
    subInputContainer: {
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
        marginLeft: 10,
        justifyContent: 'center',
        borderRadius: 25
    },
    input: {
        borderWidth: 1,
        width: 240,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white'
    },
    buttonIcon: {
        fontSize: 30,
        color: 'white',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        alignItems: 'center',
        paddingBottom: 15,
        alignSelf: 'flex-start',
        right: 20,
        bottom: 10,
        height: 90,
        width: 90,
        borderRadius: 45,
        position: 'absolute'
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: fonts.text
    }
})