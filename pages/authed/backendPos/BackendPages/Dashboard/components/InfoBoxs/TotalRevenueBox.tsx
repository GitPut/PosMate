import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownPeriod from "../DropdownPeriod";
import BarGraph from "./BarGraph";

const TotalRevenueBox = ({
  style,
  period,
  setperiod,
  details,
}: {
  style?: ViewStyle;
  period: string;
  setperiod: (period: string) => void;
  details: any; // Adjust the type as per your actual data structure
}) => {
  const [data, setData] = useState<
    { name: string; uv: number; pv: number; amt: number }[]
  >([]);

  useEffect(() => {
    const localData = [
      { name: "J\n", uv: 0, pv: 0, amt: 0 },
      { name: "F\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "M\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "A\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "M\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "J\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "J\n\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "A\n\n\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "S\n\n\n\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "O\n\n\n\n\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "N\n\n\n\n\n\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
      { name: "D\n\n\n\n\n\n\n\n\n\n\n\n", uv: 0, pv: 0, amt: 0 },
    ];

    if (details && details.days) {
      Object.keys(details.days).forEach((date) => {
        const month = parseInt(date.split("-")[1], 10) - 1;
        if (localData[month]) {
          localData[month].uv += details.days[date].revenue || 0;
          localData[month].pv += details.days[date].orders || 0;
          localData[month].amt += details.days[date].orders || 0;
        }
      });
    }

    setData(localData);
  }, [details]);

  const totalRevenue = details?.totalRevenue?.revenue || 0;
  const totalOrders = details?.totalRevenue?.orders || 0;

  return (
    <View style={[styles.totalRevenueContainer, style]}>
      <View style={styles.totalRevenueInnerContainer}>
        <Text style={styles.totalRevenue}>Total Revenue</Text>
        <View style={styles.totalRevenueLeftSide}>
          <View style={styles.amountContainer}>
            <View style={styles.amountRow}>
              <Text style={styles.totalRevenue1}>
                ${totalRevenue.toFixed(2)}
              </Text>
              <View>
                <DropdownPeriod value={period} setValue={setperiod} />
              </View>
            </View>
            <View style={styles.percentVsLastWeekRow}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  marginTop: 3,
                }}
              >
                Total Orders For {period}: {totalOrders}
              </Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.innerChartContainer}>
              <Text style={styles.salesFromDateHeaderTxt}>
                Sales from this year
              </Text>
              <View style={styles.barChart}>
                <BarGraph data={data} />
              </View>
              <View style={styles.chartDescription}></View>
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
    width: 340,
    height: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
