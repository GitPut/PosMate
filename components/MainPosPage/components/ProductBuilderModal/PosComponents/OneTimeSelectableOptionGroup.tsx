import React from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import OneTimeSelectableBtn from "./OneTimeSelectableBtn";
import { OptionsList } from "types/global";

interface OneTimeSelectableOptionGroupProps {
  isRequired: boolean;
  label: string;
  options: OptionsList[];
  value: OptionsList | null;
  setValue: (val: { option: OptionsList; listIndex: number | null }) => void;
}

function OneTimeSelectableOptionGroup({
  isRequired,
  label,
  options,
  value,
  setValue,
}: OneTimeSelectableOptionGroupProps) {
  const width = useWindowDimensions().width;

  const stylesGrid = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", // Fixed syntax
      gap: "10px",
      width: width > 800 ? "70%" : "100%",
    },
  };

  return (
    <View style={[width > 800 ? styles.container : styles.containerMobile]}>
      <Text style={width > 800 ? styles.lbl : styles.lblMobile}>
        {label} {isRequired ? "*" : ""}
      </Text>
      <div style={stylesGrid.gridContainer}>
        {options.map((option, listIndex) => {
          return (
            <OneTimeSelectableBtn
              key={option.id}
              label={
                option.priceIncrease ?? 0 > 0
                  ? `${option.label} (+$${option.priceIncrease})`
                  : option.label
              }
              style={styles.nonActiveOneTimeSelectableBtn}
              onPress={() => {
                setValue({
                  option: {
                    label: option.label,
                    priceIncrease:
                      option.priceIncrease !== null ? option.priceIncrease : '0',
                    id: option.id,
                  },
                  listIndex: listIndex,
                });
              }}
              isSelected={
                value
                  ? value.label === option.label
                  : option.selected
                  ? option.selected
                  : false
              }
            />
          );
        })}
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "stretch",
  },
  containerMobile: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  lbl: {
    fontWeight: "700",
    color: "#3e3f41",
    width: "25%",
  },
  lblMobile: {
    fontWeight: "700",
    color: "#3e3f41",
    width: "100%",
    marginBottom: 10,
  },
  optionsRow: {
    width: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activeOneTimeSelectableBtn: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
  nonActiveOneTimeSelectableBtn: {
    width: "100%",
    padding: 5,
    height: 33,
  },
  nonActiveOneTimeSelectableBtn1: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
  nonActiveOneTimeSelectableBtn2: {
    height: 33,
    width: 110,
    marginRight: 7,
    marginBottom: 15,
  },
});

export default OneTimeSelectableOptionGroup;
