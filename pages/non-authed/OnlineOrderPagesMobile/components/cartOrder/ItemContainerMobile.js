import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addCartState, cartState } from "state/state";
import ProductImage from "components/ProductImage";
import ProductBuilderModal from "../ProductBuilderModal/ProductBuilderModal";

function ItemContainerMobile({ product, style }) {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;
  const cart = cartState.use();
  const screenWidth = useWindowDimensions().width;

  const fadeIn = () => {
    // Will change xPos value to 0 in 3 seconds
    setshowProductScreen(true);
    Animated.timing(xPos, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(shadowOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(shadowOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(xPos, {
      toValue: -1000,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setshowProductScreen(false));
  };

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
          <ProductImage
            source={{ uri: product.imageUrl }}
            resizeMode="contain"
            style={styles?.itemImg}
          />
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
          <TouchableOpacity style={styles?.openBtn}>
            <MaterialCommunityIcons
              name="plus"
              style={styles?.plusIcon}
              onPress={() => {
                if (product.options.length > 0) {
                  // navigation.navigate("Product Listing", { product: product });
                  // setshowProductScreen(true);
                  fadeIn();
                } else {
                  addCartState(
                    {
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      options: [],
                      extraDetails: null,
                      imageUrl: null,
                    },
                    cart
                  );
                }
              }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View>
      {showProductScreen && (
        <Modal transparent={true}>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
              position: "absolute",
              height: "100%",
              width: "100%",
              bottom: 0,
              left: xPos,
              zIndex: 0,
            }}
          >
            <View
              style={[
                screenWidth > 1250
                  ? {
                      height: "100%",
                      width: "72%",
                      borderTopRightRadius: 3,
                    }
                  : {
                      height: "100%",
                      width: "100%",
                      borderTopRightRadius: 3,
                    },
              ]}
            >
              <ProductBuilderModal
                product={product}
                goBack={() => fadeOut()}
                imageUrl={product.imageUrl}
              />
            </View>
          </Animated.View>
        </Modal>
      )}
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
    fontSize: 18,
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
