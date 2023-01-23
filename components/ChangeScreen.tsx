import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";

const ChangeScreen = ({ setChangeModal }) => {
  const [total, setTotal] = useState("");
  const [cash, setCash] = useState("");

  const openCash = () => {
    const qz = require("qz-tray");
    qz.websocket
      .connect()
      .then(function () {
        let config = qz.configs.create("jZebra");
        return qz.print(config, [
          "\x1B" + "\x40", // init
          "\x1B" + "\x61" + "\x31", // center align
          "Tomas Pizza",
          "\x0A",
          "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
          "www.dreamcitypizza.com" + "\x0A", // text and line break
          "(519) 650-0409" + "\x0A", // text and line break
          "\x0A",
          "\x0A",
          "\x0A",
          "\x0A",
          "\x1B" + "\x61" + "\x30", // left align
          `Total: $${total}` + "\x0A",
          `Cash Given: $${cash}` + "\x0A",
          `Change Due: $${(parseFloat(cash) - total).toFixed(2)}` + "\x0A",
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
        ]);
      })
      .then(qz.websocket.disconnect)
      .catch(function (err) {
        console.error(err);
      });
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <View style={styles.sizeRow}>
        <Text>Cash Payment Details</Text>
      </View>
      <TextInput
        label="Enter Total"
        variant="outlined"
        style={styles.input}
        onChangeText={(val) => setTotal(val)}
        autoCorrect={false}
        value={total}
      />
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
        title="Open Cash"
        onPress={() => {
          openCash();
          setChangeModal(false);
        }}
        contentContainerStyle={styles.btn}
        style={{ margin: 25 }}
      />
      <Button
        title="Cancel"
        onPress={() => setChangeModal(false)}
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
