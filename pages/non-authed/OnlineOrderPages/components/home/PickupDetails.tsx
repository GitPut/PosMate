import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FieldInputWithLabel from "./FieldInputWithLabel";

function PickupDetails({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
}) {
  return (
    <>
      <View style={styles.fieldsGroup}>
        <FieldInputWithLabel
          txtInput="Name"
          label="Name*"
          style={styles.nameField}
          value={orderDetails.customer.name}
          onChangeText={(text) =>
            setorderDetails({
              ...orderDetails,
              customer: { ...orderDetails.customer, name: text },
            })
          }
        ></FieldInputWithLabel>
        <FieldInputWithLabel
          txtInput="(123) 456-7890"
          label="Phone Number*"
          style={styles.addressField}
          value={orderDetails.customer.phone}
          onChangeText={(text) =>
            setorderDetails({
              ...orderDetails,
              customer: { ...orderDetails.customer, phone: text },
            })
          }
        ></FieldInputWithLabel>
      </View>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => {
          if (
            orderDetails.customer.name === "" ||
            orderDetails.customer.phone === ""
          )
            return alert("Please fill in all fields");
          setpage(2);
        }}
      >
        <Text style={styles.continueBtnTxt}>CONTINUE</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fieldsGroup: {
    width: 380,
    height: 179,
    justifyContent: "space-between",
  },
  nameField: {
    height: 70,
    width: 380,
  },
  addressField: {
    height: 70,
    width: 380,
  },
  buzzCodeAndPhoneRow: {
    width: 380,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buzzCodeField: {
    height: 70,
    width: 175,
  },
  phoneNumberField: {
    height: 70,
    width: 175,
  },
  continueBtn: {
    width: 219,
    height: 60,
    backgroundColor: "rgba(238,125,67,1)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  continueBtnTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default PickupDetails;
