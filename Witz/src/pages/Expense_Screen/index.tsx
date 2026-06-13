import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// @ts-ignore
import { Ionicons } from "@expo/vector-icons";

// 1. Importação correta do arquivo de estilos
import styles from "./style";

// 2. Tipagem das propriedades (Props) do componente principal
interface TelaDespesaProps {
  onTrocar: (tipo: string) => void;
  aoFechar: () => void;
}

// 3. Tipagem das propriedades do botão de humor
interface BotaoHumorProps {
  nome: string;
  icone: string;
}

export default function TelaDespesa({ onTrocar, aoFechar }: TelaDespesaProps) {
  const [valor, setValor] = useState("");
  const [data, setData] = useState("15/04/2026");
  const [humor, setHumor] = useState("Neutro");

  // 4. Dizemos ao TypeScript que 'txt' é uma string
  const mascaraData = (txt: string) => {
    let v = txt.replace(/\D/g, "");
    if (v.length > 2 && v.length <= 4) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    else if (v.length > 4)
      v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4, 8)}`;
    setData(v);
  };

  // 5. Aplicamos a interface BotaoHumorProps
  const BotaoHumor = ({ nome, icone }: BotaoHumorProps) => {
    const ativo = humor === nome;
    return (
      <TouchableOpacity
        style={[
          styles.humorItem as any,
          ativo ? (styles.humorAtivo as any) : (styles.humorInativo as any),
        ]}
        onPress={() => setHumor(nome)}
      >
        <Text style={styles.humorIcone as any}>{icone}</Text>
        <Text style={[styles.humorTexto as any, ativo && (styles.humorTextoAtivo as any)]}>
          {nome}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container as any}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll as any}>
          {/* CABEÇALHO */}
          <View style={styles.header as any}>
            <Text style={styles.headerTitle as any}>Editar Transação</Text>
            <TouchableOpacity onPress={aoFechar}>
              <Ionicons name="close" size={26} color="#999" />
            </TouchableOpacity>
          </View>

          {/* SELETOR DESPESA / RECEITA */}
          <View style={styles.tabContainer as any}>
            {/* Aba Despesa (Ativa) */}
            <TouchableOpacity style={[styles.tabBtn as any, styles.tabDespesaAtiva as any]}>
              <Text style={styles.tabTxtDespesa as any}>↓ Despesa</Text>
            </TouchableOpacity>

            {/* Aba Receita (Inativa) */}
            <TouchableOpacity
              style={[styles.tabBtn as any, styles.tabInativa as any]}
              onPress={() => onTrocar("receita")}
            >
              <Text style={styles.tabTxtInativo as any}>↑ Receita</Text>
            </TouchableOpacity>
          </View>

          {/* CARD DE VALOR */}
          <View style={styles.cardValor as any}>
            <Text style={styles.labelCard as any}>Valor (R$)</Text>
            <TextInput
              style={styles.inputValor as any}
              placeholder="0,00"
              placeholderTextColor="#A3B5B0"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
              textAlign="center"
            />
          </View>

          {/* DESCRIÇÃO */}
          <View style={styles.inputGroup as any}>
            <Text style={styles.label as any}>Descrição</Text>
            <TextInput
              style={styles.inputFlat as any}
              placeholder="Ex: Almoço no restaurante"
              placeholderTextColor="#888"
            />
          </View>

          {/* DATA E CATEGORIA */}
          <View style={styles.row as any}>
            <View style={styles.column as any}>
              <Text style={styles.label as any}>Data</Text>
              <View style={styles.inputWithIcon as any}>
                <TextInput
                  style={styles.inputTextInner as any}
                  placeholder="DD/MM/AAAA"
                  keyboardType="numeric"
                  maxLength={10}
                  value={data}
                  onChangeText={mascaraData}
                />
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </View>
            </View>
            <View style={{ width: 15 }} />
            <View style={styles.column as any}>
              <Text style={styles.label as any}>Categoria</Text>
              <View style={styles.inputWithIcon as any}>
                <Text style={{ color: "#888", fontSize: 15 }}>Selecione</Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </View>
            </View>
          </View>

          {/* SEÇÃO DE HUMOR */}
          <View style={styles.inputGroup as any}>
            <Text style={styles.label as any}>Como você se sentiu?</Text>
            <View style={styles.humorContainer as any}>
              <BotaoHumor nome="Planejado" icone="🎯" />
              <BotaoHumor nome="Feliz" icone="😊" />
              <BotaoHumor nome="Neutro" icone="😐" />
              <BotaoHumor nome="Impulsivo" icone="⚡" />
              <BotaoHumor nome="Arrependido" icone="😬" />
            </View>
          </View>

          {/* OBSERVAÇÕES */}
          <View style={styles.inputGroup as any}>
            <Text style={styles.label as any}>Observações (opcional)</Text>
            <TextInput
              style={[
                styles.inputFlat as any,
                { height: 80, textAlignVertical: "top" },
              ]}
              placeholder="Alguma nota adicional..."
              placeholderTextColor="#888"
              multiline
            />
          </View>

          {/* BOTÃO SALVAR */}
          <TouchableOpacity style={styles.btnSalvar as any} onPress={aoFechar}>
            <Text style={styles.btnSalvarTxt as any}>Salvar Alterações</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}