import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { setProductBuilderState } from "state/state";
import { CartItemProp } from "types/global";

interface CartItemProps {
  cartItem: CartItemProp;
  index: number;
  removeAction: () => void;
  decreaseAction: () => void;
  increaseAction: () => void;
  style?: ViewStyle;
}

function CartItem({
  cartItem,
  index,
  removeAction,
  decreaseAction,
  increaseAction,
  style,
}: CartItemProps) {
  const [isOpen, setisOpen] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.topRowWithImgContainer,
          isOpen && { paddingTop: 15, marginBottom: 30 },
        ]}
        onPress={() => {
          cartItem.options.length > 0 && setisOpen((prev) => !prev);
        }}
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
            key={cartItem.id}
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
              {parseFloat(cartItem.quantity ?? "1")}
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
              <Pressable
                style={styles.cartItemEditBtn}
                onPress={() => {
                  if (!cartItem.editableObj) return;
                  setProductBuilderState({
                    product: {
                      name: cartItem.editableObj.name,
                      price: cartItem.editableObj.price,
                      description: cartItem.editableObj.description,
                      options: cartItem.editableObj.options,
                      total: cartItem.editableObj.price,
                      extraDetails: cartItem.editableObj.extraDetails,
                      id: cartItem.editableObj.id,
                    },
                    itemIndex: index,
                    imageUrl: cartItem.imageUrl ? cartItem.imageUrl : null,
                    isOpen: true,
                  });
                }}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  style={styles.pencilIcon}
                />
              </Pressable>
            )}
            <Pressable
              style={styles.cartItemDecreaseBtn}
              onPress={() => {
                if (parseFloat(cartItem.quantity ?? "0") === 1) {
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
              <Text
                key={key}
                // style={styles.optionTxt}
              >
                {option}
              </Text>
            ))}
          {cartItem.description && (
            <Text
            // style={styles.optionTxt}
            >
              Description: {cartItem.description}
            </Text>
          )}
          {cartItem.extraDetails && (
            <Text
            // style={styles.optionTxt}
            >
              Written Note: {cartItem.extraDetails}
            </Text>
          )}
        </View>
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
