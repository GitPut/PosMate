import React, { Component } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";

function DropDownOption({ option }) {
  const history = useHistory();

  return (
    <Pressable
      style={[styles.container]}
      onPress={() =>
        option.link.length > 0 ? history.push(option.link) : option.link()
      }
    >
      <Entypo name="chevron-right" style={styles.chevronRight1} />
      <Text style={[styles.label, option.active && { color: "#121212" }]}>
        {option.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 179,
    marginBottom: 10,
    alignItems: "center",
  },
  chevronRight1: {
    color: "rgba(128,128,128,1)",
    fontSize: 20,
  },
  label: {
    fontWeight: "700",
    color: "rgba(105,114,142,1)",
    fontSize: 15,
    width: 146,
  },
});

export default DropDownOption;
