import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import OneTimeSelectableBtn from "./OneTimeSelectableBtn";

function OneTimeSelectableOptionGroup({
  style,
  isRequired,
  label,
  options,
  value,
  setValue,
}) {
  useEffect(() => {
    if (!value) {
      setValue({
        option: {
          label: options[0].label,
          priceIncrease:
            options[0].priceIncrease !== null ? options[0].priceIncrease : 0,
        },
        listIndex: 0,
      });
    }
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.lbl}>
        {label} {isRequired ? "*" : ""}
      </Text>
      <View style={styles.optionsRow}>
        {options.map((option, listIndex) => {
          return (
            <OneTimeSelectableBtn
              key={listIndex}
              label={`${option.label}  (+$${
                option.priceIncrease !== null ? option.priceIncrease : 0
              })`}
              style={styles.nonActiveOneTimeSelectableBtn}
              selectedVal={value}
              setselectedVal={setValue}
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
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  lbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 14,
  },
  optionsRow: {
    width: 352,
    height: 82,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activeOneTimeSelectableBtn: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
  nonActiveOneTimeSelectableBtn: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
  nonActiveOneTimeSelectableBtn1: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
  nonActiveOneTimeSelectableBtn2: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
});

export default OneTimeSelectableOptionGroup;
