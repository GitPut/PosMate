import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { userStoreState } from "state/state";
import { Button, TextInput } from "@react-native-material/core";
import { addCartState } from "state/state";
import ProductOptionDropDown from "./ProductOptionDropDown";
import ProductListing from "./ProductListing";

const ProductDisplayBtn = ({ navigation, product, productIndex }) => {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change xPos value to 0 in 3 seconds
    setshowProductScreen(true);
    Animated.timing(xPos, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(shadowOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(shadowOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(xPos, {
      toValue: -1000,
      duration: 100,
      useNativeDriver: false,
    }).start(() => setshowProductScreen(false));
  };

  return (
    <>
      <Button
        key={productIndex}
        title={product.name}
        onPress={() => {
          if (product.options.length > 0) {
            // navigation.navigate("Product Listing", { product: product });
            // setshowProductScreen(true);
            fadeIn();
          } else {
            addCartState({
              name: product.name,
              price: product.price,
              description: product.description,
              options: [],
              extraDetails: null,
            });
          }
        }}
        contentContainerStyle={styles.touchable}
        style={styles.touchable}
      />
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
              style={{
                height: "92%",
                width: "70%",
                borderTopRightRadius: 3,
              }}
            >
              <ProductListing product={product} goBack={() => fadeOut()} />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              height: "100%",
              width: "30%",
              padding: 20,
              shadowColor: "rgba(0,0,0,1)",
              shadowOffset: {
                width: -3,
                height: 3,
              },
              elevation: 30,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              position: "absolute",
              opacity: shadowOpacity,
              right: 0,
              bottom: 0,
            }}
          />
          <Animated.View
            style={{
              height: "8%",
              width: "70%",
              padding: 20,
              shadowColor: "rgba(0,0,0,1)",
              shadowOffset: {
                width: -3,
                height: 3,
              },
              elevation: 30,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              position: "absolute",
              opacity: shadowOpacity,
              left: 0,
              top: 0,
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductDisplayBtn;

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
