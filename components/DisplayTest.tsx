import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { userStoreState } from "state/state";
import { Button, TextInput } from "@react-native-material/core";
import { addCartState } from "state/state";
import ProductOptionDropDown from "./ProductOptionDropDown";

const DisplayTest = ({ navigation, product, productIndex }) => {
  return (
    <Button
      key={productIndex}
      title={product.name}
      onPress={() => {
        if (product.options.length > 0) {
          navigation.navigate("Product Listing", { product: product })
        }
        else {
          addCartState({
            name: product.name,
            price: product.price,
            description: product.description,
            options: [],
            extraDetails: null,
          });
      }
      }
      }
      contentContainerStyle={styles.touchable}
      style={styles.touchable}
    />
  );
};

export default DisplayTest;

const styles = StyleSheet.create({
  touchable: {
    margin: 25,
    width: 300,
    height: 80,
    backgroundColor: "rgba(125,126,132,1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
