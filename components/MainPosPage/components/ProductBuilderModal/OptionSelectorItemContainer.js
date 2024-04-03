import React, { Component } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

function OptionSelectorItemContainer({
  style,
  option,
  onMinusPress,
  onPlusPress,
}) {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        option.selectedTimes > 0 && { backgroundColor: "green" },
      ]}
      onPress={onPlusPress}
    >
      <Pressable style={styles.minusBtn} onPress={onMinusPress}>
        <Entypo name="minus" style={styles.minusIcon} />
      </Pressable>
      <View style={styles.itemNameRow}>
        <Text
          style={[
            styles.amountSelected,
            option.selectedTimes > 0 && { color: "white" },
          ]}
        >
          {option.selectedTimes ? option.selectedTimes : 0} x
        </Text>
        <Text
          style={[
            styles.itemNameAndPriceIncrease,
            option.selectedTimes > 0 && { color: "white" },
          ]}
        >{`${option.label} ${
          option.priceIncrease ? `(+$${option.priceIncrease})` : ""
        }`}</Text>
      </View>
      <Pressable style={styles.plusBtn} onPress={onPlusPress}>
        <Entypo name="plus" style={styles.plusIcon} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(184,178,178,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    minHeight: 40,
  },
  minusBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  minusIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
  },
  itemNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  amountSelected: {
    color: "#121212",
    marginRight: 5,
  },
  itemNameAndPriceIncrease: {
    color: "#121212",
  },
  plusBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
  },
});

export default OptionSelectorItemContainer;
