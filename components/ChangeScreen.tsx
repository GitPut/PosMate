import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { storeDetailState } from "state/state";

const ChangeScreen = ({
  setChangeModal,
  order,
  completeOrder,
  setcurrentOrder,
}) => {
  const total = order.total;
  const [cash, setCash] = useState("");
  const storeDetails = storeDetailState.use();

  const openCash = () => {
    const data = [
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      "\x0A",
      "Pickup Order Paid" + "\x0A", // text and line break
      `Transaction ID ${order.transNum}` + "\x0A",
      "\x0A",
      `Customer Name: ${order.customer.name}` + "\x0A", // text and line break
      "\x0A",
      `Customer Phone: ${order.customer.phone}` + "\x0A", // text and line break
      "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30", // left align
      `Total: $${total}` + "\x0A",
      `Cash Given: $${cash}` + "\x0A",
      `Change Due: $${(parseFloat(cash) - parseFloat(total)).toFixed(2)}` +
        "\x0A",
      "------------------------------------------" + "\x0A",
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      //"\x1D" + "\x56" + "\x00",
      "\x1D" + "\x56" + "\x30",
      "\x10" + "\x14" + "\x01" + "\x00" + "\x05",
    ];

    const qz = require("qz-tray");
    qz.websocket
      .connect()
      .then(function () {
        let config = qz.configs.create("storeDetails.comSelected");
        return qz.print(config, data);
      })
      .then(qz.websocket.disconnect)
      .catch(function (err) {
        console.error(err);
      });

    // fetch("http://localhost:8080/print", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     printData: data,
    //     comSelected: storeDetails.comSelected,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((respData) => {
    //     console.log(respData);
    //   })
    //   .catch((e) => alert("Error with printer"));

    completeOrder();
  };

  const CancelPayment = () => {
    setChangeModal(false);
    setcurrentOrder({ element: null, index: null });
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <View style={styles.sizeRow}>
        <Text>Cash Payment Details</Text>
      </View>
      <Text>Total: ${total}</Text>
      <TextInput
        label="Enter Cash Given"
        variant="outlined"
        style={styles.input}
        onChangeText={(val) => setCash(val)}
        autoCorrect={false}
        value={cash}
      />
      <Text>Change Due: {(parseFloat(cash) - total).toFixed(2)}</Text>
      <Button
        title="Finsh Payment"
        onPress={() => {
          openCash();
        }}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
      <Button
        title="Cancel"
        onPress={CancelPayment}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
    </ScrollView>
  );
};

export default ChangeScreen;

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
    width: 300,
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
