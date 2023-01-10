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

const SpecialtyItem = ({ pizza }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({
    size: { name: "small", price: pizza.size.small },
    quantity: 1,
    crustOption: null,
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getPrice();
  }, [item]);

  const changeSize = (newSize) => {
    if (newSize === "small") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "small", price: pizza.size.small },
      }));
    }
    if (newSize === "medium") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "medium", price: pizza.size.medium },
      }));
    }
    if (newSize === "large") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "large", price: pizza.size.large },
      }));
    }
    if (newSize === "extraLarge") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "extraLarge", price: pizza.size.extraLarge },
      }));
    }
  };

  const AddQuantity = () => {
    setItem((prevState) => ({
      ...prevState,
      quantity: item.quantity + 1,
    }));
  };

  const RemoveQuantity = () => {
    if (item.quantity === 1) return;
    setItem((prevState) => ({
      ...prevState,
      quantity: item.quantity - 1,
    }));
  };

  const getPrice = () => {
    setPrice(() => item.size.price * item.quantity);
  };

  const AddToCart = () => {
    addCartState({
      name: pizza.name,
      price: price,
      quantity: item.quantity,
      options: [`Size: ${item.size.name}`, `Crust Option: ${item.crustOption}`],
    });
    setModalVisible(false);
    setItem({
      size: { name: "small", price: pizza.size.small },
      quantity: 1,
      crustOption: null,
    });
    setPrice(0);
  };

  return (
    <>
      <Button
        title={pizza.name}
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      />
      <Modal visible={modalVisible}>
        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={{ justifyContent: "space-evenly", flex: 1 }}
        >
          <View style={styles.sizeRow}>
            <Text>Price Before Tax: {price}</Text>
            <View style={styles.halfRow}>
              <Button
                title="small"
                onPress={() => changeSize("small")}
                style={
                  item.size.name === "small" && { backgroundColor: "black" }
                }
              />
              <Button
                title="medium"
                onPress={() => changeSize("medium")}
                style={
                  item.size.name === "medium" && { backgroundColor: "black" }
                }
              />
              <Button
                title="large"
                onPress={() => changeSize("large")}
                style={
                  item.size.name === "large" && { backgroundColor: "black" }
                }
              />
              <Button
                title="extraLarge"
                onPress={() => changeSize("extraLarge")}
                style={
                  item.size.name === "extraLarge" && {
                    backgroundColor: "black",
                  }
                }
              />
            </View>
          </View>
          <DropDown
            label="Crust Option"
            options={[
              "Thin Crust",
              "Thick Crust",
              "Light On Cheese",
              "No Cheese",
              "Well Done",
              "No Sauce",
              "Extra Sauce",
            ]}
            setValue={(option) =>
              setItem((prevState) => ({ ...prevState, crustOption: option }))
            }
            value={item.crustOption}
            style={styles.dropDown}
          />
          <View
            style={{
              flexDirection: "row",
              marginBottom: 25,
              alignItems: "center",
            }}
          >
            <Button
              title="-"
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={RemoveQuantity}
            />
            <Text style={{ padding: 10 }}>Order Quantity {item.quantity}</Text>
            <Button
              title="+"
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={AddQuantity}
            />
          </View>
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

export default SpecialtyItem;

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
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
