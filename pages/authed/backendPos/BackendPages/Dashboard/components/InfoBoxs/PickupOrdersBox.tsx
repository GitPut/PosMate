import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownPeriod from "../DropdownPeriod";
import RevenueBox from "../RevenueBox";
import OrdersBox from "../OrdersBox";
import SearchDate from "components/functional/SearchDateFunction";
import { TransListStateItem } from "types/global";

const PickupOrdersBox = ({
  allTransactions,
}: {
  allTransactions: TransListStateItem[];
}) => {
  const [period, setperiod] = useState("Today");
  const [details, setdetails] = useState({ orders: 0, revenue: 0 });

  useEffect(() => {
    const calculateTotals = (transactions: TransListStateItem[]) => {
      let totalRevenue = 0;
      let totalOrders = 0;
      transactions.forEach((transaction) => {
        if (transaction.method === "pickupOrder") {
          totalRevenue += parseFloat(transaction.total ?? "0");
          totalOrders += 1;
        }
      });
      return { orders: totalOrders, revenue: totalRevenue.toFixed(0) };
    };

    const getDateRange = (period: string) => {
      const today = new Date();
      const weekStart = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
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

    const { orders, revenue } = calculateTotals(filteredTransactions);
    setdetails({ orders, revenue: parseFloat(revenue) });
  }, [period, allTransactions]);

  return (
    <View style={styles.pickupOrdersContainer}>
      <View style={styles.pickupOrdersInnerContainer}>
        <View style={styles.pickupOrdersHeaderRow}>
          <Text style={styles.pickupOrders}>Pickup Orders</Text>
          <View>
            <DropdownPeriod value={period} setValue={setperiod} />
          </View>
        </View>
        <View style={styles.pickupOrdersRevAndOrdersContainer}>
          <RevenueBox
            style={styles.revenueBox}
            revenueValue={details.revenue}
          />
          <OrdersBox style={styles.ordersBox} ordersValue={details.orders} />
        </View>
      </View>
    </View>
  );
};

export default PickupOrdersBox;

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
