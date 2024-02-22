import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import OneTimeSelectableBtn from "./OneTimeSelectableBtn";

function OneTimeSelectableOptionGroup(props) {
  const [selectedVal, setselectedVal] = useState(1)
  const options = [
    { id: 1, name: "Small (+$0)" },
    { id: 2, name: "Medium (+$2)" },
    { id: 3, name: "Large (+$4)" },
    { id: 4, name: "X-Large (+$6)" },
  ];

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.lbl}>Size</Text>
      <View style={styles.optionsRow}>
        {options.map((option, index) => {
          return (
            <OneTimeSelectableBtn
              key={index}
              id={option.id}
              style={styles.nonActiveOneTimeSelectableBtn}
              selectedVal={selectedVal}
              setselectedVal={setselectedVal}
            />
          );
        }
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  lbl: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 14
  },
  optionsRow: {
    width: 352,
    height: 82,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  activeOneTimeSelectableBtn: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15
  },
  nonActiveOneTimeSelectableBtn: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15
  },
  nonActiveOneTimeSelectableBtn1: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15
  },
  nonActiveOneTimeSelectableBtn2: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15
  }
});

export default OneTimeSelectableOptionGroup;
