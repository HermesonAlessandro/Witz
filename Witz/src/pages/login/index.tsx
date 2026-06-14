import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { style } from "./style";
import Logo from '../../assets/Logo_desenho.png';
// @ts-ignore
import { MaterialIcons } from '@expo/vector-icons';
import { themas } from "../../global/themes";

// Importações do Firebase adicionadas
import { auth } from "../../services/firebaseconfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    
    // Novo estado para controlar o carregamento do botão
    const [loading, setLoading] = useState(false);

    // Função responsável por autenticar o usuário
    const handleLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            
            // Redireciona para a tela principal e limpa o histórico de navegação
            // Certifique-se de que 'MainScreen' é o nome exato da rota definida no seu App.tsx/Routes
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }], 
            });

        } catch (error: any) {
            console.error(error);
            // Tratamento de erros comuns do Firebase Auth
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                Alert.alert("Erro", "E-mail ou senha incorretos.");
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert("Erro", "O formato do e-mail é inválido.");
            } else {
                Alert.alert("Erro", "Não foi possível fazer o login. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                {/* Botão de Entrar atualizado com a função onPress e ActivityIndicator */}
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.8}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={style.textButton}>Entrar</Text>
                    )}
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