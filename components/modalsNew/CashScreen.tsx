import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";

const CashScreen = ({ setCashModal, GetTrans, total, setChangeDue }) => {
  const [cash, setCash] = useState("");
  const { height, width } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setCashModal(false);
        }}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              setChangeDue((parseFloat(val) - total).toFixed(2));
            } else if (!val) {
              setCash("");
              setChangeDue(total);
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
            GetTrans("Cash");
            setCashModal(false);
          }}
          contentContainerStyle={styles.btn}
          style={{ margin: 25, backgroundColor: "#4050B5" }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setCashModal(false);
          }}
          contentContainerStyle={styles.btn}
          style={{ margin: 25, backgroundColor: "#4050B5" }}
        />
      </View>
    </>
  );
};

export default CashScreen;

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
