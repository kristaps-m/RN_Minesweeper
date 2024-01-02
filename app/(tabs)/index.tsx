import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  function TheWowName(params: number) {
    let resultArray = [];
    for (let row = 0; row < params; row++) {
      let tempRow = [];
      for (let col = 0; col < params; col++) {
        let theOneCell = {
          row: row,
          col: col,
          isMine: false,
          isRevealed: false,
          minesCount: 0,
        };

        tempRow.push(theOneCell);
      }
      resultArray.push(tempRow);
    }

    return resultArray;
  }
  /*[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ] */
  // const testArray = TheWowName(3);
  const [gameField, setGameField] = useState(TheWowName(9));

  return (
    <View style={styles.container}>
      {gameField.map((oneRow, index) => (
        <View key={index} style={styles.oneRowInGame}>
          {oneRow.map((oneCellFR) => (
            <Pressable key={`${oneCellFR.row}${oneCellFR.col}`}>
              <Text
                style={{ padding: 10, borderColor: "black", borderWidth: 1 }}
              >
                {oneCellFR.minesCount}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  oneRowInGame: {
    flexDirection: "row",
  },
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
