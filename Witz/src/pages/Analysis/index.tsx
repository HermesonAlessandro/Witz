import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const transactions = [
    { type: 'income', value: 2500 },
    { type: 'expense', value: 300 },
    { type: 'expense', value: 150 },
    { type: 'expense', value: 500 },
    { type: 'income', value: 800 },
    { type: 'expense', value: 200 },
  ];

  const totalTransacoes = transactions.length;

  const receitas = transactions
    .filter(item => item.type === 'income')
    .reduce((total, item) => total + item.value, 0);

  const despesas = transactions
    .filter(item => item.type === 'expense')
    .reduce((total, item) => total + item.value, 0);

  // Mantém como NÚMERO para fazer as comparações corretamente
  const taxaEconomia = receitas > 0 ? ((receitas - despesas) / receitas) * 100 : 0;

  // Calculando ticket médio APENAS das despesas (faz mais sentido financeiramente)
  const despesasTransacoes = transactions.filter(item => item.type === 'expense').length;
  const ticketMedio = despesasTransacoes > 0 ? (despesas / despesasTransacoes) : 0;

  let insight = '';
  if (despesas > receitas) {
    insight = '🚨 Você está gastando mais do que ganha. Reveja seus gastos.';
  } else if (taxaEconomia >= 50) {
    insight = '💡 Excelente! Você está economizando muito bem este mês.';
  } else if (taxaEconomia >= 20) {
    insight = '👍 Bom trabalho! Suas finanças estão equilibradas.';
  } else {
    insight = '⚠️ Atenção! Sua taxa de economia está baixa.';
  }

  // Define um divisor comum dinâmico para o gráfico não distorcer nem quebrar a tela
  const maiorValor = Math.max(receitas, despesas);
  // O divisor garante que a maior barra terá no máximo 150px de altura
  const divisorGrafico = maiorValor > 0 ? maiorValor / 150 : 1; 

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Análises</Text>
        <Text style={styles.subtitle}>Evolução e inteligência financeira</Text>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Transações</Text>
            <Text style={styles.cardValuePurple}>{totalTransacoes}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Taxa de Economia</Text>
            {/* Aplica o .toFixed() apenas na hora de renderizar na tela */}
            <Text style={styles.cardValuePurple}>{taxaEconomia.toFixed(1)}%</Text>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Ticket Médio (Gastos)</Text>
            <Text style={styles.cardValueRed}>R$ {ticketMedio.toFixed(2)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Receitas</Text>
            <Text style={styles.cardValuePurple}>R$ {receitas.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>RECEITAS VS DESPESAS</Text>

          <View style={styles.chartArea}>
            <View
              style={[
                styles.bar,
                {
                  height: despesas / divisorGrafico, // Agora usa a mesma escala
                  backgroundColor: '#EF4444',
                },
              ]}
            />
            <View
              style={[
                styles.bar,
                {
                  height: receitas / divisorGrafico, // Agora usa a mesma escala
                  backgroundColor: '#7C7EF0',
                },
              ]}
            />
          </View>

          <Text style={styles.insight}>{insight}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F4FF',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FAFAFF',
    width: '48%',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValuePurple: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C7EF0',
  },
  cardValueRed: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  chartCard: {
    backgroundColor: '#FAFAFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartArea: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  bar: {
    width: 60,
    borderRadius: 10,
  },
  insight: {
    marginTop: 20,
    textAlign: 'center',
    color: '#7C7EF0',
    fontWeight: '600',
    fontSize: 16,
  },
});