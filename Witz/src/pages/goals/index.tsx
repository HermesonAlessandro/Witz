import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { style } from './style';

export default function CriarMetaScreen({ navigation }: any) {

  const [nomeMeta, setNomeMeta] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [emojiMeta, setEmojiMeta] = useState('');

  const handleSalvar = () => {
    if (!nomeMeta.trim() || !valorMeta.trim()) return;

    navigation.goBack(); // ✅ volta sem passar nada por parâmetro
  };

  return (
    <View style={style.tela}>
      <View style={style.modal}>

        <View style={style.cabeçalhomini}>
          <Text style={style.titulo}>Nova Meta</Text>
          <TouchableOpacity style={style.botaoFechar} onPress={() => navigation.goBack()}>
            <Text style={style.titulo}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={style.linhaInput}>
          <TextInput
            style={style.input}
            placeholder="Nome da Meta"
            value={nomeMeta}
            onChangeText={setNomeMeta}
          />
          <TextInput
            style={style.inputEmoji}
            placeholder="😀"
            value={emojiMeta}
            onChangeText={setEmojiMeta}
            maxLength={2}
          />
        </View>

        <TextInput
          style={style.input}
          placeholder="Valor da Meta"
          value={valorMeta}
          onChangeText={setValorMeta}
          keyboardType="numeric"
        />

        <TouchableOpacity style={style.botaoSalvar} onPress={handleSalvar}>
          <Text style={style.textoSalvar}>Salvar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}