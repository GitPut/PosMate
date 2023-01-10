import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { cartState, setCartState } from "state/state";
import { Switch } from "react-native-gesture-handler";

const DeliveryScreen = ({ setDeliveryModal, setOngoingDelivery, setName, setPhone, setAddress, name, phone, address, deliveryChecked, setDeliveryChecked }) => {

  return (
    <ScrollView style={styles.modalContainer}>
      <View style={styles.sizeRow}>
        <Text>Enter Phone Order Details</Text>
        <View>
          <Text>Delivery?</Text>
          <Switch
            value={deliveryChecked}
            onValueChange={() => {
              setDeliveryChecked(!deliveryChecked);
            }}
          />
        </View>
      </View>
      <TextInput
        label="Name"
        variant="outlined"
        style={styles.input}
        onChangeText={(val) => setName(val)}
        autoCorrect={false}
        value={name}
      />
      <TextInput
        label="Phone #"
        variant="outlined"
        style={styles.input}
        onChangeText={(val) => setPhone(val)}
        autoCorrect={false}
        value={phone}
      />
      {deliveryChecked && (
        <TextInput
          label="Address"
          variant="outlined"
          style={styles.input}
          onChangeText={(val) => setAddress(val)}
          autoCorrect={false}
          value={address}
        />
      )}
      <Button
        title="Order"
       // onPress={GetTrans}
       onPress={() => {setDeliveryModal(false);setOngoingDelivery(true)}}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
      <Button
        title="Cancel"
        onPress={() => {setDeliveryModal(false); setOngoingDelivery(null)}}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
    </ScrollView>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  halfRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  toppingsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 25,
  },
  touchable: {
    margin: 25,
  },
  modalContainer: {
    padding: 50,
  },
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 25,
    marginBottom: 25,
  },
});
