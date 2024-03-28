import { StyleSheet, Text, Pressable, View } from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HoverButton = ({ title, onPress }) => {
  const [hover, sethover] = useState(false);

  return (
    <button
      onClick={onPress}
      style={{
        width: "100%",
        backgroundColor: hover ? "lightblue" : "white",
        height: 40,
        textAlign: "left",
        paddingLeft: 14,
      }}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
    >
      {title}
    </button>
  );
};

const ProductOptionDropDown = ({ label, options, setValue, value, style }) => {
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={() => setShow((prevState) => !prevState)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderWidth: 1,
          borderRadius: 3,
          padding: 6,
          borderColor: show ? "lightblue" : "lightgrey",
          paddingLeft: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          {value
            ? `${value.label} (+$${
                value.priceIncrease !== null ? value.priceIncrease : 0
              })`
            : label}
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderLeftColor: "lightgrey",
            borderLeftWidth: 1,
            height: "80%",
            width: 30,
          }}
        >
          <Icon
            name={show ? "chevron-up" : "chevron-down"}
            size={25}
            color={show ? "grey" : "lightgrey"}
          />
        </View>
      </Pressable>
      {show && (
        <View
          style={{
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 3,
              height: 3,
            },
            elevation: 30,
            shadowOpacity: 0.1,
            shadowRadius: 10,
            borderRadius: 4,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "lightgrey",
          }}
        >
          {options.map((option, listIndex) => (
            <HoverButton
              key={listIndex}
              title={`${option.label}  (+$${
                option.priceIncrease !== null ? option.priceIncrease : 0
              })`}
              onPress={() => {
                setValue({
                  option: {
                    label: option.label,
                    priceIncrease:
                      option.priceIncrease !== null ? option.priceIncrease : 0,
                  },
                  listIndex: listIndex,
                });
                setShow(false);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductOptionDropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
