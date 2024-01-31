import { StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import EditScreenInfo2 from "../../components/EditScreenInfo2";
import { Text, View } from "../../components/Themed";
// import entities from "./entities";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <GameEngine
        // entities={entities()}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      ></GameEngine>
      {/* <EditScreenInfo2 path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
