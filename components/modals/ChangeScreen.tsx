import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { myDeviceDetailsState, storeDetailState } from "state/state";
import { auth, db } from "state/firebaseConfig";

const ChangeScreen = ({
  setChangeModal,
  order,
  completeOrder,
  setcurrentOrder,
  setongoingOrderListModal,
}) => {
  const total = order?.total ? order?.total : 0;
  const [cash, setCash] = useState("");
  const storeDetails = storeDetailState.use();
  const { height, width } = useWindowDimensions();
  const myDeviceDetails = myDeviceDetailsState.use();

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

    if (
      myDeviceDetails.sendPrintToUserID &&
      myDeviceDetails.useDifferentDeviceToPrint
    ) {
      console.log("Sending print to different user");
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("devices")
        .doc(myDeviceDetails.sendPrintToUserID.value)
        .collection("printRequests")
        .add({
          printData: data,
        });
    } else if (myDeviceDetails.printToPrinter) {
      qz.websocket
        .connect()
        .then(function () {
          const config = qz.configs.create(myDeviceDetails.printToPrinter);
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          // console.error(err);
          alert(
            "An error occured while trying to print. Try refreshing the page and trying again."
          );
        });
    } else {
      alert('Please set up a device and printer in "Settings -> Devices"');
    }

    completeOrder();
  };

  const CancelPayment = () => {
    setChangeModal(false);
    setcurrentOrder({ element: null, index: null });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          CancelPayment();
          setongoingOrderListModal(false);
        }}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: width,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 30,
          shadowColor: "rgba(0,0,0,1)",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          elevation: 30,
          shadowOpacity: 0.57,
          shadowRadius: 10,
          height: height * 0.7,
          width: height * 0.7,
          padding: 40,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <View style={styles.sizeRow}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Payment Details
          </Text>
        </View>
        <Text>Total: ${total}</Text>
        <TextInput
          color="black"
          label="Enter Cash Given"
          variant="outlined"
          style={styles.input}
          onChangeText={(val) => {
            const re = /^-?\d*\.?\d*$/;

            if (re.test(val)) {
              setCash(val.toString());
            } else if (!val) {
              setCash("");
            }
          }}
          autoCorrect={false}
          value={cash}
        />
        <Text>
          Change Due:{" "}
          {(parseFloat(cash.length > 0 ? cash : 0) - total).toFixed(2)}
        </Text>
        <Button
          title="Finsh Payment"
          onPress={() => {
            openCash();
          }}
          contentContainerStyle={styles.btn}
          style={{ margin: 25, backgroundColor: "#4050B5" }}
        />
        {order?.method === "pickupOrder" && (
          <Button
            title="Pay By Card"
            onPress={() => {
              completeOrder();
            }}
            contentContainerStyle={styles.btn}
            style={{ margin: 25, backgroundColor: "#4050B5" }}
          />
        )}
        <Button
          title="Cancel"
          onPress={CancelPayment}
          contentContainerStyle={styles.btn}
          style={{ margin: 25, backgroundColor: "#4050B5" }}
        />
      </View>
    </>
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
