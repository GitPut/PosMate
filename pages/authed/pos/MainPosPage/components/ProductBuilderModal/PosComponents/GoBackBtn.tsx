import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface GoBackBtnProps {
  onPress: () => void;
}

function GoBackBtn({ onPress }: GoBackBtnProps) {
  return (
    <Pressable style={[styles.container]} onPress={onPress}>
      <Entypo name="chevron-left" style={styles.backIcon} />
      <Text style={styles.lbl}>Go Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 32,
    width: 120,
  },
  backIcon: {
    color: "#070707",
    fontSize: 40,
  },
  lbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
});

export default GoBackBtn;
