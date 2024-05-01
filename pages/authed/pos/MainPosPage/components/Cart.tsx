import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import CartItem from "./cartOrder/CartItem";
import CartAmountDisplayRow from "./cartOrder/CartAmountDisplayRow";
import { MaterialIcons } from "@expo/vector-icons";
import CheckoutBtn from "./Cart/CheckoutBtn";
import {
  OrderDetailsState,
  ProductBuilderState,
  cartState,
  setCartState,
  setOrderDetailsState,
  storeDetailState,
} from "state/state";
import { posHomeState, updatePosHomeState } from "state/posHomeState";

const Cart = () => {
  const { discountAmount, deliveryChecked, cartSub, cartNote } =
    posHomeState.use();
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const { width, height } = useWindowDimensions();
  const [total, settotal] = useState(0);
  const isOnlineOrder = ProductBuilderState.use().isOnlineOrder;
  const orderDetails = OrderDetailsState.use();

  useEffect(() => {
    if (isOnlineOrder) {
      if (cart.length > 0) {
        let newVal = 0;
        for (let i = 0; i < cart.length; i++) {
          try {
            if (cart[i].quantity ?? 0 > 1) {
              newVal +=
                parseFloat(cart[i].price ?? "0") *
                parseFloat(cart[i].quantity ?? "1");
            } else {
              newVal += parseFloat(cart[i].price ?? "0");
            }
          } catch (error) {
            // console.log(error);
          }
        }
        if (orderDetails.delivery) {
          newVal += parseFloat(storeDetails.deliveryPrice);
        }

        updatePosHomeState({
          cartSub: newVal,
          deliveryChecked: orderDetails.delivery,
        });
      } else {
        updatePosHomeState({
          cartSub: 0,
          deliveryChecked: orderDetails.delivery,
        });
      }
    }
  }, [isOnlineOrder, cart, orderDetails]);

  useEffect(() => {
    if (cartSub > 0) {
      settotal(
        cartSub *
          (parseFloat(storeDetails.taxRate) >= 0
            ? 1 + parseFloat(storeDetails.taxRate) / 100
            : 1.13)
      );
    } else {
      settotal(0);
    }
  }, [cart, discountAmount, deliveryChecked, cartSub, cartNote, storeDetails]);

  return (
    <View
      style={[
        styles.cartContainer,
        width > 1300 ? { width: "30%" } : { width: "37%" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Text style={styles.myCartTxt}>My Cart</Text>
        {cart.length > 0 ? (
          <Pressable
            style={{
              borderRadius: 10,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1a2951",
            }}
            onPress={() => {
              setCartState([]);
              updatePosHomeState({ discountAmount: null });
            }}
          >
            <MaterialIcons name="clear" style={{ color: "white" }} size={30} />
          </Pressable>
        ) : (
          <View style={{ height: 40, width: 40 }} />
        )}
      </View>
      <View style={[styles.cartItems, { height: height * 0.4 }]}>
        {cart.length > 0 ? (
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.cartItems_contentContainerStyle}
          >
            {cart?.map((cartItem, index) => (
              <CartItem
                style={styles.cartItem1}
                key={index}
                cartItem={cartItem}
                index={index}
                removeAction={() => {
                  const local = structuredClone(cart);
                  local.splice(index, 1);
                  setCartState(local);
                }}
                decreaseAction={() => {
                  const local = structuredClone(cart);
                  const quantity = local[index].quantity ?? false;
                  if (quantity && parseFloat(quantity) > 1) {
                    local[index].quantity = (
                      parseFloat(quantity) - 1
                    ).toString();
                  } else {
                    local[index].quantity = "1";
                  }
                  setCartState(local);
                }}
                increaseAction={() => {
                  const local = structuredClone(cart);
                  const quantity = local[index].quantity ?? false;
                  local[index].quantity = (
                    quantity ? parseFloat(quantity) + 1 : 2
                  ).toString();
                  setCartState(local);
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/noItemsImg.png")}
              style={{
                width: 200,
                height: "80%",
                resizeMode: "contain",
              }}
              key={"noItemsImg"}
            />
          </View>
        )}
      </View>
      <View style={styles.totalsContainer}>
        <View style={styles.topGroupTotalsContainer}>
          <View>
            <TextInput
              placeholder="Write a note..."
              style={{
                height: 80,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
              multiline={true}
              value={cartNote ? cartNote : ""}
              onChangeText={(text) => {
                updatePosHomeState({ cartNote: text });
              }}
            />
            <View>
              <CartAmountDisplayRow
                amountValue={
                  discountAmount
                    ? discountAmount.includes("%")
                      ? discountAmount
                      : `$${discountAmount}`
                    : "N/A"
                }
                amountLbl="Discount"
                style={styles.discountRow}
              />
              {discountAmount && (
                <Pressable
                  style={{
                    borderRadius: 30,
                    height: 22,
                    width: 22,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    position: "absolute",
                    right: -35,
                  }}
                  onPress={() => {
                    updatePosHomeState({ discountAmount: null });
                  }}
                >
                  <MaterialIcons
                    name="clear"
                    style={{ color: "white" }}
                    size={20}
                  />
                </Pressable>
              )}
            </View>
          </View>
          {deliveryChecked && parseFloat(storeDetails.deliveryPrice) && (
            <CartAmountDisplayRow
              amountValue={`$${parseFloat(storeDetails.deliveryPrice).toFixed(
                2
              )}`}
              amountLbl="Delivery"
              style={styles.discountRow}
            />
          )}
          <CartAmountDisplayRow
            amountValue={
              deliveryChecked &&
              parseFloat(storeDetails.deliveryPrice) &&
              cartSub > 0
                ? `$${(
                    cartSub - parseFloat(storeDetails.deliveryPrice)
                  ).toFixed(2)}`
                : `$${cartSub.toFixed(2)}`
            }
            amountLbl="Subtotal"
            style={styles.subtotalRow}
          />
          <CartAmountDisplayRow
            amountValue={`$${(
              cartSub *
              (parseFloat(storeDetails.taxRate) >= 0
                ? parseFloat(storeDetails.taxRate) / 100
                : 0.13)
            ).toFixed(2)}`}
            amountLbl={`Tax (${
              parseFloat(storeDetails.taxRate) >= 0
                ? parseFloat(storeDetails.taxRate)
                : 13
            }%)`}
            style={styles.taxRow}
          />
        </View>
        <View style={styles.totalRowGroup}>
          <View style={styles.totalRow}>
            <Text style={styles.total2}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      {isOnlineOrder ? (
        <Pressable
          style={{
            width: 170,
            height: 48,
            backgroundColor: "#1a2951",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            opacity: cart.length < 1 ? 0.8 : 1,
          }}
          disabled={cart.length < 1}
          onPress={() => {
            const today = new Date();
            const transNum = Math.random().toString(36).substr(2, 9);

            if (orderDetails.delivery) {
              setOrderDetailsState({
                date: today,
                transNum: transNum,
                total: (
                  cartSub *
                  (storeDetails.taxRate
                    ? 1 + parseFloat(storeDetails.taxRate) / 100
                    : 1.13)
                ).toFixed(2),
                method: "deliveryOrder",
                online: true,
                cart: cart,
                page: 5,
              });
            } else {
              setOrderDetailsState({
                date: today,
                transNum: transNum,
                total: (
                  cartSub *
                  (storeDetails.taxRate
                    ? 1 + parseFloat(storeDetails.taxRate) / 100
                    : 1.13)
                ).toFixed(2),
                method: "pickupOrder",
                online: true,
                cart: cart,
                customer: {
                  ...orderDetails.customer,
                  address: null,
                },
                page: 5,
              });
            }
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: "rgba(255,255,255,1)",
              fontSize: 20,
            }}
          >
            Checkout
          </Text>
        </Pressable>
      ) : (
        <CheckoutBtn />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    width: "28%",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "center",
  },
  myCartTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 24,
    width: "90%",
    height: 29,
  },
  cartItems: {
    width: "90%",
  },
  cartItems_contentContainerStyle: {
    height: "100%",
    width: "100%",
  },
  cartItem1: {
    width: "100%",
    marginBottom: 10,
  },
  cartItem2: {
    width: "100%",
    marginBottom: 10,
  },
  cartItem3: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem4: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem5: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  totalsContainer: {
    width: "90%",
    height: 250,
    backgroundColor: "rgba(238,242,255,1)",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topGroupTotalsContainer: {
    width: 280,
    height: 120,
    justifyContent: "space-between",
  },
  discountRow: {
    height: 18,
    alignSelf: "stretch",
  },
  subtotalRow: {
    height: 18,
    alignSelf: "stretch",
  },
  taxRow: {
    height: 18,
    alignSelf: "stretch",
  },
  totalRowGroup: {
    width: 280,
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalRow: {
    flexDirection: "row",
    height: 18,
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  total2: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
  totalValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
  discountCodeBtn: {
    minWidth: 140,
    minHeight: 35,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  discountCode: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
});
