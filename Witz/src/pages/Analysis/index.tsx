import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function AnalysisScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Análises</Text>
        <Text style={styles.subtitle}>
          Evolução e inteligência financeira
        </Text>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Transações</Text>
            <Text style={styles.cardValue}>12</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Taxa de Economia</Text>
            <Text style={styles.cardValue}>51,9%</Text>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Ticket Médio</Text>
            <Text style={styles.cardValue}>R$ 596</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Meses</Text>
            <Text style={styles.cardValue}>6</Text>
          </View>
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
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  cardLabel: {
    fontSize: 14,
  },

  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7C7EF0',
  },
});