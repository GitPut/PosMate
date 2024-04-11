import {
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  View,
  TextInput,
  ViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Print from "components/MainPosPage/components/Cart/Print";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import {
  cartState,
  customersList,
  myDeviceDetailsState,
  storeDetailState,
} from "state/state";

const CustomcustomCashModal = () => {
  const { height, width } = useWindowDimensions();
  const { customCashModal } = posHomeState.use();
  const storeDetails = storeDetailState.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const [total, setTotal] = useState("");
  const [cash, setCash] = useState("");
  const [managerCodeEntered, setmanagerCodeEntered] = useState("");

  const Reset = () => {
    setTotal("");
    setCash("");
    setmanagerCodeEntered("");
  };

  const CompletePayment = () => {
    if (!myDeviceDetails.id) {
      alert("Please set up a device in Settings -> Devices");
      return;
    }
    if (
      (storeDetails.settingsPassword.length > 0 &&
        storeDetails.settingsPassword === managerCodeEntered) ||
      storeDetails.settingsPassword.length === 0
    ) {
      if (parseFloat(total) > 0 && parseFloat(cash) > 0) {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, [
              "\x1B" + "\x40", // init
              "                                                                              ", // line break
              "\x0A",
              "\x1B" + "\x61" + "\x31", // center align
              storeDetails.name,
              "\x0A",
              storeDetails.address?.label + "\x0A",
              storeDetails.website + "\x0A", // text and line break
              storeDetails.phoneNumber + "\x0A", // text and line break
              new Date().toLocaleDateString() + "\x0A",
              "\x0A",
              "Custom Cash Transaction" + "\x0A",
              "\x0A",
              "\x0A",
              "\x0A",
              "\x1B" + "\x61" + "\x30", // left align
              "Total: $" + total + "\x0A",
              "Cash Recieved: $" + cash + "\x0A",
              "Change Due: $" +
                (parseFloat(total) - parseFloat(cash)).toFixed(2),
              "\x0A", // line break
              "\x0A", // line break
              "\x0A", // line break
              "\x0A", // line break
              "\x0A", // line break
              "\x0A", // line break
              "\x1D" +
                "\x56" +
                "\x30" +
                "\x10" +
                "\x14" +
                "\x01" +
                "\x00" +
                "\x05",
            ]);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alert("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alert(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else {
              alert(
                "An error occured while trying to print. Try refreshing the page and trying again."
              );
            }
          });
        updatePosHomeState({ customCashModal: false });
        Reset();
      } else {
        alert("Please Enter Total Amount");
      }
    } else {
      alert("Incorrect Manager Code");
    }
  };

  const OpenRegister = () => {
    if (!myDeviceDetails.id) {
      alert("Please set up a device in Settings -> Devices");
      return;
    }
    if (
      (storeDetails.settingsPassword.length > 0 &&
        storeDetails.settingsPassword === managerCodeEntered) ||
      storeDetails.settingsPassword.length === 0
    ) {
      const qz = require("qz-tray");
      qz.websocket
        .connect()
        .then(function () {
          const config = qz.configs.create(myDeviceDetails.printToPrinter);
          return qz.print(config, [
            "\x1B" + "\x40", // init
            "                                                                              ", // line break
            "\x0A",
            "\x1B" + "\x61" + "\x31", // center align
            storeDetails.name,
            "\x0A",
            storeDetails.address?.label + "\x0A",
            storeDetails.website + "\x0A", // text and line break
            storeDetails.phoneNumber + "\x0A", // text and line break
            new Date().toLocaleDateString() + "\x0A",
            "\x0A",
            "Register Opened" + "\x0A",
            "\x0A",
            "\x0A",
            "\x0A",
            "\x1B" + "\x61" + "\x30", // left align
            "\x0A", // line break
            "\x0A", // line break
            "\x0A", // line break
            "\x0A", // line break
            "\x0A", // line break
            "\x0A", // line break
            "\x1D" +
              "\x56" +
              "\x30" +
              "\x10" +
              "\x14" +
              "\x01" +
              "\x00" +
              "\x05",
          ]);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          if (
            err.message.includes("A printer must be specified before printing")
          ) {
            alert("You must specify a printer in device settings");
          } else if (
            err.message.includes("Unable to establish connection with QZ")
          ) {
            alert(
              "You do not have Divine POS Helper installed. Please download from general settings"
            );
          } else {
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          }
        });
      updatePosHomeState({ customCashModal: false });
      Reset();
    } else {
      alert("Incorrect Manager Code");
    }
  };

  return (
    <Modal
      isVisible={customCashModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            updatePosHomeState({ customCashModal: false });
            Reset();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <Pressable>
            <div style={{ cursor: "default" }}>
              <View style={styles.container}>
                <Text style={styles.paymentDetailsLabel}>
                  Custom Payment Details
                </Text>
                <View style={styles.mainPartGroup}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={styles.changeDue}>Total:</Text>
                    <TextInput
                      style={styles.amountPaidTxtInput}
                      placeholder="Enter Total"
                      value={total}
                      onChangeText={(val) => {
                        const re = /^-?\d*\.?\d*$/;

                        if (re.test(val)) {
                          setTotal(val.toString());
                        } else if (!val) {
                          setTotal("");
                        }
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={styles.changeDue}>Recieved:</Text>
                    <TextInput
                      style={styles.amountPaidTxtInput}
                      placeholder="Enter Cash Recieved"
                      value={cash}
                      onChangeText={(val) => {
                        const re = /^-?\d*\.?\d*$/;

                        if (re.test(val)) {
                          setCash(val.toString());
                        } else if (!val) {
                          setCash("");
                        }
                      }}
                    />
                  </View>
                  <View style={styles.changeDueRow}>
                    <Text style={styles.changeDue}>Change Due:</Text>
                    <Text style={styles.changeDueValue}>
                      $
                      {parseFloat(cash) > 0 && parseFloat(total) > 0
                        ? (parseFloat(total) - parseFloat(cash)).toFixed(2)
                        : total}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={styles.changeDue}>Manager Code:</Text>
                    <TextInput
                      style={styles.amountPaidTxtInput}
                      placeholder="Enter Manger Code"
                      value={managerCodeEntered}
                      onChangeText={(val) => {
                        setmanagerCodeEntered(val);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.btnsGroup}>
                  <Pressable
                    style={styles.finishPaymentBtn}
                    onPress={() => {
                      CompletePayment();
                    }}
                  >
                    <Text style={styles.finishPayment}>Finish Payment</Text>
                  </Pressable>
                  <Pressable
                    style={styles.finishPaymentBtn}
                    onPress={() => {
                      OpenRegister();
                    }}
                  >
                    <Text style={styles.finishPayment}>Open Register</Text>
                  </Pressable>
                  <Pressable
                    style={styles.cancelBtn}
                    // onPress={() => setcustomCashModal(false)}
                    onPress={() => {
                      updatePosHomeState({ customCashModal: false });
                      Reset();
                    }}
                  >
                    <Text style={styles.cancel}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </div>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CustomcustomCashModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    width: 540,
    height: 609,
    backgroundColor: "white",
  },
  paymentDetailsLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
    marginTop: 55,
  },
  mainPartGroup: {
    width: 441,

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
    width: "60%",
  },
  changeDueRow: {
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 20,
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
    marginBottom: 20,
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
