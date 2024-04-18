import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface PlanProps {
  planName: string;
  planPrice: string;
  planPeriodDesc: string;
  planDescription: string;
  recurence?: string;
  selectPlan: () => void;
  isPlanSelected: boolean;
}

const Plan = ({
  planName,
  planPrice,
  planPeriodDesc,
  planDescription,
  recurence,
  selectPlan,
  isPlanSelected,
}: PlanProps) => {
  return (
    <View
      style={[
        styles.container,
        planName === "STANDARD" && {
          height: 430,
          borderTopWidth: 10,
          borderTopColor: "#1D294E",
        },
      ]}
    >
      <View
        style={{
          height: 250,
          // justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.planPriceDetailsGroup}>
          <Text style={styles.planName}>{planName}</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={styles.planPrice}>${planPrice}</Text>
            <Text style={styles.recurence}>{recurence}</Text>
          </View>
          <Text style={styles.planPeriodDesc}>{planPeriodDesc}</Text>
        </View>
        <View style={styles.planDivider} />
        <Text style={styles.planDescription}>{planDescription}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.selectPlanBtn,
          isPlanSelected && { backgroundColor: "#1c294e" },
        ]}
        onPress={selectPlan}
      >
        <Text style={[styles.selectPlan, isPlanSelected && { color: "white" }]}>
          Select Plan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 410,
    width: 275,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 20,
  },
  planPriceDetailsGroup: {
    height: 93,
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: 220,
  },
  planName: {
    fontWeight: "700",
    color: "#1c294e",
    fontSize: 25,
  },
  planPrice: {
    fontWeight: "700",
    color: "#1c294e",
    fontSize: 35,
  },
  recurence: {
    fontWeight: "700",
    color: "#1c294e",
    fontSize: 16,
    marginLeft: 2,
    marginBottom: 5,
  },
  planPeriodDesc: {
    color: "#1c294e",
    fontSize: 16,
  },
  planDivider: {
    width: 257,
    height: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 20,
  },
  planDescription: {
    color: "#121212",
    width: 220,
    lineHeight: 20,
  },
  selectPlanBtn: {
    width: 190,
    height: 38,
    backgroundColor: "#eef2ff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  selectPlan: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 22,
  },
});

export default Plan;
