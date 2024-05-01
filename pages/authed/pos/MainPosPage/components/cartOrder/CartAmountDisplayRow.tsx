import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";

interface CartAmountDisplayRowProps {
  style?: ViewStyle;
  amountLbl: string;
  amountValue: string;
}

function CartAmountDisplayRow({style, amountLbl, amountValue} : CartAmountDisplayRowProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.amountLbl}>{amountLbl}</Text>
      <Text style={styles.amountValue}>{amountValue}</Text>
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

export default CartAmountDisplayRow;
