import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo2 from "../../components/EditScreenInfo2";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const listOfTestCh = ["#", "@", "%", "+", "_", "X"];
  const [snakeHead, setSnakeHead] = useState({ x: 0, y: 0 });
  const [gameRunning, setGameRunning] = useState(true);
  const [xDir, setXDir] = useState(0);
  const [xVelocity, setXVelocity] = useState(0);
  const [yDir, setYDir] = useState(0);
  const [snakeField, setSnakeField] = useState([
    ["#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ]);

  let c = 0;

  // function setDirRightHandler() {
  //   setXDir(1);
  // }

  // function setDirLeftHandler() {
  //   setXDir(-1);
  // }
  let gameTimerId: any;
  let gameTimerId2: any;

  useEffect(() => {
    // if (gameRunning) {

    gameTimerId = setInterval(() => {
      // if (xDir !== 0) {
      console.log(`Before ${c}`);
      console.log(snakeHead);
      let tempSnakeField = [...snakeField];
      tempSnakeField[snakeHead.x][snakeHead.y] = ".";
      setSnakeField(tempSnakeField);
      /// SET ALL
      // let tempSnakeH = snakeHead;
      // tempSnakeH.x += xDir;

      // console.log(snakeField);
      // console.log(xDir);
      // }
    }, 1500);
    // c++;
    // console.log("TEST");

    gameTimerId2 = setInterval(() => {
      // if (xDir !== 0) {

      /// SET ALL
      // let tempSnakeH = snakeHead;
      // tempSnakeH.x += xDir;
      setSnakeHead({ x: snakeHead.x + xDir, y: snakeHead.y + yDir });
      let tempSnakeField2 = [...snakeField];
      tempSnakeField2[snakeHead.x][snakeHead.y] = "#";

      setSnakeField(tempSnakeField2);
      console.log(`After ${c}`);
      console.log(snakeHead);
      // console.log(snakeField);
      // console.log(xDir);
      // }
    }, 1500);
    // c++;
    // console.log("TEST");

    return () => {
      clearInterval(gameTimerId);
      clearInterval(gameTimerId2);
    };
    // }
  }, [snakeHead, snakeField, c]);
  // console.log(snakeHead);
  // function startGameHandler() {
  //   setInterval(() => {
  //     if (xDir !== 0) {
  //       let tempSnakeField = [...snakeField];
  //       tempSnakeField[snakeHead.y][snakeHead.x] = ".";
  //       /// SET ALL
  //       let tempSnakeH = snakeHead;
  //       tempSnakeH.x += xDir;
  //       // let x = xDir;
  //       // let y = 0;
  //       setSnakeHead(tempSnakeH);
  //       tempSnakeField[snakeHead.y][snakeHead.x] = "#";

  //       setSnakeField(tempSnakeField);
  //       console.log(snakeHead);
  //       console.log(snakeField);
  //       console.log(xDir);
  //     }
  //     // else if(){

  //     // }
  //   }, 7000);
  // }

  // snakeField[0][0] = "X";

  // function startGameHandler() {
  //   let testChLen = 0;
  //   let row = 0;
  //   let col = 0;
  //   setInterval(() => {
  //     let tempField = [...snakeField];
  //     tempField[row][col] = listOfTestCh[testChLen];
  //     console.log(row, col);
  //     setSnakeField(tempField);
  //     col++;
  //     if (col === snakeField[0].length) {
  //       row++;
  //       col = 0;
  //     }
  //     if (row === snakeField.length) {
  //       row = 0;
  //       testChLen++;
  //     }
  //     if (testChLen === listOfTestCh.length) {
  //       testChLen = 0;
  //     }
  //     // setInterval(() => 5000);
  //   }, 200);
  //   // for (let row = 0; row < snakeField.length; row++) {
  //   //   for (let col = 0; col < snakeField[0].length; col++) {
  //   //     let tempField = [...snakeField];
  //   //     tempField[row][col] = "#";
  //   //     setSnakeField(tempField);
  //   //     setInterval(() => 5000);
  //   //   }
  //   // }
  // }

  // useEffect(() => {
  //   for (let row = 0; row < snakeField.length; row++) {
  //     for (let col = 0; col < snakeField[0].length; col++) {
  //       let tempField = [...snakeField];
  //       tempField[row][col] = "#";
  //       setSnakeField(tempField);
  //       setTimeout(() => 5000);
  //     }
  //   }

  //   return () => {
  //     clearTimeout(500);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Text>
        {xDir}, sh.x={snakeHead.x}, sh.y{snakeHead.y}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.directionButtons} onPress={() => setXDir(-1)}>
          <Text>LEFT</Text>
        </Pressable>
        <Pressable style={styles.directionButtons} onPress={() => setXDir(0)}>
          <Text>-0-</Text>
        </Pressable>
        <Pressable style={styles.directionButtons} onPress={() => setXDir(1)}>
          <Text>RIGHT</Text>
        </Pressable>
      </View>
      <Pressable
        style={{ marginBottom: 20 }}
        // onPress={() => startGameHandler()}
        onPress={() => setGameRunning(false)}
      >
        <Text>Start Game?</Text>
      </Pressable>
      {/* <Text>HELL OTHIS IS TAB TWO BUT WHERE IS MODAL?</Text> */}
      <View>
        {snakeField.map((row, rIndex) => {
          // return <Text>{row}</Text>;
          return (
            <View key={rIndex} style={styles.oneRowInGame}>
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
  directionButtons: {
    padding: 10,
    margin: 10,
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
