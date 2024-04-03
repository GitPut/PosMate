import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropdownPeriod from '../DropdownPeriod';
import RevenueBox from '../RevenueBox';
import OrdersBox from '../OrdersBox';

const InStoreOrdersBox = () => {
  return (
    <View style={styles.inStoreOrdersContainer}>
      <View style={styles.inStoreOrdersInnerContainer}>
        <View style={styles.inStoreOrdersHeaderRow}>
          <Text style={styles.inStoreOrders}>In-Store Orders</Text>
          <DropdownPeriod
            dropdownPeriodLbl="Monthly"
            style={styles.inStoreOrdersDropdownPeriod}
          />
        </View>
        <View style={styles.inStoreOrdersRevAndOrdersContainer}>
          <RevenueBox
            revenueValue="$11,135"
            style={styles.revenueBox2}
          />
          <OrdersBox ordersValue="155" style={styles.ordersBox2} />
        </View>
      </View>
    </View>
  );
}

export default InStoreOrdersBox

const styles = StyleSheet.create({
  inStoreOrdersContainer: {
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
  inStoreOrdersInnerContainer: {
    width: 347,
    height: 126,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inStoreOrdersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inStoreOrders: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  inStoreOrdersDropdownPeriod: {
    height: 27,
    width: 84,
  },
  inStoreOrdersRevAndOrdersContainer: {
    width: 347,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  revenueBox2: {
    height: 65,
    width: 165,
  },
  ordersBox2: {
    height: 65,
    width: 165,
  },
});