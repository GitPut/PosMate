import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "@expo/vector-icons/Feather";

function CheckPlanItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name="check" style={styles.checkIcon}></Icon>
      <Text style={styles.featureDetailTxt}>
        {props.FeatureDetailTxt ||
          "Integration with Woo Commerce/WordPress Store"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkIcon: {
    color: "rgba(74,144,226,1)",
    fontSize: 30,
  },
  featureDetailTxt: {
    color: "#121212",
  },
});

export default CheckPlanItem;
