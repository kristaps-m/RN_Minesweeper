import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo2 from "../../components/EditScreenInfo2";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";

interface SnakeCell {
  x: number;
  y: number;
}

export default function TabTwoScreen() {
  const listOfTestCh = ["#", "@", "%", "+", "_", "X"];
  // const [snakeHead, setSnakeHead] = useState({ x: 0, y: 0 });
  const [snakeHead, setSnakeHead] = useState<SnakeCell[]>([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ]);
  const [gameRunning, setGameRunning] = useState(true);
  const [xDir, setXDir] = useState(0);
  const [xVelocity, setXVelocity] = useState(0);
  const [yDir, setYDir] = useState(0);
  const [snakeField, setSnakeField] = useState([
    [" ", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ]);

  let c = 0;

  // function setDirRightHandler() {
  //   setXDir(1);
  // }

  // function setDirLeftHandler() {
  //   setXDir(-1);
  // }
  let gameTimerId: any;
  // let gameTimerId2: any;
  function drawField() {
    let tempSnakeField = [...snakeField];
    const snakeLenght = snakeHead.length;
    // let tempSnakeHead: SnakeCell[] = snakeHead;
    let tempSnakeHead = [...snakeHead][snakeLenght - 1];
    let newSnakeHead = {
      x: (tempSnakeHead.x += xDir),
      y: (tempSnakeHead.y += yDir),
    };
    snakeHead.push(newSnakeHead);
    // tempSnakeField[snakeHead[0].x][snakeHead[0].y] = ".";
    // setSnakeField(tempSnakeField);
    for (
      let index = 0;
      index < snakeHead.slice(0, snakeHead.length).length;
      index++
    ) {
      tempSnakeField[snakeHead[index].x][snakeHead[index].y] = "#";
    }
    setSnakeField(tempSnakeField);
    snakeHead.shift();
  }

  function resetFieldLook() {
    let tempSnakeField = [...snakeField];
    // for (let index = 0; index < snakeHead.slice(1, -1).length; index++) {
    //   tempSnakeField[snakeHead[index].x][snakeHead[index].y] = "#";
    // }
    for (let row = 0; row < tempSnakeField.length; row++) {
      for (let col = 0; col < tempSnakeField[0].length; col++) {
        tempSnakeField[row][col] = " ";
      }
    }
    setSnakeField(tempSnakeField);
  }

  useEffect(() => {
    // if (gameRunning) {

    gameTimerId = setInterval(() => {
      // if (xDir !== 0) {
      // console.log(`Before ${c}`);
      // console.log(snakeHead);
      // let tempSnakeField = [...snakeField];
      // tempSnakeField[snakeHead.x][snakeHead.y] = ".";
      // setSnakeField(tempSnakeField);
      resetFieldLook();
      drawField();

      // snakeHead.shift();
      console.log(snakeHead);
      /// SET ALL
      // let tempSnakeH = snakeHead;
      // tempSnakeH.x += xDir;

      // console.log(snakeField);
      // console.log(xDir);
      // }
    }, 1000);
    // c++;
    // console.log("TEST");

    return () => {
      clearInterval(gameTimerId);
    };
    // }
  }, [snakeField, xDir, yDir]);
  // console.log(snakeHead);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Text>
        {xDir}, sh.x={snakeHead[0].x}, sh.y{snakeHead[0].y}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Pressable
        style={styles.directionButtons}
        onPress={() => {
          setXDir(0), setYDir(-1);
        }}
      >
        <Text>UP</Text>
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={styles.directionButtons}
          onPress={() => {
            setYDir(0), setXDir(-1);
          }}
        >
          <Text>LEFT</Text>
        </Pressable>
        <Pressable
          style={styles.directionButtons}
          onPress={() => {
            setXDir(0), setYDir(0);
          }}
        >
          <Text>-0-</Text>
        </Pressable>
        <Pressable
          style={styles.directionButtons}
          onPress={() => {
            setYDir(0), setXDir(1);
          }}
        >
          <Text>RIGHT</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.directionButtons}
        onPress={() => {
          setXDir(0), setYDir(1);
        }}
      >
        <Text>DOWN</Text>
      </Pressable>
      <Pressable
        style={{ marginBottom: 20 }}
        // onPress={() => startGameHandler()}
        onPress={() => setGameRunning(false)}
      >
        <Text>Start Game?</Text>
      </Pressable>
      {/* <Text>HELL OTHIS IS TAB TWO BUT WHERE IS MODAL?</Text> */}
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
    // flexDirection: "row",
  },
  oneTextInField: {
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 25,
    width: 20,
    margin: 3,
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
