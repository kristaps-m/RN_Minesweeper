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
    // else if (props.oneCellProps.isMine) {
    //   return (
    //     <>
    //       <Text>.</Text>
    //       {/* <Text
    //         style={[{ fontSize: 20, color: "blue" }, styles.oneCellTextDefault]}
    //       >
    //         {props.oneCellProps.isMine ? "X-X" : "c"}
    //       </Text>
    //       <Text>{`${props.oneCellProps.isRevealed}`}</Text> */}
    //     </>
    //   );
    // }
    else {
      if (c.isRevealed && c.minesCount > 0) {
        return (
          <Text
            style={[
              styles.oneCellTextDefault,
              props.oneCellProps.isRevealed
                ? styles.oneCellRevealed
                : styles.oneCellClosed,
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
      //       props.oneCellProps.isRevealed
      //         ? styles.oneCellRevealed
      //         : styles.oneCellClosed,
      //       // props.isGameOver && styles.isGameOverStyle,
      //     ]}
      //   >
      //     .
      //     {/* {props.oneCellProps.isMine ? "X" : "c"}
      //     {`${props.oneCellProps.isRevealed}`}
      //     {props.oneCellProps.minesCount > 0 &&
      //       `${props.oneCellProps.minesCount}`} */}
      //   </Text>
      // );
      // }
    }
  }

  return <>{textReturnFunction()}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // cellText: {
  //   fontSize: 20,
  // },
  oneCellTextDefault: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
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
  isGameOverStyleRevealed: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
  //   oneCellText: {
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 10,
  //   color: "red" : "green"},
  //   fontWeight: `${oneCellFR.isMine ? "bold" : "normal"}`,
  // },
});
