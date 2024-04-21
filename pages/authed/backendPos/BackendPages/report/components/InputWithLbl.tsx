import React from "react";
import { StyleSheet, View, Text, TextInput, ViewStyle } from "react-native";

interface InputWithLblProps {
  style?: ViewStyle | ViewStyle[];
  value: string;
  setValue: (val: string) => void;
  lbl?: string;
  placeholder?: string;
}

function InputWithLbl({ style, value, setValue, lbl, placeholder }: InputWithLblProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.lbl}>{lbl}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(val) => setValue(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  lbl: {
    color: "#121212",
    fontSize: 16,
  },
  input: {
    width: 278,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#9b9b9b",
    padding: 10,
  },
});

export default InputWithLbl;
