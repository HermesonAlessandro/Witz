import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { style } from "./style";
import Logo from '../../assets/Logo_nome_texto.png';

export default function Initial() {
    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.content}>
                <View style={style.boxTop}>
                    <Image source={Logo} style={style.logo} resizeMode="contain" />
                </View>

                <View style={style.boxMid}>
                    <Text style={style.title}>Sua Liberdade Financeira Começa Aqui</Text>
                    <Text style={style.description}>
                        Organize seus gastos, planeje seu futuro e conquiste o controle total do seu dinheiro.
                    </Text>
                </View>

                <View style={style.boxBottom}>
                    <TouchableOpacity 
                        style={style.button} 
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Login' as never)} 
                    >
                        <Text style={style.textButton}>Começar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}