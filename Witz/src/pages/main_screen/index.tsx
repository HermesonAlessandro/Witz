import React, { useState, useMemo, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';

import { style } from "./style";
import Logo from '../../assets/Logo_desenho.png';
// @ts-ignore
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Hook de navegação
import { useNavigation } from "@react-navigation/native";

// Importações do Firebase
import { collection, onSnapshot, addDoc, updateDoc, doc, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../services/firebaseconfig"; 

export default function TelaPrincipal() {
  const navigation = useNavigation<any>();

  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estado EXCLUSIVO para a Apresentação (Mock de tempo)
  const [diasSimulados, setDiasSimulados] = useState(0);

  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [valorInput, setValorInput] = useState("");
  const [tipoInput, setTipoInput] = useState('entrada');
  
  const [transacaoEditando, setTransacaoEditando] = useState<string | null>(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      setCarregando(false);
      return;
    }

    const transacoesRef = collection(db, "transacoes");
    const q = query(transacoesRef, where("userId", "==", userId));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      lista.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());
      
      setTransacoes(lista);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const ultimasTransacoes = transacoes.slice(0, 6);

  const { 
    totalEntradas, 
    totalSaidas, 
    saldoAtual, 
    diasStreak, 
    tituloStreak, 
    teveGastoHoje, 
    gastouMaisDaMetade,
    streakQuebrado 
  } = useMemo(() => {
    
    const entradas = transacoes
      .filter(t => t.tipo === 'entrada')
      .reduce((acc, t) => acc + t.valor, 0);

    const saidas = transacoes
      .filter(t => t.tipo === 'saida')
      .reduce((acc, t) => acc + t.valor, 0);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const hojeStr = hoje.toISOString().split('T')[0];

    // REGRA 1: Verifica se teve gasto hoje
    let gastoHoje = transacoes.some(t => t.tipo === 'saida' && t.data.startsWith(hojeStr));
    
    // REGRA 2: Verifica se o total de gastos passou da metade das entradas
    const passouDaMetade = entradas > 0 ? (saidas > entradas / 2) : (saidas > 0);

    if (diasSimulados > 0) {
      gastoHoje = false; // Ignora o gasto de hoje durante a simulação
    }

    // O Streak quebra se acontecer a REGRA 1 ou a REGRA 2
    const perdeuStreak = gastoHoje || passouDaMetade;

    let diasReais = 0;

    if (!perdeuStreak) {
      const todasSaidas = transacoes.filter(t => t.tipo === 'saida');

      if (todasSaidas.length > 0) {
        const dataUltimaSaida = new Date(todasSaidas[0].data);
        dataUltimaSaida.setHours(0, 0, 0, 0);

        const diferencaTempo = hoje.getTime() - dataUltimaSaida.getTime();
        diasReais = Math.floor(diferencaTempo / (1000 * 3600 * 24));
      }
    }

    const dias = perdeuStreak ? 0 : (diasReais + diasSimulados);

    let titulo = "Iniciante";
    if (dias >= 60) titulo = "Mestre";
    else if (dias >= 30) titulo = "Constante";
    else if (dias >= 7) titulo = "Iniciado";

    return {
      totalEntradas: entradas,
      totalSaidas: saidas,
      saldoAtual: entradas - saidas,
      diasStreak: dias,
      tituloStreak: titulo,
      teveGastoHoje: gastoHoje,
      gastouMaisDaMetade: passouDaMetade,
      streakQuebrado: perdeuStreak 
    };
  }, [transacoes, diasSimulados]);

  function abrirModalNova() {
    setTransacaoEditando(null);
    setValorInput("");
    setTipoInput('entrada');
    setModalVisivel(true);
  }

  function abrirModalEdicao(item: any) {
    if (!item) return;
    setTransacaoEditando(item.id);
    setValorInput(String(item.valor));
    setTipoInput(item.tipo);
    setModalVisivel(true);
  }

  async function salvarTransacao() {
    const valor = parseFloat(valorInput.replace(',', '.'));

    if (!isNaN(valor) && valor > 0 && userId) {
      try {
        if (transacaoEditando) {
          const transacaoRef = doc(db, "transacoes", transacaoEditando);
          await updateDoc(transacaoRef, {
            valor: valor,
            tipo: tipoInput
          });
        } else {
          const transacoesRef = collection(db, "transacoes");
          await addDoc(transacoesRef, {
            titulo: tipoInput === 'entrada' ? 'Nova Entrada' : 'Saída',
            tipo: tipoInput,
            valor: valor,
            data: new Date().toISOString(),
            userId: userId
          });
          
          if (tipoInput === 'saida') {
            setDiasSimulados(0);
          }
        }
        fecharModal();
      } catch (error) {
        console.error("Erro ao salvar no Firebase: ", error);
        alert("Erro ao salvar a transação.");
      }
    } else {
      alert("Digite um valor válido maior que zero (ou certifique-se de estar logado).");
    }
  }

  function fecharModal() {
    setModalVisivel(false);
    setValorInput("");
    setTransacaoEditando(null);
  }

  async function fazerLogout() {
    try {
      await signOut(auth);
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });

    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível sair da conta no momento.");
    }
  }

  function confirmarLogout() {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair do aplicativo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", onPress: fazerLogout, style: "destructive" }
      ]
    );
  }

  const hoje = new Date();
  const diasSemana = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

  const obterSaudacao = () => {
    const hora = hoje.getHours();
    if (hora >= 5 && hora < 12) return "Bom dia 👋";
    if (hora >= 12 && hora < 18) return "Boa tarde 👋";
    return "Boa noite 👋";
  };

  if (carregando) {
    return (
      <SafeAreaView style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.boxTop}>
          <View style={style.headerRow}>
            <View>
              <Text style={style.headerDate}>
                {diasSemana[hoje.getDay()]} , {hoje.getDate()} DE {meses[hoje.getMonth()].toUpperCase()}
              </Text>
              <Text style={style.headerGreeting}>
                {obterSaudacao()}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
              <Image source={Logo} style={style.logo} resizeMode="contain" />
              <TouchableOpacity onPress={confirmarLogout}>
                <Ionicons name="log-out-outline" size={28} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={style.boxMid}>
          <View style={style.saldoHeader}>
            <Text style={style.text}>SALDO ATUAL</Text>
            <TouchableOpacity onPress={() => setMostrarSaldo(!mostrarSaldo)}>
              <Ionicons
                name={mostrarSaldo ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="rgba(255,255,255,0.6)"
              />
            </TouchableOpacity>
          </View>

          <Text style={style.saldoValor}>
            {mostrarSaldo 
              ? `R$ ${saldoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` 
              : "R$ ••••••"
            }
          </Text>

          <View style={style.resumoContainer}>
            <View style={style.blocoEntrada}>
              <View style={style.blocoIconRow}>
                <Ionicons name="trending-up" size={14} color="#00f829" />
                <Text style={style.blocoLabelEntrada}>ENTRADAS</Text>
              </View>
              <Text style={style.blocoValor}>
                R$ {totalEntradas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </Text>
            </View>

            <View style={style.blocoSaida}>
              <View style={style.blocoIconRow}>
                <Ionicons name="trending-down" size={14} color="#e02914" />
                <Text style={style.blocoLabelSaida}>SAÍDAS</Text>
              </View>
              <Text style={style.blocoValor}>
                R$ {totalSaidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={style.btnNovaTransacao} onPress={abrirModalNova}>
          <Text style={style.btnNovaTransacaoText}>+ NOVA TRANSAÇÃO</Text>
        </TouchableOpacity>

        <View style={style.cardContainer}>
          <Text style={style.subtitle}>STREAK DE CONTROLE</Text>

          <View style={style.mainRow}>
            <View>
              <Text style={[style.streakNumber, streakQuebrado && style.streakQuebradoColor]}>
                {diasStreak}
              </Text>
              <Text style={[style.streakText, streakQuebrado && style.streakQuebradoColor]}>dias</Text>
            </View>

            <View style={style.fireGroup}>
              <View style={style.fireRow}>
                <MaterialCommunityIcons name="fire" size={32} color={streakQuebrado ? "#D3D3D3" : "#FF8C00"} style={style.fireLeftMargin} />
                <MaterialCommunityIcons name="fire" size={32} color={streakQuebrado ? "#D3D3D3" : "#FF8C00"} />
              </View>
              <MaterialCommunityIcons name="fire" size={32} color={streakQuebrado ? "#E5E5E5" : "#FFA500"} style={style.singleFire} />
            </View>
          </View>

          <Text style={style.statusText}>
            {teveGastoHoje 
              ? "Você teve gastos impulsivos hoje 😢" 
              : gastouMaisDaMetade 
                ? "Gastou mais de 50% da renda 🚨" 
                : "sem gastos impulsivos · "
            } 
            <Text style={style.boldStatus}>{tituloStreak}</Text>
          </Text>

          <View style={style.dashContainer}>
            {[...Array(7)].map((_, index) => (
              <View 
                key={index} 
                style={[style.dashActive, streakQuebrado && style.dashInativoBg]} 
              />
            ))}
          </View>
          
          <Text style={style.footerText}>últimos 7 dias</Text>
        </View>

        <View style={style.historicoContainer}>
          <View style={style.historicoHeader}>
            <Text style={style.historicoTitle}>ÚLTIMAS TRANSAÇÕES</Text>
            
            {/* --- ÁREA ALTERADA PARA O TESTE --- */}
            <TouchableOpacity 
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => {
                Alert.alert("Sucesso", "O botão foi clicado!"); 
                navigation.navigate('MainScreen', { screen: 'Transações' });
              }}
            >
              <Text style={style.btnVerTodas}>Ver todas →</Text>
            </TouchableOpacity>
            {/* ---------------------------------- */}
            
          </View>

          {ultimasTransacoes.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
              Nenhuma transação ainda.
            </Text>
          ) : (
            ultimasTransacoes.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={style.itemTransacao}
                activeOpacity={0.7}
                onPress={() => abrirModalEdicao(item)}
              >
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
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* BOTÃO EXCLUSIVO PARA A APRESENTAÇÃO */}
        <TouchableOpacity 
          style={{
            margin: 20,
            padding: 15,
            backgroundColor: '#333',
            borderRadius: 10,
            alignItems: 'center',
            opacity: 0.8
          }}
          onPress={() => setDiasSimulados(diasSimulados + 7)}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
            🛠️ DEV: Avançar Tempo (+7 Dias)
          </Text>
        </TouchableOpacity>
        
      </ScrollView>

      <Modal visible={modalVisivel} animationType="fade" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.modalKeyboardContainer}>
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>
                {transacaoEditando ? "Editar Lançamento" : "Novo Lançamento"}
              </Text>
              
              <View style={style.modalTipoRow}>
                <TouchableOpacity 
                  onPress={() => setTipoInput('Entrada')} 
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

              <TouchableOpacity onPress={salvarTransacao} style={style.btnConfirmar}>
                <Text style={style.btnConfirmarText}>CONFIRMAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fecharModal} style={style.btnCancelar}>
                <Text style={style.btnCancelarText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}