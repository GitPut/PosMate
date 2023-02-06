import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function FeatureItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group3}>
        <View style={styles.rect2}>
          <View style={styles.rect4Stack}>
            <View style={styles.rect4}></View>
            <View style={styles.rect3}></View>
          </View>
        </View>
      </View>
      <Text style={styles.instantAccess}>
        {props.instantAccess || "Instant Access"}
      </Text>
      <Text style={styles.instantAccess1}>
        {props.instantAccess1 ||
          "With our software, you'll have immediate access to all the information you need to manage your business, including sales data, inventory levels, and customer information."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  group3: {
    width: 80,
    height: 80,
  },
  rect2: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
  },
  rect4: {
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    position: "absolute",
    borderWidth: 11,
    borderColor: "rgba(205,204,204,1)",
    backgroundColor: "rgba(255,255,255,1)",
  },
  rect3: {
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    position: "absolute",
    borderWidth: 11,
    borderColor: "rgba(205,204,204,1)",
  },
  rect4Stack: {
    width: 60,
    height: 60,
    marginTop: 12,
    marginLeft: 11,
  },
  instantAccess: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  instantAccess1: {
    color: "#121212",
    fontSize: 20,
    width: 295,
    height: 145,
    textAlign: "center",
  },
});

export default FeatureItem;
