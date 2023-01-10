import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addCartState } from "state/state";
import { Button, TextInput, Text, Switch } from "@react-native-material/core";
import { toppings } from "state/allItems";
import ListTopping from "./ListTopping";
import DropDown from "./DropDown";

const GlutenFreePizza = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({
    size: { name: "medium", price: 13.99 },
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
    toppings2: {
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
    crustOption: null,
  });
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getPrice();
  }, [item]);

  const ResetItem = () =>
    setItem((prevState) => ({
      ...prevState,
      toppings2: {
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
    }));

  const AddTopping = (topping, pizza) => {
    if (pizza === 2) {
      setItem((prevState) => ({
        ...prevState,
        toppings2: {
          ...prevState.toppings2,
          [topping]: prevState.toppings2[topping] + 1,
        },
      }));
    } else {
      setItem((prevState) => ({
        ...prevState,
        toppings: {
          ...prevState.toppings,
          [topping]: prevState.toppings[topping] + 1,
        },
      }));
    }
  };

  const RemoveTopping = (topping, pizza) => {
    if (item.toppings[topping] < 1) return;
    if (pizza === 2) {
      setItem((prevState) => ({
        ...prevState,
        toppings2: {
          ...prevState.toppings2,
          [topping]: prevState.toppings2[topping] - 1,
        },
      }));
    } else {
      setItem((prevState) => ({
        ...prevState,
        toppings: {
          ...prevState.toppings,
          [topping]: prevState.toppings[topping] - 1,
        },
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
    let numberOfToppings = 0;
    let cost = 0;

    for (const property in item.toppings) {
      numberOfToppings += item.toppings[property];
      numberOfToppings += item.toppings2[property];
      // console.log(`${property}: ${item.toppings[property]}`);
    }

    cost += item.size.price;
    cost += numberOfToppings > 3 && (numberOfToppings - 3) * 1.58;
    setPrice(() => cost * item.quantity);
  };

  const AddToCart = () => {
    let toppings = [];
    let toppings2 = [];

    for (const property in item.toppings) {
      if (item.toppings[property] > 0) {
        toppings.push(`${item.toppings[property]} ${property}`);
      }
      // console.log(`${property}: ${item.toppings[property]}`);
    }

    for (const property in item.toppings2) {
      if (item.toppings2[property] > 0) {
        toppings2.push(`${item.toppings2[property]} ${property}`);
      }
      // console.log(`${property}: ${item.toppings[property]}`);
    }
    if (toppings2.length > 0) {
      addCartState({
        name: "Gluten Free Pizza",
        price: price.toFixed(2),
        quantity: item.quantity,
        options: [
          `Size: ${item.size.name}`,
          `Half Toppings: ${toppings}`,
          `Other Half Toppings: ${toppings2}`,
          `Crust Option: ${item.crustOption}`,
        ],
      });
    } else {
      addCartState({
        name: "Gluten Free Pizza",
        price: price.toFixed(2),
        quantity: item.quantity,
        options: [
          `Size: ${item.size.name}`,
          `Toppings: ${toppings}`,
          `Crust Option: ${item.crustOption}`,
        ],
      });
    }
    setModalVisible(false);
    setItem({
      size: { name: "medium", price: 13.99 },
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
      toppings2: {
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
      crustOption: null,
    });
    setChecked(false);
    setPrice(0);
  };

  return (
    <>
      <Button
        title="Gluten Free Pizza"
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      />
      <Modal visible={modalVisible}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.sizeRow}>
            <Text>Price Before Tax: {price.toFixed(2)}</Text>
            <Text>Pizza Topping Half/Half</Text>
            <Switch
              value={checked}
              onValueChange={() => {
                setChecked(!checked);
                if (!checked === false) ResetItem();
              }}
            />
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
          {checked && (
            <View style={styles.toppingsContainer}>
              {toppings.map((topping) => (
                <ListTopping
                  topping={topping}
                  AddTopping={(topping) => AddTopping(topping, 2)}
                  RemoveTopping={(topping) => RemoveTopping(topping, 2)}
                  item={item}
                  pizza={2}
                  key={topping}
                />
              ))}
            </View>
          )}
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

export default GlutenFreePizza;

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
