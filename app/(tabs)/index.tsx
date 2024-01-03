import { Button, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import TheOneCellComponent from "../../components/OneCell";
import IOneCell from "../../components/models/IOneCell";
import addMinesToField from "./functionsForMS/addMinesToField";
import addMineCountNumbers from "./functionsForMS/addMineCountNumbers";
import checkIfGameWon from "./functionsForMS/checkIfGameWon";
import generateNewGameFieldWithOnecellObjects from "./functionsForMS/newGameField";

export default function TabOneScreen() {
  // const [gameField, setGameField] = useState(generateNewGameFieldWithOnecellObjects(10));
  const [minesInGame, setMinesInGame] = useState(10);
  const [gameField, setGameField] = useState(
    addMineCountNumbers(
      addMinesToField(minesInGame, generateNewGameFieldWithOnecellObjects(9))
    )
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [havePlayerWon, setHavePlayerWon] = useState(false);

  // function clickCellHandler(theOneCell: IOneCell) {
  //   console.log(isGameOver);
  //   if (!isGameOver) {
  //     if (theOneCell.isMine) {
  //       alert(
  //         `GAME OVER row=${theOneCell.row + 1},col=${theOneCell.col + 1}(cell[${
  //           theOneCell.row
  //         }][${theOneCell.col}])`
  //       );
  //       setIsGameOver(true);
  //     } else {
  //       setGameField((prevField) => {
  //         const tempField = [...prevField];
  //         tempField[theOneCell.row][theOneCell.col] = {
  //           ...tempField[theOneCell.row][theOneCell.col],
  //           isRevealed: true,
  //           // isMine: true,
  //         };
  //         return tempField;
  //       });
  //       console.log("I clicked clickCellHandler", theOneCell);
  //       console.log(gameField);
  //     }
  //   }
  // }
  interface IQueueOneCell {
    row: number;
    col: number;
  }
  function clickCellHandler(theOneCell: IOneCell) {
    console.log(isGameOver);
    if (!isGameOver) {
      if (theOneCell.isMine) {
        // alert(
        //   `GAME OVER row=${theOneCell.row + 1},col=${theOneCell.col + 1}(cell[${
        //     theOneCell.row
        //   }][${theOneCell.col}])`
        // );
        theOneCell.isRevealed = true;
        setIsGameOver(true);
        setHavePlayerWon(false);
      } else {
        const tempField = [...gameField];
        const queue: IQueueOneCell[] = [{ ...theOneCell }]; // IOneCell[]

        while (queue.length > 0) {
          const currentCell = queue.pop();

          if (currentCell) {
            const { row, col } = currentCell;

            // Check if the cell is already revealed
            if (!tempField[row][col].isRevealed) {
              tempField[row][col] = {
                ...tempField[row][col],
                isRevealed: true,
              };

              // If the neighboring mines count is 0, add adjacent cells to the queue
              if (tempField[row][col].minesCount === 0) {
                // Define adjacent positions
                const directions = [
                  { row: -1, col: 0 },
                  { row: 1, col: 0 },
                  { row: 0, col: -1 },
                  { row: 0, col: 1 },
                ];

                // Add adjacent cells to the queue
                for (const direction of directions) {
                  const newRow = row + direction.row;
                  const newCol = col + direction.col;

                  if (
                    newRow >= 0 &&
                    newRow < tempField.length &&
                    newCol >= 0 &&
                    newCol < tempField[0].length
                  ) {
                    queue.push({ row: newRow, col: newCol });
                  }
                }
              }
            }
          }
        }

        setGameField(tempField);
        console.log("I clicked clickCellHandler", theOneCell);
        console.log(gameField);
      }
    }
  }

  // function addMinesHandler() {
  //   let newMinedField = addMinesToField(10, gameField);
  //   setGameField(newMinedField);
  // }

  useEffect(() => {
    const isGameWon = checkIfGameWon(gameField, minesInGame);
    if (isGameWon) {
      setIsGameOver(true);
      setHavePlayerWon(true);
      alert("You are MINEsweeper Pro!");
    }
  });

  const textToDisplayAboveField = () => {
    if (isGameOver && havePlayerWon) {
      return "Amazing You Have Won!";
    } else if (isGameOver && !havePlayerWon) {
      return "--- GAME OVER ---\n   --- You Lost! ---";
    } else {
      return "Keep Finding Those Mines!";
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 40 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "blue",
          }}
        >
          {textToDisplayAboveField()}
        </Text>
      </View>
      {/* <View>
        <Button title="TEST" onPress={}></Button>
      </View> */}
      {gameField.map((oneRow, index) => (
        <View key={index} style={styles.oneRowInGame}>
          {oneRow.map((oneCellFR) => (
            <Pressable
              key={`${oneCellFR.row}${oneCellFR.col}`}
              style={{
                // padding: 10,
                borderColor: "black",
                borderWidth: 1,
                width: 40,
                height: 40,
                alignContent: "center",
                justifyContent: "center",
                backgroundColor: `${oneCellFR.isRevealed ? "#abaaa9" : "gray"}`,
              }}
              onPress={() => clickCellHandler(oneCellFR)}
            >
              <TheOneCellComponent
                oneCellProps={oneCellFR}
                isGameOver={isGameOver}
              />
              {/* <Text
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: `${oneCellFR.isMine ? "red" : "green"}`,
                  fontWeight: `${oneCellFR.isMine ? "bold" : "normal"}`,
                }}
              >
                {oneCellFR.isMine ? "X" : "c"}
                {`${oneCellFR.isRevealed}`}
                {`${oneCellFR.isMine}`}
              </Text> */}
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
