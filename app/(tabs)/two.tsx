import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import generateFoodCordinates from "../../components/functionsForSnake/generateFoodCordinates";
import {
  didSnakeRunInTail,
  returnNewSnakeHeaadAfterHitWall,
} from "../../components/functionsForSnake/colisionDetection";
import ISnakeCell from "../../components/models/ISnakeCell";
import Navigation from "../../components/SnakeNavigationButtons";

export default function TabTwoScreen() {
  const listOfFoodCh = ["@", "%", "O", "Q", "G"];
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
    let tempSnakeField: string[][] = [...snakeField];
    let tempSnakeHead: ISnakeCell = snakeTailBody[snakeTailBody.length - 1];
    let newSnakeHead: ISnakeCell = {
      x: (tempSnakeHead.x += xDir),
      y: (tempSnakeHead.y += yDir),
    };
    newSnakeHead = returnNewSnakeHeaadAfterHitWall(
      newSnakeHead,
      snakeFieldWidth,
      snakeFieldHeight
    );

    snakeTailBody.push(newSnakeHead);
    setTailBody(snakeTailBody);

    for (let index = 0; index < snakeTailBody.length; index++) {
      let snakeBodyPart = snakeTailBody[index];
      snakeBodyPart = returnNewSnakeHeaadAfterHitWall(
        snakeBodyPart,
        snakeFieldWidth,
        snakeFieldHeight
      );
      tempSnakeField[snakeBodyPart.x][snakeBodyPart.y] = "#";
    }
    tempSnakeField[newSnakeHead.x][newSnakeHead.y] = "X";

    if (!foodIsPlaced) {
      tempSnakeField[foodCords.x][foodCords.y] = foodChar;
    }
    if (newSnakeHead.x === foodCords.x && newSnakeHead.y === foodCords.y) {
      snakeTailBody.unshift(tempSnakeHead);
      tempSnakeField[foodCords.x][foodCords.y] = "X";
      setFoodCords(generateFoodCordinates(snakeField, snakeTailBody));
      let tempGamePoints = gamePoints;
      setGamePoints((tempGamePoints += 1));
      setFoodChar(
        listOfFoodCh[Math.floor(Math.random() * listOfFoodCh.length)]
      );
      setFoodIsPlaced(false);
    }
    // setSnakeField(tempSnakeField);
    return tempSnakeField;
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
        setSnakeField(drawField());
        snakeTailBody.shift();
        let tempSnakeHead = snakeTailBody[snakeTailBody.length - 1];
        if (
          didSnakeRunInTail(
            snakeTailBody.slice(0, snakeTailBody.length - 2),
            tempSnakeHead
          ) &&
          snakeTailBody.length > 5
        ) {
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
  }, [snakeField, foodIsPlaced, gameIsRunning, snakeTailBody]);

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
        <Navigation
          setXDir={setXDir}
          setYDir={setYDir}
          setGameIsRunning={setGameIsRunning}
          toggleGamePause={toggleGamePause}
        />
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
