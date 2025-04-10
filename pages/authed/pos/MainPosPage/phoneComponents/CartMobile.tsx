import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import Modal from "react-native-modal-web";
import {
  OrderDetailsState,
  ProductBuilderState,
  cartState,
  setCartState,
  setOrderDetailsState,
  storeDetailState,
} from "state/state";
import CartAmountDisplayRow from "pages/authed/pos/MainPosPage/components/cartOrder/CartAmountDisplayRow";
import CartItem from "pages/authed/pos/MainPosPage/components/cartOrder/CartItem";
import { Feather } from "@expo/vector-icons";
import { updatePosHomeState } from "state/posHomeState";
import firebase from "firebase/compat/app";

interface CartMobileProps {
  cartOpen: boolean;
  setcartOpen: (arg: boolean) => void;
  cartSub: number;
}

const CartMobile = ({ cartOpen, setcartOpen, cartSub }: CartMobileProps) => {
  const { height, width } = useWindowDimensions();
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const orderDetails = OrderDetailsState.use();
  const isOnlineOrder = ProductBuilderState.use().isOnlineOrder;

  useEffect(() => {
    if (isOnlineOrder) {
      if (cart.length > 0) {
        let newVal = 0;
        for (let i = 0; i < cart.length; i++) {
          try {
            if (cart[i].quantity ?? 0 > 1) {
              newVal +=
                parseFloat(cart[i].price) * parseFloat(cart[i].quantity ?? "1");
              // console.log("Cart item quantity ", cart[i].quantity);
            } else {
              newVal += parseFloat(cart[i].price);
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

  return (
    <Modal
      isVisible={cartOpen}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0}
      style={{
        margin: 0,
      }}
    >
      <View
        style={{
          width: width,
          height: height,
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Pressable
            onPress={() => {
              setcartOpen(false);
            }}
          >
            <Feather
              onPress={() => {
                setcartOpen(false);
              }}
              name="chevron-down"
              style={{ color: "grey" }}
              size={40}
            />
          </Pressable>
          <View
            style={{
              backgroundColor: "#1D294E",
              borderRadius: 10,
              justifyContent: "space-between",
              alignItems: "center",
              width: 80,
              height: 40,
              flexDirection: "row",
              padding: 15,
            }}
          >
            <Feather
              name="shopping-cart"
              style={{ color: "white" }}
              size={22}
            />
            <Text style={{ color: "white", fontSize: 20 }}>{cart.length}</Text>
          </View>
        </View>
        <Text style={styles.myCartTxt}>My Cart</Text>
        {cart.length > 0 ? (
          <View style={styles.cartItems}>
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
                      setCartState(local);
                    }
                  }}
                  increaseAction={() => {
                    const local = structuredClone(cart);
                    const quantity = local[index].quantity ?? false;
                    if (quantity) {
                      local[index].quantity = (
                        parseFloat(quantity) + 1
                      ).toString();
                    } else {
                      local[index].quantity = "2";
                    }
                    setCartState(local);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <Image
            source={require("../assets/images/noItemsImg.png")}
            style={{ width: 200, height: "35%", resizeMode: "contain" }}
            key={"noItemsImg"}
          />
        )}
        <View style={[styles.totalsContainer, { height: 150 }]}>
          <View style={styles.topGroupTotalsContainer}>
            {orderDetails.delivery &&
              parseFloat(storeDetails.deliveryPrice) && (
                <CartAmountDisplayRow
                  amountValue={`$${parseFloat(
                    storeDetails.deliveryPrice
                  ).toFixed(2)}`}
                  amountLbl="Delivery"
                  style={styles.discountRow}
                />
              )}
            <CartAmountDisplayRow
              amountValue={
                orderDetails.delivery &&
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
                (storeDetails.taxRate
                  ? parseFloat(storeDetails.taxRate) / 100
                  : 0.13)
              ).toFixed(2)}`}
              amountLbl="Tax"
              style={styles.taxRow}
            />
            <View style={styles.totalRow}>
              <Text style={styles.total2}>Total</Text>
              <Text style={styles.totalValue}>
                $
                {(
                  Math.ceil(
                    cartSub *
                      (storeDetails.taxRate
                        ? 1 + parseFloat(storeDetails.taxRate) / 100
                        : 1.13) *
                      10
                  ) / 10
                ).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={[
            styles.checkoutBtn,
            { margin: 20 },
            cart.length < 1 && { opacity: 0.8 },
          ]}
          disabled={cart.length < 1}
          onPress={() => {
            const today = firebase.firestore.Timestamp.now();
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
              setcartOpen(false);
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
              setcartOpen(false);
            }
          }}
        >
          <Text style={styles.checkoutLbl}>Checkout</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CartMobile;

const styles = StyleSheet.create({
  myCartTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 24,
    width: "90%",
    height: 29,
  },
  cartItems: {
    width: "90%",
    height: "40%",
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
    height: 85,
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
    height: 66,
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
    minWidth: 120,
    minHeight: 32,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  discountCode: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  checkoutBtn: {
    width: 170,
    height: 48,
    backgroundColor: "#1a2951",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutLbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
});
