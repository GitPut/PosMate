import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

interface GeneralInputWithLabelProps {
  lbl: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  CustomInput?: React.FC;
  onBlur?: () => void;
}

function GeneralInputWithLabel({
  lbl,
  placeholder,
  value,
  onChangeText,
  CustomInput,
  onBlur,
}: GeneralInputWithLabelProps) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.storeName}>{lbl}</Text>
      {!CustomInput ? (
        <TextInput
          style={styles.uRlBox1}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      ) : (
        <CustomInput />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: 80,
    width: "100%",
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

export default GeneralInputWithLabel;
