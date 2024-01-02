import { Button, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import TheOneCellComponent from "../../components/OneCell";

interface oneCell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  minesCount: number;
}

export default function TabOneScreen() {
  // const [gameField, setGameField] = useState(TheWowName(10));
  const [minesInGame, setMinesInGame] = useState(10);
  const [gameField, setGameField] = useState(
    addMineCountNumbers(addMinesToField(minesInGame, TheWowName(10)))
  );
  const [isGameOver, setIsGameOver] = useState(false);
  // const [cell, setCell] = useState({
  //   row: 0,
  //   col: 0,
  //   isMine: false,
  //   isRevealed: false,
  //   minesCount: 0,
  // });
  function TheWowName(params: number) {
    let resultArray = [];
    for (let row = 0; row < params; row++) {
      let tempRow = [];
      for (let col = 0; col < params; col++) {
        let theOneCell: oneCell = {
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
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function countMines(theGameField: oneCell[][]) {
    let howManyMinesAdded = 0;
    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField.length; col++) {
        if (theGameField[row][col].isMine) {
          howManyMinesAdded++;
        }
      }
    }

    return howManyMinesAdded;
  }
  // if field 10 * 10, them mines count = 10;
  function addMinesToField(howManyMines: number, theGameField: oneCell[][]) {
    // let theGameField: oneCell[][] = [];
    let howManyMinesAdded = countMines(theGameField);

    while (howManyMines !== howManyMinesAdded) {
      let randRow = getRandomInt(theGameField.length);
      let randCol = getRandomInt(theGameField.length);
      if (theGameField[randRow][randCol].isMine === false) {
        theGameField[randRow][randCol].isMine = true;
        howManyMinesAdded++;
      }
    }

    return theGameField;
  }

  function countMinesAround(
    realRow: number,
    realCol: number,
    theGameField: oneCell[][]
  ) {
    let minesAroundTheCell = 0;
    // (5,5) OR // (3,3)0,0
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (
          row + realRow >= 0 &&
          row + realRow < theGameField.length &&
          col + realCol >= 0 &&
          col + realCol < theGameField[0].length
        ) {
          if (theGameField[row + realRow][col + realCol].isMine) {
            minesAroundTheCell++;
          }
        }
      }
    }

    return minesAroundTheCell;
  }
  // if field is 9 x 9, active cell = 5:5, to check
  /*
  [(4,4) (4,5) (3,6)
   (5,4) (5,5) (5,6)
   (6,4) (6,5) (6,6)]
   */
  function addMineCountNumbers(theGameField: oneCell[][]) {
    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField.length; col++) {
        if (theGameField[row][col].isMine === false) {
          theGameField[row][col].minesCount = countMinesAround(
            row,
            col,
            theGameField
          );
        }
      }
    }

    return theGameField;
  }

  function clickCellHandler(theOneCell: oneCell) {
    // // row: number, col: number
    // let tempField = gameField;
    // tempField[theOneCell.row][theOneCell.col].isRevealed = true;
    // tempField[theOneCell.row][theOneCell.col].isMine = true;
    // setGameField(tempField);
    console.log(isGameOver);
    if (!isGameOver) {
      if (theOneCell.isMine) {
        alert(
          `GAME OVER row=${theOneCell.row + 1},col=${theOneCell.col + 1}(cell[${
            theOneCell.row
          }][${theOneCell.col}])`
        );
        setIsGameOver(true);
      } else {
        setGameField((prevField) => {
          const tempField = [...prevField];
          tempField[theOneCell.row][theOneCell.col] = {
            ...tempField[theOneCell.row][theOneCell.col],
            isRevealed: true,
            // isMine: true,
          };
          return tempField;
        });
        console.log("I clicked clickCellHandler", theOneCell);
        console.log(gameField);
      }
    }
  }

  // function bigTest(theOneCell: oneCell) {

  // }
  // function addMinesHandler() {
  //   let newMinedField = addMinesToField(10, gameField);
  //   setGameField(newMinedField);
  // }
  // AddMinesToField(10);
  // gameField[3][7].isMine = true;

  // useEffect(() => {
  //   addMinesHandler();
  // }, [gameField]);

  function checkIfGameWon(theGameField: oneCell[][]) {
    let gameCellsRevealed = 0;

    for (let row = 0; row < theGameField.length; row++) {
      for (let col = 0; col < theGameField.length; col++) {
        if (theGameField[row][col].isRevealed) {
          gameCellsRevealed++;
        }
      }
    }
    // 8 == 2
    return (
      theGameField[0].length * theGameField.length - gameCellsRevealed ===
      minesInGame
    );
  }

  useEffect(() => {
    const isGameWon = checkIfGameWon(gameField);
    if (isGameWon) {
      alert("You are MINEsweeper Pro!");
      setIsGameOver(true);
    }
  });

  return (
    <View style={styles.container}>
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
