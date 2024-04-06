import React, { Component, useRef, useState } from "react";
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
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ProductBuilderModal from "../ProductBuilderModal/ProductBuilderModal";

function CartItem({
  cartItem,
  index,
  removeAction,
  decreaseAction,
  increaseAction,
  style,
}) {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;
  const [isOpen, setisOpen] = useState(false);
  const { width } = useWindowDimensions();

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
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.topRowWithImgContainer,
          isOpen && { paddingTop: 15, marginBottom: 30 },
        ]}
        onPress={() =>
          cartItem.options.length > 0 && setisOpen((prev) => !prev)
        }
        activeOpacity={0.8}
      >
        {cartItem.imageUrl && (
          <Image
            source={
              cartItem.imageUrl
                ? { uri: cartItem.imageUrl }
                : require("../../assets/images/image_t93e..png")
            }
            resizeMode="contain"
            style={styles.cartItemImg}
          />
        )}
        <View
          style={[
            styles.group,
            !cartItem.imageUrl && {
              width: "100%",
            },
          ]}
        >
          <View style={[styles.topRowTxt]}>
            <Text style={styles.cartItemQuantity}>
              {cartItem.quantity ? cartItem.quantity : 1}
            </Text>
            <View style={styles.xPlusNameGroup}>
              <Text style={styles.txtX}>x</Text>
              <Text style={styles.veggiePizza}>{cartItem.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles.cartItemPrice}>
                ${parseFloat(cartItem.price).toFixed(2)}
              </Text>
              <Text style={[styles.cartItemPrice, { fontSize: 8 }]}>/EA.</Text>
            </View>
          </View>

          <View style={styles.bottomBtnRow}>
            {!cartItem.editableObj && <View />}
            {cartItem.editableObj && (
              <Pressable style={styles.cartItemEditBtn} onPress={fadeIn}>
                <MaterialCommunityIcons
                  name="pencil"
                  style={styles.pencilIcon}
                />
              </Pressable>
            )}
            <Pressable
              style={styles.cartItemDecreaseBtn}
              onPress={() => {
                if (cartItem.quantity < 2 || !cartItem.quantity) {
                  removeAction();
                } else {
                  decreaseAction();
                }
              }}
            >
              <Entypo name="minus" style={styles.minusIcon} />
            </Pressable>
            <Pressable
              style={styles.cartItemIncreaseBtn}
              onPress={increaseAction}
            >
              <Entypo name="plus" style={styles.plusIcon} />
            </Pressable>
          </View>
        </View>
      </Pressable>
      {isOpen && (
        <View
          style={{
            width: "90%",
            padding: 15,
            backgroundColor: "rgba(238,242,255,1)",
            borderRadius: 20,
          }}
        >
          {cartItem.options &&
            cartItem.options.map((option, key) => (
              <Text key={key} style={styles.optionTxt}>
                {option}
              </Text>
            ))}
          {cartItem.description && (
            <Text style={styles.optionTxt}>
              Description: {cartItem.description}
            </Text>
          )}
          {cartItem.extraDetails && (
            <Text style={styles.optionTxt}>
              Written Note: {cartItem.extraDetails}
            </Text>
          )}
        </View>
      )}
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
                width > 1400
                  ? {
                      height: "100%",
                      width: "70%",
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
                product={cartItem.editableObj}
                itemIndex={index}
                goBack={() => fadeOut()}
                imageUrl={cartItem.imageUrl ? cartItem.imageUrl : null}
              />
            </View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(238,242,255,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
  },
  topRowWithImgContainer: {
    width: "90%",
    height: 61,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cartItemImg: {
    height: 61,
    width: 61,
    resizeMode: "contain",
  },
  group: {
    width: "80%",
    height: 33,
    alignItems: "flex-end",
  },
  topRowTxt: {
    width: "95%",
    height: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },
  cartItemQuantity: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
  },
  xPlusNameGroup: {
    width: "60%",
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  txtX: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 16,
    marginRight: 10,
  },
  veggiePizza: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 17,
  },
  cartItemPrice: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 18,
  },
  bottomBtnRow: {
    width: 120,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cartItemIncreaseBtn: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  plusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  cartItemDecreaseBtn: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  minusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  cartItemEditBtn: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  pencilIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 20,
  },
});

export default CartItem;
