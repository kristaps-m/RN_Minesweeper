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

interface IQueueOneCell {
  row: number;
  col: number;
}
export default function TabOneScreen() {
  const [minesInGame, setMinesInGame] = useState(6);
  const [cellsFlaged, setCellsFlaged] = useState(minesInGame);
  const [gameField, setGameField] = useState(
    addMineCountNumbers(
      addMinesToField(minesInGame, generateNewGameFieldWithOnecellObjects(9))
    )
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [havePlayerWon, setHavePlayerWon] = useState(false);
  const [isFlagToolActive, setFlagTool] = useState(false);

  function flagToolHandler() {
    setFlagTool(!isFlagToolActive);
  }

  function cellsFlagedNumberHandler(oneCell: IOneCell) {
    let tempNumber = minesInGame;
    if (!oneCell.isFlaged) {
      tempNumber--;
    } else {
      tempNumber++;
    }
    setCellsFlaged(tempNumber);
  }
  // const r = (c: IOneCell) => {
  //   return c.isFlaged ? c.isFlaged = false : c.isFlaged = true;
  // };
  const r = (x: boolean) => {
    return !x;
  };
  function clickCellHandler(theOneCell: IOneCell) {
    console.log(isGameOver);
    if (!isGameOver) {
      if (isFlagToolActive) {
        const tempField = [...gameField];
        tempField[theOneCell.row][theOneCell.col].isFlaged = r(
          tempField[theOneCell.row][theOneCell.col].isFlaged
        );
        // cellsFlagedNumberHandler(theOneCell);
        setGameField(tempField);
      } else {
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
  }

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
  // for (let i = 0; i < gameField.length; i++) {
  //   gameField[i][i].isFlaged = true;
  // }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 40 }}>
        <Text>MINES in Beggining: {minesInGame}</Text>
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
      <View>
        <Button title="flagToolHandler" onPress={flagToolHandler} />
        {`FLAG TOOL = ${isFlagToolActive}`}
        {`MINES REMAINING? = ${cellsFlaged}`}
      </View>
      {gameField.map((oneRow, index) => (
        <View key={index} style={styles.oneRowInGame}>
          {oneRow.map((oneCellFR) => (
            <Pressable
              key={`${oneCellFR.row}${oneCellFR.col}`}
              style={{
                borderColor: "black",
                borderWidth: 1,
                width: 40,
                height: 40,
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
                backgroundColor: `${oneCellFR.isRevealed ? "#abaaa9" : "gray"}`,
              }}
              onPress={() => clickCellHandler(oneCellFR)}
            >
              {/* <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {oneCellFR.minesCount}
                </Text> */}
              <TheOneCellComponent
                oneCellProps={oneCellFR}
                isGameOver={isGameOver}
              />
            </Pressable>
          ))}
        </View>
      ))}
      <Text>{`FLAG TOOL = ${isFlagToolActive}`}</Text>
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
