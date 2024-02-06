import { Text, View } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import { addCartState, cartState, setCartState } from "state/state";

type ListItemProps = {
  item: any;
};

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const cart = cartState.use();

  const ChangeQuantity = (increment) => {
    let found = false;

    const object = cart.filter((e) => e.name === item.name);

    if (object.length > 0) {
      if (object[0]?.quantity + increment === 0) {
        const val = cart.filter((e) => e.name !== object[0]?.name);
        setCartState(val);
        found = true;
      } else {
        const val = cart.filter((e) => e.name !== object[0]?.name);
        setCartState(val);
        addCartState(
          object[0]?.name,
          object[0]?.price + increment * item.price,
          object[0]?.quantity + increment
        );
      }
    } else if (object.length + increment > 0) {
      addCartState({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: 250,
        justifyContent: "space-between",
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
        onPress={() => ChangeQuantity(-1)}
      />
      <Text style={{ padding: 10 }}>{item.name}</Text>
      <Button
        title="+"
        style={{
          height: 30,
          width: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => ChangeQuantity(1)}
      />
    </View>
  );
};

export default ListItem;
