import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";

const ListTopping = ({ topping, AddTopping, RemoveTopping, item, pizza }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 5,
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
        onPress={() => RemoveTopping(topping)}
      />
      {/* <Text style={{ padding: 10 }}>{quantity} {topping}</Text> */}
      {pizza ? (
        <Text style={{ padding: 10 }}>
          {item.toppings2[topping]} {topping}
        </Text>
      ) : (
        <Text style={{ padding: 10 }}>
          {item.toppings[topping]} {topping}
        </Text>
      )}
      <Button
        title="+"
        style={{
          height: 30,
          width: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => AddTopping(topping)}
      />
    </View>
  );
};

export default ListTopping;

const styles = StyleSheet.create({});
