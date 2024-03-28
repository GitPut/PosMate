import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function RevenueBox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/image_UiWn..png")}
        resizeMode="contain"
        style={styles.moneyIcon}
      ></Image>
      <View style={styles.rightSide}>
        <Text style={styles.revenueValue}>{props.revenueValue || "$270"}</Text>
        <Text style={styles.revenue}>Revenue</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8ffe6",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  moneyIcon: {
    height: 48,
    width: 51,
    marginLeft: 15
  },
  rightSide: {
    width: 86,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: 13
  },
  revenueValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 20
  },
  revenue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  }
});

export default RevenueBox;
