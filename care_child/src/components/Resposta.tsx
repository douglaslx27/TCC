import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { RespostasProps, UsuariosProps } from "../libs/props";

import api from "../services/api";
import { formataData } from "../services/formatarDatas";
import fonts from "../styles/fonts";


export function Resposta(dadosResposta: RespostasProps) {

    const [usuario, setUsuario] = useState<UsuariosProps>();

    useEffect(() => {
        async function buscaUsuario(email: string) {
            const { data } = await api.get('/usuarios', { params: { email } });

            setUsuario(data);
        }
        buscaUsuario(dadosResposta.email_usuario);

    }, []);

    let dataHora = formataData(dadosResposta.datapost);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.userName}>
                    {usuario?.nome}
                </Text>
                <Text style={styles.dataHora}>
                    {dataHora}
                </Text>

            </View>

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
        marginRight: 10,
        alignSelf: 'flex-start'
    },

    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        //paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        marginRight: 10
    },

    dataHora: {
        fontSize: 10,
        color: 'black',
        paddingTop: 12,
        marginLeft: 5,
        marginRight: 12,
        fontFamily: fonts.text
    }

})