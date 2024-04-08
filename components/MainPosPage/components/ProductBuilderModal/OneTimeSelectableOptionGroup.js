import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import OneTimeSelectableBtn from "./OneTimeSelectableBtn";

function OneTimeSelectableOptionGroup({
  isRequired,
  label,
  options,
  value,
  setValue,
}) {
  // useEffect(() => {
  //   if (!value && options.length > 0) {
  //     setValue({
  //       option: {
  //         label: options[0]?.label,
  //         priceIncrease:
  //           options[0]?.priceIncrease !== null ? options[0]?.priceIncrease : 0,
  //       },
  //       listIndex: 0,
  //     });
  //   }
  // }, []);

  return (
    <View style={[styles.container]}>
      <Text style={styles.lbl}>
        {label} {isRequired ? "*" : ""}
      </Text>
      <View style={styles.optionsRow}>
        {options.map((option, listIndex) => {
          return (
            <OneTimeSelectableBtn
              key={option.id}
              label={
                option.priceIncrease > 0
                  ? `${option.label} (+$${option.priceIncrease})`
                  : option.label
              }
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
    marginBottom: 20,
    alignSelf: "stretch",
  },
  lbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 14,
    width: "25%",
  },
  optionsRow: {
    width: "70%",
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
    minHeight: 33,
    maxHeight: 50,
    minWidth: 110,
    maxWidth: 160,
    marginRight: 7,
    marginBottom: 15,
    padding: 5,
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
