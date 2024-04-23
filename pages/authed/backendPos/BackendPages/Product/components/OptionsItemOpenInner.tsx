import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import OptionSelectionItem from "./OptionSelectionItem";
import OptionIfStatementItem from "./OptionIfStatementItem";
import generateRandomKey from "components/functional/GenerateRandomKey";
import GeneralSwitch from "components/GeneralSwitch";
import { Option, ProductProp } from "types/global";
import GeneralDropdownStringOptions from "components/GeneralDropdownStringOptions";
import GeneralDropdownArrayOptions from "components/GeneralDropdownArrayOptions";

interface OptionsItemOpenInnerProps {
  item: Option;
  newProduct: ProductProp;
  newProductOptions: Option[];
  setnewProductOptions: (
    val: ((prev: Option[]) => Option[]) | Option[]
  ) => void;
  index: number;
  e: Option;
  sete: (val: ((prev: Option) => Option) | Option) => void;
  scrollY: number;
  setaddOptionClicked: (val: boolean) => void;
  setmoveToOptionPos: (val: number) => void;
  scrollToPositionIncluding: (val: number) => void;
}

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
  scrollToPositionIncluding,
}: OptionsItemOpenInnerProps) {
  const [testMap, settestMap] = useState(structuredClone(item.optionsList));
  const [highlightedOptionID, sethighlightedOptionID] = useState<string | null>(
    null
  );
  const caseList = e.selectedCaseList ?? [];
  const DropdownOptions: { label: string; value?: string; id?: string }[] = [];

  testMap.forEach((testOption) =>
    DropdownOptions.push({
      ...testOption,
      label: testOption.label ?? "",
      id: testOption.id,
    })
  );

  const optionLbls: string[] = [];
  if (newProduct.options.length > 1) {
    newProduct.options.forEach((element) => {
      if (element.label !== e.label && element.label) {
        optionLbls.push(element.label);
      }
    });
  }

  return (
    <View style={styles.innerOptionContainer1}>
      <View style={styles.optionMainInfoRow1}>
        <View style={styles.optionNameInputGroup1}>
          <Text style={styles.optionNameInputLbl1}>Option Name</Text>
          <TextInput
            style={styles.optionNameInput2}
            onChangeText={(val) => {
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
            value={e.label ? e.label : ""}
            placeholder="Enter Name (Ex Size, Toppings, Cheese)"
          />
        </View>
        <View style={styles.optionTypeGroup1}>
          <Text style={styles.optionTypeDropdownLbl1}>Option Type</Text>
          <View>
            <GeneralDropdownStringOptions
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
                      ...prev[index],
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
              options={["Dropdown", "Quantity Dropdown", "Table View", "Row"]}
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
            value={e.numOfSelectable ? e.numOfSelectable.toString() : ""}
            placeholder="Leave empty for no limit"
          />
        </View>
      </View>
      <View style={styles.spacer5}></View>
      <View style={styles.optionMainInfoRow1}>
        <View style={styles.optionRequiredRow1}>
          <Text style={styles.isOptionTxt1}>Is Option Required?:</Text>
          <GeneralSwitch
            isActive={e.isRequired ? true : false}
            toggleSwitch={() => {
              sete((prevState) => ({
                ...prevState,
                isRequired: !e.isRequired,
              }));
              // newProductOptions.current[index].isRequired = val;
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].isRequired = !e.isRequired;
                return clone;
              });
            }}
          />
        </View>
        {(e.optionType === "Dropdown" || e.optionType === "Row") && (
          <View style={styles.optionTypeGroup1}>
            <Text style={styles.optionTypeDropdownLbl1}>Default Value</Text>
            <View>
              <GeneralDropdownArrayOptions
                placeholder="Default Value"
                value={e.defaultValue ? e.defaultValue.label : null}
                setValue={(val, valIndex) => {
                  if (typeof valIndex !== "number" && valIndex === undefined)
                    return;
                  settestMap((prev) => {
                    const clone = structuredClone(prev);
                    clone.forEach((element, indexOfOl) => {
                      if (element.selected) {
                        clone[indexOfOl].selected = false;
                      }
                    });
                    if (val) {
                      clone[valIndex].selected = true;
                    }
                    return clone;
                  });
                  if (typeof val !== "object") return;
                  setnewProductOptions((prev) => {
                    const clone = structuredClone(prev);
                    clone[index].defaultValue = {
                      ...val,
                      label: val.label,
                      id: val.id ?? "",
                    };

                    clone[index].optionsList.forEach((element, indexOfOl) => {
                      if (element.selected) {
                        clone[index].optionsList[indexOfOl].selected = false;
                      }
                    });
                    if (val) {
                      clone[index].optionsList[valIndex].selected = true;
                      console.log("val: ", clone[index].optionsList[valIndex]);
                    }

                    return clone;
                  });
                  sete((prevState) => {
                    const clone = structuredClone(prevState);
                    clone.defaultValue = {
                      ...val,
                      label: val.label,
                      id: val.id ?? "",
                    };
                    return clone;
                  });
                }}
                options={DropdownOptions}
                scrollY={scrollY}
              />
            </View>
          </View>
        )}
        <View style={{ width: 195 }} />
      </View>
      <View style={styles.spacer6}></View>
      {testMap.map((e, indexInnerList) => (
        <OptionSelectionItem
          key={e.id}
          style={styles.optionSelectionItem1}
          eInnerListStart={e}
          indexInnerList={indexInnerList}
          testMap={testMap}
          settestMap={settestMap}
          setnewProductOptions={setnewProductOptions}
          index={index}
          setmoveToOptionPos={(pos) => {
            setmoveToOptionPos(pos);
            setaddOptionClicked(true);
          }}
          highlightedOptionID={highlightedOptionID}
          sethighlightedOptionID={sethighlightedOptionID}
          scrollToPositionIncluding={scrollToPositionIncluding}
        />
      ))}
      {testMap.length > 0 && <View style={styles.spacer7}></View>}
      <View style={styles.addAnotherSelectionBtnRow1}>
        <Pressable
          style={styles.addAnotherSelectionBtn2}
          onPress={() => {
            const cloneOuter = structuredClone(testMap);
            cloneOuter.push({
              label: null,
              priceIncrease: null,
              id: generateRandomKey(10),
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
        </Pressable>
      </View>
      <View style={styles.spacer6}></View>
      {caseList.length > 0 &&
        caseList.map((ifStatement, indexOfIf) => (
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
          />
        ))}
      {caseList.length > 0 && <View style={styles.spacer7}></View>}
      {optionLbls.length >= 1 && (
        <View style={[styles.addAnotherSelectionBtnRow1]}>
          <Pressable
            style={styles.addAnotherSelectionBtn2}
            onPress={() => {
              const id = generateRandomKey(10);
              if (!newProductOptions[index].selectedCaseList) {
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  clone[index].selectedCaseList = [
                    {
                      selectedCaseKey: null,
                      selectedCaseValue: null,
                      id: id,
                    },
                  ];
                  return clone;
                });
                sete((prev) => ({
                  ...prev,
                  selectedCaseList: [
                    {
                      selectedCaseKey: null,
                      selectedCaseValue: null,
                      id: id,
                    },
                  ],
                }));
              } else {
                let clone: Option[] = [];
                setnewProductOptions((prev) => {
                  clone = structuredClone(prev);
                  const cloneCaseList = clone[index].selectedCaseList ?? [];
                  cloneCaseList.push({
                    selectedCaseKey: null,
                    selectedCaseValue: null,
                    id: id,
                  } as never);

                  clone[index].selectedCaseList = cloneCaseList;

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
          </Pressable>
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
    width: 239,
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
