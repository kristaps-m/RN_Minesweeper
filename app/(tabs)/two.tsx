import { StyleSheet } from "react-native";

import EditScreenInfo2 from "../../components/EditScreenInfo2";
import { Text, View } from "../../components/Themed";
import { useState } from "react";

export default function TabTwoScreen() {
  const [snakeField, setSnakeField] = useState([
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "T"],
  ]);

  snakeField[0][0] = "X";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>HELL OTHIS IS TAB TWO BUT WHERE IS MODAL?</Text>
      <View style={{ flexDirection: "row" }}>
        {snakeField.map((row, rIndex) => {
          // return <Text>{row}</Text>;
          return (
            <View key={rIndex}>
              {row.map((oneCell, index) => {
                return (
                  <Text key={index} style={styles.oneTextInField}>
                    {oneCell}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </View>
      {/* <EditScreenInfo2 path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // Snake
  oneRowInGame: {
    flex: 1,
    flexDirection: "row",
  },
  oneTextInField: {
    padding: 20,
    margin: 5,
    borderWidth: 1,
  },
  // default
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
