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

export default function ResetPassword() {
    const navigation = useNavigation<any>();
    
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
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
                    <Text style={style.text}>Redefinir Senha</Text>
                </View>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>CONFIRME SEU E-MAIL</Text>
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

                <Text style={style.titleInput}>NOVA SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput
                        style={style.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
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

                <Text style={style.titleInput}>CONFIRMAR NOVA SENHA</Text>
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
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} activeOpacity={0.8}>
                    <Text style={style.textButton}>Alterar Senha</Text>
                </TouchableOpacity>

                <View style={style.boxBottomText}>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={style.textBackLogin}>Voltar para o Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}