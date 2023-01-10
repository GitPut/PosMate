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

const Pw = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({
    size: { name: "medium", price: 21.99 },
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
    wingSauce: null,
    pop: null,
    pop2: null,
    quantity: 1,
    crustOption: null,
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getPrice();
  }, [item]);

  const changeSize = (newSize) => {
    if (newSize === "medium") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "medium", price: 21.99 },
      }));
    }
    if (newSize === "large") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "large", price: 25.99 },
      }));
    }
    if (newSize === "extralarge") {
      setItem((prevState) => ({
        ...prevState,
        size: { name: "extralarge", price: 30.99 },
      }));
    }
  };

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

    cost += item.size.price;
    if (item.size.name === "medium") {
      cost += numberOfToppings > 3 && (numberOfToppings - 3) * 1.58;
    } else if (item.size.name === "large") {
      cost += numberOfToppings > 3 && (numberOfToppings - 3) * 1.99;
    } else if (item.size.name === "extralarge") {
      cost += numberOfToppings > 3 && (numberOfToppings - 3) * 2.5;
    }
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
      name: "COMBO 2 – Pizza & Wings",
      price: price.toFixed(2),
      quantity: item.quantity,
      options: [
        `Size: ${item.size.name}`,
        `Toppings: ${toppings}`,
        `wingSauce: ${item.wingSauce}`,
        `Pop: ${item.pop}`,
        `2nd Pop: ${item.pop2}`,
        `Crust Option: ${item.crustOption}`,
        'Cheese Bread'
      ],
    });
    setModalVisible(false);
    setItem({
      size: { name: "medium", price: 21.99 },
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
      wingSauce: null,
      pop: null,
      pop2: null,
      quantity: 1,
      crustOption: null,
    });
    setPrice(0);
  };

  return (
    <>
      <Button
        title="COMBO 2 – Pizza & Wings"
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      />
      <Modal visible={modalVisible}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.sizeRow}>
            <Text>Price Before Tax: {price.toFixed(2)}</Text>
            <View style={styles.halfRow}>
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
                title="extralarge"
                onPress={() => changeSize("extralarge")}
                style={
                  item.size.name === "extralarge" && {
                    backgroundColor: "black",
                  }
                }
              />
            </View>
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
          <DropDown
            label="Select Wing Sauce"
            options={["Hot Sauce", "Honey Garlic", "B.B.Q Sauce", "Mild Sauce"]}
            setValue={(option) =>
              setItem((prevState) => ({ ...prevState, wingSauce: option }))
            }
            value={item.wingSauce}
            style={styles.dropDown}
          />
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
            {/* <Text style={{ padding: 10 }}>{quantity} {topping}</Text> */}
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

export default Pw;

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
