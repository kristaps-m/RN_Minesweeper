import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

interface INavigationProps {
  setXDir: (n: number) => void;
  setYDir: (n: number) => void;
  setGameIsRunning: (b: boolean) => void;
  toggleGamePause: () => boolean;
}

export default function Navigation({
  setXDir,
  setYDir,
  setGameIsRunning,
  toggleGamePause,
}: INavigationProps) {
  return (
    <>
      <Pressable // UP
        style={styles.directionButtons}
        onPress={() => {
          setXDir(-1), setYDir(0);
        }}
      >
        <Text style={{ textAlign: "center" }}>UP</Text>
      </Pressable>

      {/* LEFT PAUSE RIGHT */}
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={styles.directionButtons}
          onPress={() => {
            setYDir(-1), setXDir(0);
          }}
        >
          <Text style={{ textAlign: "center" }}>LEFT</Text>
        </Pressable>
        <Pressable // PAUSE GAME
          style={styles.directionButtons}
          onPress={() => {
            setGameIsRunning(toggleGamePause());
          }}
        >
          <Text style={{ textAlign: "center" }}>PAUSE</Text>
        </Pressable>
        <Pressable // RIGHT
          style={styles.directionButtons}
          onPress={() => {
            setYDir(1), setXDir(0);
          }}
        >
          <Text style={{ textAlign: "center" }}>RIGHT</Text>
        </Pressable>
      </View>

      <Pressable // DOWN
        style={styles.directionButtons}
        onPress={() => {
          setXDir(1), setYDir(0);
        }}
      >
        <Text style={{ textAlign: "center" }}>DOWN</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  directionButtons: {
    alignContent: "center",
    justifyContent: "center",
    height: 45,
    width: 80,
    margin: 10,
    backgroundColor: "gray",
  },
});
