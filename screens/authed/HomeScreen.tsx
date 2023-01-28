import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import { Button } from "@react-native-material/core";
import { sectionState, userStoreState } from "state/state";
import { auth } from "state/firebaseConfig";

const HomeScreen = () => {
  const catalog = userStoreState.use();
   const section = sectionState.use();

  const Screen = () => {
    return (
      <View style={{ flexDirection: "row", height: "100%" }}>
        <MenuScreen catalog={catalog} section={section} />
        <CartScreen />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Screen />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
