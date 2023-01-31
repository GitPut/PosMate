import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import DropDown from "./DropDown";

const OptionView = ({
  item,
  index,
  setnewProduct,
  newProduct,
  newProductOptions,
  indexOn,
  setindexOn,
}) => {
  if (indexOn === index) {
    const [e, sete] = useState(structuredClone(item));
    const [testMap, settestMap] = useState(structuredClone(item.optionsList));
    var optionLbls = newProduct.options.map(function (el) {
      if (el.label !== e.label && el.label !== null) {
        return el.label;
      }
    });

    if (e.selectedCaseKey || e.selectedCaseValue) {
      newProductOptions.current[index].selectedCaseList = [
        {
          selectedCaseKey: e.selectedCaseKey,
          selectedCaseValue: e.selectedCaseValue,
        },
      ];
      newProductOptions.current[index].selectedCaseKey = null;
      newProductOptions.current[index].selectedCaseValue = null;
      sete((prev) => ({
        ...prev,
        selectedCaseList: [{ selectedCaseKey: null, selectedCaseValue: null }],
      }));
    }

    return (
      <View>
        <View
          style={{
            padding: 25,
            margin: 15,
            backgroundColor: "lightgrey",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              indexOn !== index ? setindexOn(index) : setindexOn(null)
            }
            style={{
              padding: 25,
              margin: 15,
              backgroundColor: "lightgrey",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 100,
            }}
          >
            <Text>{item.label}</Text>
            <TouchableOpacity
              onPress={() => {
                newProductOptions.current.push({
                  ...item,
                  label: item.label + " Copy",
                });
                setnewProduct((prevState) => ({
                  ...prevState,
                  options: newProductOptions.current,
                }));
                setindexOn(null);
              }}
            >
              <Text
                style={{
                  marginBottom: 25,
                  fontWeight: "700",
                  color: "red",
                }}
              >
                Copy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                newProductOptions.current.splice(index, 1);

                setnewProduct((prevState) => ({
                  ...prevState,
                  options: newProductOptions.current,
                }));
                setindexOn(null);
              }}
            >
              <Text
                style={{
                  marginBottom: 25,
                  fontWeight: "700",
                  color: "red",
                }}
              >
                X
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                function moveItem(from, to) {
                  // remove `from` item and store it
                  var f = newProductOptions.current.splice(from, 1)[0];
                  // insert stored item into position `to`
                  newProductOptions.current.splice(to, 0, f);
                }

                moveItem(index, index + 1);

                setnewProduct((prevState) => ({
                  ...prevState,
                  options: newProductOptions.current,
                }));
                setindexOn(null);
              }}
            >
              <Text
                style={{
                  marginBottom: 25,
                  fontWeight: "700",
                  color: "red",
                }}
              >
                \/
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                function moveItem(from, to) {
                  // remove `from` item and store it
                  var f = newProductOptions.current.splice(from, 1)[0];
                  // insert stored item into position `to`
                  newProductOptions.current.splice(to, 0, f);
                }

                moveItem(index, index - 1);

                setnewProduct((prevState) => ({
                  ...prevState,
                  options: newProductOptions.current,
                }));
                setindexOn(null);
              }}
            >
              <Text
                style={{
                  marginBottom: 25,
                  fontWeight: "700",
                  color: "red",
                }}
              >
                /\
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter Select List Label"
            onChangeText={(val) => {
              sete((prevState) => ({ ...prevState, label: val }));
              newProductOptions.current[index].label = val;
            }}
            value={e.label}
            style={{ marginBottom: 25 }}
          />
          {/* optionType */}
          <DropDown
            label="Option Type"
            options={["Standard", "Dropdown"]}
            setValue={(val) => {
              if (e.optionType) {
                newProductOptions.current[index].optionType = val;
              } else {
                newProductOptions.current[index] = { ...e, optionType: val };
              }
              sete((prevState) => ({
                ...prevState,
                optionType: val,
              }));
            }}
            value={e.optionType}
            style={{ marginBottom: 25 }}
          />
          <TextInput
            placeholder="Enter Number Of Selectable; If There Is"
            onChangeText={(val) => {
              sete((prevState) => ({ ...prevState, numOfSelectable: val }));
              newProductOptions.current[index].numOfSelectable = val;
            }}
            value={e.numOfSelectable}
            style={{ marginBottom: 25 }}
          />
          {testMap.map((eInnerListStart, indexInnerList) => {
            const eInnerList = structuredClone(eInnerListStart);
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 25,
                  alignItems: "center",
                }}
              >
                <TextInput
                  placeholder="Enter Option Label"
                  onChangeText={(val) => {
                    const clone = structuredClone(testMap);
                    clone[indexInnerList].label = val;
                    newProductOptions.current[index].optionsList = clone;
                    settestMap(clone);
                  }}
                  value={eInnerList.label}
                />
                <TextInput
                  placeholder="Enter price increase"
                  //   onChangeText={(val) => {
                  //     newProductOptions.current[index].optionsList[
                  //       indexInnerList
                  //     ].priceIncrease = val;
                  //     seteInnerList((prevState) => ({
                  //       ...prevState,
                  //       priceIncrease: val,
                  //     }));
                  //   }}
                  onChangeText={(val) => {
                    const clone = structuredClone(testMap);
                    clone[indexInnerList].priceIncrease = val;
                    newProductOptions.current[index].optionsList = clone;
                    settestMap(clone);
                  }}
                  value={eInnerList.priceIncrease}
                  style={{ marginLeft: 20, marginRight: 20 }}
                />
                <TouchableOpacity
                  onPress={() => {
                    const clone = structuredClone(testMap);
                    clone.splice(indexInnerList, 1);
                    newProductOptions.current[index].optionsList = clone;
                    settestMap(clone);
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "red",
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <Button
            title="Add Option Choice"
            onPress={() => {
              const clone = structuredClone(testMap);
              clone.push({
                label: null,
                priceIncrease: null,
              });
              newProductOptions.current[index].optionsList = clone;
              settestMap(clone);
            }}
            style={{ marginBottom: 25 }}
          />
          {e.selectedCaseList?.map((ifStatement, indexOfIf) => {
            const local = newProduct.options.filter(
              (localE) => localE.label == ifStatement.selectedCaseKey
            );
            const optionLblsValuesLocal =
              local.length > 0
                ? local[0].optionsList.map(function (el) {
                    return el.label;
                  })
                : [];

            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 25,
                }}
              >
                <DropDown
                  label="Show if..."
                  options={optionLbls}
                  setValue={(val) => {
                    // sete((prevState) => ({
                    //   ...prevState,
                    //   selectedCaseKey: val,
                    // }));
                    // newProductOptions.current[index].selectedCaseKey = val;
                    newProductOptions.current[index].selectedCaseList[
                      indexOfIf
                    ].selectedCaseKey = val;
                    sete((prev) => ({
                      ...prev,
                      selectedCaseList:
                        newProductOptions.current[index].selectedCaseList,
                    }));
                  }}
                  value={ifStatement.selectedCaseKey}
                  style={{ marginBottom: 25 }}
                />
                <Text>"="</Text>
                <DropDown
                  label="Show if..."
                  options={optionLblsValuesLocal}
                  setValue={(val) => {
                    // sete((prevState) => ({
                    //   ...prevState,
                    //   selectedCaseValue: val,
                    // }));
                    // newProductOptions.current[index].selectedCaseValue = val;
                    newProductOptions.current[index].selectedCaseList[
                      indexOfIf
                    ].selectedCaseValue = val;
                    sete((prev) => ({
                      ...prev,
                      selectedCaseList:
                        newProductOptions.current[index].selectedCaseList,
                    }));
                  }}
                  value={ifStatement.selectedCaseValue}
                  style={{ marginBottom: 25 }}
                />
                <Button
                  title="Remove"
                  onPress={() => {
                    newProductOptions.current[index].selectedCaseList.splice(
                      indexOfIf,
                      1
                    );
                    sete((prev) => ({
                      ...prev,
                      selectedCaseList:
                        newProductOptions.current[index].selectedCaseList,
                    }));
                  }}
                />
              </View>
            );
          })}
          {optionLbls.length > 1 && (
            <Button
              title="Add If Statement"
              onPress={() => {
                if (!newProductOptions.current[index].selectedCaseList) {
                  newProductOptions.current[index].selectedCaseList = [
                    {
                      selectedCaseKey: null,
                      selectedCaseValue: null,
                    },
                  ];
                  sete((prev) => ({
                    ...prev,
                    selectedCaseList: [
                      { selectedCaseKey: null, selectedCaseValue: null },
                    ],
                  }));
                } else {
                  newProductOptions.current[index].selectedCaseList.push({
                    selectedCaseKey: null,
                    selectedCaseValue: null,
                  });
                  sete((prev) => ({
                    ...prev,
                    selectedCaseList:
                      newProductOptions.current[index].selectedCaseList,
                  }));
                }
              }}
            />
          )}
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() =>
          indexOn !== index ? setindexOn(index) : setindexOn(null)
        }
        style={{
          padding: 25,
          margin: 15,
          backgroundColor: "lightgrey",
          flexDirection: "row",
          justifyContent: "space-between",
          height: 100,
        }}
      >
        <Text>{item.label}</Text>
        <TouchableOpacity
          onPress={() => {
            newProductOptions.current.push({
              ...item,
              label: item.label + " Copy",
            });
            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            setindexOn(null);
          }}
        >
          <Text
            style={{
              marginBottom: 25,
              fontWeight: "700",
              color: "red",
            }}
          >
            Copy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            newProductOptions.current.splice(index, 1);

            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            setindexOn(null);
          }}
        >
          <Text
            style={{
              marginBottom: 25,
              fontWeight: "700",
              color: "red",
            }}
          >
            X
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            function moveItem(from, to) {
              // remove `from` item and store it
              var f = newProductOptions.current.splice(from, 1)[0];
              // insert stored item into position `to`
              newProductOptions.current.splice(to, 0, f);
            }

            moveItem(index, index + 1);

            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            setindexOn(null);
          }}
        >
          <Text
            style={{
              marginBottom: 25,
              fontWeight: "700",
              color: "red",
            }}
          >
            \/
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            function moveItem(from, to) {
              // remove `from` item and store it
              var f = newProductOptions.current.splice(from, 1)[0];
              // insert stored item into position `to`
              newProductOptions.current.splice(to, 0, f);
            }

            moveItem(index, index - 1);

            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            setindexOn(null);
          }}
        >
          <Text
            style={{
              marginBottom: 25,
              fontWeight: "700",
              color: "red",
            }}
          >
            /\
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
};

export default OptionView;
