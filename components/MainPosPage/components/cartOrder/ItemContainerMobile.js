import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Animated,
  Modal,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addCartState, cartState } from "state/state";
import ProductImage from "components/ProductImage";

function ItemContainerMobile({ product, style, setshowProduct }) {
  const cart = cartState.use();

  return (
    <div id={product.id}>
      <View
        style={[
          {
            backgroundColor: "#ffffff",
            borderRadius: 20,
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
          },
          style,
        ]}
      >
        {product.hasImage && (
          <View>
            <ProductImage
              source={{ uri: product.imageUrl }}
              resizeMode="contain"
              style={styles?.itemImg}
            />
          </View>
        )}
        <Text style={styles?.familyCombo}>
          {product.name ? product.name : "Placeholder"}
        </Text>
        <View
          style={[
            {
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: 10,
            },
          ]}
        >
          <Text style={styles?.price}>
            ${product.price ? product.price : "Placeholder"}
          </Text>
          <Pressable style={styles?.openBtn}>
            <MaterialCommunityIcons
              name="plus"
              style={styles?.plusIcon}
              onPress={() => {
                if (product.options.length > 0) {
                  // navigation.navigate("Product Listing", { product: product });
                  // setshowProductScreen(true);
                  setshowProduct(product);
                } else {
                  addCartState(
                    {
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      options: [],
                      extraDetails: null,
                      imageUrl: product.imageUrl ? product.imageUrl : null,
                    },
                    cart
                  );
                }
              }}
            ></MaterialCommunityIcons>
          </Pressable>
        </View>
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemImg: {
    height: 100,
    width: 120,
    margin: 6,
  },
  rightSide: {
    width: "40%",
    justifyContent: "space-between",
    margin: 6,
    alignSelf: "stretch",
    marginTop: 12,
    marginRight: 11,
  },
  familyCombo: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 18,
  },
  openBtnRow: {
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  openBtn: {
    width: 35,
    height: 32,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
});

export default ItemContainerMobile;
