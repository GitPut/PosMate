import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { addCartState } from "state/state";
import { Button } from "@react-native-material/core";
import Ps from "./Ps";
import Dp from "./Dp";
import Ff from "./Ff";
import Pw from "./Pw";

const ComboScreen = () => {
  return (
    <View style={styles.container}>
      <Ps />
      <Pw />
      <Dp />
      <Ff />
    </View>
  );
};

export default ComboScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
