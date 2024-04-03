import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import DropdownPeriod from "../DropdownPeriod";

const OrderWaitTimeBox = () => {
  return (
    <View style={styles.orderWaitTimeContainer}>
      <View style={styles.orderWaitTimeInnerContainer}>
        <View style={styles.orderWaitTimeHeaderRow}>
          <Text style={styles.orderWaitTimeLbl}>Order Wait Time (Minutes)</Text>
          <DropdownPeriod
            dropdownPeriodLbl="Today"
            style={styles.orderWaitTimeDropdownPeriod}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.shortestContainer}>
            <Image
              source={require("../../assets/images/image_BUWK..png")}
              resizeMode="contain"
              style={styles.clockIcon}
            />
            <View style={styles.shortestRightSide}>
              <Text style={styles.shorestTimeValue}>12</Text>
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
              <Text style={styles.longestTimeValue}>20</Text>
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
              <Text style={styles.averageTimeValue}>16</Text>
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
              <Text style={styles.meanTimeValue}>16</Text>
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
