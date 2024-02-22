import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function DropdownSelectableOption({
  style,
  setopenDropdown,
  openDropdown,
  id,
}) {
  const [val, setval] = useState(null);

  const options = [
    { id: 1, name: "Thin" },
    { id: 2, name: "Thick" },
    { id: 3, name: "Stuffed" },
    { id: 4, name: "Gluten Free" },
    { id: 5, name: "Cauliflower" },
  ];

  return (
    <View
      style={[styles.container, style, openDropdown === id && { zIndex: 1000 }]}
    >
      <Text style={styles.lbl}>Crust</Text>
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
          <Text style={styles.placeholder}>{val ? val : "Select"}</Text>
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
              <TouchableOpacity
                key={index}
                id={option.id}
                onPress={() => {
                  setval(option.name);
                  setopenDropdown(null);
                }}
                style={{
                  width: "100%",
                  height: 44,
                  backgroundColor: "white",
                  padding: 10,
                  borderWidth: 1,
                }}
              >
                <Text>{option.name}</Text>
              </TouchableOpacity>
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

export default DropdownSelectableOption;
