import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scroll: { padding: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  tabReceitaAtiva: {
    backgroundColor: "#E8F8F5",
    borderColor: "#A3E4D7",
    borderWidth: 1,
  },
  tabInativa: { backgroundColor: "#F0F4F3" },
  tabTxtReceita: { fontSize: 15, fontWeight: "bold", color: "#2D8C56" },
  tabTxtInativo: { fontSize: 15, fontWeight: "bold", color: "#7DA699" },

  cardValor: {
    backgroundColor: "#F0F4F3",
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 25,
  },
  labelCard: {
    color: "#6A877E",
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  inputValor: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#A3B5B0",
    width: "100%",
  },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: "#888", fontWeight: "bold", marginBottom: 10 },

  inputFlat: {
    backgroundColor: "#F0F4F3",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: "#333",
  },

  row: { flexDirection: "row", marginBottom: 25 },
  column: { flex: 1 },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0F4F3",
    borderRadius: 12,
    padding: 15,
  },
  inputTextInner: { flex: 1, fontSize: 15, color: "#333" },

  btnSalvar: {
    backgroundColor: "#2D8C56",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btnSalvarTxt: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default styles;