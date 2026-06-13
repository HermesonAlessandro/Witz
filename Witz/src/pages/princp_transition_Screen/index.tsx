import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  TextInput,
  ListRenderItem,
} from "react-native";
// @ts-ignore
import { Ionicons } from "@expo/vector-icons";

import styles from "./style";

interface TelaPrincipalProps {
  onTrocar: (tipo: string) => void;
}

interface Transacao {
  id: string;
  titulo: string;
  categoria: string;
  data: string;
  valor: string;
  cor: string;
  tipo: string;
}

export default function TelaPrincipal({ onTrocar }: TelaPrincipalProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const transacoes: Transacao[] = [
    {
      id: "1",
      titulo: "Roupas novas",
      categoria: "Compras",
      data: "21 mar",
      valor: "- R$ 520,00",
      cor: "#E74C3C",
      tipo: "despesa",
    },
    {
      id: "2",
      titulo: "Farmácia",
      categoria: "Saúde",
      data: "19 mar",
      valor: "- R$ 95,00",
      cor: "#E74C3C",
      tipo: "despesa",
    },
    {
      id: "3",
      titulo: "Freelance design",
      categoria: "Freelance",
      data: "11 mar",
      valor: "+ R$ 2.200,00",
      cor: "#2D8C56",
      tipo: "receita",
    },
  ];

  const renderItem: ListRenderItem<Transacao> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onTrocar(item.tipo)}
    >
      <View style={styles.iconPlaceholder} />

      <View style={styles.infoContainer}>
        <Text style={styles.itemTitulo}>{item.titulo}</Text>
        <Text style={styles.itemSub}>
          {item.categoria} • {item.data}
        </Text>
      </View>

      <Text style={[styles.itemValor, { color: item.cor }]}>
        {item.valor}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.tituloApp}>Transações</Text>
          <Text style={styles.subtituloApp}>
            12 transações registradas
          </Text>
        </View>

        {/* Agora o styles.btnNova existe no style.ts! */}
        <TouchableOpacity
          style={styles.btnNova}
          onPress={() => setMenuAberto(true)}
        >
          <Text style={styles.btnNovaText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {/* BUSCA */}
      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar transação..."
          placeholderTextColor="#999"
        />
      </View>

      {/* LISTA */}
      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent
        visible={menuAberto}
        onRequestClose={() => setMenuAberto(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.menuContainer}>
            <View style={styles.optionsRow}>
              
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  setMenuAberto(false);
                  onTrocar("despesa");
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#FF5252" }]}>
                  <Ionicons name="trending-down" size={30} color="#FFF" />
                </View>
                <Text style={styles.optionText}>Despesa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  setMenuAberto(false);
                  onTrocar("receita");
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#2D8C56" }]}>
                  <Ionicons name="trending-up" size={30} color="#FFF" />
                </View>
                <Text style={styles.optionText}>Receita</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => setMenuAberto(false)}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#F0F0F0" }]}>
                  <Ionicons name="close" size={30} color="#333" />
                </View>
                <Text style={[styles.optionText, { color: "#999" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}