import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import DropDown from "./DropDown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import ReactSelect from "react-select";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const InnerOn = ({ item, newProduct, newProductOptions, index, e, sete }) => {
  const [testMap, settestMap] = useState(structuredClone(item.optionsList));
  var optionLbls = newProduct.options.map(function (el) {
    if (el.label !== e.label && el.label !== null) {
      return el.label;
    }
  });

  const ifOptionOptions = [];
  optionLbls.map((opLbl) =>
    ifOptionOptions.push({ value: opLbl, label: opLbl })
  );

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
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 20,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          flexWrap: "wrap",
        }}
      >
        <TextInput
          placeholder="Enter Option Label"
          onChangeText={(val) => {
            sete((prevState) => ({ ...prevState, label: val }));
            newProductOptions.current[index].label = val;
          }}
          value={e.label}
          style={{ margin: 10, width: "97.5%", height: 52 }}
          label="Enter Option Label"
          variant="outlined"
          color="black"
        />
        <View
          style={{
            margin: 10,
            width: "47%",
            height: 52,
          }}
        >
          <ReactSelect
            options={[
              { value: "Multi Choice", label: "Multi Choice" },
              { value: "Dropdown", label: "Dropdown" },
            ]}
            value={
              e.optionType && {
                value: e.optionType,
                label: e.optionType,
              }
            }
            onChange={(val) => {
              if (e.optionType) {
                newProductOptions.current[index].optionType = val.value;
              } else {
                newProductOptions.current[index] = {
                  ...e,
                  optionType: val.value,
                };
              }
              sete((prevState) => ({
                ...prevState,
                optionType: val.value,
              }));
            }}
            placeholder={"Choose Option Type"}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              control: (provided, state) => ({
                ...provided,
                background: "#fff",
                borderColor: "#9e9e9e",
                minHeight: "52px",
                height: "52px",
                boxShadow: state.isFocused ? null : null,
              }),

              valueContainer: (provided, state) => ({
                ...provided,
                height: "52px",
                padding: "0 6px",
              }),

              input: (provided, state) => ({
                ...provided,
                margin: "0px",
              }),
              indicatorSeparator: (state) => ({
                display: "none",
              }),
              indicatorsContainer: (provided, state) => ({
                ...provided,
                height: "52px",
              }),
            }}
            menuPlacement="auto"
            menuPosition="fixed"
          />
        </View>
        <TouchableOpacity
          disabled={e.optionType !== "Multi Choice"}
          style={{ margin: 10, width: "47%", height: 52 }}
        >
          <TextInput
            placeholder="Enter selection limit or leave empty"
            onChangeText={(val) => {
              if (e.optionType === "Multi Choice") {
                sete((prevState) => ({ ...prevState, numOfSelectable: val }));
                newProductOptions.current[index].numOfSelectable = val;
              }
            }}
            value={e.numOfSelectable}
            label="Enter selection limit"
            variant="outlined"
            style={{
              width: "100%",
              opacity: e.optionType === "Dropdown" ? 0.5 : 1,
            }}
            color="black"
          />
        </TouchableOpacity>
        <View
          style={{
            margin: 10,
            width: "47%",
            height: 52,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 5, fontSize: 14 }}>
            Is Option Required?
          </Text>
          <Switch
            value={e.isRequired}
            onValueChange={(val) => {
              sete((prevState) => ({ ...prevState, isRequired: val }));
              newProductOptions.current[index].isRequired = val;
            }}
          />
        </View>
      </View>
      {testMap.map((eInnerListStart, indexInnerList) => {
        const eInnerList = structuredClone(eInnerListStart);
        return (
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Enter option selection"
              onChangeText={(val) => {
                const clone = structuredClone(testMap);
                clone[indexInnerList].label = val;
                newProductOptions.current[index].optionsList = clone;
                settestMap(clone);
              }}
              value={eInnerList.label}
              label="Enter option selection"
              variant="outlined"
              color="black"
              style={{ width: "45%" }}
            />
            <TextInput
              placeholder="Enter price increase"
              onChangeText={(val) => {
                const clone = structuredClone(testMap);
                clone[indexInnerList].priceIncrease = val;
                newProductOptions.current[index].optionsList = clone;
                settestMap(clone);
              }}
              value={eInnerList.priceIncrease}
              style={{ width: "45%" }}
              label="Enter price increase"
              variant="outlined"
              color="black"
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "grey",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                const clone = structuredClone(testMap);
                clone.splice(indexInnerList, 1);
                newProductOptions.current[index].optionsList = clone;
                settestMap(clone);
              }}
            >
              <Feather name="x" size={30} color="white" />
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
        style={{
          marginBottom: 25,
          marginTop: 25,
          backgroundColor: "#4050B5",
        }}
        disabled={
          testMap.length > 0 && testMap[testMap.length - 1].label === null
        }
      />
      {e.selectedCaseList?.length > 0 && (
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "grey",
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      )}
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

        const ifOptionVals = [];
        optionLblsValuesLocal.map((opLbl) =>
          ifOptionVals.push({ value: opLbl, label: opLbl })
        );

        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
              alignItems: "center",
            }}
          >
            <View
              style={{
                margin: 10,
                width: "40%",
                height: 52,
              }}
            >
              <ReactSelect
                options={ifOptionOptions}
                value={
                  ifStatement.selectedCaseKey && {
                    value: ifStatement.selectedCaseKey,
                    label: ifStatement.selectedCaseKey,
                  }
                }
                onChange={(val) => {
                  newProductOptions.current[index].selectedCaseList[
                    indexOfIf
                  ].selectedCaseKey = val.value;
                  sete((prev) => ({
                    ...prev,
                    selectedCaseList:
                      newProductOptions.current[index].selectedCaseList,
                  }));
                }}
                placeholder={"Show if option"}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (provided, state) => ({
                    ...provided,
                    background: "#fff",
                    borderColor: "#9e9e9e",
                    minHeight: "52px",
                    height: "52px",
                    boxShadow: state.isFocused ? null : null,
                  }),

                  valueContainer: (provided, state) => ({
                    ...provided,
                    height: "52px",
                    padding: "0 6px",
                  }),

                  input: (provided, state) => ({
                    ...provided,
                    margin: "0px",
                  }),
                  indicatorSeparator: (state) => ({
                    display: "none",
                  }),
                  indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: "52px",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </View>
            <FontAwesome5 name="equals" size={30} color="black" />
            <View
              style={{
                margin: 10,
                width: "40%",
                height: 52,
              }}
            >
              <ReactSelect
                options={ifOptionVals}
                value={
                  ifStatement.selectedCaseValue && {
                    value: ifStatement.selectedCaseValue,
                    label: ifStatement.selectedCaseValue,
                  }
                }
                onChange={(val) => {
                  newProductOptions.current[index].selectedCaseList[
                    indexOfIf
                  ].selectedCaseValue = val.value;
                  sete((prev) => ({
                    ...prev,
                    selectedCaseList:
                      newProductOptions.current[index].selectedCaseList,
                  }));
                }}
                placeholder={"Show if value"}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (provided, state) => ({
                    ...provided,
                    background: "#fff",
                    borderColor: "#9e9e9e",
                    minHeight: "52px",
                    height: "52px",
                    boxShadow: state.isFocused ? null : null,
                  }),

                  valueContainer: (provided, state) => ({
                    ...provided,
                    height: "52px",
                    padding: "0 6px",
                  }),

                  input: (provided, state) => ({
                    ...provided,
                    margin: "0px",
                  }),
                  indicatorSeparator: (state) => ({
                    display: "none",
                  }),
                  indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: "52px",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "grey",
                justifyContent: "center",
                alignItems: "center",
              }}
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
            >
              <Feather name="x" size={30} color="white" />
            </TouchableOpacity>
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
          style={{ backgroundColor: "#4050B5", marginBottom: 25 }}
        />
      )}
    </>
  );
};

