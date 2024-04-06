import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import DropdownPeriod from "./components/DropdownPeriod";
import RevenueBox from "./components/RevenueBox";
import OrdersBox from "./components/OrdersBox";
import ShowEmployeeItem from "./components/ShowEmployeeItem";
import TotalRevenueBox from "./components/InfoBoxs/TotalRevenueBox";
import MostOrderedItemsBox from "./components/InfoBoxs/MostOrderedItemsBox";
import PickupOrdersBox from "./components/InfoBoxs/PickupOrdersBox";
import DeliveryOrdersBox from "./components/InfoBoxs/DeliveryOrdersBox";
import InStoreOrdersBox from "./components/InfoBoxs/InStoreOrdersBox";
import CustomersBox from "./components/InfoBoxs/CustomersBox";
import OrderWaitTimeBox from "./components/InfoBoxs/OrderWaitTimeBox";
import EmployeesBox from "./components/InfoBoxs/EmployeesBox";
import { auth, db } from "state/firebaseConfig";
import { transListTableOrgState } from "state/state";

function Dashboard() {
  const { height, width } = useWindowDimensions();
  const transListTableOrg = transListTableOrgState.use();

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ height: "100%", width: "100%" }}
        contentContainerStyle={{ paddingRight: 30 }}
      >
        <View style={styles.wrap}>
          <TotalRevenueBox
            style={width < 1300 && { width: "100%" }}
            allTransactions={transListTableOrg}
          />
          {width > 1300 && (
            <MostOrderedItemsBox
              style={null}
              allTransactions={transListTableOrg}
            />
          )}
          <View style={{ justifyContent: "space-between" }}>
            <OrderWaitTimeBox />
            {width > 1300 && <CustomersBox />}
            {width < 1300 && (
              <MostOrderedItemsBox
                style={{ height: 300 }}
                allTransactions={transListTableOrg}
              />
            )}
          </View>
          {width < 1300 ? (
            <View style={{ justifyContent: "space-between" }}>
              <PickupOrdersBox allTransactions={transListTableOrg} />
              <DeliveryOrdersBox allTransactions={transListTableOrg} />
              <InStoreOrdersBox allTransactions={transListTableOrg} />
            </View>
          ) : (
            <>
              <PickupOrdersBox allTransactions={transListTableOrg} />
              <DeliveryOrdersBox allTransactions={transListTableOrg} />
              <InStoreOrdersBox allTransactions={transListTableOrg} />
            </>
          )}
          {/* <EmployeesBox /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
});

export default Dashboard;
