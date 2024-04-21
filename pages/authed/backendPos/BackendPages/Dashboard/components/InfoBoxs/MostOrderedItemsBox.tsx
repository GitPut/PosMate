import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownPeriod from "../DropdownPeriod";
import MostOrderItemsListItem from "../MostOrderItemsListItem";
import { userStoreState } from "state/state";
import SearchDate from "components/functional/SearchDateFunction";
import { TransListStateItem } from "types/global";

interface MostOrderedItemsObject {
  name: string;
  orders: number;
  imageUrl: string;
}

interface MostOrderedItemsBoxProps {
  style: ViewStyle;
  allTransactions: TransListStateItem[];
}

const MostOrderedItemsBox = ({ style, allTransactions }: MostOrderedItemsBoxProps) => {
  const [period, setperiod] = useState("Today");
  const [mostOrderProducts, setmostOrderProducts] = useState<
    MostOrderedItemsObject[]
  >([]);
  const catalog = userStoreState.use();

  useEffect(() => {
    const getDateRange = (period: string) => {
      const today = new Date();
 const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
       const yearStart = new Date(today.getFullYear(), 0, 1);
       const yearEnd = new Date(today.getFullYear(), 11, 31);

      switch (period) {
        case "Today":
          return {
            start: new Date().toDateString(),
            end: new Date().toDateString(),
          };
        case "This Week":
          return {
            start: weekStart.toDateString(),
            end: weekEnd.toDateString(),
          };
        case "This Month":
          return {
            start: monthStart.toDateString(),
            end: monthEnd.toDateString(),
          };
        case "This Year":
          return {
            start: yearStart.toDateString(),
            end: yearEnd.toDateString(),
          };
        default:
          // Assuming you want to default to "All Time" with no filtering.
          return null;
      }
    };

    const dateRange = getDateRange(period);
    let filteredTransactions;

    if (dateRange) {
      const { start, end } = dateRange;
      filteredTransactions = SearchDate({
        startDate: start,
        endDate: end,
        transactions: allTransactions,
      });
    } else {
      // No date filtering for "All Time" or unspecified periods
      filteredTransactions = allTransactions;
    }

    const calculateMostOrderedItems = (transactions: TransListStateItem[]) => {
      const mostOrderedItems = {};
      transactions.forEach((transaction) => {
        transaction.cart?.forEach((item) => {
          if (mostOrderedItems[item.name]) {
            mostOrderedItems[item.name] += 1;
          } else {
            mostOrderedItems[item.name] = 1;
          }
        });
      });
      const sortedItems = Object.entries(mostOrderedItems).sort(
        (a, b) => b[1] - a[1]
      );
      return sortedItems.slice(0, 3).map((item) => {
        return {
          name: item[0],
          orders: item[1],
          imageUrl: catalog.products[
            catalog.products.findIndex((product) => product.name === item[0])
          ]?.imageUrl
            ? catalog.products[
                catalog.products.findIndex(
                  (product) => product.name === item[0]
                )
              ]?.imageUrl
            : "https://via.placeholder.com/50",
        };
      });
    };

    const calculated = calculateMostOrderedItems(filteredTransactions);

    setmostOrderProducts(calculated);
  }, [period, allTransactions]);

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
          {mostOrderProducts.map((item, index) => (
            <MostOrderItemsListItem
              key={index}
              itemName={item.name}
              itemNumOfOrders={item.orders}
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
