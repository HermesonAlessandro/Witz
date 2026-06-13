import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  tituloApp: { fontSize: 28, fontWeight: "bold", color: "#4A90E2" },
  subtituloApp: { color: "#888", fontSize: 16 },

  // Estilo unificado para o botão "+ Nova"
  btnNova: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  btnNovaText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },

  buscaContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    padding: 12,
    marginBottom: 25,
  },

  buscaInput: { fontSize: 16 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E6ED",
    marginRight: 15,
  },

  infoContainer: { flex: 1 },

  itemTitulo: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemSub: { fontSize: 13, color: "#999" },
  itemValor: { fontSize: 16, fontWeight: "bold" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 120,
  },

  menuContainer: { width: "100%" },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },

  optionItem: { alignItems: "center" },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
  },

  optionText: { color: "#FFF", fontWeight: "600" },
});

export default styles;