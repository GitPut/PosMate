import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { userStoreState } from "state/state";
import DisplayTest from "components/DisplayTest";

const MenuScreen = ({ section, catalog }) => {
  const InnerBlock = () => {
    if (catalog.products) {
      if (catalog.products.length > 0) {
        if (!section) {
          return catalog.products
            .filter((e) => e.catagory === catalog.categories[0])
            .map((product, index) => (
              <DisplayTest product={product} productIndex={index} key={index} />
            ));
        } else {
          return catalog.products
            .filter((e) => e.catagory === section)
            .map((product, index) => (
              <DisplayTest product={product} productIndex={index} key={index} />
            ));
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <InnerBlock />
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
