import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

function GoBackBtn({ style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Entypo name="chevron-left" style={styles.backIcon}></Entypo>
      <Text style={styles.lbl}>Dashboard</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIcon: {
    color: "#070707",
    fontSize: 40,
  },
  lbl: {
    fontweight: "700",
    color: "#121212",
    fontSize: 18,
  },
});

export default GoBackBtn;
