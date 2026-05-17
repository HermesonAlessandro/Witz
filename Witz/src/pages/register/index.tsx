import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator // Componente para mostrar a bolinha de carregamento
} from 'react-native';

import { style } from "./style";
import Logo from '../../assets/Logo_desenho.png';
// @ts-ignore
import { MaterialIcons } from '@expo/vector-icons';
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';

// 1. IMPORTAÇÕES DO FIREBASE (Ligando com a sua configuração)
import { auth, db } from "../../services/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

    // 2. FUNÇÃO QUE DISPARA O CADASTRO E SALVA NO BANCO (CRUD)
    const handleRegister = async () => {
        // Validação de campos vazios
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        // Validação de senhas iguais
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        // Exigência mínima do Firebase
        if (password.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true); // Ativa o carregamento no botão

        try {
            // Criando o usuário no Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;

            // Gravando os dados extras do usuário no Firestore (Início do seu CRUD)
            await setDoc(doc(db, "usuarios", user.uid), {
                nome: name.trim(),
                email: email.trim().toLowerCase(),
                createdAt: new Date()
            });

            Alert.alert("Sucesso!", "Sua conta foi criada com sucesso.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);

        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert("Erro", "Este endereço de e-mail já está em uso.");
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert("Erro", "O formato do e-mail é inválido.");
            } else {
                Alert.alert("Erro", "Não foi possível realizar o cadastro. Tente novamente.");
            }
        } finally {
            setLoading(false); // Desativa o carregamento
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
                {/* 3. AQUI FOI ADICIONADO O ONPRESS E O LOADING ANTES INEXISTENTES */}
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.8}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={style.textButton}>Cadastrar</Text>
                    )}
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