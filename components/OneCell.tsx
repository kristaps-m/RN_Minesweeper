// THIS FILE IS FOR MineSweeper!
import { Text, StyleSheet } from "react-native";
import IOneCell from "./models/IOneCell";

type oneCellProps = {
  oneCellProps: IOneCell;
  isGameOver: boolean;
  isCheatOn: boolean;
};

export default function TheOneCellComponent(props: oneCellProps) {
  const c = props.oneCellProps;
  function textReturnFunction() {
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
    } else if (props.isCheatOn && c.isMine) {
      return <Text style={{ color: "white", textAlign: "center" }}>M</Text>;
    } else if (c.isFlaged) {
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
    fontSize: 16,
  },
  oneCellRevealed: {
    color: "red",
    // fontWeight: "bold",
  },
  oneCellClosed: {
    color: "green",
    fontWeight: "normal",
  },
  isGameOverStyle: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "#6464fa", // blue
  },
  isGameOverStyleRevealed: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "red",
  },
  isFlaged: {
    // fontSize: 27,
    fontWeight: "bold",
    // color: `${}`,//"#e56cf5", // #e56cf5 #cf39e3(old)
  },
  isMineAndWasFlaged: {
    fontSize: 11,
    color: "#29f705",
    fontWeight: "bold",
  },
});
