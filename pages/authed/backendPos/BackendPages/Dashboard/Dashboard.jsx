import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, useWindowDimensions } from "react-native";
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

function Dashboard() {
  const { height, width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: '100%', width: '100%' }} contentContainerStyle={{ paddingRight: 30 }}>
        <View style={styles.wrap}>
          <TotalRevenueBox style={width < 1300 && { width: '100%' }} />
          {width > 1300 && <MostOrderedItemsBox />}
          <View style={{ justifyContent: 'space-between' }}>
            <OrderWaitTimeBox />
            {width > 1300 && <CustomersBox />}
            {width < 1300 && <MostOrderedItemsBox style={{ height: 300 }} />}
          </View>
          {
            width < 1300 ?
              <View style={{ justifyContent: 'space-between' }}>
                <PickupOrdersBox />
                <DeliveryOrdersBox />
                <InStoreOrdersBox />
              </View>
              :
              <>
                <PickupOrdersBox />
                <DeliveryOrdersBox />
                <InStoreOrdersBox />
              </>
          }
          {/* <EmployeesBox /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: '100%',
    height: '100%'
  },
});

export default Dashboard;
