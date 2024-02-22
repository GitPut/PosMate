import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function OneTimeSelectableBtn({ style, selectedVal, setselectedVal, id }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        id === selectedVal && { backgroundColor: "#1a2a51" },
      ]}
      onPress={() => setselectedVal(id)}
    >
      <Text
        style={[
          styles.lbl,
          id === selectedVal ? { color: "white" } : { color: "#28292c" },
        ]}
      >
        Small (+$0)
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  lbl: {
    fontSize: 13,
  },
});

export default OneTimeSelectableBtn;
