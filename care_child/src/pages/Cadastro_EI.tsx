import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image

} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import api from "../services/api";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../styles/fonts";
import avatar from "../assets/avatar.png";

interface ParamsUser {
    nome: string
    sexo: string
}

export function Cadastro_EI() {

    const navigation = useNavigation();
    const route = useRoute();

    const [nome, setNome] = useState<string>(String);
    const [sexo, setSexo] = useState<string>(String);
    const [email, setemail] = useState<string>();
    let [imagem, setImagem] = useState({});
    let [img, setImg] = useState(false);

    const usuario = route.params as ParamsUser;

    useEffect(() => {
        async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        };
        setNome(usuario.nome);
        setSexo(usuario.sexo);

    }, []);

    function handleChangeEmail(emailS: string) {
        setemail(emailS);
    }
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.1,
        });

        let data = JSON.stringify(result);
        data = JSON.parse(data);
        setImagem(data);

        if (!result.cancelled)
            setImg(true);

    };

    async function setUsuario(email: string) {

        await api.post('/usuarios', {
            nome: nome,
            sexo: sexo,
            email: email,
            imagem: imagem
        })
    }

    async function handlePerguntas() {

        if (!email)
            return Alert.alert('Informe o Email Por Favor')

        const { data } = await api.get('/usuarios', { params: { email } });

        if (data) {
            return Alert.alert('Esse Email já está sendo usado');
        }

        await setUsuario(email);

        await AsyncStorage.setItem('nome', nome)
        await AsyncStorage.setItem('sexo', sexo)
        await AsyncStorage.setItem('email', email)

        navigation.navigate('Perguntas');

    }

    return (
        <LinearGradient
            colors={['rgba(45,222,200,0.97)', 'rgba(15,30,40,0.97)']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.subContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <Image
                    source={!img ? avatar : imagem}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50
                    }}
                />
                <TouchableOpacity
                    style={styles.buttonImage}
                    activeOpacity={0.6}
                    onPress={pickImage}
                >
                    <Text style={styles.textButton}>
                        Escolha uma imagem de perfil
                    </Text>

                </TouchableOpacity>

                <Text style={styles.text} >
                    Informe seu email
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Digite email aqui"}
                    autoCompleteType={"email"}
                    onChangeText={handleChangeEmail}
                />


            </KeyboardAvoidingView>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={() => handlePerguntas()}
            >
                <Text style={styles.textButton}>
                    Salvar
                </Text>

            </TouchableOpacity>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer: {
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.userName,
        color: 'white'
    },
    input: {
        borderWidth: 1,
        width: 200,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        margin: 10
    },
    buttonImage: {
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        width: 190,
        height: 50
    },
    button: {
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        width: 80,
        height: 50,
        bottom: -30
    },
    textButton: {
        fontSize: 12,
        fontFamily: fonts.userName,
        color: 'white'
    }
})