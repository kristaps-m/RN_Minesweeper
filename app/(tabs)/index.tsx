import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import TheOneCellComponent from "../../components/OneCell";
import IOneCell from "../../components/models/IOneCell";
import addMinesToField from "../../components/functionsForMS/addMinesToField";
import addMineCountNumbers from "../../components/functionsForMS/addMineCountNumbers";
import checkIfGameWon from "../../components/functionsForMS/checkIfGameWon";
import generateNewGameFieldWithOnecellObjects from "../../components/functionsForMS/newGameField";
import countHowManyCellsAreFlaged from "../../components/functionsForMS/countHowManyCellsAreFlaged";

interface IQueueOneCell {
  row: number;
  col: number;
}

interface IGameSetting {
  row: number;
  col: number;
  mines: number;
}

export default function TabOneScreen() {
  // 9 * 9 and 10 mines standart begginer setting
  const [gameFieldSettings, setFieldSettings] = useState({
    row: 9,
    col: 9,
    mines: 10,
  });
  const [textFromTextInput, onChangeText] = useState(
    `${gameFieldSettings.row} ${gameFieldSettings.col} ${gameFieldSettings.mines}`
  );
  const [minesInGame, setMinesInGame] = useState(gameFieldSettings.mines);
  const [cellsFlaged, setCellsFlaged] = useState(gameFieldSettings.mines);
  const [gameField, setGameField] = useState(
    addMineCountNumbers(
      addMinesToField(
        gameFieldSettings.mines,
        generateNewGameFieldWithOnecellObjects(
          gameFieldSettings.row,
          gameFieldSettings.col
        )
      )
    )
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [havePlayerWon, setHavePlayerWon] = useState(false);
  const [isFlagToolActive, setFlagTool] = useState(false);

  function makeSureTextInputIsSave(nArray: number[]) {
    if (nArray.length < 3) {
      return [10, 10, 5];
    }
    return nArray.map((n) => (n < 1 ? 1 : n));
  }

  function createNewGameHandler() {
    // if user does not enter text in format "n n n" where n is number
    // function makeSureTextInputIsSave and condtionals in map function below
    // makes sure that in worst case gameFieldSettings = [10, 10, 5]
    const mapedNList: number[] = [
      ...textFromTextInput
        .split(" ")
        .map((s) => (Number.isNaN(parseInt(s)) ? 1 : parseInt(s))),
    ];
    const listOfN: number[] = makeSureTextInputIsSave(mapedNList);
    const newGS: IGameSetting = {
      row: listOfN[0],
      col: listOfN[1],
      mines: listOfN[2],
    };
    setGameField(
      addMineCountNumbers(
        addMinesToField(
          newGS.mines,
          generateNewGameFieldWithOnecellObjects(newGS.row, newGS.col)
        )
      )
    );
    setIsGameOver(false);
    setHavePlayerWon(false);
    setFieldSettings(newGS);
    setCellsFlaged(newGS.mines);
    setMinesInGame(newGS.mines);
  }

  function flagToolHandler() {
    setFlagTool(!isFlagToolActive);
  }

  const r = (x: boolean) => {
    return !x;
  };
  function clickCellHandler(theOneCell: IOneCell) {
    if (!isGameOver) {
      if (isFlagToolActive) {
        const tempField = [...gameField];
        tempField[theOneCell.row][theOneCell.col].isFlaged = r(
          tempField[theOneCell.row][theOneCell.col].isFlaged
        );

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
              if (
                !tempField[row][col].isRevealed &&
                !tempField[row][col].isFlaged
              ) {
                tempField[row][col] = {
                  ...tempField[row][col],
                  isRevealed: true,
                  // isFlaged: false,
                };

                // If the neighboring mines count is 0, add adjacent cells to the queue
                if (
                  tempField[row][col].minesCount === 0 &&
                  !tempField[row][col].isFlaged
                ) {
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
        }
      }
    }
  }

  useEffect(() => {
    const isGameWon = checkIfGameWon(gameField, minesInGame);
    if (isGameWon) {
      setIsGameOver(true);
      setHavePlayerWon(true);
      // alert("You are MINEsweeper Pro!");
    }
  });

  useEffect(() => {
    const howManyRealMinesAreFlaged = countHowManyCellsAreFlaged(gameField);
    let tempMinesNr = minesInGame; // gameFieldSettings.mines
    setCellsFlaged(tempMinesNr - howManyRealMinesAreFlaged);
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
  console.log(gameField);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.displayRCM}>
            {/* WAS COLS */}
            ROWS: {textFromTextInput.split(" ")[0]}
          </Text>
          <Text style={styles.displayRCM}>
            {/* WAS ROWS */}
            COLS: {textFromTextInput.split(" ")[1]}
          </Text>
          <Text style={styles.displayRCM}>
            MINES: {textFromTextInput.split(" ")[2]}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={textFromTextInput}
        />
        <Button title="NEW GAME?" onPress={createNewGameHandler} />
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
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20 }}>⚙ </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              marginRight: 10,
              color: `${isFlagToolActive ? "green" : "red"}`,
            }}
          >{`${isFlagToolActive ? "Click to 'F'" : "Careful!!"}`}</Text>
          <Text>{`MINES LEFT? = ${cellsFlaged}`}</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          // style={{ flexDirection: "column" }}
          data={gameField}
          renderItem={(itemData) => {
            return (
              <View
                // ---------------------------------------------- styles.oneRowInGame
                style={{ flexDirection: "column" }}
                // ----------------------------------------------
              >
                {itemData.item.map((oneCellFR) => (
                  <Pressable
                    key={`${oneCellFR.row}${oneCellFR.col}`}
                    style={{
                      borderColor: "black",
                      borderWidth: 1,
                      width: 27,
                      height: 27,
                      // flex: 1,
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor: `${
                        oneCellFR.isRevealed ? "#969696" : "#454545"
                      }`,
                    }}
                    onPress={() => clickCellHandler(oneCellFR)}
                  >
                    <TheOneCellComponent
                      oneCellProps={oneCellFR}
                      isGameOver={isGameOver}
                    />
                  </Pressable>
                ))}
              </View>
            );
          }}
          horizontal={true} // Enable horizontal scrolling
          // keyExtractor={(item, index) => `${index}`} // Add keyExtracto
        />
      </ScrollView>

      {/* {gameField.map((oneRow, index) => (

        ))}
      </FlatList> */}

      {/* <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20 }}>FLAG TOOL = </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: `${isFlagToolActive ? "green" : "red"}`,
          }}
        >{`${isFlagToolActive}`}</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  displayRCM: {
    fontSize: 13,
  },
  oneRowInGame: {
    flex: 1,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
