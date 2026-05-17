import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { style } from "./style";
import Logo from '../../assets/Logo_desenho.png';
// @ts-ignore
import { MaterialIcons } from '@expo/vector-icons';
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={Logo}
                        style={style.logo}
                        resizeMode="contain"
                    />
                    <Text style={style.text}>Crie sua conta</Text>
                </View>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>NOME COMPLETO</Text>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        placeholder="Seu nome"
                    />
                    <MaterialIcons name='person' size={20} color={themas.colors.gray} />
                </View>

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

                <Text style={style.titleInput}>CONFIRMAR SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={showConfirmPassword}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons 
                            name={showConfirmPassword ? 'visibility-off' : 'remove-red-eye'} 
                            size={20} 
                            color={themas.colors.gray} 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bloco Inferior */}
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} activeOpacity={0.8}>
                    <Text style={style.textButton}>Cadastrar</Text>
                </TouchableOpacity>
                <View style={style.boxBottomText}>
                    <Text style={style.textBottom}>Já tem uma conta? </Text>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={style.textLoginNow}>Faça Login!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}