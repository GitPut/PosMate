import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Touchable,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

function PendingOrderItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.customerDetailsContainer}>
        <View style={styles.orderNameContainer}>
          <Text style={styles.orderNameLbl}>Order Name:</Text>
          <Text style={styles.orderNameValue}>Peter</Text>
        </View>
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderNumberLabel}>Order Number:</Text>
          <Text style={styles.orderNumberValue}>12345</Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.orderInfoContainer}>
        <View style={styles.orderInfoTextGroup}>
          <Text style={styles.orderTypeLabel}>In-Store Order</Text>
          <Text style={styles.orderTime}>10:35 am</Text>
          <Text style={styles.orderDate}>15/02/24</Text>
        </View>
      </View>
      <View style={styles.orderOptionContainer}>
        <View style={styles.optionIconsRow}>
          <TouchableOpacity>
            <FeatherIcon name="edit" style={styles.editIcon}></FeatherIcon>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIconsIcon
              name="cancel"
              style={styles.cancelIcon}
            ></MaterialCommunityIconsIcon>
          </TouchableOpacity>
          <TouchableOpacity>
            <EntypoIcon name="check" style={styles.finishIcon}></EntypoIcon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  customerDetailsContainer: {
    width: 158,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  orderNameContainer: {
    width: 122,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 6,
  },
  orderNameLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  orderNameValue: {
    color: "#121212",
  },
  orderNumberContainer: {
    width: 122,
    height: 36,
    justifyContent: "flex-start",
    marginRight: 6,
  },
  orderNumberLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 13,
  },
  orderNumberValue: {
    color: "#121212",
    fontSize: 13,
  },
  divider: {
    width: 1,
    height: 53,
    backgroundColor: "rgba(0,0,0,1)",
  },
  orderInfoContainer: {
    width: 113,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  orderInfoTextGroup: {
    width: 96,
    height: 53,
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderTypeLabel: {
    fontWeight: "700",
    color: "#0529ff",
    fontSize: 13,
  },
  orderTime: {
    color: "#121212",
    fontSize: 13,
  },
  orderDate: {
    color: "#121212",
    fontSize: 13,
  },
  orderOptionContainer: {
    width: 143,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  optionIconsRow: {
    width: 98,
    height: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 22,
  },
  cancelIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 24,
  },
  finishIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
});

export default PendingOrderItem;
