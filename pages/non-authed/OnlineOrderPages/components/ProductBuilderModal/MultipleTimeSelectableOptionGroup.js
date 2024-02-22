import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function MultipleTimeSelectableOptionGroup({
  style,
  setopenDropdown,
  openDropdown,
  id,
}) {
  const [options, setoptions] = useState([
    { id: 1, name: "Peporini", selectedTimes: 0 },
    { id: 2, name: "Cheese", selectedTimes: 0 },
    { id: 3, name: "Pineapple", selectedTimes: 0 },
    { id: 4, name: "Ham", selectedTimes: 0 },
  ]);

  return (
    <View
      style={[styles.container, style, openDropdown === id && { zIndex: 1000 }]}
    >
      <Text style={styles.lbl}>Toppings</Text>
      <View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            console.log("openDropdown", openDropdown, id);
            if (openDropdown === id) {
              setopenDropdown(null);
            } else {
              setopenDropdown(id);
            }
          }}
        >
          <Text style={styles.placeholder}>Select Toppings</Text>
          <Icon
            name={
              openDropdown === id ? "chevron-small-up" : "chevron-small-down"
            }
            style={styles.downIcon}
          ></Icon>
        </TouchableOpacity>
        {openDropdown === id && (
          <ScrollView
            style={{
              width: 352,
              position: "absolute",
              backgroundColor: "white",
              bottom: options.length > 3 ? -44 * 3 : -44 * options.length,
              height: options.length > 3 ? 44 * 3 : 44 * options.length,
            }}
          >
            {options.map((option, index) => (
              <View
                key={index}
                id={option.id}
                style={{
                  width: "100%",
                  height: 44,
                  backgroundColor: "white",
                  padding: 10,
                  borderWidth: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    let newOptions = [...options];
                    newOptions[index].selectedTimes =
                      newOptions[index].selectedTimes - 1;
                    setoptions(newOptions);
                  }}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Text>{option.name}</Text>
                  <TextInput
                    style={{
                      width: 40,
                      height: 30,
                      borderWidth: 1,
                      borderColor: "black",
                      margin: 10,
                    }}
                    value={option.selectedTimes.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      let newOptions = [...options];
                      newOptions[index].selectedTimes = text;
                      setoptions(newOptions);
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    let newOptions = [...options];
                    newOptions[index].selectedTimes++;
                    setoptions(newOptions);
                  }}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lbl: {
    fontWeight: "700",
    color: "#3e3f41",
  },
  dropdown: {
    width: 352,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6987d3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  placeholder: {
    fontWeight: "500",
    color: "#7f838c",
    fontSize: 12,
    margin: 10,
  },
  downIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    margin: 0,
    marginTop: 2,
    marginRight: 2,
  },
});

export default MultipleTimeSelectableOptionGroup;
