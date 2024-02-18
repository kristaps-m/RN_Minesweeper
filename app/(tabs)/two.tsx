import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import generateFoodCordinates from "../../components/functionsForSnake/generateFoodCordinates";
import didSnakeRunInTail from "../../components/functionsForSnake/colisionDetection";
import ISnakeCell from "../../components/models/ISnakeCell";

export default function TabTwoScreen() {
  const listOfTestCh = ["@", "%", "O", "Q", "G"];
  const [foodChar, setFoodChar] = useState("O");
  const [gamePoints, setGamePoints] = useState(4);
  const [gameIsRunning, setGameIsRunning] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [snakeTailBody, setTailBody] = useState<ISnakeCell[]>([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ]);
  const [foodIsPlaced, setFoodIsPlaced] = useState(false);
  const [xDir, setXDir] = useState(0);
  const [yDir, setYDir] = useState(0);
  const [snakeField, setSnakeField] = useState([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);
  const [foodCords, setFoodCords] = useState<ISnakeCell>(
    generateFoodCordinates(snakeField, snakeTailBody)
  );

  let gameTimerId: any;
  function drawField() {
    let snakeFieldWidth = snakeField[0].length;
    let snakeFieldHeight = snakeField.length;
    let tempSnakeField = [...snakeField];
    setSnakeField(tempSnakeField);
    let tempSnakeHead = snakeTailBody[snakeTailBody.length - 1];
    let newSnakeHead = {
      x: (tempSnakeHead.x += xDir), // xDir
      y: (tempSnakeHead.y += yDir), // yDir
    };
    //Horizontal
    if (newSnakeHead.y < 0) {
      newSnakeHead = { x: newSnakeHead.x, y: snakeFieldWidth - 1 };
    } else if (newSnakeHead.y > snakeFieldWidth - 1) {
      newSnakeHead = { x: newSnakeHead.x, y: 0 };
    } // Vertical
    else if (newSnakeHead.x < 0) {
      newSnakeHead = { x: snakeFieldHeight - 1, y: newSnakeHead.y };
    } else if (newSnakeHead.x > snakeFieldHeight - 1) {
      newSnakeHead = { x: 0, y: newSnakeHead.y };
    }
    snakeTailBody.push(newSnakeHead);

    for (let index = 0; index < snakeTailBody.length; index++) {
      let snakeBodyPart = snakeTailBody[index];
      //Horizontal
      if (snakeBodyPart.y < 0) {
        snakeBodyPart = { x: snakeBodyPart.x, y: snakeFieldWidth - 1 };
      } else if (snakeBodyPart.y > snakeFieldWidth - 1) {
        snakeBodyPart = { x: snakeBodyPart.x, y: 0 };
      } // Vertical
      else if (snakeBodyPart.x < 0) {
        snakeBodyPart = { x: snakeFieldHeight - 1, y: snakeBodyPart.y };
      } else if (snakeBodyPart.x > snakeFieldHeight - 1) {
        snakeBodyPart = { x: 0, y: snakeBodyPart.y };
      }
      tempSnakeField[snakeBodyPart.x][snakeBodyPart.y] = "#";
    }
    tempSnakeField[newSnakeHead.x][newSnakeHead.y] = "X";
    if (!foodIsPlaced) {
      // let foodCordinates = generateFoodCordinates(snakeField, snakeTailBody);
      // tempSnakeField[foodCordinates.x][foodCordinates.y] = "O";
      tempSnakeField[foodCords.x][foodCords.y] = foodChar;
    }
    if (newSnakeHead.x === foodCords.x && newSnakeHead.y === foodCords.y) {
      snakeTailBody.unshift(tempSnakeHead);
      tempSnakeField[foodCords.x][foodCords.y] = "X";
      setFoodCords(generateFoodCordinates(snakeField, snakeTailBody));
      let tempGamePoints = gamePoints;
      setGamePoints((tempGamePoints += 1));
      setFoodChar(
        listOfTestCh[Math.floor(Math.random() * listOfTestCh.length)]
      );
      setFoodIsPlaced(false);
    }
    setSnakeField(tempSnakeField);
  }

  function generateCleanFieldLook() {
    let tempSnakeField = [...snakeField];
    for (let row = 0; row < tempSnakeField.length; row++) {
      for (let col = 0; col < tempSnakeField[0].length; col++) {
        tempSnakeField[row][col] = " ";
      }
    }
    return tempSnakeField;
  }

  useEffect(() => {
    gameTimerId = setInterval(() => {
      if (gameIsRunning && !gameIsOver) {
        setSnakeField(generateCleanFieldLook());
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
      }
    }, 1000);

    return () => {
      clearInterval(gameTimerId);
    };
  }, [snakeField, xDir, yDir, foodIsPlaced, gameIsRunning, snakeTailBody]);

  function toggleGamePause() {
    return !gameIsRunning;
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameContents}>
        <Text style={styles.title}>Points: {gamePoints}</Text>
        <View>
          {snakeField.map((row, rIndex) => {
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
        {/* Navigation Buttons */}
        <Pressable
          style={styles.directionButtons}
          onPress={() => {
            setXDir(-1), setYDir(0);
          }}
        >
          <Text style={{ textAlign: "center" }}>UP</Text>
        </Pressable>
        {/* LEFT PAUSE RIGHT */}
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={styles.directionButtons}
            onPress={() => {
              setYDir(-1), setXDir(0);
            }}
          >
            <Text style={{ textAlign: "center" }}>LEFT</Text>
          </Pressable>
          <Pressable // PAUSE GAME
            style={styles.directionButtons}
            onPress={() => {
              setGameIsRunning(toggleGamePause());
            }}
          >
            <Text style={{ textAlign: "center" }}>PAUSE</Text>
          </Pressable>
          <Pressable // RIGHT
            style={styles.directionButtons}
            onPress={() => {
              setYDir(1), setXDir(0);
            }}
          >
            <Text style={{ textAlign: "center" }}>RIGHT</Text>
          </Pressable>
        </View>
        <Pressable // DOWN
          style={styles.directionButtons}
          onPress={() => {
            setXDir(1), setYDir(0);
          }}
        >
          <Text style={{ textAlign: "center" }}>DOWN</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  oneTextInField: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 18,
    width: 18,
    margin: 1,
    borderWidth: 1,
  },
  directionButtons: {
    alignContent: "center",
    justifyContent: "center",
    height: 45,
    width: 80,
    margin: 10,
    backgroundColor: "gray",
  },
  gameContents: {
    alignItems: "center",
  },
  // default
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
