import {
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";

const CashScreen = ({ setCashModal, GetTrans, total, setChangeDue }) => {
  const [cash, setCash] = useState("");
  const { height, width } = useWindowDimensions();

  return (
    <Pressable
      onPress={() => setCashModal(false)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <Text style={styles.paymentDetailsLabel}>Payment Details</Text>
            <View style={styles.mainPartGroup}>
              <Text style={styles.orderTotal}>Total: ${total}</Text>
              <TextInput
                style={styles.amountPaidTxtInput}
                placeholder="Enter Cash Recieved"
                value={cash}
                onChangeText={(val) => {
                  const re = /^-?\d*\.?\d*$/;

                  if (re.test(val)) {
                    setCash(val.toString());
                    setChangeDue((parseFloat(val) - total).toFixed(2));
                  } else if (!val) {
                    setCash("");
                    setChangeDue(total);
                  }
                }}
              />
              <View style={styles.changeDueRow}>
                <Text style={styles.changeDue}>Change Due:</Text>
                <Text style={styles.changeDueValue}>
                  $
                  {parseFloat(cash) > 0
                    ? (total - parseFloat(cash)).toFixed(2)
                    : total}
                </Text>
              </View>
            </View>
            <View style={styles.btnsGroup}>
              <Pressable
                style={styles.finishPaymentBtn}
                onPress={() => {
                  GetTrans("Cash");
                  setCashModal(false);
                }}
              >
                <Text style={styles.finishPayment}>Finish Payment</Text>
              </Pressable>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setCashModal(false)}
              >
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
};

export default CashScreen;

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
    height: 120,
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
