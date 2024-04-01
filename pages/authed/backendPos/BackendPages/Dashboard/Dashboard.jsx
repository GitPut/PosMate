import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import DropdownPeriod from "./components/DropdownPeriod";
import { Ionicons, Entypo, Fontisto } from "@expo/vector-icons";
import MostOrderItemsListItem from "./components/MostOrderItemsListItem";
import RevenueBox from "./components/RevenueBox";
import OrdersBox from "./components/OrdersBox";
import ShowEmployeeItem from "./components/ShowEmployeeItem";

function Dashboard() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ height: '100%', width: '100%' }} contentContainerStyle={{ paddingRight: 30 }}>
        <View style={styles.wrap}>
          <View style={styles.totalRevenueContainer}>
            <View style={styles.totalRevenueInnerContainer}>
              <Text style={styles.totalRevenue}>Total Revenue</Text>
              <View style={styles.totalRevenueLeftSide}>
                <View style={styles.amountContainer}>
                  <View style={styles.amountRow}>
                    <Text style={styles.totalRevenue1}>$7,852.000</Text>
                    <DropdownPeriod
                      dropdownPeriodLbl="Weekly"
                      style={styles.dropdownPeriod}
                    ></DropdownPeriod>
                  </View>
                  <View style={styles.percentVsLastWeekRow}>
                    <Fontisto name="arrow-up-l" style={styles.upIcon} />
                    <Text style={styles.percent}>2.1%</Text>
                    <Text style={styles.vs}>vs</Text>
                    <Text style={styles.lastWeek}>last week</Text>
                  </View>
                </View>
                <View style={styles.chartContainer}>
                  <View style={styles.innerChartContainer}>
                    <Text style={styles.salesFromDateHeaderTxt}>
                      Sales from 1-14 February, 2024
                    </Text>
                    <View style={styles.barChart}></View>
                    <View style={styles.chartDescription}>
                      <View style={styles.lastWeekContainer}>
                        <View style={styles.colorIndicatorGrey}></View>
                        <Text style={styles.lastWeekTxt}>Last Week</Text>
                      </View>
                      <View style={styles.thisWeekContainer}>
                        <View style={styles.colorIndicatorBlue}></View>
                        <Text style={styles.thisWeekTxt}>This Week</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.mostOrderItemsContainer}>
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
                <MostOrderItemsListItem
                  style={styles.mostOrderItemsListItem1}
                ></MostOrderItemsListItem>
                <MostOrderItemsListItem
                  itemName="Veggie Pizza"
                  itemNumOfOrders="50"
                  style={styles.mostOrderItemsListItem2}
                ></MostOrderItemsListItem>
                <MostOrderItemsListItem
                  itemNumOfOrders="35"
                  itemName="Pepsi"
                  style={styles.mostOrderItemsListItem3}
                ></MostOrderItemsListItem>
              </View>
            </View>
          </View>
          <View style={styles.pickupOrdersContainer}>
            <View style={styles.pickupOrdersInnerContainer}>
              <View style={styles.pickupOrdersHeaderRow}>
                <Text style={styles.pickupOrders}>Pickup Orders</Text>
                <DropdownPeriod
                  dropdownPeriodLbl="Today"
                  style={styles.pickupOrdersDropdownPeriod}
                ></DropdownPeriod>
              </View>
              <View style={styles.pickupOrdersRevAndOrdersContainer}>
                <RevenueBox
                  revenueValue="$270"
                  style={styles.revenueBox}
                ></RevenueBox>
                <OrdersBox style={styles.ordersBox}></OrdersBox>
              </View>
            </View>
          </View>
          <View style={styles.deliveryOrdersContainer}>
            <View style={styles.deliveryOrdersInnerContainer}>
              <View style={styles.deliveryOrdersHeaderRow}>
                <Text style={styles.deliveryOrders}>Delivery Orders</Text>
                <DropdownPeriod
                  dropdownPeriodLbl="Weekly"
                  style={styles.deliveryOrdersDropdownPeriod}
                ></DropdownPeriod>
              </View>
              <View style={styles.deliveryOrdersRevAndOrdersContainer}>
                <RevenueBox
                  revenueValue="$440"
                  style={styles.revenueBox1}
                ></RevenueBox>
                <OrdersBox
                  ordersValue="25"
                  style={styles.ordersBox1}
                ></OrdersBox>
              </View>
            </View>
          </View>
          <View style={styles.inStoreOrdersContainer}>
            <View style={styles.inStoreOrdersInnerContainer}>
              <View style={styles.inStoreOrdersHeaderRow}>
                <Text style={styles.inStoreOrders}>In-Store Orders</Text>
                <DropdownPeriod
                  dropdownPeriodLbl="Monthly"
                  style={styles.inStoreOrdersDropdownPeriod}
                ></DropdownPeriod>
              </View>
              <View style={styles.inStoreOrdersRevAndOrdersContainer}>
                <RevenueBox
                  revenueValue="$11,135"
                  style={styles.revenueBox2}
                ></RevenueBox>
                <OrdersBox ordersValue="155" style={styles.ordersBox2}></OrdersBox>
              </View>
            </View>
          </View>
          <View style={styles.customersContainer}>
            <View style={styles.customersInnerContainer}>
              <View style={styles.customersHeaderRow}>
                <Text style={styles.customers}>Customers</Text>
                <DropdownPeriod
                  dropdownPeriodLbl="Today"
                  style={styles.customersDropdownPeriod}
                ></DropdownPeriod>
              </View>
              <View style={styles.newCustomersTrendItem}>
                <View style={styles.newCustomerInnerContainer}>
                  <View style={styles.newCustomersLeft}>
                    <Image
                      source={require("./assets/images/image_cdRe..png")}
                      resizeMode="contain"
                      style={styles.customerIcon}
                    ></Image>
                    <View style={styles.newCustomersRightSideInner}>
                      <Text style={styles.newCustomersValue}>15</Text>
                      <Text style={styles.newCustomersTxt}>New Customers</Text>
                    </View>
                  </View>
                  <View style={styles.newCustomersRightSide}>
                    <Image
                      source={require("./assets/images/image_wGdd..png")}
                      resizeMode="contain"
                      style={styles.increasingIcon}
                    ></Image>
                    <Text style={styles.newCustomersPercent}>+ 75%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.returningCustomersItem}>
                <View style={styles.returningCustomersInnerContainer}>
                  <View style={styles.returningCustomersInnerLeft}>
                    <Image
                      source={require("./assets/images/image_cdRe..png")}
                      resizeMode="contain"
                      style={styles.personIcon}
                    ></Image>
                    <View style={styles.returningCustomersInnerInnerRightSide}>
                      <Text style={styles.returningCustomersValue}>3</Text>
                      <Text style={styles.returningCustomersTxt}>
                        Returning Customers
                      </Text>
                    </View>
                  </View>
                  <View style={styles.returningCustomersRightSide}>
                    <Image
                      source={require("./assets/images/image_DvGX..png")}
                      resizeMode="contain"
                      style={styles.decreaseIcon}
                    ></Image>
                    <Text style={styles.returningCustomerPercent}>- 10%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.orderWaitTimeContainer}>
            <View style={styles.orderWaitTimeInnerContainer}>
              <View style={styles.orderWaitTimeHeaderRow}>
                <Text style={styles.orderWaitTimeLbl}>
                  Order Wait Time (Minutes)
                </Text>
                <DropdownPeriod
                  dropdownPeriodLbl="Today"
                  style={styles.orderWaitTimeDropdownPeriod}
                ></DropdownPeriod>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.shortestContainer}>
                  <Image
                    source={require("./assets/images/image_BUWK..png")}
                    resizeMode="contain"
                    style={styles.clockIcon}
                  ></Image>
                  <View style={styles.shortestRightSide}>
                    <Text style={styles.shorestTimeValue}>12</Text>
                    <Text style={styles.shortest}>Shortest</Text>
                  </View>
                </View>
                <View style={styles.longestContainer}>
                  <Image
                    source={require("./assets/images/image_BUWK..png")}
                    resizeMode="contain"
                    style={styles.clockIcon1}
                  ></Image>
                  <View style={styles.longestRightSide}>
                    <Text style={styles.longestTimeValue}>20</Text>
                    <Text style={styles.longest}>Longest</Text>
                  </View>
                </View>
                <View style={styles.averageContainer}>
                  <Image
                    source={require("./assets/images/image_BUWK..png")}
                    resizeMode="contain"
                    style={styles.clockIcon2}
                  ></Image>
                  <View style={styles.averageRightSide}>
                    <Text style={styles.averageTimeValue}>16</Text>
                    <Text style={styles.average}>Average</Text>
                  </View>
                </View>
                <View style={styles.meanContainer}>
                  <Image
                    source={require("./assets/images/image_BUWK..png")}
                    resizeMode="contain"
                    style={styles.clockIcon3}
                  ></Image>
                  <View style={styles.meanRightSide}>
                    <Text style={styles.meanTimeValue}>16</Text>
                    <Text style={styles.mean}>Mean</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.employeesContainer}>
            <View style={styles.employeesInnerContainer}>
              <View style={styles.employeesHeaderRow}>
                <Text style={styles.employees}>Employees</Text>
                <DropdownPeriod
                  dropdownPeriodLbl="Today"
                  style={styles.employeesDropdownPeriod}
                ></DropdownPeriod>
              </View>
              <View style={styles.employesWrapContainer}>
                <ShowEmployeeItem
                  style={styles.showEmployeeItem}
                ></ShowEmployeeItem>
                <ShowEmployeeItem
                  style={styles.showEmployeeItem2}
                ></ShowEmployeeItem>
                <ShowEmployeeItem
                  style={styles.showEmployeeItem3}
                ></ShowEmployeeItem>
                <ShowEmployeeItem
                  style={styles.showEmployeeItem4}
                ></ShowEmployeeItem>
              </View>
            </View>
          </View>
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
  totalRevenueContainer: {
    width: 600,
    height: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  totalRevenueInnerContainer: {
    width: '90%',
    height: 325,
    justifyContent: "space-between"
  },
  totalRevenue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  totalRevenueLeftSide: {
    width: 416,
    height: 292,
    justifyContent: "space-between"
  },
  amountContainer: {
    width: 208,
    height: 55,
    justifyContent: "space-between"
  },
  amountRow: {
    width: 208,
    height: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  totalRevenue1: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 20,
    marginRight: 20
  },
  dropdownPeriod: {
    height: 27,
    width: 84
  },
  percentVsLastWeekRow: {
    width: 208,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  upIcon: {
    color: "#2ca663",
    fontSize: 22,
    marginRight: 8
  },
  percent: {
    fontWeight: '700',
    color: "#2ca663",
    fontSize: 13,
    marginRight: 3
  },
  vs: {
    color: "#a0a6b1",
    fontSize: 13,
    marginRight: 3
  },
  lastWeek: {
    color: "#a0a6b1",
    fontSize: 13
  },
  chartContainer: {
    width: 416,
    height: 219,
    alignItems: "flex-end",
  },
  innerChartContainer: {
    width: 381,
    height: 219,
    justifyContent: "space-between"
  },
  salesFromDateHeaderTxt: {
    color: "#929292",
    fontSize: 15
  },
  barChart: {
    width: 381,
    height: 145,
    backgroundColor: "#E6E6E6"
  },
  chartDescription: {
    width: 190,
    height: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  lastWeekContainer: {
    width: 76,
    height: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  colorIndicatorGrey: {
    width: 10,
    height: 10,
    backgroundColor: "#eef2ff",
    borderRadius: 100
  },
  lastWeekTxt: {
    color: "#828282",
    fontSize: 13
  },
  thisWeekContainer: {
    width: 76,
    height: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  colorIndicatorBlue: {
    width: 10,
    height: 10,
    backgroundColor: "#1c294e",
    borderRadius: 100
  },
  thisWeekTxt: {
    color: "#828282",
    fontSize: 13
  },
  mostOrderItemsContainer: {
    width: 383,
    height: 350,
    borderWidth: 1,
    borderColor: "rgba(232,232,232,1)",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 20
  },
  mostOrderedItemsInnerContainer: {
    width: 326,
    height: 321,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  mostOrderedItemsHeaderRow: {
    width: 326,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  mostOrderedItems: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  mostOrderedItemsDropdownPeriod: {
    height: 27,
    width: 84
  },
  mostOrderedItemsChartHeader: {
    width: 326,
    height: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5
  },
  itemsLbl: {
    fontWeight: '700',
    color: "#9ea0a6",
    fontSize: 13
  },
  ordersLbl: {
    fontWeight: '700',
    color: "#9ea0a6",
    fontSize: 13
  },
  topItemsContainer: {
    width: 326,
    height: 209,
    justifyContent: "space-between"
  },
  mostOrderItemsListItem1: {
    height: 70,
    width: 326
  },
  mostOrderItemsListItem2: {
    height: 70,
    width: 326
  },
  mostOrderItemsListItem3: {
    height: 70,
    width: 326
  },
  pickupOrdersContainer: {
    width: 383,
    height: 158,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
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
    marginBottom: 20
  },
  pickupOrdersInnerContainer: {
    width: 347,
    height: 126,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  pickupOrdersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  pickupOrders: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  pickupOrdersDropdownPeriod: {
    height: 27,
    width: 84
  },
  pickupOrdersRevAndOrdersContainer: {
    width: 347,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  revenueBox: {
    height: 65,
    width: 165
  },
  ordersBox: {
    height: 65,
    width: 165
  },
  deliveryOrdersContainer: {
    width: 383,
    height: 158,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
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
    marginBottom: 20
  },
  deliveryOrdersInnerContainer: {
    width: 347,
    height: 126,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  deliveryOrdersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  deliveryOrders: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  deliveryOrdersDropdownPeriod: {
    height: 27,
    width: 84
  },
  deliveryOrdersRevAndOrdersContainer: {
    width: 347,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  revenueBox1: {
    height: 65,
    width: 165
  },
  ordersBox1: {
    height: 65,
    width: 165
  },
  inStoreOrdersContainer: {
    width: 383,
    height: 158,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
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
    marginBottom: 20
  },
  inStoreOrdersInnerContainer: {
    width: 347,
    height: 126,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inStoreOrdersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  inStoreOrders: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  inStoreOrdersDropdownPeriod: {
    height: 27,
    width: 84
  },
  inStoreOrdersRevAndOrdersContainer: {
    width: 347,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  revenueBox2: {
    height: 65,
    width: 165
  },
  ordersBox2: {
    height: 65,
    width: 165
  },
  customersContainer: {
    width: 383,
    height: 218,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
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
    marginBottom: 20
  },
  customersInnerContainer: {
    width: 347,
    height: 191,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  customersHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18
  },
  customers: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  customersDropdownPeriod: {
    height: 27,
    width: 84
  },
  newCustomersTrendItem: {
    width: 347,
    height: 54,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  newCustomerInnerContainer: {
    width: 310,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  newCustomersLeft: {
    width: 166,
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  customerIcon: {
    height: 32,
    width: 41
  },
  newCustomersRightSideInner: {
    height: 38,
    justifyContent: "space-between",
    marginLeft: 20
  },
  newCustomersValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 19
  },
  newCustomersTxt: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 13
  },
  newCustomersRightSide: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  increasingIcon: {
    height: 24,
    width: 24
  },
  newCustomersPercent: {
    fontWeight: '700',
    color: "#16ad1a",
    fontSize: 19
  },
  returningCustomersItem: {
    width: 347,
    height: 54,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  returningCustomersInnerContainer: {
    width: 310,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  returningCustomersInnerLeft: {
    width: 166,
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  personIcon: {
    height: 32,
    width: 41
  },
  returningCustomersInnerInnerRightSide: {
    height: 38,
    justifyContent: "space-between",
    marginLeft: 20
  },
  returningCustomersValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 19
  },
  returningCustomersTxt: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 13
  },
  returningCustomersRightSide: {
    width: 79,
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  decreaseIcon: {
    height: 24,
    width: 24
  },
  returningCustomerPercent: {
    fontWeight: '700',
    color: "#b22423",
    fontSize: 19
  },
  orderWaitTimeContainer: {
    width: 383,
    height: 218,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
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
    marginBottom: 20
  },
  orderWaitTimeInnerContainer: {
    width: 347,
    height: 191,
    justifyContent: "flex-start"
  },
  orderWaitTimeHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18
  },
  orderWaitTimeLbl: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  orderWaitTimeDropdownPeriod: {
    height: 27,
    width: 84
  },
  statsContainer: {
    width: 347,
    height: 121,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  shortestContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#e8ffe6",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  clockIcon: {
    height: 30,
    width: 30,
    marginLeft: 8
  },
  shortestRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between"
  },
  shorestTimeValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 20
  },
  shortest: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 13
  },
  longestContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#ffe6e5",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  clockIcon1: {
    height: 30,
    width: 30,
    marginLeft: 8
  },
  longestRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between"
  },
  longestTimeValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 20
  },
  longest: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 13
  },
  averageContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  clockIcon2: {
    height: 30,
    width: 30,
    marginLeft: 8
  },
  averageRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between"
  },
  averageTimeValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 20
  },
  average: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 13
  },
  meanContainer: {
    width: 164,
    height: 45,
    backgroundColor: "#f9e6ff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  clockIcon3: {
    height: 30,
    width: 30,
    marginLeft: 8
  },
  meanRightSide: {
    width: 72,
    height: 41,
    justifyContent: "space-between"
  },
  meanTimeValue: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 20
  },
  mean: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 13
  },
  employeesContainer: {
    width: 383,
    height: 218,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
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
    marginBottom: 20
  },
  employeesInnerContainer: {
    width: 347,
    height: 191
  },
  employeesHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18
  },
  employees: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  employeesDropdownPeriod: {
    height: 27,
    width: 84
  },
  employesWrapContainer: {
    width: 271,
    height: 135,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  showEmployeeItem: {
    height: 38,
    width: 125
  },
  showEmployeeItem2: {
    height: 38,
    width: 125
  },
  showEmployeeItem3: {
    height: 38,
    width: 125
  },
  showEmployeeItem4: {
    height: 38,
    width: 125
  }
});

export default Dashboard;
