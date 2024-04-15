import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import FieldInputWithLabel from "./FieldInputWithLabel";
import { useAlert } from "react-alert";
import { OrderDetailsState, setOrderDetailsState } from "state/state";

function PickupDetails() {
  const orderDetails = OrderDetailsState.use();
  const [localName, setlocalName] = useState(orderDetails.customer.name);
  const [localPhoneNumber, setlocalPhoneNumber] = useState(
    orderDetails.customer.phone
  );
  const alertP = useAlert();
  const { width } = useWindowDimensions();

  return (
    <>
      <View
        style={[styles.fieldsGroup, width < 1000 && { width: width * 0.9 }]}
      >
        <FieldInputWithLabel
          txtInput="Name"
          label="Name*"
          style={styles.nameField}
          value={localName}
          onChangeText={(text) => setlocalName(text)}
          textContentType="name"
          maxLength={25}
        />
        <FieldInputWithLabel
          txtInput="(123) 456-7890"
          label="Phone Number*"
          style={styles.addressField}
          value={localPhoneNumber}
          onChangeText={(text) => setlocalPhoneNumber(text)}
          textContentType="telephoneNumber"
          maxLength={10}
        />
      </View>
      <Pressable
        style={[
          styles.continueBtn,
          (localName === "" || localPhoneNumber === "") && { opacity: 0.8 },
        ]}
        disabled={localName === "" || localPhoneNumber === ""}
        onPress={() => {
          if (localName === "" || localPhoneNumber === "")
            return alertP.error("Please fill in all fields");
          setOrderDetailsState({
            customer: {
              ...orderDetails.customer,
              phone: localPhoneNumber,
              name: localName,
            },
            delivery: false,
          });
          setOrderDetailsState({ page: 4 });
        }}
      >
        <Text style={styles.continueBtnTxt}>CONTINUE</Text>
      </Pressable>
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
    width: "100%",
  },
  addressField: {
    height: 70,
    width: "100%",
  },
  buzzCodeAndPhoneRow: {
    width: "100%",
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
    marginTop: 20,
  },
  continueBtnTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default PickupDetails;
