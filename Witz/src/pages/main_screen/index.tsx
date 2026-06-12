import React, { useState, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { style } from "./style";
import logo from '../../assets/Logo_desenho.png';
// @ts-ignore
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TelaPrincipal() {
  const [transacoes, setTransacoes] = useState([
    { id: '1', titulo: 'Salário',  tipo: 'entrada', valor: 1000, data: '2026-05-20' },
    { id: '2', titulo: 'Freela',   tipo: 'entrada', valor: 250,  data: '2026-05-22' },
    { id: '3', titulo: 'Mercado',  tipo: 'saida',   valor: 120,  data: '2026-05-23' },
    { id: '4', titulo: 'Farmácia', tipo: 'saida',   valor: 80,   data: '2026-05-24' },
  ]);

  const [streakBase]                    = useState(85);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [valorInput,   setValorInput]   = useState("");
  const [tipoInput,    setTipoInput]    = useState('entrada');

  const ultimasTransacoes = [...transacoes].reverse().slice(0, 6);

  const { totalEntradas, totalSaidas, saldoAtual, diasStreak, tituloStreak, teveGastoHoje } =
    useMemo(() => {
      const entradas = transacoes.filter(t => t.tipo === 'entrada').reduce((acc, t) => acc + t.valor, 0);
      const saidas   = transacoes.filter(t => t.tipo === 'saida').reduce((acc, t) => acc + t.valor, 0);

      const hojeStr   = new Date().toISOString().split('T')[0];
      const gastoHoje = transacoes.some(t => t.tipo === 'saida' && t.data.startsWith(hojeStr));
      const dias      = gastoHoje ? 0 : streakBase;

      let titulo = "Iniciante";
      if (dias > 60)      titulo = "Mestre";
      else if (dias > 30) titulo = "Constante";
      else if (dias > 7)  titulo = "Iniciado";

      return { totalEntradas: entradas, totalSaidas: saidas, saldoAtual: entradas - saidas,
               diasStreak: dias, tituloStreak: titulo, teveGastoHoje: gastoHoje };
    }, [transacoes, streakBase]);

  function adicionarTransacao() {
    const valor = parseFloat(valorInput.replace(',', '.'));
    if (!isNaN(valor) && valor > 0) {
      setTransacoes([...transacoes, {
        id:    Math.random().toString(),
        titulo: tipoInput === 'entrada' ? 'Nova Entrada' : 'Gasto Adicionado',
        tipo:  tipoInput,
        valor,
        data:  new Date().toISOString()
      }]);
      setModalVisivel(false);
      setValorInput("");
    }
  }

  const hoje       = new Date();
  const diasSemana = ["DOMINGO","SEGUNDA-FEIRA","TERÇA-FEIRA","QUARTA-FEIRA","QUINTA-FEIRA","SEXTA-FEIRA","SÁBADO"];
  const meses      = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

  const obterSaudacao = () => {
    const hora = hoje.getHours();
    if (hora >= 5  && hora < 12) return "Bom dia 👋";
    if (hora >= 12 && hora < 18) return "Boa tarde 👋";
    return "Boa noite 👋";
  };

  return (
    // ✅ Trocado SafeAreaView por View — SafeAreaProvider no App.tsx já cuida disso
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={style.boxTop}>
          <View style={style.headerRow}>
            <View>
              <Text style={style.headerDate}>
                {diasSemana[hoje.getDay()]} , {hoje.getDate()} DE {meses[hoje.getMonth()].toUpperCase()}
              </Text>
              <Text style={style.headerGreeting}>{obterSaudacao()}</Text>
            </View>
            <Image source={logo} style={style.logo} resizeMode="contain" />
          </View>
        </View>

        <View style={style.boxMid}>
          <View style={style.saldoHeader}>
            <Text style={style.text}>SALDO ATUAL</Text>
            <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
              <Ionicons name={mostrarSaldo ? "eye-outline" : "eye-off-outline"} size={22} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>

          <Text style={style.saldoValor}>
            {mostrarSaldo ? `R$ ${saldoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "R$ ••••••"}
          </Text>

          <View style={style.resumoContainer}>
            <View style={style.blocoEntrada}>
              <View style={style.blocoIconRow}>
                <Ionicons name="trending-up" size={14} color="#00f829" />
                <Text style={style.blocoLabelEntrada}>ENTRADAS</Text>
              </View>
              <Text style={style.blocoValor}>R$ {totalEntradas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
            </View>

            <View style={style.blocoSaida}>
              <View style={style.blocoIconRow}>
                <Ionicons name="trending-down" size={14} color="#e02914" />
                <Text style={style.blocoLabelSaida}>SAÍDAS</Text>
              </View>
              <Text style={style.blocoValor}>R$ {totalSaidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={style.btnNovaTransacao} onPress={() => setModalVisivel(true)}>
          <Text style={style.btnNovaTransacaoText}>+ NOVA TRANSAÇÃO</Text>
        </TouchableOpacity>

        <View style={style.cardContainer}>
          <Text style={style.subtitle}>STREAK DE CONTROLE</Text>
          <View style={style.mainRow}>
            <View>
              <Text style={[style.streakNumber, teveGastoHoje && style.streakQuebradoColor]}>{diasStreak}</Text>
              <Text style={[style.streakText,   teveGastoHoje && style.streakQuebradoColor]}>dias</Text>
            </View>
            <View style={style.fireGroup}>
              <View style={style.fireRow}>
                <MaterialCommunityIcons name="fire" size={32} color={teveGastoHoje ? "#D3D3D3" : "#FF8C00"} style={style.fireLeftMargin} />
                <MaterialCommunityIcons name="fire" size={32} color={teveGastoHoje ? "#D3D3D3" : "#FF8C00"} />
              </View>
              <MaterialCommunityIcons name="fire" size={32} color={teveGastoHoje ? "#E5E5E5" : "#FFA500"} style={style.singleFire} />
            </View>
          </View>
          <Text style={style.statusText}>
            {teveGastoHoje ? "Você teve gastos impulsivos hoje 😢" : "sem gastos impulsivos · "}
            <Text style={style.boldStatus}>{tituloStreak}</Text>
          </Text>
          <View style={style.dashContainer}>
            {[...Array(7)].map((_, i) => (
              <View key={i} style={[style.dashActive, teveGastoHoje && style.dashInativoBg]} />
            ))}
          </View>
          <Text style={style.footerText}>últimos 7 dias</Text>
        </View>

        <View style={style.historicoContainer}>
          <View style={style.historicoHeader}>
            <Text style={style.historicoTitle}>ÚLTIMAS TRANSAÇÕES</Text>
            <TouchableOpacity><Text style={style.btnVerTodas}>Ver todas →</Text></TouchableOpacity>
          </View>
          {ultimasTransacoes.map((item) => (
            <View key={item.id} style={style.itemTransacao}>
              <View style={style.itemTransacaoInfo}>
                <View style={style.itemIconBox}>
                  <Ionicons name={item.tipo === 'entrada' ? 'wallet-outline' : 'card-outline'} size={20} color="#666" />
                </View>
                <View>
                  <Text style={style.itemTitle}>{item.titulo}</Text>
                  <Text style={style.itemSub}>{item.tipo} • Hoje</Text>
                </View>
              </View>
              <Text style={[style.itemValor, { color: item.tipo === 'entrada' ? '#04811f' : '#d61414' }]}>
                {item.tipo === 'entrada' ? '+' : '-'} R$ {item.valor.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>

      <Modal visible={modalVisivel} animationType="fade" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.modalKeyboardContainer}>
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Novo Lançamento</Text>
              <View style={style.modalTipoRow}>
                <TouchableOpacity
                  onPress={() => setTipoInput('entrada')}
                  style={[style.btnSeletorTipo, style.btnSeletorEntrada, tipoInput === 'entrada' && style.btnSeletorEntradaAtivo]}
                >
                  <Text style={style.btnSeletorText}>Entrada</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTipoInput('saida')}
                  style={[style.btnSeletorTipo, style.btnSeletorSaida, tipoInput === 'saida' && style.btnSeletorSaidaAtivo]}
                >
                  <Text style={style.btnSeletorText}>Saída</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={style.modalInput}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={valorInput}
                onChangeText={setValorInput}
              />
              <TouchableOpacity onPress={adicionarTransacao} style={style.btnConfirmar}>
                <Text style={style.btnConfirmarText}>CONFIRMAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisivel(false)} style={style.btnCancelar}>
                <Text style={style.btnCancelarText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default function TelaPrincipalComNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#888EEF',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: 70,
          borderTopWidth: 0,
          paddingBottom: 90,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={TelaPrincipal}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transações"
        component={TelaPrincipal}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "swap-horizontal" : "swap-horizontal-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Metas"
        component={TelaPrincipal}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "disc" : "disc-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="IA"
        component={TelaPrincipal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="brain" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Análises"
        component={TelaPrincipal}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}