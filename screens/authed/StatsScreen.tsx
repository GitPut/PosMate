import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const StatsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.mainScrollView}>
      <ScrollView horizontal={true}>
        <InfoBlock label="Monthly Sales" stat="50%" icon="trending-up" />
        <InfoBlock label="Monthly Profit" stat="13%" icon="trending-down" />
        <InfoBlock label="Monthly Traffic" stat="24%" icon="trending-up" />
        <InfoBlock label="Monthly Orders" stat="226" icon="cart" />
      </ScrollView>
      <View style={styles.detailsBlock}></View>
    </ScrollView>
  );
};

const InfoBlock = ({ label, stat, icon }) => (
  <View style={styles.infoBlock}>
    <Text style={styles.infoBlockTxtTop}>{label}</Text>
    <View style={styles.infoBlockInfo}>
      <Text style={styles.infoBlockTxtBottom}>{stat}</Text>
      <Ionicons name={icon} size={32} color="rgba(0,0,0,1)" />
    </View>
  </View>
);

export default StatsScreen;

const styles = StyleSheet.create({
  mainScrollView: {
    padding: 50,
  },
  infoBlock: {
    backgroundColor: "rgba(239,239,239,1)",
    borderRadius: 20,
    width: 266,
    height: 111,
    padding: 25,
    marginRight: "6%",
  },
  infoBlockTxtTop: {
    color: "rgba(155,155,155,1)",
    fontSize: 18,
    fontWeight: "600",
  },
  infoBlockTxtBottom: {
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    fontWeight: "600",
    marginRight: 10,
  },
  infoBlockInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsBlock: {
    backgroundColor: "rgba(239,239,239,1)",
    borderRadius: 20,
    width: "100%",
    marginTop: 50,
    height: 512,
  },
});
