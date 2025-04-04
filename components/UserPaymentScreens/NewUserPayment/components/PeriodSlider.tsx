import React, { useRef } from "react";
import { StyleSheet, View, Text, Pressable, Animated } from "react-native";

interface PeriodSliderProps {
  setpaymentTerm: (paymentTerm: string) => void;
  paymentTerm: string;
}

function PeriodSlider({ setpaymentTerm, paymentTerm }: PeriodSliderProps) {
  const x = useRef(
    new Animated.Value(paymentTerm === "monthly" ? 0 : 155)
  ).current;

  const handlePress = (term: string) => {
    Animated.spring(x, {
      toValue: term === "monthly" ? 0 : 155,
      useNativeDriver: false,
    }).start();
    setpaymentTerm(term);
  };

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={{
          backgroundColor: "#1c294e",
          borderRadius: 30,
          width: 166,
          height: 50,
          position: "absolute",
          left: x,
          zIndex: 1,
        }}
      />
      <View style={styles.periodLblRow}>
        <Pressable style={styles.btn} onPress={() => handlePress("monthly")}>
          <Text
            style={[
              styles.term,
              paymentTerm === "monthly" && { color: "white" },
            ]}
          >
            Monthly
          </Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => handlePress("yearly")}>
          <Text
            style={[
              styles.term,
              paymentTerm === "yearly" && { color: "white" },
            ]}
          >
            Annually
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 310,
  },
  periodLblRow: {
    height: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 10000,
  },
  term: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
  },
  btn: {
    width: 155,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PeriodSlider;
