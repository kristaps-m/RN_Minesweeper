### TODO:

- FIX flaged real mines flaged!

### Default index.tsx file:

```import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [theN, setTheN] = useState(0);
  function increaseTheNHandler() {
    let tempNum = theN;
    tempNum++;
    setTheN(tempNum);
  }

  function decreaseTheNHandler() {
    let tempNum = theN;
    tempNum--;
    setTheN(tempNum);
  }

  useEffect(() => {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={decreaseTheNHandler}>
          <Text>--</Text>
        </Pressable>
        <Text>{theN}</Text>
        <Pressable onPress={increaseTheNHandler}>
          <Text>++</Text>
        </Pressable>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
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
```

### Hello :)

```
  // const [cell, setCell] = useState({
  //   row: 0,
  //   col: 0,
  //   isMine: false,
  //   isRevealed: false,
  //   minesCount: 0,
  // });

  /*[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ] */
  // const testArray = generateNewGameFieldWithOnecellObjects(3);

```
