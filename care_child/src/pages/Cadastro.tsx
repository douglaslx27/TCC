import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { RadioButton } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import fonts from "../styles/fonts";

export function Cadastro() {
    const navigation = useNavigation();

    const [nome, setNome] = useState<string>();
    const [sexo, setSexo] = useState<string>();
    const [email, setemail] = useState<string>();

    function handleChangeNome(nomeS: string) {
        setNome(nomeS);
    }
    function handleChangeEmail(emailS: string) {
        setemail(emailS);
    }

    async function setUsuario(email: string) {

        await api.post('/usuarios', {
            nome: nome,
            sexo: sexo,
            email: email,
        })

    }

    async function handlePerguntas() {
        if (!nome)
            return Alert.alert('Informe o Nome Por Favor')
        if (!sexo)
            return Alert.alert('Informe o Sexo Por Favor')
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
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.text} >
                    Informe seu nome
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={"Digite seu nome aqui"}
                    onChangeText={handleChangeNome}
                />

                <Text style={styles.text} >
                    Informe seu email
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Digite email aqui"}
                    onChangeText={handleChangeEmail}
                />
                <Text style={styles.text} >
                    Informe seu sexo
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.text}>
                        Masculino
                    </Text>
                    <RadioButton
                        value="M"
                        status={sexo === 'M' ? 'checked' : 'unchecked'}
                        onPress={() => setSexo('M')}
                    />
                    <Text style={styles.text}>
                        {`\t`} Feminino
                    </Text>
                    <RadioButton
                        value="F"
                        status={sexo === 'F' ? 'checked' : 'unchecked'}
                        onPress={() => setSexo('F')}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={() => handlePerguntas()}
                >
                    <Text style={styles.textButton}>
                        Salvar
                    </Text>

                </TouchableOpacity>
            </KeyboardAvoidingView>


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
    button: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'rgba(72, 190, 170, 0.9)',
        width: 80,
        height: 50
    },
    textButton: {
        fontSize: 12,
        fontFamily: fonts.userName,
        color: 'white'

    }
})