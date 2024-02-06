import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo2 from "../../components/EditScreenInfo2";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import generateFood from "../../components/functionsForSnake/generateFood";
import generateFoodCordinates from "../../components/functionsForSnake/generateFoodCordinates";
import didSnakeRunInTail from "../../components/functionsForSnake/colisionDetection";
import ISnakeCell from "../../components/models/ISnakeCell";

export default function TabTwoScreen() {
  const listOfTestCh = ["#", "@", "%", "+", "_", "X"];
  const [gamePoints, setGamePoints] = useState(4);
  const [gameIsRunning, setGameIsRunning] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);
  // const [snakeHead, setSnakeHead] = useState<ISnakeCell>({ x: 3, y: 0 });
  const [snakeTailBody, setTailBody] = useState<ISnakeCell[]>([
    // { x: 0, y: 0 },
    // { x: 1, y: 0 },
    // { x: 2, y: 0 },
    // { x: 3, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    // { x: 1, y: 3 },
  ]);
  // const [gameRunning, setGameRunning] = useState(true);
  // const [gameRunning, setGameRunning] = useState(true);
  const [foodIsPlaced, setFoodIsPlaced] = useState(false);
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
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ]);

  // const [foodCords, setFoodCords] = useState<ISnakeCell>(
  const [foodCords, setFoodCords] = useState<ISnakeCell>(
    generateFoodCordinates(snakeField, snakeTailBody)
  );
  let c = 0;
  // let placeFood = generateFood(snakeField);
  // function setDirRightHandler() {
  //   setXDir(1);
  // }

  // function setDirLeftHandler() {
  //   setXDir(-1);
  // }
  let gameTimerId: any;
  // let gameTimerId2: any;
  // function drawHead() {
  //   let tempSnakeField = [...snakeField];
  //   let tempSnakeHead = snakeHead;
  //   tempSnakeHead = [
  //     {
  //       x: (tempSnakeHead[0].x += xDir),
  //       y: (tempSnakeHead[0].y += yDir),
  //     },
  //   ];
  //   tempSnakeField[tempSnakeHead[0].x][tempSnakeHead[0].y] = "#";
  //   // setSnakeHead(tempSnakeHead);
  //   snakeHead.push(tempSnakeHead[0]);
  //   setSnakeField(tempSnakeField);
  //   snakeHead.shift();
  // }
  function drawField() {
    let snakeFieldWidth = snakeField[0].length;
    let snakeFieldHeight = snakeField.length;
    let tempSnakeField = [...snakeField];
    setSnakeField(tempSnakeField);
    // const snakeLenght = snakeTailBody.length;
    // let tempSnakeHead: SnakeCell[] = snakeHead;
    // let tempSnakeHead = [...snakeTailBody][snakeTailBody.length - 1];
    // let tempSnakeHead = snakeTailBody[snakeTailBody.length - 1];
    // let tempSnakeHead = [...snakeTailBody][snakeTailBody.length - 1];
    let tempSnakeHead = snakeTailBody[snakeTailBody.length - 1];
    let newSnakeHead = {
      x: (tempSnakeHead.x += xDir), // xDir
      y: (tempSnakeHead.y += yDir), // yDir
    };
    // if (
    //   didSnakeRunInTail(
    //     snakeTailBody.slice(0, snakeTailBody.length - 2),
    //     tempSnakeHead
    //   ) &&
    //   snakeTailBody.length > 5
    // ) {
    //   console.log(snakeTailBody.slice(0, snakeTailBody.length - 2), tempSnakeHead);
    //   console.log("GAME OVER AUCH!");
    //   setGameIsRunning(false);
    // }
    //Horizontal
    if (newSnakeHead.y < 0) {
      newSnakeHead = { x: newSnakeHead.x, y: snakeFieldWidth - 1 };
      console.log("HELLO", newSnakeHead);
    } else if (newSnakeHead.y > snakeFieldWidth - 1) {
      newSnakeHead = { x: newSnakeHead.x, y: 0 };
      console.log("HELLO", newSnakeHead);
    } // Vertical
    else if (newSnakeHead.x < 0) {
      newSnakeHead = { x: snakeFieldHeight - 1, y: newSnakeHead.y };
      console.log("HELLO", newSnakeHead);
    } else if (newSnakeHead.x > snakeFieldHeight - 1) {
      newSnakeHead = { x: 0, y: newSnakeHead.y };
      console.log("HELLO", newSnakeHead);
    }
    console.log(snakeField);
    console.log(snakeTailBody);
    console.log(newSnakeHead, "Before push to tail");
    snakeTailBody.push(newSnakeHead);
    console.log(newSnakeHead, "Before push to tail");
    // setSnakeField(tempSnakeField);

    // tempSnakeField[snakeHead[0].x][snakeHead[0].y] = ".";
    // setSnakeField(tempSnakeField);
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];

    // }

    for (let index = 0; index < snakeTailBody.length; index++) {
      let snakeBodyPart = snakeTailBody[index];
      if (snakeBodyPart.y < 0) {
        snakeBodyPart = { x: snakeBodyPart.x, y: snakeFieldWidth - 1 };
        // console.log("HELLO", newSnakeHead);
      } else if (snakeBodyPart.y > snakeFieldWidth - 1) {
        snakeBodyPart = { x: snakeBodyPart.x, y: 0 };
        // console.log("HELLO", newSnakeHead);
      } // Vertical
      else if (snakeBodyPart.x < 0) {
        snakeBodyPart = { x: snakeFieldHeight - 1, y: snakeBodyPart.y };
        // console.log("HELLO", snakeBodyPart);
      } else if (snakeBodyPart.x > snakeFieldHeight - 1) {
        snakeBodyPart = { x: 0, y: snakeBodyPart.y };
        // console.log("HELLO", newSnakeHead);
      }
      tempSnakeField[snakeBodyPart.x][snakeBodyPart.y] = "#";
    }
    tempSnakeField[newSnakeHead.x][newSnakeHead.y] = "X";
    if (!foodIsPlaced) {
      tempSnakeField = generateFood(tempSnakeField);
      setFoodIsPlaced(true);
    }
    tempSnakeField[foodCords.x][foodCords.y] = "O";
    if (newSnakeHead.x === foodCords.x && newSnakeHead.y === foodCords.y) {
      snakeTailBody.unshift(tempSnakeHead);
      tempSnakeField[foodCords.x][foodCords.y] = "X";
      setFoodCords(generateFoodCordinates(snakeField, snakeTailBody));
      let tempGamePoints = gamePoints;
      setGamePoints((tempGamePoints += 1));
    }
    setSnakeField(tempSnakeField);
    // snakeTailBody.shift();
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

      if (gameIsRunning && !gameIsOver) {
        resetFieldLook();
        drawField();
        snakeTailBody.shift();
        let tempSnakeHead = snakeTailBody[snakeTailBody.length - 1];
        if (
          didSnakeRunInTail(
            snakeTailBody.slice(0, snakeTailBody.length - 2),
            tempSnakeHead
          ) &&
          snakeTailBody.length > 5
        ) {
          console.log(
            snakeTailBody.slice(0, snakeTailBody.length - 2),
            tempSnakeHead
          );
          console.log("GAME OVER AUCH!");
          setGameIsRunning(false);
          setGameIsOver(true);
          let tempGameField = [...snakeField];
          const theGameOverText = "GAME OVER!";
          for (let i = 0; i < theGameOverText.length; i++) {
            tempGameField[0][i] = theGameOverText[i];
          }

          setSnakeField(tempGameField);
        }
        // drawHead();
      }
      // if (!foodIsPlaced) {
      //   setSnakeField(generateFood(snakeField));
      //   setFoodIsPlaced(true);
      // }
      // setSnakeField(generateFood(snakeField));

      // snakeHead.shift();
      // console.log(snakeTailBody);
      // console.log(snakeTailBody);
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
  }, [snakeField, xDir, yDir, foodIsPlaced, gameIsRunning, snakeTailBody]);
  // console.log(snakeHead);

  function toggleGamePause() {
    return !gameIsRunning;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Very Basic Snake Game</Text>
      <Text style={styles.title}>Points {gamePoints}</Text>
      {/* <Text>
        {xDir}, sh.x={snakeTailBody[0].x}, sh.y{snakeTailBody[0].y}
      </Text> */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Pressable
        style={{ paddingBottom: 10 }}
        onPress={() => {
          setXDir(-1), setYDir(0);
        }}
      >
        <Text>UP</Text>
      </Pressable>
      {/* LEFT PAUSE RIGHT */}
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={styles.directionButtons}
          onPress={() => {
            setYDir(-1), setXDir(0);
          }}
        >
          <Text>LEFT</Text>
        </Pressable>
        <Pressable // PAUSE GAME
          style={styles.directionButtons}
          onPress={() => {
            // setXDir(0), setYDir(0);
            setGameIsRunning(toggleGamePause());
          }}
        >
          <Text>PAUSE</Text>
        </Pressable>
        <Pressable // RIGHT
          style={styles.directionButtons}
          onPress={() => {
            setYDir(1), setXDir(0);
          }}
        >
          <Text>RIGHT</Text>
        </Pressable>
      </View>
      <Pressable // DOWN
        style={styles.directionButtons}
        onPress={() => {
          setXDir(1), setYDir(0);
        }}
      >
        <Text>DOWN</Text>
      </Pressable>
      {/* <Pressable
      {/* <Pressable
        style={{ marginBottom: 20 }}
        // onPress={() => startGameHandler()}
        onPress={() => setGameRunning(false)}
      >
        <Text>Start Game?</Text>
      </Pressable> */}
      {/* <Text>HELL OTHIS IS TAB TWO BUT WHERE IS MODAL?</Text> */}
      <View>
        {snakeField.map((row, rIndex) => {
          // return <Text>{row}</Text>;
          return (
            <View key={rIndex} style={{ flexDirection: "row" }}>
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
  // oneRowInGame: {
  //   flex: 1,
  //   flexDirection: "column",
  // },
  oneTextInField: {
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 18,
    width: 18,
    margin: 1,
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
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
