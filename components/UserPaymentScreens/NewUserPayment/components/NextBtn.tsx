import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function NextBtn(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.next}>Next</Text>
      <Image
        source={require("assets/arrowRightIcon.png")}
        resizeMode="contain"
        style={styles.arrowRightIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c294e",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  next: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 22,
    marginRight: 10,
    marginLeft: 0,
  },
  arrowRightIcon: {
    height: 20,
    width: 30,
    marginRight: 0,
    marginLeft: 0,
  },
});

export default NextBtn;
