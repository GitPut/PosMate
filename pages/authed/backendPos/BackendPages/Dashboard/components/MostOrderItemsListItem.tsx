import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function MostOrderItemsListItem({
  imageUrl,
  itemName,
  itemNumOfOrders,
}: {
  imageUrl: string;
  itemName: string;
  itemNumOfOrders: string;
}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.leftSide}>
        <Image
          source={{ uri: imageUrl || "https://via.placeholder.com/70" }}
          resizeMode="contain"
          style={styles.itemImg}
        />
        <Text style={styles.itemName}>{itemName}</Text>
      </View>
      <Text style={styles.itemNumOfOrders}>{itemNumOfOrders}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    width: 326,
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
