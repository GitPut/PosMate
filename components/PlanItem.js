import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import CheckPlanItem from "./CheckPlanItem";
import MaterialButtonPrimary from "./MaterialButtonPrimary";

function PlanItem(props) {
  return (
    <View style={styles.container}>
      <View style={styles.planContainer}>
        <Text style={styles.standardPlan}>Standard Plan</Text>
      </View>
      <View style={styles.planBodyContainer}>
        <View style={styles.pricingTxtContainer}>
          <Text style={styles.priceTxt}>$50</Text>
          <Text style={styles.monthTxt}>/month</Text>
        </View>
        <CheckPlanItem style={styles.checkPlanItem1}></CheckPlanItem>
        <CheckPlanItem
          month2="Integration with Woo Commerce/WordPress Store"
          style={styles.checkPlanItem2}
        ></CheckPlanItem>
        <CheckPlanItem
          month2="Order Management"
          style={styles.checkPlanItem3}
        ></CheckPlanItem>
        <CheckPlanItem
          month2="Intuitive User Interface"
          style={styles.checkPlanItem4}
        ></CheckPlanItem>
        <CheckPlanItem
          month2="24/H Tech Support"
          style={styles.checkPlanItem5}
        ></CheckPlanItem>
        <MaterialButtonPrimary
          caption="Get Started"
          style={styles.getStartedBtn}
        ></MaterialButtonPrimary>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(243,243,243,1)",
    justifyContent: "flex-start",
    width: 400,
  },
  planContainer: {
    height: 48,
    backgroundColor: "rgba(74,144,226,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  standardPlan: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  planBodyContainer: {
    justifyContent: "space-around",
    paddingLeft: 15,
    height: 400,
  },
  pricingTxtContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 0,
    alignSelf: "flex-start",
  },
  priceTxt: {},
  monthTxt: {},
  checkPlanItem1: {
    height: 30,
    width: 340,
    margin: 0,
  },
  checkPlanItem2: {
    height: 30,
    width: 340,
    margin: 0,
  },
  checkPlanItem3: {
    height: 30,
    width: 340,
    margin: 0,
  },
  checkPlanItem4: {
    height: 30,
    width: 340,
    margin: 0,
  },
  checkPlanItem5: {
    height: 30,
    width: 340,
    margin: 0,
  },
  getStartedBtn: {
    height: 47,
    width: 128,
    margin: 0,
  },
});

export default PlanItem;
