import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ProductOptionDropDown = ({ label, options, setValue, value, style }) => {
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <ListItem
        title={
          value
            ? `${value.label} : $${
                value.priceIncrease !== null ? value.priceIncrease : 0
              }`
            : label
        }
        trailing={(props) => (
          <Icon name={show ? "chevron-up" : "chevron-down"} {...props} />
        )}
        onPress={() => setShow((prevState) => !prevState)}
      />
      {show && (
        <>
          {options.map((option, listIndex) => (
            <ListItem
              title={`${option.label} : $${
                option.priceIncrease !== null ? option.priceIncrease : 0
              }`}
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
        </>
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
