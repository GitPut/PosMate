import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import DropdownPeriod from "../DropdownPeriod";
import { Fontisto } from "@expo/vector-icons";

const TotalRevenueBox = ({style}) => {
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={[
              styles.totalRevenueContainer,
          style
        // width > 1260 && height > 1024 && { width: 780 },
      ]}
    >
      <View style={styles.totalRevenueInnerContainer}>
        <Text style={styles.totalRevenue}>Total Revenue</Text>
        <View style={styles.totalRevenueLeftSide}>
          <View style={styles.amountContainer}>
            <View style={styles.amountRow}>
              <Text style={styles.totalRevenue1}>$7,852.000</Text>
              <DropdownPeriod
                dropdownPeriodLbl="Weekly"
                style={styles.dropdownPeriod}
              />
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
  );
};

export default TotalRevenueBox;

const styles = StyleSheet.create({
  totalRevenueContainer: {
    width: 383,
    height: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
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
  totalRevenueInnerContainer: {
    width: "90%",
    height: 325,
    justifyContent: "space-between",
  },
  totalRevenue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  totalRevenueLeftSide: {
    width: 416,
    height: 292,
    justifyContent: "space-between",
  },
  amountContainer: {
    width: 208,
    height: 55,
    justifyContent: "space-between",
  },
  amountRow: {
    width: 208,
    height: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  totalRevenue1: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
    marginRight: 20,
  },
  dropdownPeriod: {
    height: 27,
    width: 84,
  },
  percentVsLastWeekRow: {
    width: 208,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  upIcon: {
    color: "#2ca663",
    fontSize: 22,
    marginRight: 8,
  },
  percent: {
    fontWeight: "700",
    color: "#2ca663",
    fontSize: 13,
    marginRight: 3,
  },
  vs: {
    color: "#a0a6b1",
    fontSize: 13,
    marginRight: 3,
  },
  lastWeek: {
    color: "#a0a6b1",
    fontSize: 13,
  },
  chartContainer: {
    width: 416,
    height: 219,
  },
  innerChartContainer: {
    width: 381,
    height: 219,
    justifyContent: "space-between",
  },
  salesFromDateHeaderTxt: {
    color: "#929292",
    fontSize: 15,
  },
  barChart: {
    width: 340,
    height: 145,
    backgroundColor: "#E6E6E6",
  },
  chartDescription: {
    width: 190,
    height: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lastWeekContainer: {
    width: 76,
    height: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorIndicatorGrey: {
    width: 10,
    height: 10,
    backgroundColor: "#eef2ff",
    borderRadius: 100,
  },
  lastWeekTxt: {
    color: "#828282",
    fontSize: 13,
  },
  thisWeekContainer: {
    width: 76,
    height: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorIndicatorBlue: {
    width: 10,
    height: 10,
    backgroundColor: "#1c294e",
    borderRadius: 100,
  },
  thisWeekTxt: {
    color: "#828282",
    fontSize: 13,
  },
});
