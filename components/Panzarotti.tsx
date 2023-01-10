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
import { toppings } from "state/allItems";
import ListTopping from "./ListTopping";
import DropDown from "./DropDown";

const Panzarotti = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({
    price: 8.99,
    toppings: {
      Pepperoni: 0,
      Bacon: 0,
      Ham: 0,
      "Italian Sausage": 0,
      Salami: 0,
      "Ground Beef": 0,
      Chicken: 0,
      Anchovies: 0,
      "Bacon Strips": 0,
      Tomato: 0,
      "Red Onion": 0,
      "Green Olives": 0,
      Mushrooms: 0,
      "Green Peppers": 0,
      "Black Olives": 0,
      Onion: 0,
      Pineapple: 0,
      "Hot Peppers": 0,
      "Artichoke Hearts": 0,
      "Jalapino Peppers": 0,
      "Fresh Garlic": 0,
      Spinach: 0,
      "Red Peppers": 0,
      "Grilled Zucchini": 0,
      "Fried Eggplant": 0,
      "Fresh Basil": 0,
      "Caramelized Onion": 0,
      Mozzarella: 0,
      Cheddar: 0,
      Feta: 0,
      Parmigiano: 0,
      "Fior Di Latte": 0,
    },
    quantity: 1,
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getPrice();
  }, [item]);

  const AddTopping = (topping) => {
    setItem((prevState) => ({
      ...prevState,
      toppings: {
        ...prevState.toppings,
        [topping]: prevState.toppings[topping] + 1,
      },
    }));
  };

  const RemoveTopping = (topping) => {
    if (item.toppings[topping] < 1) return;
    setItem((prevState) => ({
      ...prevState,
      toppings: {
        ...prevState.toppings,
        [topping]: prevState.toppings[topping] - 1,
      },
    }));
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
    let numberOfToppings = 0;
    let cost = 0;

    for (const property in item.toppings) {
      numberOfToppings += item.toppings[property];
      // console.log(`${property}: ${item.toppings[property]}`);
    }

    cost += item.price;
    cost += numberOfToppings > 3 && (numberOfToppings - 3) * 1.11;
    setPrice(() => cost * item.quantity);
  };

  const AddToCart = () => {
    let toppings = [];

    for (const property in item.toppings) {
      if (item.toppings[property] > 0) {
        toppings.push(`${item.toppings[property]} ${property}`);
      }
      // console.log(`${property}: ${item.toppings[property]}`);
    }
    addCartState({
      name: "Panzarotti",
      price: price,
      quantity: item.quantity,
      options: [`Toppings: ${toppings}`],
    });
    setModalVisible(false);
    setItem({
      price: 8.99,
      toppings: {
        Pepperoni: 0,
        Bacon: 0,
        Ham: 0,
        "Italian Sausage": 0,
        Salami: 0,
        "Ground Beef": 0,
        Chicken: 0,
        Anchovies: 0,
        "Bacon Strips": 0,
        Tomato: 0,
        "Red Onion": 0,
        "Green Olives": 0,
        Mushrooms: 0,
        "Green Peppers": 0,
        "Black Olives": 0,
        Onion: 0,
        Pineapple: 0,
        "Hot Peppers": 0,
        "Artichoke Hearts": 0,
        "Jalapino Peppers": 0,
        "Fresh Garlic": 0,
        Spinach: 0,
        "Red Peppers": 0,
        "Grilled Zucchini": 0,
        "Fried Eggplant": 0,
        "Fresh Basil": 0,
        "Caramelized Onion": 0,
        Mozzarella: 0,
        Cheddar: 0,
        Feta: 0,
        Parmigiano: 0,
        "Fior Di Latte": 0,
      },
      quantity: 1,
    });
    setPrice(0);
  };

  return (
    <>
      <Button
        title="Panzarotti"
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      />
      <Modal visible={modalVisible}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.sizeRow}>
            <Text>3 Toppings Included:</Text>
          </View>
          <View style={styles.toppingsContainer}>
            {toppings.map((topping) => (
              <ListTopping
                topping={topping}
                AddTopping={(topping) => AddTopping(topping)}
                RemoveTopping={(topping) => RemoveTopping(topping)}
                item={item}
                key={topping}
              />
            ))}
          </View>
          <View style={styles.sizeRow}>
            <Text>Price Before Tax: {price}</Text>
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
              <Text style={{ padding: 10 }}>
                Order Quantity {item.quantity}
              </Text>
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

export default Panzarotti;

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
    margin: 25,
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
