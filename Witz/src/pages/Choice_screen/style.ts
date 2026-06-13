import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scroll: { padding: 20, alignItems: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginVertical: 20 },

  buttonNova: {
    backgroundColor: "#A855F7",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },

  // Estilos do Menu Flutuante (Overlay)
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fundo escurecido
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100, // Altura onde os ícones vão flutuar
  },
  menuContainer: { width: "100%", alignItems: "center" },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
  },
  optionItem: { alignItems: "center" },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
  },
  optionText: { color: "#FFF", fontWeight: "600", fontSize: 14 },
});

export default styles;