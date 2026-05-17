import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { style } from "./style";
import Logo from '../../assets/Logo_desenho.png';
// @ts-ignore
import { MaterialIcons } from '@expo/vector-icons';
import { themas } from "../../global/themes";

export default function Login() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={Logo}
                        style={style.logo}
                        resizeMode="contain"
                    />
                    <Text style={style.text}>Bem vindo de volta!</Text>
                </View>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="exemplo@email.com"
                    />
                    <MaterialIcons name='email' size={20} color={themas.colors.gray} />
                </View>

                <Text style={style.titleInput}>SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={showPassword}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons 
                            name={showPassword ? 'visibility-off' : 'remove-red-eye'} 
                            size={20} 
                            color={themas.colors.gray} 
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={style.forgotPasswordContainer} 
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <Text style={style.textForgotPassword}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} activeOpacity={0.8}>
                    <Text style={style.textButton}>Entrar</Text>
                </TouchableOpacity>
                <View style={style.boxBottomText}>
                    <Text style={style.textBottom}>Não tem conta? </Text>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={style.textCreateNow}>Crie agora!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}