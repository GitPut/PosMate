import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { auth, db } from "state/firebaseConfig";
import { updateTransList } from "state/firebaseFunctions";
import { myDeviceDetailsState, storeDetailState } from "state/state";
import { useAlert } from "react-alert";
import qz from "qz-tray";
import { CurrentOrderProp, OngoingListStateProp } from "types/global";

interface FinishPaymentCashProps {
  currentOrder: CurrentOrderProp;
  fadeIn: () => void;
  fadeOut: (customFuncAfter: boolean) => void;
  setcurrentOrder: Dispatch<SetStateAction<CurrentOrderProp>>;
  updateOrderHandler: (order: OngoingListStateProp) => void; // Add this line
}

function FinishPaymentCash({
  currentOrder,
  fadeOut,
  setcurrentOrder,
}: FinishPaymentCashProps) {
  const { element } = currentOrder;
  const total = element?.total ? element?.total : "0";
  const [cash, setCash] = useState("");
  const storeDetails = storeDetailState.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert();

  const PayByCash = () => {
    if (cash === "") {
      alertP.error("Please enter the amount of cash recieved");
      return;
    }
    if (parseFloat(cash) < parseFloat(total)) {
      alertP.error("The amount of cash recieved is less than the total");
      return;
    }
    const data = [
      "\x1B" + "\x40", // init
      "                                                                              ", // line break
      "\x0A",
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      "\x0A",
      "Pickup Order Paid" + "\x0A", // text and line break
      `Transaction ID ${element?.transNum}` + "\x0A",
      "\x0A",
      `Customer Name: ${element?.customer?.name}` + "\x0A", // text and line break
      "\x0A",
      `Customer Phone: ${element?.customer?.phone}` + "\x0A", // text and line break
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

    if (
      myDeviceDetails.sendPrintToUserID &&
      myDeviceDetails.useDifferentDeviceToPrint
    ) {
      // console.log("Sending print to different user");
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
          if (!myDeviceDetails.printToPrinter) {
            alertP.error("You must specify a printer in device settings");
            return;
          }
          const config = qz.configs.create(myDeviceDetails.printToPrinter);
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          if (
            err.message.includes("A printer must be specified before printing")
          ) {
            alertP.error("You must specify a printer in device settings");
          } else if (
            err.message.includes("Unable to establish connection with QZ")
          ) {
            alertP.error(
              "You do not have Divine POS Helper installed. Please download from general settings"
            );
          } else if (err.message.includes("Cannot find printer with name")) {
            alertP.error(
              "Printer not found. Please check your printer settings."
            );
          } else {
            alertP.error(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          }
        });
    } else {
      alertP.error(
        'Please set up a device and printer in "Settings -> Devices"'
      );
    }

    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("pendingOrders")
      .doc(currentOrder?.element?.id)
      .delete();
    if (!currentOrder.element) return;
    updateTransList(currentOrder.element);
    setcurrentOrder({ element: null, index: null, date: null });
  };

  const PayByCard = () => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("pendingOrders")
      .doc(currentOrder.element?.id)
      .delete();
    if (!currentOrder.element) return;
    updateTransList(currentOrder.element);
    setcurrentOrder({ element: null, index: null, date: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentDetailsLabel}>Payment Details</Text>
      <View style={styles.mainPartGroup}>
        <Text style={styles.orderTotal}>
          Total: ${parseFloat(total ?? "0").toFixed(2)}
        </Text>
        <TextInput
          style={styles.amountPaidTxtInput}
          placeholder="Enter Cash Recieved"
          value={cash}
          onChangeText={(val) => setCash(val)}
        />
        <View style={styles.changeDueRow}>
          <Text style={styles.changeDue}>Change Due:</Text>
          <Text style={styles.changeDueValue}>
            $
            {isNaN(parseFloat(cash))
              ? -total
              : (parseFloat(total) - parseFloat(cash)).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.btnsGroup}>
        <Pressable style={styles.finishPaymentBtn} onPress={PayByCash}>
          <Text style={styles.finishPayment}>Finish Payment</Text>
        </Pressable>
        <Pressable style={styles.payByCardBtn} onPress={PayByCard}>
          <Text style={styles.payByCard}>Pay By Card</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn} onPress={() => fadeOut(false)}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    width: 540,
    height: 609,
  },
  paymentDetailsLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
    marginTop: 55,
  },
  mainPartGroup: {
    width: 441,
    height: 157,
    justifyContent: "space-between",
    marginTop: 20,
  },
  orderTotal: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 23,
  },
  amountPaidTxtInput: {
    height: 53,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    padding: 10,
    width: "100%",
  },
  changeDueRow: {
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  changeDue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
    marginRight: 10,
  },
  changeDueValue: {
    color: "#121212",
    fontSize: 18,
  },
  btnsGroup: {
    width: 283,
    height: 185,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  finishPaymentBtn: {
    width: 283,
    height: 44,
    backgroundColor: "#1d284e",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  finishPayment: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  payByCardBtn: {
    width: 283,
    height: 44,
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  payByCard: {
    fontWeight: "700",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
  },
  cancelBtn: {
    width: 283,
    height: 44,
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    fontWeight: "700",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
  },
});

export default FinishPaymentCash;
