import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

function CategoryBtn(props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props?.style,
        props.isSelected
          ? { backgroundColor: "rgba(29,41,78,1)" }
          : { backgroundColor: "#f9fafc" },
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.categoryLbl,
          props.isSelected ? { color: "white" } : { color: "rgba(0,0,0,1)" },
        ]}
      >
        {props.category ? props.category : "Placeholder"}
      </Text>
      <Image
        source={require("../../assets/images/image_HuEF..png")}
        resizeMode="contain"
        style={styles.categoryImg}
      ></Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryLbl: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    margin: "null",
    textAlign: "center",
  },
  categoryImg: {
    height: 96,
    width: 95,
    marginTop: 0,
    marginBottom: 0,
    margin: "null",
  },
});

export default CategoryBtn;
