import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownPeriod from "../DropdownPeriod";
import BarGraph from "./BarGraph";
import { TransListStateItem } from "types/global";
import ParseDate from "components/functional/ParseDate";

const TotalRevenueBox = ({
  style,
  allTransactions,
  period,
  setperiod,
  details,
}: {
  style?: ViewStyle;
  allTransactions: TransListStateItem[];
  period: string;
  setperiod: (period: string) => void;
  details: {
    orders: number;
    revenue: number;
  };
}) => {
  const [data, setdata] = useState<
    { name: string; uv: number; pv: number; amt: number }[]
  >([]);

  useEffect(() => {
    const localData = [
      {
        name: "J\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "F\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "M\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "A\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "M\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "J\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "J\n\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "A\n\n\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "S\n\n\n\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "O\n\n\n\n\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "N\n\n\n\n\n\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "D\n\n\n\n\n\n\n\n\n\n\n\n",
        uv: 0,
        pv: 0,
        amt: 0,
      },
    ];

    allTransactions.forEach((transaction) => {
      // Now you can safely parse the adjusted date string
      const date = ParseDate(transaction.date);
      if (!date) return;
      const month = date.getMonth();
      if (localData[month]) {
        localData[month].uv += parseFloat(transaction.total ?? "0");
        localData[month].pv += 1;
        localData[month].amt += 1;
      }
    });
    setdata(localData);
  }, [allTransactions]);

  return (
    <View
      style={[
        styles.totalRevenueContainer,
        style,
        // width > 1260 && height > 1024 && { width: 780 },
      ]}
    >
      <View style={styles.totalRevenueInnerContainer}>
        <Text style={styles.totalRevenue}>Total Revenue</Text>
        <View style={styles.totalRevenueLeftSide}>
          <View style={styles.amountContainer}>
            <View style={styles.amountRow}>
              <Text style={styles.totalRevenue1}>
                ${details.revenue.toFixed(2)}
              </Text>
              <View>
                <DropdownPeriod value={period} setValue={setperiod} />
              </View>
            </View>
            <View style={styles.percentVsLastWeekRow}>
              {/* <Fontisto name="arrow-up-l" style={styles.upIcon} />
              <Text style={styles.percent}>2.1%</Text>
              <Text style={styles.vs}>vs</Text>
              <Text style={styles.lastWeek}>last week</Text> */}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  marginTop: 3,
                }}
              >
                Total Orders For {period}: {details.orders}
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
              <View style={styles.chartDescription}>
                {/* <View style={styles.lastWeekContainer}>
                  <View style={styles.colorIndicatorGrey}></View>
                  <Text style={styles.lastWeekTxt}>Last Week</Text>
                </View>
                <View style={styles.thisWeekContainer}>
                  <View style={styles.colorIndicatorBlue}></View>
                  <Text style={styles.thisWeekTxt}>This Week</Text>
                </View> */}
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
    // backgroundColor: "#E6E6E6",
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
