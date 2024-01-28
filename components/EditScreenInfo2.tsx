import React from "react";
import { StyleSheet } from "react-native";

// import Colors from "../constants/Colors";
// import { ExternalLink } from "./ExternalLink";
// import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function EditScreenInfo2({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          I suggest to stick with default sizes, but if you want to know then:
          maximum column length = 25, Max row length = 40, maximum mines =
          colums * row -1.{"\n"}Minumum dimensions is 2 x 2. Minimum mines count
          is 2.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  oneCellTextDefault: {
    textAlign: "center",
    fontSize: 16,
  },
  oneCellRevealed: {
    color: "red",
  },
  oneCellClosed: {
    color: "green",
    fontWeight: "normal",
  },
  isGameOverStyle: {
    fontSize: 20,
    color: "#6464fa", // blue
  },
  isGameOverStyleRevealed: {
    fontSize: 20,
    color: "red",
  },
  isFlaged: {
    fontWeight: "bold",
  },
  isMineAndWasFlaged: {
    fontSize: 11,
    color: "#29f705",
    fontWeight: "bold",
  },
});
