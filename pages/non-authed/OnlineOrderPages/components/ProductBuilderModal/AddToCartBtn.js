import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function AddToCartBtn(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.lbl}>Add To Cart</Text>
    </TouchableOpacity>
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
