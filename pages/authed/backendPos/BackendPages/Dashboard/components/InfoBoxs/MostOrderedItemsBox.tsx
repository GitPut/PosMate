import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import DropdownPeriod from "../DropdownPeriod";
import MostOrderItemsListItem from "../MostOrderItemsListItem";

interface MostOrderedItemsObject {
  name: string;
  orders: number;
  imageUrl: string;
}

interface MostOrderedItemsBoxProps {
  style: ViewStyle;
  period: string;
  setperiod: (period: string) => void;
  details: MostOrderedItemsObject[];
}

const MostOrderedItemsBox = ({
  style,
  period,
  setperiod,
  details,
}: MostOrderedItemsBoxProps) => {
  return (
    <View style={[styles.mostOrderItemsContainer, style]}>
      <View style={styles.mostOrderedItemsInnerContainer}>
        <View style={styles.mostOrderedItemsHeaderRow}>
          <Text style={styles.mostOrderedItems}>Most Ordered Items</Text>
          <DropdownPeriod value={period} setValue={setperiod} />
        </View>
        <View style={styles.mostOrderedItemsChartHeader}>
          <Text style={styles.itemsLbl}>Items</Text>
          <Text style={styles.ordersLbl}>Orders</Text>
        </View>
        <View style={styles.topItemsContainer}>
          {details.map((item) => (
            <MostOrderItemsListItem
              key={item.name}
              itemName={item.name}
              itemNumOfOrders={item.orders.toString()}
              imageUrl={item.imageUrl}
            />
          ))}
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
    height: "90%",
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
    height: 240,
    justifyContent: "space-between",
    marginTop: 10,
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
