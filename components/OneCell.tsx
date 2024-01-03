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
        <Text style={[styles.oneCellTextDefault, styles.isFlaged]}>F</Text>
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
      // else {

      // return (
      //   <Text
      //     style={[
      //       styles.oneCellTextDefault,
      //       c.isRevealed
      //         ? styles.oneCellRevealed
      //         : styles.oneCellClosed,
      //       // props.isGameOver && styles.isGameOverStyle,
      //     ]}
      //   >
      //     .
      //     {/* {c.isMine ? "X" : "c"}
      //     {`${c.isRevealed}`}
      //     {c.minesCount > 0 &&
      //       `${c.minesCount}`} */}
      //   </Text>
      // );
      // }
    }
  }

  return <>{textReturnFunction()}</>;
}

const styles = StyleSheet.create({
  // cellText: {
  //   fontSize: 20,
  // },
  oneCellTextDefault: {
    // alignContent: "center",
    // justifyContent: "center",
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
    fontSize: 28,
    fontWeight: "bold",
    color: "blue",
  },
  isGameOverStyleRevealed: {
    fontSize: 35,
    fontWeight: "bold",
    color: "red",
  },
  isFlaged: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#cf39e3",
  },
  isMineAndWasFlaged: {
    fontSize: 19,
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
