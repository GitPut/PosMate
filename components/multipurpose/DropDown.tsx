import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface DropDownProps {
  label: string;
  options: string[];
  setValue: (value: string) => void;
  value: string;
  style?: any;
}

const DropDown = ({ label, options, setValue, value, style }: DropDownProps) => {
  const [show, setShow] = useState(false);
  return (
    <View style={[styles.container, style]}>
      <ListItem
        title={value ? value : label}
        trailing={(props) => (
          <Icon name={show ? "chevron-up" : "chevron-down"} {...props} />
        )}
        onPress={() => setShow((prevState) => !prevState)}
      />
      {show && (
        <>
          {options.map((option, index) => (
            <ListItem
              key={index}
              title={option}
              onPress={() => {
                setValue(option);
                setShow(false);
              }}
            />
          ))}
        </>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
