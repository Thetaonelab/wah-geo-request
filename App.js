import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "./src/styles/color";
import styles from "./src/styles/style";
import text from "./src/styles/text";

export default function App() {
  return (
    <View style={styles.parentContainer}>
      <Text style={[text.heroText,{ color: colors.white,fontSize:40 }]}>
        WAH!
      </Text>
      <Text style={[text.secondaryText,{ color: colors.white }]}>
        we are humans
      </Text>
    </View>
  );
}
