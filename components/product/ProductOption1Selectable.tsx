import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HoverButton = ({ title, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.multiOption,
        isSelected
          ? {
              backgroundColor: "blue",
              borderWidth: 2,
              borderColor: "rgba(205,213,255,1)",
            }
          : {
              borderWidth: 2,
              borderColor: "rgba(203,202,202,1)",
              backgroundColor: "grey",
            },
      ]}
    >
      {title}
    </TouchableOpacity>
  );
};

const ProductOption1Selectable = ({ options, setValue, value }) => {
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
      {options.map((option, listIndex) => (
        <HoverButton
          key={listIndex}
          title={`${option.label}  (+$${
            option.priceIncrease !== null ? option.priceIncrease : 0
          })`}
          onPress={() => {
            setValue({
              option: {
                label: option.label,
                priceIncrease:
                  option.priceIncrease !== null ? option.priceIncrease : 0,
              },
              listIndex: listIndex,
            });
          }}
          isSelected={value ? value.label === option.label : false}
        />
      ))}
    </View>
  );
};

export default ProductOption1Selectable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  multiOption: {
    // backgroundColor: "rgba(205,213,255,1)",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.03,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15,
    margin: 5,
    minWidth: 150,
  },
});
