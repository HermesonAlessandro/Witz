import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  ActivityIndicator
} from "react-native";
// @ts-ignore
import { Ionicons } from "@expo/vector-icons";

// Importações do Firebase
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../services/firebaseconfig"; 

import styles from "./style";

export default function PrincpTransitionScreen() {
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  const userId = auth.currentUser?.uid;

  // Busca as transações do Firebase em tempo real
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
      
      // Ordena por data (mais recentes primeiro)
      lista.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());
      
      setTransacoes(lista);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconPlaceholder} />

      <View style={styles.infoContainer}>
        <Text style={styles.itemTitulo}>{item.titulo}</Text>
        <Text style={styles.itemSub}>
          {item.tipo === 'entrada' ? 'Receita' : 'Despesa'} • {new Date(item.data).toLocaleDateString()}
        </Text>
      </View>

      <Text style={[styles.itemValor, { color: item.tipo === 'entrada' ? "#2D8C56" : "#E74C3C" }]}>
        {item.tipo === 'entrada' ? '+' : '-'} R$ {item.valor.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SIMPLIFICADO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.tituloApp}>Transações</Text>
          <Text style={styles.subtituloApp}>
            {transacoes.length} transações registradas
          </Text>
        </View>
      </View>

      {/* LISTA */}
      {carregando ? (
        <ActivityIndicator size="large" color="#888EEF" style={{ marginTop: 50 }} />
      ) : transacoes.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#999' }}>Nenhuma transação encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={transacoes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        />
      )}
    </SafeAreaView>
  );
}