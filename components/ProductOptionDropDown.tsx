import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ProductOptionDropDown = ({ label, options, setValue, value, style }) => {
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <ListItem
        title={value ? `${value.label} : $${value.priceIncrease}` : label}
        trailing={(props) => (
          <Icon name={show ? "chevron-up" : "chevron-down"} {...props} />
        )}
        onPress={() => setShow((prevState) => !prevState)}
      />
      {show && (
        <>
          {options.map((option, listIndex) => (
            <ListItem
              title={`${option.label} : $${option.priceIncrease}`}
              onPress={() => {
                setValue({ option: option, listIndex: listIndex });
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
