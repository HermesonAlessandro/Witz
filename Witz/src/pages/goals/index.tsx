import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';

import { style } from './style';

// Importações do Firebase
import { collection, onSnapshot, query, where, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebaseconfig"; 

interface Meta {
  id: string;
  nome: string;
  valorTotal: number;
  valorAtual: number;
  emoji: string;
  userId: string;
}

export default function HomeScreen() {
  const userId = auth.currentUser?.uid;

  // Estados das metas e saldo
  const [metas, setMetas] = useState<Meta[]>([]);
  const [saldoDisponivel, setSaldoDisponivel] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estados do formulário de Nova Meta
  const [nomeMeta, setNomeMeta] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [emojiMeta, setEmojiMeta] = useState('');

  // Estados do Pop-up de Depósito
  const [modalDepositoVisible, setModalDepositoVisible] = useState(false);
  const [valorDeposito, setValorDeposito] = useState("");
  const [metaSelecionada, setMetaSelecionada] = useState<Meta | null>(null);

  // 1. Escutar as Metas do Firebase em tempo real
  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "metas"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Meta));
      setMetas(lista);
    });

    return () => unsubscribe();
  }, [userId]);

  // 2. Escutar as Transações em tempo real para calcular o Saldo Disponível
  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "transacoes"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let entradas = 0;
      let saidas = 0;

      snapshot.docs.forEach(doc => {
        const t = doc.data();
        if (t.tipo === 'entrada') {
          entradas += t.valor;
        } else if (t.tipo === 'saida') {
          saidas += t.valor;
        }
      });

      setSaldoDisponivel(entradas - saidas);
    });

    return () => unsubscribe();
  }, [userId]);

  // Salvar Nova Meta no Firebase
  const handleSalvar = async () => {
    if (!nomeMeta.trim() || !valorMeta.trim()) {
      Alert.alert("Atenção", "Preencha o nome e o valor da meta.");
      return;
    }

    const valorNumerico = parseFloat(valorMeta);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "O valor deve ser um número válido maior que zero.");
      return;
    }

    if (!userId) {
      Alert.alert("Erro", "Utilizador não autenticado.");
      return;
    }

    try {
      await addDoc(collection(db, "metas"), {
        nome: nomeMeta,
        valorTotal: valorNumerico,
        valorAtual: 0,
        emoji: emojiMeta || '🎯',
        userId: userId
      });
      fecharModal();
    } catch (error) {
      console.error("Erro ao criar meta:", error);
      Alert.alert("Erro", "Não foi possível guardar a meta.");
    }
  };

  // Processar o Depósito na Meta
  const realizarDeposito = async () => {
    const valorNum = parseFloat(valorDeposito.replace(',', '.'));

    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert("Erro", "Digite um valor válido para o depósito.");
      return;
    }

    if (valorNum > saldoDisponivel) {
      Alert.alert(
        "Saldo Insuficiente", 
        `O seu saldo atual é de R$ ${saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. Não pode depositar mais do que isso.`
      );
      return;
    }

    if (metaSelecionada && userId) {
      try {
        // A. Atualiza o valor guardado na Meta
        const metaRef = doc(db, "metas", metaSelecionada.id);
        await updateDoc(metaRef, {
          valorAtual: metaSelecionada.valorAtual + valorNum
        });

        // B. Cria uma transação de SAÍDA para abater do saldo da Main Screen
        await addDoc(collection(db, "transacoes"), {
          titulo: `Meta: ${metaSelecionada.nome}`,
          tipo: 'saida',
          valor: valorNum,
          data: new Date().toISOString(),
          userId: userId
        });

        Alert.alert("Sucesso!", `R$ ${valorNum.toFixed(2)} foram transferidos para a meta.`);
        setModalDepositoVisible(false);
        setValorDeposito("");
        setMetaSelecionada(null);
      } catch (error) {
        console.error("Erro ao processar depósito:", error);
        Alert.alert("Erro", "Falha ao realizar o depósito.");
      }
    }
  };

  // Confirmar antes de excluir
  const confirmarExclusao = (meta: Meta) => {
    Alert.alert(
      "Excluir Meta",
      `Tem certeza que deseja excluir a meta "${meta.nome}"?${
        meta.valorAtual > 0 
          ? `\n\nO valor de R$ ${meta.valorAtual.toFixed(2)} será devolvido ao seu saldo principal.` 
          : ''
      }`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => deletarMeta(meta) 
        }
      ]
    );
  };

  // Processar a exclusão e devolver o dinheiro
  const deletarMeta = async (meta: Meta) => {
    try {
      // 1. Devolver o dinheiro ao saldo (criando uma 'entrada')
      if (meta.valorAtual > 0 && userId) {
        await addDoc(collection(db, "transacoes"), {
          titulo: `Reembolso de Meta: ${meta.nome}`,
          tipo: 'entrada',
          valor: meta.valorAtual,
          data: new Date().toISOString(),
          userId: userId
        });
      }

      // 2. Excluir a meta definitivamente do Firebase
      await deleteDoc(doc(db, "metas", meta.id));
      
      Alert.alert("Sucesso", "Meta excluída e saldo atualizado.");
    } catch (error) {
      console.error("Erro ao excluir meta:", error);
      Alert.alert("Erro", "Não foi possível excluir a meta no momento.");
    }
  };

  const fecharModal = () => {
    setNomeMeta('');
    setValorMeta('');
    setEmojiMeta('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={style.containerPrincipal}>
      <StatusBar barStyle="dark-content" />
      
      {/* Cabeçalho */}
      <View style={style.homeHeader}>
        <Text style={style.homeTitle}>Minhas Metas</Text>
        <TouchableOpacity style={style.btnAbrir} onPress={() => setModalVisible(true)}>
          <Text style={style.btnAbrirTexto}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Metas */}
      <FlatList
        data={metas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const porcentagem = item.valorTotal > 0 ? (item.valorAtual / item.valorTotal) * 100 : 0;
          const falta = item.valorTotal - item.valorAtual;
          
          return (
            <View style={style.cardMeta}>
              <View style={style.metaHeader}>
                <Text style={style.itemEmoji}>{item.emoji}</Text>
                <View>
                  <Text style={style.metaTitulo}>{item.nome}</Text>
                  <Text style={style.metaDias}>Em andamento</Text>
                </View>
              </View>

              <View style={style.metaInfo}>
                <Text style={style.metaValorAtual}>R$ {item.valorAtual.toFixed(2)}</Text>
                <Text style={style.metaPorcentagem}>{porcentagem.toFixed(0)}%</Text>
                <Text style={style.metaValorTotal}>R$ {item.valorTotal.toFixed(2)}</Text>
              </View>

              <View style={style.barraFundo}>
                <View style={[style.barraProgresso, { width: `${Math.min(porcentagem, 100)}%` }]} />
              </View>

              <Text style={style.metaFaltam}>Faltam R$ {falta > 0 ? falta.toFixed(2) : '0.00'}</Text>

              <View style={style.metaAcoes}>
                <TouchableOpacity 
                  style={style.btnDepositar}
                  onPress={() => {
                    setMetaSelecionada(item);
                    setModalDepositoVisible(true);
                  }}
                >
                  <Text style={style.btnDepositarTexto}>+ Depositar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmarExclusao(item)}>
                  <Text style={{fontSize: 20}}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={style.emptyText}>Nenhuma meta cadastrada ainda. 🎯</Text>
        }
      />

      {/* Modal de Nova Meta */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={style.modalOverlay}
        >
          <View style={style.card}>
            <View style={style.header}>
              <Text style={style.title}>Nova Meta</Text>
              <TouchableOpacity onPress={fecharModal}><Text style={style.close}>✕</Text></TouchableOpacity>
            </View>

            <Text style={style.label}>Nome da Meta</Text>
            <TextInput style={style.input} placeholder="Ex: Viagem" value={nomeMeta} onChangeText={setNomeMeta} />

            <Text style={style.label}>Emoji</Text>
            <TextInput style={style.input} placeholder="✈️" value={emojiMeta} onChangeText={setEmojiMeta} maxLength={2} />

            <Text style={style.label}>Valor da Meta</Text>
            <TextInput style={style.input} placeholder="20000" keyboardType="numeric" value={valorMeta} onChangeText={setValorMeta} />

            <TouchableOpacity style={style.button} onPress={handleSalvar}>
              <Text style={style.buttonText}>Salvar Meta</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Pop-up de Depósito */}
      <Modal visible={modalDepositoVisible} animationType="fade" transparent={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={style.modalOverlay}
        >
          <View style={style.card}>
            <View style={style.header}>
              <Text style={style.title}>Depositar em: {metaSelecionada?.nome}</Text>
              <TouchableOpacity onPress={() => { setModalDepositoVisible(false); setValorDeposito(""); }}>
                <Text style={style.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={[style.label, { marginBottom: 15, color: '#666' }]}>
              Saldo disponível no app: R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>

            <Text style={style.label}>Valor do Depósito</Text>
            <TextInput 
              style={style.input} 
              placeholder="R$ 0,00" 
              keyboardType="numeric" 
              value={valorDeposito} 
              onChangeText={setValorDeposito}
              autoFocus={true}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <TouchableOpacity 
                style={[style.button, { backgroundColor: '#FF3B30', flex: 1 }]} 
                onPress={() => { setModalDepositoVisible(false); setValorDeposito(""); }}
              >
                <Text style={style.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[style.button, { backgroundColor: '#04811f', flex: 1 }]} 
                onPress={realizarDeposito}
              >
                <Text style={style.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}