import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {Entypo} from "@expo/vector-icons";

function DropdownPeriod(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.dropdownPeriodLbl}>
        {props.dropdownPeriodLbl || "Weekly"}
      </Text>
      <Entypo name="chevron-small-down" style={styles.chevronDownIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9f9f9f"
  },
  dropdownPeriodLbl: {
    color: "#81838b",
    fontSize: 13,
    marginRight: 0
  },
  chevronDownIcon: {
    color: "#808080",
    fontSize: 25
  }
});

export default DropdownPeriod;
