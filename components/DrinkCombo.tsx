import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addCartState } from "state/state";
import { Button, TextInput, Text } from "@react-native-material/core";
import DropDown from "./DropDown";

const DrinkCombo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({
    name: "4 Can Pop Combo",
    price: 4.25,
    pops: [
      "Coke",
      "Crush",
      "Pepsi",
      "Diet Pepsi",
      "Diet Coke",
      "Ice Tea",
      "Root Beer",
      "Canada Dry",
      "Mountain Dew",
      "Fanta",
    ],
  });

  const AddToCart = () => {
    addCartState({
      name: "4 Can Pop Combo",
      price: item.price,
      quantity: 1,
      options: [
        `Pop: ${item.pop}`,
        `Pop: ${item.pop2}`,
        `Pop: ${item.pop3}`,
        `Pop: ${item.pop4}`,
      ],
    });
    setModalVisible(false);
    setItem({
      name: "4 Can Pop Combo",
      price: 4.25,
      pops: [
        "Coke",
        "Crush",
        "Pepsi",
        "Diet Pepsi",
        "Diet Coke",
        "Ice Tea",
        "Root Beer",
        "Canada Dry",
        "Mountain Dew",
        "Fanta",
      ],
    });
  };

  return (
    <>
      <Button
        title="4 Can Pop Combo"
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      />
      <Modal visible={modalVisible}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.sizeRow}>
            <Text>Price Before Tax: {item.price}</Text>
          </View>
          <DropDown
            label="Select 1st Pop"
            options={[
              "Coke",
              "Crush",
              "Pepsi",
              "Diet Pepsi",
              "Diet Coke",
              "Ice Tea",
              "Root Beer",
              "Canada Dry",
              "Mountain Dew",
              "Fanta",
            ]}
            setValue={(option) =>
              setItem((prevState) => ({ ...prevState, pop: option }))
            }
            value={item.pop}
            style={styles.dropDown}
          />
          <DropDown
            label="Select 2nd Pop"
            options={[
              "Coke",
              "Crush",
              "Pepsi",
              "Diet Pepsi",
              "Diet Coke",
              "Ice Tea",
              "Root Beer",
              "Canada Dry",
              "Mountain Dew",
              "Fanta",
            ]}
            setValue={(option) =>
              setItem((prevState) => ({ ...prevState, pop2: option }))
            }
            value={item.pop2}
            style={styles.dropDown}
          />
          <DropDown
            label="Select 3rd Pop"
            options={[
              "Coke",
              "Crush",
              "Pepsi",
              "Diet Pepsi",
              "Diet Coke",
              "Ice Tea",
              "Root Beer",
              "Canada Dry",
              "Mountain Dew",
              "Fanta",
            ]}
            setValue={(option) =>
              setItem((prevState) => ({ ...prevState, pop3: option }))
            }
            value={item.pop3}
            style={styles.dropDown}
          />
          <DropDown
            label="Select 4th Pop"
            options={[
              "Coke",
              "Crush",
              "Pepsi",
              "Diet Pepsi",
              "Diet Coke",
              "Ice Tea",
              "Root Beer",
              "Canada Dry",
              "Mountain Dew",
              "Fanta",
            ]}
            setValue={(option) =>
              setItem((prevState) => ({ ...prevState, pop4: option }))
            }
            value={item.pop4}
            style={styles.dropDown}
          />
          <Button title="Add To Cart" onPress={AddToCart} style={styles.btn} />
          <Button
            title="Close"
            onPress={() => setModalVisible(false)}
            style={styles.btn}
          />
        </ScrollView>
      </Modal>
    </>
  );
};

export default DrinkCombo;

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  modalContainer: {
    padding: 50,
  },
  btn: {
    marginBottom: 25,
  },
  dropDown: {
    marginBottom: 25,
  },
});
