import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownPeriod from "../DropdownPeriod";
import SearchDate from "components/functional/SearchDateFunction";

const OrderWaitTimeBox = ({ allTransactions }) => {
  const [period, setperiod] = useState("Today");
  const [details, setdetails] = useState({
    shortest: 0,
    longest: 0,
    average: 0,
    mean: 0,
  });

  useEffect(() => {
    const calculateTotals = (transactions) => {
      let shortest = 0;
      let longest = 0;
      let average = 0;
      let mean = 0;
      let total = 0;
      let totalOrders = 0;
      transactions.forEach((transaction) => {
        //get time between date and dateCompleted
        const date = transaction.originalData.date_created
          ? new Date(transaction.originalData.date_created)
          : new Date(transaction.originalData.date.seconds * 1000);

        if (transaction.originalData.dateCompleted) {
          const dateCompleted = new Date(
            transaction.originalData.dateCompleted.seconds * 1000
          );
          const diff = dateCompleted - date;
          const minutes = Math.floor(diff / 60000);
          total += minutes;
          totalOrders += 1;
          if (shortest === 0 || minutes < shortest) {
            shortest = minutes;
          }
          if (longest === 0 || minutes > longest) {
            longest = minutes;
          }
        }
      });

      average = total / totalOrders;
      mean = total / totalOrders;

      return {
        shortest: shortest,
        longest: longest,
        average: average,
        mean: mean,
      };
    };

    const getDateRange = (period) => {
      const today = new Date();
      switch (period) {
        case "Today":
          return {
            start: new Date().toDateString(),
            end: new Date().toDateString(),
          };
        case "This Week":
          const weekStart = new Date(
            today.setDate(today.getDate() - today.getDay())
          );
          const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
          return {
            start: weekStart.toDateString(),
            end: weekEnd.toDateString(),
          };
        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          return {
            start: monthStart.toDateString(),
            end: monthEnd.toDateString(),
          };
        case "This Year":
          const yearStart = new Date(today.getFullYear(), 0, 1);
          const yearEnd = new Date(today.getFullYear(), 11, 31);
          return {
            start: yearStart.toDateString(),
            end: yearEnd.toDateString(),
          };
        default:
          return {
            start: new Date().toDateString(),
            end: new Date().toDateString(),
          };
      }
    };

    const { start, end } = getDateRange(period);
    const filtered = SearchDate({
      startDate: start,
      endDate: end,
      transactions: allTransactions,
    });
    const totals = calculateTotals(filtered);
    setdetails(totals);
  }, [period, allTransactions]);

  return (
    <View style={styles.orderWaitTimeContainer}>
      <View style={styles.orderWaitTimeInnerContainer}>
        <View style={styles.orderWaitTimeHeaderRow}>
          <Text style={styles.orderWaitTimeLbl}>Order Wait Time (Minutes)</Text>
          <DropdownPeriod value={period} setValue={setperiod} />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.shortestContainer}>
            <Image
              source={require("../../assets/images/image_BUWK..png")}
              resizeMode="contain"
              style={styles.clockIcon}
            />
            <View style={styles.shortestRightSide}>
              <Text style={styles.shorestTimeValue}>{details.shortest}</Text>
              <Text style={styles.shortest}>Shortest</Text>
            </View>
          </View>
          <View style={styles.longestContainer}>
            <Image
              source={require("../../assets/images/image_BUWK..png")}
              resizeMode="contain"
              style={styles.clockIcon1}
            />
            <View style={styles.longestRightSide}>
              <Text style={styles.longestTimeValue}>{details.longest}</Text>
              <Text style={styles.longest}>Longest</Text>
            </View>
          </View>
          <View style={styles.averageContainer}>
            <Image
              source={require("../../assets/images/image_BUWK..png")}
              resizeMode="contain"
              style={styles.clockIcon2}
            />
            <View style={styles.averageRightSide}>
              <Text style={styles.averageTimeValue}>{details.average}</Text>
              <Text style={styles.average}>Average</Text>
            </View>
          </View>
          <View style={styles.meanContainer}>
            <Image
              source={require("../../assets/images/image_BUWK..png")}
              resizeMode="contain"
              style={styles.clockIcon3}
            />
            <View style={styles.meanRightSide}>
              <Text style={styles.meanTimeValue}>{details.mean}</Text>
              <Text style={styles.mean}>Mean</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderWaitTimeBox;

const styles = StyleSheet.create({
  orderWaitTimeContainer: {
    width: 383,
    height: 210,
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
    borderColor: "#ededed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  orderWaitTimeInnerContainer: {
    width: 347,
    height: 191,
    justifyContent: "flex-start",
  },
  orderWaitTimeHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  orderWaitTimeLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  orderWaitTimeDropdownPeriod: {
    height: 27,
    width: 84,
  },
  statsContainer: {
    width: 347,
    height: 121,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  shortestContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#e8ffe6",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockIcon: {
    height: 30,
    width: 30,
    marginLeft: 8,
  },
  shortestRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between",
  },
  shorestTimeValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  shortest: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  longestContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#ffe6e5",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockIcon1: {
    height: 30,
    width: 30,
    marginLeft: 8,
  },
  longestRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between",
  },
  longestTimeValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  longest: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  averageContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockIcon2: {
    height: 30,
    width: 30,
    marginLeft: 8,
  },
  averageRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between",
  },
  averageTimeValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  average: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  meanContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#f9e6ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockIcon3: {
    height: 30,
    width: 30,
    marginLeft: 8,
  },
  meanRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between",
  },
  meanTimeValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  mean: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
});
