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
    const [optionLblsValues, setoptionLblsValues] = useState([]);
    const [e, sete] = useState(item);
    const [testMap, settestMap] = useState(structuredClone(item.optionsList));
    var optionLbls = newProduct.options.map(function (el) {
      if (el.label !== e.label && el.label !== null) {
        return el.label;
      }
    });

    useEffect(() => {
      if (e.selectedCaseKey !== null) {
        if (newProduct.options.length > 1) {
          const local = newProduct.options.filter(
            (localE) => localE.label == e.selectedCaseKey
          );
          const optionLblsValuesLocal =
            local.length > 0 &&
            local[0].optionsList.map(function (el) {
              return el.label;
            });
          setoptionLblsValues(optionLblsValuesLocal);
        } else {
          newProductOptions.current[index].selectedCaseKey = null;
          newProductOptions.current[index].selectedCaseValue = null;
        }
      }
    }, [e]);

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
                setindexOn(newProductOptions.current.length - 1);
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
                setindexOn(indexOn - 1);
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
              // sete((prevState) => ({
              //   ...prevState,
              //   optionType: val,
              // }));
              if (e.optionType) {
                newProductOptions.current[index].optionType = val;
              } else {
                newProductOptions.current[index] = { ...e, optionType: val };
                console.log(newProductOptions.current[index].optionType);
              }
              setnewProduct((prevState) => ({
                ...prevState,
                options: newProductOptions.current,
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
          {optionLbls.length > 1 && (
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
                  sete((prevState) => ({ ...prevState, selectedCaseKey: val }));
                  newProductOptions.current[index].selectedCaseKey = val;
                }}
                value={e.selectedCaseKey}
                style={{ marginBottom: 25 }}
              />
              <Text>"="</Text>
              <DropDown
                label="Show if..."
                options={optionLblsValues}
                setValue={(val) => {
                  sete((prevState) => ({
                    ...prevState,
                    selectedCaseValue: val,
                  }));
                  newProductOptions.current[index].selectedCaseValue = val;
                }}
                value={e.selectedCaseValue}
                style={{ marginBottom: 25 }}
              />
            </View>
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
            setindexOn(newProductOptions.current.length - 1);
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
            setindexOn(indexOn - 1);
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
