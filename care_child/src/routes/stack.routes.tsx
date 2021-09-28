import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Perguntas } from "../pages/Perguntas";
import { Respostas } from "../pages/Respostas";
import { Cadastro_NS } from "../pages/Cadastro_NS";
import { Cadastro_EI } from "../pages/Cadastro_EI";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (

    <stackRoutes.Navigator
        headerMode="none"
    >
        <stackRoutes.Screen
            name="Perguntas"
            component={Perguntas}
        />

        <stackRoutes.Screen
            name="Cadastro_NS"
            component={Cadastro_NS}
        />

        <stackRoutes.Screen
            name="Cadastro_EI"
            component={Cadastro_EI}
        />

        <stackRoutes.Screen
            name="Respostas"
            component={Respostas}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;