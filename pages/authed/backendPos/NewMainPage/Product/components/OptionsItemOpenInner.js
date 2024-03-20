import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import OptionSelectionItem from "./OptionSelectionItem";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "react-native";
import GeneralDropdown from "components/GeneralDropdown";
import OptionIfStatementItem from "./OptionIfStatementItem";

function OptionsItemOpenInner({
  item,
  newProduct,
  newProductOptions,
  setnewProductOptions,
  index,
  e,
  sete,
  scrollY,
  setaddOptionClicked,
  setmoveToOptionPos,
}) {
  const [testMap, settestMap] = useState(structuredClone(item.optionsList));

  const optionLbls = newProduct.options.map(function (el) {
    if (el.label !== e.label && el.label) {
      return el.label;
    }
  });

  if (e.selectedCaseKey || e.selectedCaseValue) {
    setnewProductOptions((prev) => {
      const clone = structuredClone(prev);
      clone[index].selectedCaseList = [
        {
          selectedCaseKey: null,
          selectedCaseValue: null,
        },
      ];

      clone[index].selectedCaseKey = null;
      clone[index].selectedCaseValue = null;

      return clone;
    });

    sete((prev) => ({
      ...prev,
      selectedCaseList: [{ selectedCaseKey: null, selectedCaseValue: null }],
    }));
  }

  return (
    <View style={styles.innerOptionContainer1}>
      <View style={styles.optionMainInfoRow1}>
        <View style={styles.optionNameInputGroup1}>
          <Text style={styles.optionNameInputLbl1}>Option Name</Text>
          <TextInput
            style={styles.optionNameInput2}
            // onBlur={() => {
            //   sete((prevState) => ({
            //     ...prevState,
            //     label: optionLabelBeforeBlur,
            //   }));
            //   // newProductOptions.current[index].label = optionLabelBeforeBlur;
            //   setnewProductOptions((prev) => {
            //     const clone = structuredClone(prev);
            //     clone[index].label = optionLabelBeforeBlur;
            //     return clone;
            //   });
            // }}
            onChangeText={(val) => {
              // setoptionLabelBeforeBlur(val);
              sete((prevState) => ({
                ...prevState,
                label: val,
              }));
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].label = val;
                return clone;
              });
            }}
            value={e.label}
            placeholder="Enter Name (Ex Size, Toppings, Cheese)"
          />
        </View>
        <View style={styles.optionTypeGroup1}>
          <Text style={styles.optionTypeDropdownLbl1}>Option Type</Text>
          <View>
            <GeneralDropdown
              style={styles.categoryDropDownBox}
              placeholder="Choose Type"
              value={e.optionType}
              setValue={(val) => {
                if (e.optionType) {
                  setnewProductOptions((prev) => {
                    const clone = structuredClone(prev);
                    clone[index].optionType = val;
                    return clone;
                  });
                } else {
                  setnewProductOptions((prev) => {
                    const clone = structuredClone(prev);
                    clone[index] = {
                      ...e,
                      optionType: val,
                    };
                    return clone;
                  });
                }
                sete((prevState) => ({
                  ...prevState,
                  optionType: val,
                }));
              }}
              options={["Multi Choice", "Dropdown"]}
              scrollY={scrollY}
            />
          </View>
        </View>
        <View style={styles.selectionLimitInputGroup1}>
          <Text style={styles.selectionLimitInputLbl1}>Selection Limit</Text>
          <TextInput
            style={styles.selectionLimitInput2}
            onChangeText={(val) => {
              sete((prevState) => ({
                ...prevState,
                numOfSelectable: val,
              }));
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].numOfSelectable = val;
                return clone;
              });
            }}
            value={e.numOfSelectable}
            placeholder="Enter Selection Limit"
          />
        </View>
      </View>
      <View style={styles.spacer5}></View>
      <View style={styles.optionRequiredRow1}>
        <Text style={styles.isOptionTxt1}>Is Option Required?:</Text>
        <Switch
          value={e.isRequired}
          onValueChange={(val) => {
            sete((prevState) => ({ ...prevState, isRequired: val }));
            // newProductOptions.current[index].isRequired = val;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].isRequired = val;
              return clone;
            });
          }}
        />
      </View>
      <View style={styles.spacer6}></View>
      {testMap.map((e, indexInnerList) => (
        <OptionSelectionItem
          key={e.label + indexInnerList}
          style={styles.optionSelectionItem1}
          eInnerListStart={e}
          indexInnerList={indexInnerList}
          testMap={testMap}
          settestMap={settestMap}
          newProductOptions={newProductOptions}
          setnewProductOptions={setnewProductOptions}
          index={index}
          setmoveToOptionPos={(pos) => {
            setmoveToOptionPos(pos);
            setaddOptionClicked(true);
          }}
        />
      ))}
      {testMap.length > 0 && <View style={styles.spacer7}></View>}
      <View style={styles.addAnotherSelectionBtnRow1}>
        <TouchableOpacity
          style={styles.addAnotherSelectionBtn2}
          onPress={() => {
            const cloneOuter = structuredClone(testMap);
            cloneOuter.push({
              label: null,
              priceIncrease: null,
            });
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].optionsList = cloneOuter;
              return clone;
            });
            settestMap(cloneOuter);
            setaddOptionClicked(true);
          }}
          disabled={
            testMap.length > 0 && testMap[testMap.length - 1].label === null
          }
        >
          <Text style={styles.addAnotherSelectionBtnLbl1}>
            Add Another Selection
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spacer6}></View>
      {e.selectedCaseList?.length > 0 &&
        e.selectedCaseList.map((ifStatement, indexOfIf) => (
          <OptionIfStatementItem
            key={indexOfIf}
            style={styles.optionSelectionItem1}
            ifStatement={ifStatement}
            indexOfIf={indexOfIf}
            scrollY={scrollY}
            index={index}
            setnewProductOptions={setnewProductOptions}
            sete={sete}
            ifOptionOptions={optionLbls}
            newProduct={newProduct}
            testMap={testMap}
            settestMap={settestMap}
          />
        ))}
      {e.selectedCaseList?.length > 0 && <View style={styles.spacer7}></View>}
      {optionLbls.length > 1 && (
        <View style={[styles.addAnotherSelectionBtnRow1]}>
          <TouchableOpacity
            style={styles.addAnotherSelectionBtn2}
            onPress={() => {
              if (!newProductOptions[index].selectedCaseList) {
                console.log("Added new if statement list");
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  clone[index].selectedCaseList = [
                    {
                      selectedCaseKey: null,
                      selectedCaseValue: null,
                    },
                  ];
                  return clone;
                });
                sete((prev) => ({
                  ...prev,
                  selectedCaseList: [
                    { selectedCaseKey: null, selectedCaseValue: null },
                  ],
                }));
              } else {
                console.log("Added new if statement");
                let clone;
                setnewProductOptions((prev) => {
                  clone = structuredClone(prev);
                  clone[index].selectedCaseList.push({
                    selectedCaseKey: null,
                    selectedCaseValue: null,
                  });
                  return clone;
                });
                sete((prev) => ({
                  ...prev,
                  selectedCaseList: clone[index].selectedCaseList,
                }));
              }
            }}
          >
            <Text style={styles.addAnotherSelectionBtnLbl1}>
              Add If Statement
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  innerOptionContainer1: {
    width: "100%",
    // height: 389,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  optionMainInfoRow1: {
    width: "100%",
    height: 84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionNameInputGroup1: {
    width: 239,
    height: 84,
    justifyContent: "space-between",
  },
  optionNameInputLbl1: {
    color: "#121212",
    fontSize: 17,
  },
  optionNameInput2: {
    width: 239,
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    padding: 10,
  },
  optionTypeGroup1: {
    width: 197,
    height: 77,
    justifyContent: "space-between",
  },
  optionTypeDropdownLbl1: {
    color: "#121212",
    fontSize: 17,
  },
  optionTypeDropdown2: {
    width: 195,
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
  },
  selectionLimitInputGroup1: {
    width: 195,
    height: 77,
    justifyContent: "space-between",
  },
  selectionLimitInputLbl1: {
    color: "#121212",
    fontSize: 17,
  },
  selectionLimitInput2: {
    width: 195,
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    padding: 10,
  },
  spacer5: {
    width: "100%",
    height: 40,
  },
  optionRequiredRow1: {
    width: 216,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  isOptionTxt1: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 17,
  },
  isRequiredBtn1: {
    width: 44,
    height: 20,
    backgroundColor: "#E6E6E6",
  },
  spacer6: {
    width: "100%",
    height: 53,
  },
  optionSelectionItem1: {
    height: 84,
    width: "100%",
  },
  spacer7: {
    width: "100%",
    height: 61,
  },
  addAnotherSelectionBtnRow1: {
    height: 47,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  addAnotherSelectionBtn2: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addAnotherSelectionBtnLbl1: {
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  createOptionBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  createOptionTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  closedOptionContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 67,
  },
  optionNameLbl: {
    color: "#121212",
    fontSize: 17,
    marginRight: 20,
    marginLeft: 20,
  },
  btnsRow: {
    width: 224,
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  moveUpBtn: {
    width: 35,
    height: 35,
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
    width: 35,
    height: 35,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronDown: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  duplicateBtn: {
    width: 35,
    height: 35,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  duplicateIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  deleteBtn: {
    width: 35,
    height: 35,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  categoryDropDownBox: {
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
  },
});

export default OptionsItemOpenInner;
