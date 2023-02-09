import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Card = ({ icon, lbl, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rect2}>
        <MaterialCommunityIcons name={icon} style={styles.icon} />
      </View>
      <Text style={styles.prioritizeYourWork}>{lbl}</Text>
      <Text style={styles.prioritizeYourWork1}>{description}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#eff0f2",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.02,
    shadowRadius: 10,
    borderRadius: 15,
    justifyContent: "center",
    width: 350,
    height: 230,
    padding: 10,
  },
  rect2: {
    width: 40,
    height: 40,
    backgroundColor: "#eff8ff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginLeft: 25,
  },
  icon: {
    color: "#175cd3",
    fontSize: 20,
  },
  prioritizeYourWork: {
    fontWeight: "700",
    color: "#1f2a37",
    fontSize: 20,
    margin: 10,
    marginLeft: 25,
  },
  prioritizeYourWork1: {
    fontWeight: "500",
    color: "#525b65",
    fontSize: 16,
    margin: 10,
    width: 266,
    height: 71,
    marginLeft: 25,
  },
});
