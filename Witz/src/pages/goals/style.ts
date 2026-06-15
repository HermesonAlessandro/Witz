import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  // Container Principal
  containerPrincipal: { flex: 1, backgroundColor: '#F2F4F3' },
  
  // Cabeçalho
  homeHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    backgroundColor: '#FFF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5,
  },
  homeTitle: { fontSize: 26, fontWeight: '800', color: '#1D1D1D' },
  btnAbrir: { backgroundColor: '#878af6', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' },
  btnAbrirTexto: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },

  // Card da Meta
  cardMeta: { backgroundColor: '#f3eefd', borderRadius: 20, padding: 20, marginBottom: 15 },
  metaHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemEmoji: { fontSize: 30, marginRight: 10 },
  metaTitulo: { fontSize: 18, fontWeight: '700', color: '#333' },
  metaDias: { fontSize: 14, color: '#888' },
  metaInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  metaValorAtual: { fontSize: 14, fontWeight: '600' },
  metaPorcentagem: { fontSize: 14, fontWeight: '700' },
  metaValorTotal: { fontSize: 14, fontWeight: '600' },
  
  // Barra de Progresso
  barraFundo: { height: 8, backgroundColor: '#dcdcdc', borderRadius: 4, marginVertical: 5 },
  barraProgresso: { height: 8, backgroundColor: '#878af6', borderRadius: 4 },
  metaFaltam: { fontSize: 14, color: '#555', marginTop: 5 },
  
  // Ações do Card
  metaAcoes: { flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'space-between' },
  btnDepositar: { backgroundColor: '#dcdcdc', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, alignItems: 'center', flex: 1, marginRight: 15 },
  btnDepositarTexto: { fontWeight: '700', color: '#555' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 25, padding: 25, elevation: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  title: { fontSize: 24, fontWeight: '700', color: '#1D1D1D' },
  close: { fontSize: 22, color: '#666' },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 8, color: '#444' },
  input: { height: 55, backgroundColor: '#F8F8F8', borderRadius: 15, paddingHorizontal: 15, marginBottom: 18, borderWidth: 1, borderColor: '#E5E5E5', fontSize: 16 },
  button: { backgroundColor: '#878af6', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 },
});