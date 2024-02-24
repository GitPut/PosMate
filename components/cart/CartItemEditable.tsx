import { View, Text, Modal } from "react-native";
import React, { useRef, useState } from "react";
import { Animated } from "react-native";
import CartItem from "./CartItem";
import ProductListing from "../product/ProductListing";

const CartItemEditable = ({
  cartItem,
  index,
  removeAction,
  decreaseAction, 
  increaseAction,
}) => {
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
      <CartItem
        cartItem={cartItem}
        index={index}
        isPrev={false}
        removeAction={removeAction}
        decreaseAction={decreaseAction}
        increaseAction={increaseAction}
        editAction={() => fadeIn()}
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
                height: "100%",
                width: "70%",
                borderTopRightRadius: 3,
              }}
            >
              <ProductListing
                product={cartItem.editableObj}
                itemIndex={index}
                goBack={() => fadeOut()}
              />
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
        </Modal>
      )}
    </>
  );
};

export default CartItemEditable;
