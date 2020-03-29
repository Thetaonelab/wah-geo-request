import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/color";
import styles from "../styles/style";
import text from "../styles/text";

export default function SplashScreen() {
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
