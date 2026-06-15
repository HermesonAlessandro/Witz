import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../services/firebaseconfig"; 

export default function Analysis() {
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) { setCarregando(false); return; }
    const transacoesRef = collection(db, "transacoes");
    const q = query(transacoesRef, where("userId", "==", userId));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransacoes(lista);
      setCarregando(false);
    });
    return () => unsubscribe();
  }, [userId]);

  const dados = useMemo(() => {
    const entradasList = transacoes.filter(t => t.tipo === 'entrada');
    const saidasList = transacoes.filter(t => t.tipo === 'saida');

    const qtdEntradas = entradasList.length;
    const receitaTotal = entradasList.reduce((acc, t) => acc + Number(t.valor || 0), 0);
    const gastoTotal = saidasList.reduce((acc, t) => acc + Number(t.valor || 0), 0);
    
    // Cálculo em porcentagem
    const percGastos = receitaTotal > 0 ? (gastoTotal / receitaTotal) * 100 : 0;
    const percEconomia = receitaTotal > 0 ? ((receitaTotal - gastoTotal) / receitaTotal) * 100 : 100;
    
    const displayEconomia = Math.max(0, percEconomia);

    return { 
      qtdEntradas, 
      gastoTotal, 
      receitaTotal, 
      percGastos, 
      displayEconomia 
    };
  }, [transacoes]);

  if (carregando) return <ActivityIndicator size="large" color="#7C7EF0" style={{flex: 1, marginTop: 50}} />;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Análises</Text>
        
        {/* MENU SUPERIOR: Ajustado para mostrar o somatório dos gastos */}
        <View style={styles.headerGrid}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Qtd. Entradas</Text>
                <Text style={styles.cardValue}>{dados.qtdEntradas}</Text>
            </View>
            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Total Gastos</Text>
                <Text style={styles.cardValueRed}>R$ {dados.gastoTotal.toFixed(2)}</Text>
            </View>
        </View>
        <View style={styles.headerGrid}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Receita Total</Text>
                <Text style={styles.cardValuePurple}>R$ {dados.receitaTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Economia</Text>
                <Text style={styles.cardValuePurple}>{dados.displayEconomia.toFixed(2)}%</Text>
            </View>
        </View>

        {/* GRÁFICO (Mantido exatamente como estava) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>GASTOS VS ECONOMIA (%)</Text>
          <View style={styles.chartArea}>
            
            <View style={styles.barContainer}>
                <Text style={styles.barValueText}>{dados.percGastos.toFixed(2)}%</Text>
                <View style={[styles.bar, { height: Math.max((dados.percGastos / 100) * 180, 20), backgroundColor: '#EF4444' }]} />
                <Text style={styles.barLabel}>Gastos</Text>
            </View>

            <View style={styles.barContainer}>
                <Text style={styles.barValueText}>{dados.displayEconomia.toFixed(2)}%</Text>
                <View style={[styles.bar, { height: Math.max((dados.displayEconomia / 100) * 180, 20), backgroundColor: '#10B981' }]} />
                <Text style={styles.barLabel}>Economia</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F4FF' },
  container: { padding: 20 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  headerGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardHeader: { backgroundColor: '#FFF', width: '48%', borderRadius: 15, padding: 12, alignItems: 'center', elevation: 2 },
  cardLabel: { fontSize: 11, color: '#6B7280', marginBottom: 4 },
  cardValue: { fontSize: 16, fontWeight: 'bold', color: '#374151' },
  cardValueRed: { fontSize: 16, fontWeight: 'bold', color: '#EF4444' },
  cardValuePurple: { fontSize: 16, fontWeight: 'bold', color: '#7C7EF0' },
  chartCard: { backgroundColor: '#FAFAFF', borderRadius: 20, padding: 20, marginTop: 10, elevation: 2 },
  chartTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  chartArea: { height: 250, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 10 },
  barContainer: { alignItems: 'center', width: 100 },
  bar: { width: 60, borderRadius: 10 },
  barValueText: { fontSize: 11, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  barLabel: { fontSize: 12, color: '#666', marginTop: 8 },
});