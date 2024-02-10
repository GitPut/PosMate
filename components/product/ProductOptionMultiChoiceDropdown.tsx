import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@react-native-material/core";

const ProductOptionMultiChoiceDropdown = ({
  myObjProfile,
  setmyObjProfile,
  index,
  e,
}) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
      {e.optionsList.map((selection, listIndex) => {
        return (
          <View
            key={listIndex}
            style={[
              styles.multiOption,
              myObjProfile.options[index].optionsList[listIndex].selected ==
              true
                ? {
                    backgroundColor: "rgba(205,213,255,1)",
                    borderWidth: 2,
                    borderColor: "rgba(205,213,255,1)",
                  }
                : {
                    borderWidth: 2,
                    borderColor: "rgba(203,202,202,1)",
                  },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                title="-"
                style={{
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  const newMyObjProfile = structuredClone(myObjProfile);
                  //filter out all options[index].optionsList that have selectedTimes > 0 then map through and multiply by countsAs
                  const thisItemCountsAs = selection.countsAs
                    ? parseInt(selection.countsAs)
                    : 1;

                  if (
                    newMyObjProfile.options[index].optionsList[listIndex]
                      .selectedTimes > 0
                  ) {
                    newMyObjProfile.options[index].optionsList[
                      listIndex
                    ].selectedTimes -= 1 * thisItemCountsAs;
                  }

                  setmyObjProfile(newMyObjProfile);
                }}
              />
              <Text style={{ padding: 5 }}>
                {myObjProfile.options[index].optionsList[listIndex]
                  .selectedTimes > 0
                  ? `${
                      myObjProfile.options[index].optionsList[listIndex]
                        .selectedTimes
                    } x ${selection.label} ${
                      selection.priceIncrease
                        ? `(+$${selection.priceIncrease})`
                        : ""
                    }`
                  : `0 x ${selection.label} ${
                      selection.priceIncrease
                        ? `(+$${selection.priceIncrease})`
                        : ""
                    }`}
              </Text>
              <Button
                title="+"
                style={{
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  const newMyObjProfile = structuredClone(myObjProfile);
                  //filter out all options[index].optionsList that have selectedTimes > 0 then map through and multiply by countsAs

                  const selectedItems = newMyObjProfile.options[
                    index
                  ].optionsList.filter((op) => op.selectedTimes > 0);

                  const thisItemCountsAs = selection.countsAs
                    ? parseInt(selection.countsAs)
                    : 1;

                  let selectedTimesTotal = thisItemCountsAs;

                  selectedItems.map((op) => {
                    selectedTimesTotal += op.countsAs
                      ? parseInt(op.selectedTimes) * parseInt(op.countsAs)
                      : parseInt(op.selectedTimes);
                  });

                  if (
                    parseInt(e.numOfSelectable) >= selectedTimesTotal ||
                    !e.numOfSelectable ||
                    parseInt(e.numOfSelectable) === 0
                  ) {
                    console.log(
                      "selectedTimesTotal: ",
                      selectedTimesTotal,
                      " e.numOfSelectable: ",
                      e.numOfSelectable
                    );
                    if (
                      newMyObjProfile.options[index].optionsList[listIndex]
                        .selectedTimes
                    ) {
                      newMyObjProfile.options[index].optionsList[
                        listIndex
                      ].selectedTimes += 1;
                    } else {
                      newMyObjProfile.options[index].optionsList[
                        listIndex
                      ].selectedTimes = 1;
                    }
                    setmyObjProfile(newMyObjProfile);
                  } else {
                    console.log(
                      "Didnt Work ",
                      "selectedTimesTotal: ",
                      selectedTimesTotal,
                      " e.numOfSelectable: ",
                      e.numOfSelectable
                    );
                  }
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ProductOptionMultiChoiceDropdown;

const styles = StyleSheet.create({
  multiOption: {
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.03,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
    margin: 5,
    width: "32%",
  },
});
