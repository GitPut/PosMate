import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function UntitledComponent(props) {
  return (
    <View style={[styles.container, props?.style]}>
      <Text style={styles.amountLbl}>{props?.amountLbl || "Subtotal"}</Text>
      <Text style={styles.amountValue}>{props?.amountValue || "$10"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  amountLbl: {
    color: "#121212",
    fontSize: 15
  },
  amountValue: {
    color: "#121212",
    fontSize: 15
  }
});

export default UntitledComponent;
