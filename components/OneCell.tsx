import { Text, StyleSheet } from "react-native";

export default function TheOneCell() {
  return <Text style={styles.cellText}>0</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 20,
  },
});
