import { Text, StyleSheet } from "react-native";
import IOneCell from "./models/IOneCell";

type oneCellProps = {
  oneCellProps: IOneCell;
  isGameOver: boolean;
};

// interface oneCell {
//   row: number;
//   col: number;
//   isMine: boolean;
//   isRevealed: boolean;
//   minesCount: number;
// }

export default function TheOneCellComponent(props: oneCellProps) {
  const c = props.oneCellProps;
  function textReturnFunction() {
    // if (c.isRevealed && c.isMine) {
    //   return <Text>☠︎︎</Text>;
    // } else
    if (props.isGameOver && c.isMine) {
      if (c.isRevealed) {
        return (
          <Text
            style={[
              styles.oneCellTextDefault,
              props.isGameOver && styles.isGameOverStyleRevealed,
            ]}
          >
            ☠︎︎
          </Text>
        );
      } else if (c.isMine && c.isFlaged) {
        return (
          <Text
            style={[
              styles.oneCellTextDefault,
              props.isGameOver && styles.isMineAndWasFlaged,
            ]}
          >
            ☠︎︎,F
          </Text>
        );
      } else {
        return (
          <Text
            style={[
              styles.oneCellTextDefault,
              props.isGameOver && styles.isGameOverStyle,
            ]}
          >
            ☠︎︎
          </Text>
        );
      }
    }
    // else if (c.isMine) {
    //   return (
    //     <>
    //       <Text>.</Text>
    //       {/* <Text
    //         style={[{ fontSize: 20, color: "blue" }, styles.oneCellTextDefault]}
    //       >
    //         {c.isMine ? "X-X" : "c"}
    //       </Text>
    //       <Text>{`${c.isRevealed}`}</Text> */}
    //     </>
    //   );
    // }
    else if (c.isFlaged) {
      return (
        <Text
          style={[
            styles.oneCellTextDefault,
            styles.isFlaged,
            { color: c.isRevealed ? "#781785" : "#e56cf5" },
          ]}
        >
          F
        </Text>
      );
    } else {
      if (c.isRevealed && c.minesCount > 0) {
        return (
          <Text
            style={[
              styles.oneCellTextDefault,
              c.isRevealed ? styles.oneCellRevealed : styles.oneCellClosed,
            ]}
          >
            {c.minesCount}
          </Text>
        );
      }
    }
  }

  return <>{textReturnFunction()}</>;
}

const styles = StyleSheet.create({
  oneCellTextDefault: {
    textAlign: "center",
    fontSize: 20,
  },
  oneCellRevealed: {
    color: "red",
    fontWeight: "bold",
  },
  oneCellClosed: {
    color: "green",
    fontWeight: "normal",
  },
  isGameOverStyle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "blue",
  },
  isGameOverStyleRevealed: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
  isFlaged: {
    fontSize: 27,
    fontWeight: "bold",
    // color: `${}`,//"#e56cf5", // #e56cf5 #cf39e3(old)
  },
  isMineAndWasFlaged: {
    fontSize: 15,
    color: "#29f705",
    fontWeight: "bold",
  },
  //   oneCellText: {
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 10,
  //   color: "red" : "green"},
  //   fontWeight: `${oneCellFR.isMine ? "bold" : "normal"}`,
  // },
});
