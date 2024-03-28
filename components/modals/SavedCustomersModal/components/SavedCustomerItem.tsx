import React, { Component } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

function SavedCustomerItem({ style, customerName }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSide1}>
        <Ionicons name="md-person" style={styles.savedCustomerIcon1} />
        <Text style={styles.savedCustomerName1}>{customerName}</Text>
      </View>
      <Entypo name="chevron-right" style={styles.onpressCustomerDetailsIcon2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSide1: {
    width: 377,
    height: 44,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 12,
  },
  savedCustomerIcon1: {
    color: "#1c294e",
    fontSize: 40,
    paddingRight: 15,
  },
  savedCustomerName1: {
    fontWeight: "700",
    color: "#000000",
    fontSize: 20,
  },
  onpressCustomerDetailsIcon2: {
    color: "#0f0f0f",
    fontSize: 40,
  },
});

export default SavedCustomerItem;
