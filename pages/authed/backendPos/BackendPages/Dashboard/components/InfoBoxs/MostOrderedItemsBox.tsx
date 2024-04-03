import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropdownPeriod from "../DropdownPeriod";
import MostOrderItemsListItem from "../MostOrderItemsListItem";

const MostOrderedItemsBox = ({style}) => {
  return (
    <View style={[styles.mostOrderItemsContainer, style]}>
      <View style={styles.mostOrderedItemsInnerContainer}>
        <View style={styles.mostOrderedItemsHeaderRow}>
          <Text style={styles.mostOrderedItems}>Most Ordered Items</Text>
          <DropdownPeriod
            dropdownPeriodLbl="Today"
            style={styles.mostOrderedItemsDropdownPeriod}
          ></DropdownPeriod>
        </View>
        <View style={styles.mostOrderedItemsChartHeader}>
          <Text style={styles.itemsLbl}>Items</Text>
          <Text style={styles.ordersLbl}>Orders</Text>
        </View>
        <View style={styles.topItemsContainer}>
          <MostOrderItemsListItem style={styles.mostOrderItemsListItem1} />
          <MostOrderItemsListItem
            itemName="Veggie Pizza"
            itemNumOfOrders="50"
            style={styles.mostOrderItemsListItem2}
          />
          <MostOrderItemsListItem
            itemNumOfOrders="35"
            itemName="Pepsi"
            style={styles.mostOrderItemsListItem3}
          />
        </View>
      </View>
    </View>
  );
};

export default MostOrderedItemsBox;

const styles = StyleSheet.create({
  mostOrderItemsContainer: {
    width: 383,
    height: 350,
    borderWidth: 1,
    borderColor: "rgba(232,232,232,1)",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  mostOrderedItemsInnerContainer: {
    width: 326,
    height: '90%',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mostOrderedItemsHeaderRow: {
    width: 326,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mostOrderedItems: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  mostOrderedItemsDropdownPeriod: {
    height: 27,
    width: 84,
  },
  mostOrderedItemsChartHeader: {
    width: 326,
    height: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  itemsLbl: {
    fontWeight: "700",
    color: "#9ea0a6",
    fontSize: 13,
  },
  ordersLbl: {
    fontWeight: "700",
    color: "#9ea0a6",
    fontSize: 13,
  },
  topItemsContainer: {
    width: 326,
    height: 209,
    justifyContent: "space-between",
  },
  mostOrderItemsListItem1: {
    height: 70,
    width: 326,
  },
  mostOrderItemsListItem2: {
    height: 70,
    width: 326,
  },
  mostOrderItemsListItem3: {
    height: 70,
    width: 326,
  },
});