const OptionView = ({
  item,
  index,
  setnewProduct,
  newProduct,
  newProductOptions,
  indexOn,
  setindexOn,
}) => {
  const [e, sete] = useState(structuredClone(item));
  // const [testMap, settestMap] = useState(structuredClone(item.optionsList));
  // var optionLbls = newProduct.options.map(function (el) {
  //   if (el.label !== e.label && el.label !== null) {
  //     return el.label;
  //   }
  // });

  // if (e.selectedCaseKey || e.selectedCaseValue) {
  //   newProductOptions.current[index].selectedCaseList = [
  //     {
  //       selectedCaseKey: e.selectedCaseKey,
  //       selectedCaseValue: e.selectedCaseValue,
  //     },
  //   ];
  //   newProductOptions.current[index].selectedCaseKey = null;
  //   newProductOptions.current[index].selectedCaseValue = null;
  //   sete((prev) => ({
  //     ...prev,
  //     selectedCaseList: [{ selectedCaseKey: null, selectedCaseValue: null }],
  //   }));
  // }

  return (
    <View>
      <View
        style={{
          margin: 15,
          backgroundColor: "lightgrey",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            indexOn !== index ? setindexOn(index) : setindexOn(null)
          }
          style={[
            {
              backgroundColor: "grey",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 5,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            indexOn !== index && {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
        >
          <Text
            style={{
              width: "50%",
              paddingLeft: 5,
              fontSize: 16,
              color: "white",
              fontFamily: "archivo-600",
            }}
          >
            {item.label ? item.label : "New Option"}
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
            }}
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
            <MaterialCommunityIcons
              name="chevron-down"
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
            }}
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
            <MaterialCommunityIcons name="chevron-up" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
            }}
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
            <Feather name="copy" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              newProductOptions.current.splice(index, 1);

              setnewProduct((prevState) => ({
                ...prevState,
                options: newProductOptions.current,
              }));
              setindexOn(null);
            }}
          >
            <Feather name="x" size={32} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
        {indexOn === index && (
          <View style={{ padding: 20 }}>
            <InnerOn
              item={item}
              index={index}
              newProduct={newProduct}
              newProductOptions={newProductOptions}
              e={e}
              sete={sete}
            />
          </View>
        )}
      </View>
      {newProduct.options.length - 1 === index && (
        <Button
          title="Add Option"
          onPress={() => {
            newProductOptions.current.push({
              label: null,
              optionsList: [],
              selectedCaseKey: null,
              selectedCaseValue: null,
              numOfSelectable: null,
              id: Math.random().toString(36).substr(2, 9),
              optionType: null,
            });
            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            setindexOn(newProductOptions.current.length - 1);
          }}
          style={{ marginBottom: 25, backgroundColor: "#4050B5" }}
          disabled={e.label === null}
        />
      )}
    </View>
  );
};

export default OptionView;
