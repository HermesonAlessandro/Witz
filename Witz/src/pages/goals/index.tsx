import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { style } from "./style";
import logo from "../../assets/Logo_desenho.png";
import { useMetas } from './MetasContext';

// ✅ Recebe navigation diretamente do Stack — não usa useNavigation()
export default function MetasScreen({ navigation }: any) {
  const { metas, removerMeta, saldoAtual } = useMetas();

  return (
    <View style={style.container}>

      <View style={style.header}>
        <Image source={logo} style={style.logo} />
        <Text style={style.headerText}>Minhas Metas</Text>
        <Text style={style.headerSubText}>Seus objetivos financeiros</Text>
      </View>

      <ScrollView
        style={style.scrollLista}
        contentContainerStyle={style.listaMetas}
        showsVerticalScrollIndicator={false}
      >
        {metas?.map((meta, index) => {
          const valor = Number(meta.valor);
          const progresso = valor > 0 ? Math.min((saldoAtual / valor) * 100, 100) : 0;

          return (
            <View key={index} style={style.cardMeta}>
              <TouchableOpacity
                style={style.botaoRemover}
                onPress={() => removerMeta(index)}
              >
                <Text style={style.textoRemover}>✕</Text>
              </TouchableOpacity>
              <Text style={style.tituloMeta}>{meta.nome} {meta.emoji}</Text>
              <Text style={style.valorMeta}>R$ {meta.valor}</Text>
              <View style={style.barraFundo}>
                <View style={[style.barraProgresso, { width: `${progresso}%` }]} />
              </View>
              <Text style={style.textoProgresso}>{progresso.toFixed(0)}%</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* ✅ navigation vem do Stack — conhece indexCreateGoals */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={style.botaodecriar}
        onPress={() => navigation.navigate('indexCreateGoals')}
      >
        <Text style={style.textoBotao}>+</Text>
      </TouchableOpacity>

    </View>
  );
}