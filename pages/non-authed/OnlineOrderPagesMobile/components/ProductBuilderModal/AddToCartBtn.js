import React, { Component } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

function AddToCartBtn({ style, onPress, title }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.lbl}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a2a51",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 17,
  },
});

export default AddToCartBtn;
