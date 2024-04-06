import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownPeriod from "../DropdownPeriod";
import SearchDate from "components/functional/SearchDateFunction";

const CustomersBox = ({ customers }) => {
  const [period, setperiod] = useState("Today");
  const [details, setdetails] = useState({
    newCustomers: 0,
  });

  useEffect(() => {
    const calculateTotals = (transactions) => {
      let totalNewCustomers = 0;
      transactions.forEach(() => {
        totalNewCustomers += 1;
      });
      return {
        newCustomers: totalNewCustomers,
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
          // Assuming you want to default to "All Time" with no filtering.
          return null;
      }
    };

    const dateRange = getDateRange(period);
    let filteredCustomers;

    if (dateRange) {
      const { start, end } = dateRange;
      filteredCustomers = SearchDate({
        startDate: start,
        endDate: end,
        customers: customers,
      });
    } else {
      // No date filtering for "All Time" or unspecified periods
      filteredCustomers = customers;
    }

    const { newCustomers } = calculateTotals(filteredCustomers);
    setdetails({ newCustomers });
  }, [period, customers]);

  return (
    <View style={styles.customersContainer}>
      <View style={styles.customersInnerContainer}>
        <View style={styles.customersHeaderRow}>
          <Text style={styles.customers}>Customers</Text>
          <DropdownPeriod value={period} setValue={setperiod} />
        </View>
        <View style={styles.newCustomersTrendItem}>
          <View style={styles.newCustomerInnerContainer}>
            <View style={styles.newCustomersLeft}>
              <Image
                source={require("../../assets/images/image_cdRe..png")}
                resizeMode="contain"
                style={styles.customerIcon}
              />
              <View style={styles.newCustomersRightSideInner}>
                <Text style={styles.newCustomersValue}>
                  {details.newCustomers}
                </Text>
                <Text style={styles.newCustomersTxt}>New Customers</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.returningCustomersItem}>
          <View style={styles.returningCustomersInnerContainer}>
            <View style={styles.returningCustomersInnerLeft}>
              <Image
                source={require("../../assets/images/image_cdRe..png")}
                resizeMode="contain"
                style={styles.personIcon}
              />
              <View style={styles.returningCustomersInnerInnerRightSide}>
                <Text style={styles.returningCustomersValue}>3</Text>
                <Text style={styles.returningCustomersTxt}>
                  Returning Customers
                </Text>
              </View>
            </View>
            <View style={styles.returningCustomersRightSide}>
              <Image
                source={require("../../assets/images/image_DvGX..png")}
                resizeMode="contain"
                style={styles.decreaseIcon}
              />
              <Text style={styles.returningCustomerPercent}>- 10%</Text>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default CustomersBox;

const styles = StyleSheet.create({
  customersContainer: {
    width: 383,
    // height: 218,
    height: 130,
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
    marginBottom: 20,
  },
  customersInnerContainer: {
    width: 347,
    // height: 110,
    height: 100,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  customersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  customers: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  customersDropdownPeriod: {
    height: 27,
    width: 84,
  },
  newCustomersTrendItem: {
    width: 347,
    height: 54,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  newCustomerInnerContainer: {
    width: 310,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newCustomersLeft: {
    width: 166,
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerIcon: {
    height: 32,
    width: 41,
  },
  newCustomersRightSideInner: {
    height: 38,
    justifyContent: "space-between",
    marginLeft: 20,
  },
  newCustomersValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
  },
  newCustomersTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  newCustomersRightSide: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  increasingIcon: {
    height: 24,
    width: 24,
  },
  newCustomersPercent: {
    fontWeight: "700",
    color: "#16ad1a",
    fontSize: 19,
  },
  returningCustomersItem: {
    width: 347,
    height: 54,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  returningCustomersInnerContainer: {
    width: 310,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  returningCustomersInnerLeft: {
    width: 166,
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  personIcon: {
    height: 32,
    width: 41,
  },
  returningCustomersInnerInnerRightSide: {
    height: 38,
    justifyContent: "space-between",
    marginLeft: 20,
  },
  returningCustomersValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
  },
  returningCustomersTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  returningCustomersRightSide: {
    width: 79,
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  decreaseIcon: {
    height: 24,
    width: 24,
  },
  returningCustomerPercent: {
    fontWeight: "700",
    color: "#b22423",
    fontSize: 19,
  },
});
