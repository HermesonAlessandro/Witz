import React, { useState, useRef } from "react";
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

// Importações do Firebase e Recaptcha
import { auth, db, app } from "../../services/firebaseconfig";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default function AuthScreen() {
    const navigation = useNavigation<any>();
    
    // CORREÇÃO 1: Adicionado <any> para tipar a referência corretamente
    const recaptchaVerifier = useRef<any>(null);

    // Controle de qual etapa da tela estamos (1: Telefone, 2: Código SMS, 3: Nome)
    const [step, setStep] = useState(1);
    
    // Estados dos inputs
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [name, setName] = useState('');
    
    // Estados de controle
    const [loading, setLoading] = useState(false);
    const [uid, setUid] = useState(''); // Guarda o ID do usuário se precisar criar o perfil

    // ETAPA 1: Enviar o SMS
    const handleSendSMS = async () => {
        let numeroFormatado = phoneNumber.trim();
        if (!numeroFormatado.startsWith('+55')) {
            numeroFormatado = `+55${numeroFormatado}`;
        }

        if (numeroFormatado.length < 13) {
            Alert.alert("Atenção", "Digite um número válido com DDD. Ex: 85999998888");
            return;
        }

        // CORREÇÃO 2: Verificação de segurança adicionada
        if (!recaptchaVerifier.current) {
            Alert.alert("Aguarde", "O sistema de segurança está carregando. Tente novamente em um segundo.");
            return;
        }

        setLoading(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            
            // CORREÇÃO 3: Forçando o tipo "as any" para evitar conflito com o Firebase SDK
            const id = await phoneProvider.verifyPhoneNumber(
                numeroFormatado,
                recaptchaVerifier.current as any 
            );
            
            setVerificationId(id);
            setStep(2); // Vai para a tela de digitar o código
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível enviar o SMS. Verifique o número e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    // ETAPA 2: Verificar o Código e checar o Banco de Dados
    const handleVerifyCode = async () => {
        if (verificationCode.length < 6) {
            Alert.alert("Atenção", "O código deve ter pelo menos 6 dígitos.");
            return;
        }

        setLoading(true);
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;

            // Checa se o usuário já tem um documento salvo no Firestore
            const userDoc = await getDoc(doc(db, "usuarios", user.uid));

            if (userDoc.exists()) {
                // Usuário já cadastrado! Vai direto pra tela principal
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainScreen' }], 
                });
            } else {
                // Usuário novo! Guarda o UID e vai para a etapa de pedir o nome
                setUid(user.uid);
                setStep(3); 
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Código de verificação inválido ou expirado.");
        } finally {
            setLoading(false);
        }
    };

    // ETAPA 3: Salvar o Nome do novo usuário no Banco
    const handleSaveProfile = async () => {
        if (!name.trim()) {
            Alert.alert("Atenção", "Por favor, digite seu nome completo.");
            return;
        }

        setLoading(true);
        try {
            await setDoc(doc(db, "usuarios", uid), {
                nome: name.trim(),
                telefone: phoneNumber.trim(), // Salva o telefone que ele usou para logar
                createdAt: new Date()
            });

            // Perfil criado com sucesso, vai pra tela principal!
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }], 
            });
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível salvar seu perfil. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={style.container}>
            {/* Modal invisível obrigatório para o envio de SMS */}
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
                attemptInvisibleVerification={true}
            />

            <View style={style.boxTop}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={Logo} style={style.logo} resizeMode="contain" />
                    <Text style={style.text}>
                        {step === 1 && "Acessar Conta"}
                        {step === 2 && "Digite o Código"}
                        {step === 3 && "Complete seu Cadastro"}
                    </Text>
                </View>
            </View>
            
            <View style={style.boxMid}>
                {step === 1 && (
                    <>
                        <Text style={style.titleInput}>SEU CELULAR (COM DDD)</Text>
                        <View style={style.boxInput}>
                            <TextInput
                                style={style.input}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                                placeholder="Ex: 85999998888"
                            />
                            <MaterialIcons name='phone-android' size={20} color={themas.colors.gray} />
                        </View>
                        <Text style={{ color: themas.colors.gray, marginTop: 10, fontSize: 12, textAlign: 'center' }}>
                            Você receberá um SMS de verificação. Não precisamos de senha!
                        </Text>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Text style={style.titleInput}>CÓDIGO RECEBIDO POR SMS</Text>
                        <View style={style.boxInput}>
                            <TextInput
                                style={style.input}
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                                keyboardType="number-pad"
                                maxLength={6}
                                placeholder="000000"
                            />
                            <MaterialIcons name='lock-outline' size={20} color={themas.colors.gray} />
                        </View>
                        <TouchableOpacity 
                            style={{ marginTop: 15, alignItems: 'center' }}
                            onPress={() => setStep(1)} 
                        >
                            <Text style={{ color: themas.colors.primary, fontWeight: 'bold' }}>
                                Digitei o número errado
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Text style={style.titleInput}>NOME COMPLETO</Text>
                        <View style={style.boxInput}>
                            <TextInput
                                style={style.input}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                                placeholder="Como devemos te chamar?"
                            />
                            <MaterialIcons name='person' size={20} color={themas.colors.gray} />
                        </View>
                    </>
                )}
            </View>
            
            <View style={style.boxBottom}>
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.8}
                    onPress={
                        step === 1 ? handleSendSMS : 
                        step === 2 ? handleVerifyCode : 
                        handleSaveProfile
                    }
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={style.textButton}>
                            {step === 1 && "Receber Código SMS"}
                            {step === 2 && "Confirmar Acesso"}
                            {step === 3 && "Finalizar Cadastro"}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}