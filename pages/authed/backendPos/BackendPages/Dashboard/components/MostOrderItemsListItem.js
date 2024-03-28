import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function MostOrderItemsListItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftSide}>
        <Image
          source={require("../assets/images/image_SsZa..png")}
          resizeMode="contain"
          style={styles.itemImg}
        ></Image>
        <Text style={styles.itemName}>
          {props.itemName || "Pepperoni Pizza"}
        </Text>
      </View>
      <Text style={styles.itemNumOfOrders}>
        {props.itemNumOfOrders || "70"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSide: {
    width: 256,
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemImg: {
    height: 70,
    width: 70,
    marginRight: 7,
  },
  itemName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  itemNumOfOrders: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
});

export default MostOrderItemsListItem;
