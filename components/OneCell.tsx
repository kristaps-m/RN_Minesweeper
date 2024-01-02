import { Text, StyleSheet } from "react-native";

type oneCellProps = {
  oneCellProps: oneCell;
  isGameOver: boolean;
};

interface oneCell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  minesCount: number;
}

export default function TheOneCellComponent(props: oneCellProps) {
  function name(oneCell: oneCell) {
    if (props.isGameOver && props.oneCellProps.isMine) {
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
    } else {
      return (
        <Text
          style={[
            styles.oneCellTextDefault,
            props.oneCellProps.isRevealed
              ? styles.oneCellRevealed
              : styles.oneCellClosed,
            // props.isGameOver && styles.isGameOverStyle,
          ]}
        >
          {props.oneCellProps.isMine ? "X" : "c"}
          {`${props.oneCellProps.isRevealed}`}
          {`${props.oneCellProps.minesCount}`}
        </Text>
      );
    }
  }

  return <>{name(props.oneCellProps)}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 20,
  },
  oneCellTextDefault: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 10,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
  },
  //   oneCellText: {
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 10,
  //   color: "red" : "green"},
  //   fontWeight: `${oneCellFR.isMine ? "bold" : "normal"}`,
  // },
});
