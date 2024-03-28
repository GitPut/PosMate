import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "state/firebaseConfig";

const OrderItem = ({
  key,
  prevOrder,
  prevOrderIndex,
  setOrderPickUp,
  setOrderDelivery,
  isDeliverable,
  removeCustomerOrder,
}) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.topOrderRow}>
        <Text style={styles.orderNumber}>Order #{prevOrderIndex + 1}</Text>
        <View style={styles.deliveryOrPickupRow}>
          <Pressable style={styles.pickupBtn} onPress={setOrderPickUp}>
            <MaterialIcons
              name="store-mall-directory"
              style={styles.pickupIcon}
            />
          </Pressable>
          {isDeliverable && (
            <Pressable style={styles.deliveryBtn} onPress={setOrderDelivery}>
              <MaterialIcons
                name="directions-car"
                style={styles.deliveryIcon}
              />
            </Pressable>
          )}
          <Pressable style={styles.deleteBtn} onPress={removeCustomerOrder}>
            <MaterialIcons name="close" style={styles.deleteIcon} />
          </Pressable>
        </View>
      </View>
      {prevOrder.cart?.map((cartItem, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>{cartItem.name}</Text>
          <Text style={styles.itemPrice}>
            ${parseFloat(cartItem.price).toFixed(2)}
          </Text>
          <Text style={styles.itemQty}>
            Qty: {cartItem.quantity ? cartItem.quantity : 1}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    width: 439,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  topOrderRow: {
    width: 439,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  orderNumber: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  deliveryOrPickupRow: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickupBtn: {
    width: 35,
    height: 35,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  pickupIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  deliveryBtn: {
    width: 35,
    height: 35,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  deliveryIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  deleteBtn: {
    width: 35,
    height: 35,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  itemContainer: {
    width: 439,
    height: 53,
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemName: {
    color: "#121212",
    fontSize: 15,
    flex: 4,
    marginLeft: 15,
  },
  itemPrice: {
    color: "#03c551",
    fontSize: 15,
    flex: 1,
  },
  itemQty: {
    color: "#121212",
    fontSize: 15,
    flex: 1,
  },
});

export default OrderItem;
