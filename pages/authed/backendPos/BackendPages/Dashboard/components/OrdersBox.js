import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function OrdersBox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/image_Y7Ho..png")}
        resizeMode="contain"
        style={styles.ordersIcon}
      ></Image>
      <View style={styles.rightSide}>
        <Text style={styles.ordersValue}>{props.ordersValue || "15"}</Text>
        <Text style={styles.ordersTxt}>Orders</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ordersIcon: {
    height: 48,
    width: 51,
    marginLeft: 12,
  },
  rightSide: {
    width: 86,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: 12,
  },
  ordersValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  ordersTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
});

export default OrdersBox;
