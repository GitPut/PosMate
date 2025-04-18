import React from "react";
import { StyleSheet, View, Text, TextInput, ViewStyle } from "react-native";

interface InputWithLabelProps {
  lbl: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle | ViewStyle[];
}

function InputWithLabel({
  lbl,
  placeholder,
  value,
  onChangeText,
  style,
}: InputWithLabelProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.storeName}>{lbl}</Text>
      <TextInput
        style={styles.uRlBox1}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  storeName: {
    fontWeight: "700",
    color: "#020202",
    fontSize: 17,
    height: 20,
    alignSelf: "stretch",
  },
  uRlBox1: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9b9b9b",
    padding: 10,
  },
});

export default InputWithLabel;
