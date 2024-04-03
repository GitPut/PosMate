import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropdownPeriod from '../DropdownPeriod';
import RevenueBox from '../RevenueBox';
import OrdersBox from '../OrdersBox';

const PickupOrdersBox = () => {
  return (
    <View style={styles.pickupOrdersContainer}>
      <View style={styles.pickupOrdersInnerContainer}>
        <View style={styles.pickupOrdersHeaderRow}>
          <Text style={styles.pickupOrders}>Pickup Orders</Text>
          <DropdownPeriod
            dropdownPeriodLbl="Today"
            style={styles.pickupOrdersDropdownPeriod}
          />
        </View>
        <View style={styles.pickupOrdersRevAndOrdersContainer}>
          <RevenueBox
            revenueValue="$270"
            style={styles.revenueBox}
          />
          <OrdersBox style={styles.ordersBox} />
        </View>
      </View>
    </View>
  );
}

export default PickupOrdersBox

const styles = StyleSheet.create({
  pickupOrdersContainer: {
    width: 383,
    height: 158,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  pickupOrdersInnerContainer: {
    width: 347,
    height: 126,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pickupOrdersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pickupOrders: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  pickupOrdersDropdownPeriod: {
    height: 27,
    width: 84,
  },
  pickupOrdersRevAndOrdersContainer: {
    width: 347,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  revenueBox: {
    height: 65,
    width: 165,
  },
  ordersBox: {
    height: 65,
    width: 165,
  },
});