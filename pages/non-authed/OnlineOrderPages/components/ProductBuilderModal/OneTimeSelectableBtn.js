import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function OneTimeSelectableBtn({ style, selectedVal, setselectedVal, label, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        isSelected && { backgroundColor: "#1a2a51" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.lbl,
          isSelected ? { color: "white" } : { color: "#28292c" },
        ]}
      >
        {label}
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
