import React from "react";
import { StyleSheet, Text, Pressable, ViewStyle } from "react-native";

interface PercentageBtnProps {
  percentageAmount: string;
  style?: ViewStyle;
  isSelected: boolean;
  onPress: () => void;
}

function PercentageBtn({
  percentageAmount,
  style,
  isSelected,
  onPress,
}: PercentageBtnProps) {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        isSelected
          ? { backgroundColor: "#1c294e" }
          : { backgroundColor: "#edf1fe" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.percentageAmount,
          isSelected ? { color: "white" } : { color: "black" },
        ]}
      >
        {percentageAmount}
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
  percentageAmount: {
    fontWeight: "700",
    fontSize: 12,
  },
});

export default PercentageBtn;
