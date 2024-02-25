import React, { memo } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

type FieldInputWithLabelProps = {
  style?: object;
  label?: string;
  customInput?: React.ComponentType<any>;
  customInputProps?: object;
  txtInput?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const FieldInputWithLabel = memo((props: FieldInputWithLabelProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>{props.label || "Label"}</Text>
      {props.customInput ? (
        React.createElement(props.customInput, {
          ...props.customInputProps,
        })
      ) : (
        <TextInput
          placeholder={props.txtInput || "Placeholder"}
          placeholderTextColor="#b9b9b9"
          selectionColor="rgba(185,185,185,1)"
          style={styles.txtInput}
          value={props.value}
          onChangeText={props.onChangeText}
        />
      )}
    </View>
  );
}, areEqual);

FieldInputWithLabel.displayName = "FieldInputWithLabel";

function areEqual(
  prevProps: FieldInputWithLabelProps,
  nextProps: FieldInputWithLabelProps
) {
  return prevProps.value === nextProps.value;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  label: {
    color: "rgba(255,255,255,1)",
    fontSize: 13,
    fontWeight: "700",
  },
  txtInputContainer: {
    height: 51,
    backgroundColor: "#f4f4f4",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  txtInput: {
    color: "#121212",
    height: 51,
    fontSize: 13,
    alignSelf: "stretch",
    padding: 14,
    backgroundColor: "#f4f4f4",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FieldInputWithLabel;
