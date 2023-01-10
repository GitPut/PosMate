import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ListItem from "components/ListItem";

const MenuScreen = ({ section, products }) => {
  const sectionProducts = products.filter(
    (current) => current.category == section
  );

  return (
    <View style={styles.container}>
      {sectionProducts.map((item) => (
        <ListItem item={item} key={item.name} />
      ))}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 2,
    height: "100%",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});
