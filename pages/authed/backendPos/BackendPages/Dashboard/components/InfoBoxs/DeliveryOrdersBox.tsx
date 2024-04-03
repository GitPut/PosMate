import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropdownPeriod from '../DropdownPeriod';
import RevenueBox from '../RevenueBox';
import OrdersBox from '../OrdersBox';

const DeliveryOrdersBox = () => {
  return (
    <View style={styles.deliveryOrdersContainer}>
      <View style={styles.deliveryOrdersInnerContainer}>
        <View style={styles.deliveryOrdersHeaderRow}>
          <Text style={styles.deliveryOrders}>Delivery Orders</Text>
          <DropdownPeriod
            dropdownPeriodLbl="Weekly"
            style={styles.deliveryOrdersDropdownPeriod}
          />
        </View>
        <View style={styles.deliveryOrdersRevAndOrdersContainer}>
          <RevenueBox
            revenueValue="$440"
            style={styles.revenueBox1}
          />
          <OrdersBox ordersValue="25" style={styles.ordersBox1} />
        </View>
      </View>
    </View>
  );
}

export default DeliveryOrdersBox

const styles = StyleSheet.create({
  deliveryOrdersContainer: {
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
  deliveryOrdersInnerContainer: {
    width: 347,
    height: 126,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  deliveryOrdersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  deliveryOrders: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  deliveryOrdersDropdownPeriod: {
    height: 27,
    width: 84,
  },
  deliveryOrdersRevAndOrdersContainer: {
    width: 347,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  revenueBox1: {
    height: 65,
    width: 165,
  },
  ordersBox1: {
    height: 65,
    width: 165,
  },
});