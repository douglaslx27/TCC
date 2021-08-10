import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import api from "../services/api";;
import fonts from "../styles/fonts";

interface RespostasProps {
    id: number;
    email_usuario: string;
    id_pergunta: number;
    conteudo: string;
    datapost: string;
}

interface UsuariosProps {
    nome: string;
    sexo: string;
    email: string;
}

export function Resposta(dadosResposta: RespostasProps) {

    const [usuario, setUsuario] = useState<UsuariosProps>();

    useEffect(() => {
        async function buscaUsuario(email: string) {
            const { data } = await api.get('/usuarios', { params: { email } });

            setUsuario(data);
        }
        buscaUsuario(dadosResposta.email_usuario);

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.userName}>
                {usuario?.nome}
            </Text>
            <Text style={styles.text}>
                {dadosResposta.conteudo}
            </Text>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
        alignSelf: 'flex-start'
    },

    userName: {
        fontSize: 14,
        fontFamily: fonts.userName,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },

    text: {
        fontSize: 14,
        fontFamily: fonts.text,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        marginRight: 10
    }

})