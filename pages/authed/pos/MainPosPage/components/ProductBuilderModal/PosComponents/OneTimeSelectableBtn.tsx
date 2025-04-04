import React from "react";
import { StyleSheet, Pressable, Text, ViewStyle } from "react-native";

interface OneTimeSelectableBtnProps {
  style?: ViewStyle;
  label: string | null;
  isSelected: boolean;
  onPress: () => void;
}

function OneTimeSelectableBtn({
  style,
  label,
  isSelected,
  onPress,
}: OneTimeSelectableBtnProps) {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        isSelected
          ? { backgroundColor: "#1a2a51" }
          : { backgroundColor: "#EEF2FF" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.lbl,
          isSelected ? { color: "white" } : { color: "#28292c" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  lbl: {
    fontSize: 13,
  },
});

export default OneTimeSelectableBtn;
