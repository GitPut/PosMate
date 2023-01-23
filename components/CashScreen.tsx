import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { cartState, setCartState } from "state/state";
import { Switch } from "react-native-gesture-handler";

const CashScreen = ({ setCashModal, GetTrans, total, setChangeDue }) => {
  const [cash, setCash] = useState("");

  return (
    <ScrollView style={styles.modalContainer}>
      <View style={styles.sizeRow}>
        <Text>Cash Payment Details</Text>
      </View>
      <Text>Total: {total}</Text>
      <TextInput
        label="Enter Cash Given"
        variant="outlined"
        style={styles.input}
        onChangeText={(val) => {
          setCash(val);
          setChangeDue((parseFloat(val) - total).toFixed(2));
        }}
        autoCorrect={false}
        value={cash}
      />
      <Text>
        Change Due:{" "}
        {parseFloat(cash) > total && (parseFloat(cash) - total).toFixed(2)}
      </Text>
      <Button
        title="Print"
        onPress={() => {
          GetTrans("Cash");
          setCashModal(false);
        }}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
      <Button
        title="Cancel"
        onPress={() => setCashModal(false)}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
    </ScrollView>
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
