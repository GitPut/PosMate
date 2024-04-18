import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface HeaderTxtProps {
  Txt: string;
  SubTxt: string;
}

function HeaderTxt({Txt, SubTxt} : HeaderTxtProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Txt}</Text>
      <Text style={styles.subTxt}>{SubTxt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 74,
    marginBottom: 10,
  },
  text: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 38,
  },
  subTxt: {
    fontWeight: "700",
    color: "#1c294e",
    fontSize: 22,
  },
});

export default HeaderTxt;
