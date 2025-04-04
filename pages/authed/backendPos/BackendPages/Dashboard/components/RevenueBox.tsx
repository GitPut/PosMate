import React from "react";
import { StyleSheet, View, Image, Text, ViewStyle } from "react-native";

function RevenueBox({
  style,
  revenueValue,
}: {
  style: ViewStyle;
  revenueValue: string;
}) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../assets/images/image_UiWn..png")}
        resizeMode="contain"
        style={styles.moneyIcon}
        key={"moneyIcon"}
      />
      <View style={styles.rightSide}>
        <Text
          style={[
            styles.revenueValue,
            revenueValue.length > 6 && { fontSize: 15 },
          ]}
        >
          ${revenueValue}
        </Text>
        <Text style={styles.revenue}>Revenue</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8ffe6",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moneyIcon: {
    height: 48,
    width: 51,
    marginLeft: 15,
  },
  rightSide: {
    width: 86,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: 13,
  },
  revenueValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  revenue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
});

export default RevenueBox;
