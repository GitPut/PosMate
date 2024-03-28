import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function ShowEmployeeItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.employeeImg}></View>
      <View style={styles.employeeRightSide}>
        <Text style={styles.employeeName}>Peter</Text>
        <Text style={styles.employeePosition}>Manager</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  employeeImg: {
    width: 38,
    height: 38,
    backgroundColor: "#E6E6E6",
    borderRadius: 100,
    marginRight: 8,
  },
  employeeRightSide: {
    width: 80,
    height: 34,
    justifyContent: "space-between",
  },
  employeeName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  employeePosition: {
    fontWeight: "700",
    color: "#8e8f97",
    fontSize: 9,
  },
});

export default ShowEmployeeItem;
