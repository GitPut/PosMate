import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth, db } from "state/firebaseConfig";
import Print from "./Print";
import {
  cartState,
} from "state/state";
import { posHomeState, resetPosHomeState, updatePosHomeState } from "state/posHomeState";

const CheckoutBtn = () => {
  const {
    deliveryChecked,
    ongoingDelivery,
    updatingOrder,
  } = posHomeState.use();
  const cart = cartState.use();

  if (updatingOrder) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Pressable
          style={styles.checkoutBtn}
          disabled={cart.length < 1}
          onPress={() => {
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(updatingOrder.id)
              .delete();

            Print({
              method: deliveryChecked ? "deliveryOrder" : "pickupOrder",
              dontAddToOngoing: false,
            });
            // setOngoingDelivery(null);
            // setName("");
            // setPhone("");
            // setAddress(null);
            // setDeliveryChecked(false);
            // setupdatingOrder(false);
            // setsavedCustomerDetails(null);
            // setDiscountAmount(null);
          }}
        >
          <Text style={styles.checkoutLbl}>Update</Text>
        </Pressable>
        <Pressable
          style={[styles.checkoutBtn, { backgroundColor: "red" }]}
          onPress={() => {
            // setCartState([]);
            // setName("");
            // setPhone("");
            // setAddress(null);
            // setDeliveryChecked(false);
            // setOngoingDelivery(null);
            // setupdatingOrder(false);
            // setsavedCustomerDetails(null);
            // setDiscountAmount(null);
            // setBuzzCode("");
            // setUnitNumber("");
            // setcartNote(null);
            resetPosHomeState();
          }}
        >
          <Text style={styles.checkoutLbl}>Cancel</Text>
        </Pressable>
      </View>
    );
  }

  if (!ongoingDelivery) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Pressable
          style={styles.checkoutBtn}
          onPress={() => {
            updatePosHomeState({ cashModal: true });
          }}
          disabled={cart.length < 1 || ongoingDelivery}
        >
          <Text style={styles.checkoutLbl}>Cash</Text>
        </Pressable>
        <Pressable
          style={styles.checkoutBtn}
          onPress={() => {
            Print({
              method: "Card",
              dontAddToOngoing: false,
            });
          }}
          disabled={cart.length < 1 || ongoingDelivery}
        >
          <Text style={styles.checkoutLbl}>Card</Text>
        </Pressable>
      </View>
    );
  }
  if (ongoingDelivery && cart.length > 0) {
    return (
      <Pressable
        style={styles.checkoutBtn}
        onPress={() => {
          Print({
            method: deliveryChecked ? "deliveryOrder" : "pickupOrder",
            dontAddToOngoing: false,
          });
          // setOngoingDelivery(null);
          // setName("");
          // setPhone("");
          // setAddress(null);
          // setDeliveryChecked(false);
          // setDiscountAmount(null);
        }}
      >
        <Text style={styles.checkoutLbl}>Checkout</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={styles.checkoutBtn}
        onPress={() => {
          // setOngoingDelivery(null);
          // setDeliveryChecked(false);
          // setName(null);
          // setPhone(null);
          // setAddress(null);
          // setChangeDue(null);
          // setDiscountAmount(null);
          resetPosHomeState()
        }}
      >
        <Text style={styles.checkoutLbl}>Cancel</Text>
      </Pressable>
    );
  }
};

export default CheckoutBtn;

const styles = StyleSheet.create({
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
