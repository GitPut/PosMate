import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Pressable,
  Text,
} from "react-native";
import TotalRevenueBox from "./components/InfoBoxs/TotalRevenueBox";
import MostOrderedItemsBox from "./components/InfoBoxs/MostOrderedItemsBox";
import PickupOrdersBox from "./components/InfoBoxs/PickupOrdersBox";
import DeliveryOrdersBox from "./components/InfoBoxs/DeliveryOrdersBox";
import InStoreOrdersBox from "./components/InfoBoxs/InStoreOrdersBox";
import CustomersBox from "./components/InfoBoxs/CustomersBox";
import OrderWaitTimeBox from "./components/InfoBoxs/OrderWaitTimeBox";
import {
  customersList,
  transListTableOrgState,
  userStoreState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";

function Dashboard() {
  const { width } = useWindowDimensions();
  const transListTableOrg = transListTableOrgState.use();
  const customers = customersList.use();
  const catalog = userStoreState.use();

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
            <OrderWaitTimeBox allTransactions={transListTableOrg} />
            {width > 1300 && <CustomersBox customers={customers} />}
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
