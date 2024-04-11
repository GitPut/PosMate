import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

function OptionSelectionItem({
  style,
  eInnerListStart,
  indexInnerList,
  testMap,
  settestMap,
  newProductOptions,
  setnewProductOptions,
  index,
  setmoveToOptionPos,
  highlightedOptionID,
  sethighlightedOptionID,
  scrollToPositionIncluding,
  optionType,
}) {
  const eInnerList = structuredClone(eInnerListStart);

  return (
    <View
      style={[
        styles.container,
        style,
        highlightedOptionID === eInnerList.id
          ? {
              borderBottomColor: "#4CAF50",
              borderBottomWidth: 2,
              paddingBottom: 20,
              paddingTop: 20,
            }
          : {
              borderBottomColor: "#d3d3d3",
              borderBottomWidth: 2,
              paddingBottom: 20,
              paddingTop: 20,
            },
      ]}
    >
      {/* <View
          style={{ height: 50, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            style={{
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
            }}
            onPress={() => {
              const cloneOuter = structuredClone(testMap);
              cloneOuter.map((e) => (e.selected = false));
              cloneOuter[indexInnerList].selected = !eInnerList.selected;
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].optionsList = cloneOuter;
                return clone;
              });
              settestMap(cloneOuter);
            }}
          >
            {eInnerList.selected && (
              <Text style={{ fontSize: 20, color: "black" }}>X</Text>
            )}
          </Pressable>
        </View> */}
      <View
        style={
          // newProductOptions[index]?.numOfSelectable > 1
          //   ? styles.optionSelectionNameInputGroupLimit
          //   : styles.optionSelectionNameInputGroup
          styles.optionSelectionNameInputGroup
        }
      >
        <Text style={styles.selectionNameInputLbl}>Option Selection Name</Text>
        <TextInput
          style={styles.selectionNameInput}
          onChangeText={(val) => {
            const cloneOuter = structuredClone(testMap);
            cloneOuter[indexInnerList].label = val;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].optionsList = cloneOuter;
              return clone;
            });
            settestMap(cloneOuter);
          }}
          value={eInnerList?.label}
          placeholder="Enter Name (Ex: Small, Pepperoni, Extra Cheese) "
        />
      </View>
      <View
        style={
          // newProductOptions[index]?.numOfSelectable > 0
          //   ? styles.selectionPriceIncreaseInputGroupLimit
          //   : styles.selectionPriceIncreaseInputGroup
          styles.selectionPriceIncreaseInputGroup
        }
      >
        <Text style={styles.selectionPriceIncreaseLbl}>Price Increase</Text>
        <TextInput
          style={styles.selectionPriceIncreaseInput}
          onChangeText={(val) => {
            const re = /^-?\d*\.?\d*$/;

            // if value is not blank, then test the regex

            if (val === "" || re.test(val)) {
              const cloneOuter = structuredClone(testMap);
              cloneOuter[indexInnerList].priceIncrease = val;
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].optionsList = cloneOuter;
                return clone;
              });
              settestMap(cloneOuter);
            }
          }}
          value={eInnerList?.priceIncrease ? eInnerList.priceIncrease : ""}
          placeholder="Enter If Price Increases With Selection"
        />
      </View>
      {/* {newProductOptions[index].numOfSelectable > 1 && (
        <View style={styles.selectionLimitInputGroupLimit}>
          <Text style={styles.limit}>Limit</Text>
          <TextInput
            style={styles.selectionLimitInput}
            placeholder="Enter limit"
            value={eInnerList.numOfSelectable ? eInnerList.numOfSelectable : ""}
            onChangeText={(val) => {
              const re = /^-?\d*\.?\d*$/;

              // if value is not blank, then test the regex

              if (val === "" || re.test(val)) {
                const cloneOuter = structuredClone(testMap);
                cloneOuter[indexInnerList].numOfSelectable = val;
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  clone[index].optionsList = cloneOuter;
                  return clone;
                });
                settestMap(cloneOuter);
              }
            }}
          />
        </View>
      )} */}
      <View style={styles.btnsRow}>
        <Pressable
          activeOpacity={0.8}
          style={styles.moveDownBtn}
          onPress={() => {
            if (testMap.length > 1 && indexInnerList !== testMap.length - 1) {
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                const f = clone[index].optionsList.splice(indexInnerList, 1)[0];
                clone[index].optionsList.splice(indexInnerList + 1, 0, f);
                settestMap(clone[index].optionsList);
                sethighlightedOptionID(eInnerList.id);
                // setmoveToOptionPos(indexInnerList + 1);
                scrollToPositionIncluding(135);
                return clone;
              });
            }
          }}
        >
          <Entypo name="chevron-down" style={styles.chevronDown} />
        </Pressable>
        <Pressable
          activeOpacity={0.8}
          style={styles.moveUpBtn}
          onPress={() => {
            if (testMap.length > 1 && indexInnerList !== 0) {
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                const f = clone[index].optionsList.splice(indexInnerList, 1)[0];
                clone[index].optionsList.splice(indexInnerList - 1, 0, f);
                settestMap(clone[index].optionsList);
                sethighlightedOptionID(eInnerList.id);
                // setmoveToOptionPos(indexInnerList - 1);
                scrollToPositionIncluding(-135);
                return clone;
              });
            }
          }}
        >
          <Entypo name="chevron-up" style={styles.chevronUp} />
        </Pressable>
        <Pressable
          style={styles.deleteBtn}
          onPress={() => {
            const cloneOuter = structuredClone(testMap);
            cloneOuter.splice(indexInnerList, 1);
            // newProductOptions.current[index].optionsList = clone;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].optionsList = cloneOuter;
              return clone;
            });
            settestMap(cloneOuter);
            if (indexInnerList !== 0) {
              setmoveToOptionPos(indexInnerList - 1);
            }
            sethighlightedOptionID(eInnerList.id);
            scrollToPositionIncluding(0);
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            style={styles.deleteIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  optionSelectionNameInputGroup: {
    width: 290,
    height: 84,
    justifyContent: "space-between",
  },
  selectionNameInputLbl: {
    color: "#121212",
    fontSize: 17,
  },
  selectionNameInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    padding: 10,
  },
  selectionPriceIncreaseInputGroup: {
    width: 199,
    height: 84,
    justifyContent: "space-between",
  },
  selectionPriceIncreaseLbl: {
    color: "#121212",
    fontSize: 17,
  },
  selectionPriceIncreaseInput: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    alignSelf: "stretch",
    padding: 10,
  },
  btnsRow: {
    width: 180,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 0,
    marginLeft: 0,
  },
  moveUpBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronUp: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  moveDownBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronDown: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  deleteBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 27,
  },
  optionSelectionNameInputGroupLimit: {
    width: 250,
    height: 84,
    justifyContent: "space-between",
  },
  selectionPriceIncreaseInputGroupLimit: {
    width: 140,
    height: 84,
    justifyContent: "space-between",
  },
  selectionLimitInputGroupLimit: {
    width: 120,
    height: 84,
    justifyContent: "space-between",
  },
  limit: {
    color: "#121212",
    fontSize: 17,
  },
  selectionLimitInput: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    alignSelf: "stretch",
    padding: 10,
  },
});

export default OptionSelectionItem;
