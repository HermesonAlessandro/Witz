import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';

// Tipagem para as mensagens
interface Mensagem {
  id: string;
  texto: string;
  remetente: 'usuario' | 'ia';
}

export default function IAScreen() {
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const consultarIA = async () => {
    if (!pergunta.trim()) return;

    const textoUsuario = pergunta.trim();
    
    // Adiciona a pergunta do usuário na lista
    const novaMensagemUsuario: Mensagem = {
      id: Date.now().toString(),
      texto: textoUsuario,
      remetente: 'usuario'
    };
    
    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setPergunta(''); 
    setCarregando(true);

    // Configurações da API Groq
    const API_KEY = "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"; 
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const promptCompleto = `Aja como um consultor financeiro do aplicativo Witz. Seja direto, amigável e conciso. Responda à seguinte pergunta do usuário: "${textoUsuario}"`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", 
          messages: [{ role: "user", content: promptCompleto }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        adicionarMensagemErro();
        return;
      }

      // Adiciona a resposta da IA na lista
      const textoResposta = data.choices[0].message.content;
      const novaMensagemIA: Mensagem = {
        id: (Date.now() + 1).toString(),
        texto: textoResposta,
        remetente: 'ia'
      };

      setMensagens((prev) => [...prev, novaMensagemIA]);

    } catch (error) {
      adicionarMensagemErro();
    } finally {
      setCarregando(false);
    }
  };

  const adicionarMensagemErro = () => {
    setMensagens((prev) => [
      ...prev, 
      { id: Date.now().toString(), texto: "Ops! Tive um problema na conexão. Tente novamente.", remetente: 'ia' }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Consultor Witz (IA)</Text>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          style={styles.chatArea} 
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          
          {mensagens.length === 0 && !carregando ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.dicaText}>
                Olá! Eu sou o Consultor Witz. ✨ {'\n'}
                Como posso te ajudar com suas finanças hoje?
              </Text>
            </View>
          ) : (
            mensagens.map((msg) => (
              <View 
                key={msg.id} 
                style={msg.remetente === 'usuario' ? styles.balaoUsuario : styles.balaoIA}
              >
                <Text style={msg.remetente === 'usuario' ? styles.textoUsuario : styles.textoIA}>
                  {msg.texto}
                </Text>
              </View>
            ))
          )}

          {carregando && (
            <ActivityIndicator size="small" color="#878af6" style={{ marginTop: 10, alignSelf: 'flex-start', marginLeft: 15 }} />
          )}

        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua dúvida financeira..."
            value={pergunta}
            onChangeText={setPergunta}
            multiline
          />
          <TouchableOpacity 
            style={[styles.button, (!pergunta.trim() || carregando) && { opacity: 0.5 }]} 
            onPress={consultarIA}
            disabled={carregando || !pergunta.trim()}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { 
    padding: 20, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    elevation: 3
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  chatArea: { flex: 1 },
  emptyContainer: { marginTop: 40, paddingHorizontal: 30 },
  dicaText: { textAlign: 'center', color: '#888', fontSize: 17, lineHeight: 24 },
  
  // Balão do Usuário (COR ATUALIZADA PARA #878af6)
  balaoUsuario: { 
    backgroundColor: '#878af6', 
    padding: 15, 
    borderRadius: 18, 
    borderBottomRightRadius: 2, 
    alignSelf: 'flex-end', 
    maxWidth: '85%',
    marginBottom: 15,
    elevation: 1
  },
  textoUsuario: { fontSize: 16, color: '#fff' },

  // Balão da IA (Branco)
  balaoIA: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 18, 
    borderTopLeftRadius: 2, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
    alignSelf: 'flex-start',
    maxWidth: '90%',
    marginBottom: 15
  },
  textoIA: { fontSize: 16, color: '#333', lineHeight: 24 },

  inputArea: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    alignItems: 'center' 
  },
  input: { 
    flex: 1, 
    backgroundColor: '#f1f1f1', 
    borderRadius: 25, 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    fontSize: 16, 
    marginRight: 10, 
    maxHeight: 100,
    color: '#333'
  },
  // Botão de Enviar (COR ATUALIZADA PARA #878af6)
  button: { 
    backgroundColor: '#878af6', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    paddingVertical: 12,
    elevation: 2
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});