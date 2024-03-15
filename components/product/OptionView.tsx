import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import ReactSelect from "react-select";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const InnerOn = ({
  item,
  newProduct,
  newProductOptions,
  setnewProductOptions,
  index,
  e,
  sete,
}) => {
  const [testMap, settestMap] = useState(structuredClone(item.optionsList));
  const optionLbls = newProduct.options.map(function (el) {
    if (el.label !== e.label && el.label !== null) {
      return el.label;
    }
  });

  const ifOptionOptions = [];
  optionLbls.map((opLbl) =>
    ifOptionOptions.push({ value: opLbl, label: opLbl })
  );

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

  const TestMapItem = ({ eInnerListStart, indexInnerList }) => {
    const eInnerList = structuredClone(eInnerListStart);

    const [countsAsValueBeforeBlur, setcountsAsValueBeforeBlur] = useState(
      eInnerList.countsAs ? eInnerList.countsAs : ""
    );

    const [priceIncreaseBeforeBlur, setpriceIncreaseBeforeBlur] = useState(
      eInnerList.priceIncrease ? eInnerList.priceIncrease : ""
    );

    const [labelBeforeBlur, setlabelBeforeBlur] = useState(eInnerList.label);

    return (
      <View
        key={"D" + indexInnerList.toString()}
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
          onBlur={() => {
            const cloneOuter = structuredClone(testMap);
            cloneOuter[indexInnerList].label = labelBeforeBlur;
            // newProductOptions.current[index].optionsList = clone;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].optionsList = cloneOuter;
              return clone;
            });
            settestMap(cloneOuter);
          }}
          onChangeText={(val) => {
            setlabelBeforeBlur(val);
          }}
          value={labelBeforeBlur}
          label="Enter option selection"
          variant="outlined"
          color="black"
          style={{ width: "45%" }}
        />
        <TextInput
          placeholder="Enter price increase"
          onBlur={() => {
            const cloneOuter = structuredClone(testMap);
            cloneOuter[indexInnerList].priceIncrease = priceIncreaseBeforeBlur;
            // newProductOptions.current[index].optionsList = cloneOuter;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].optionsList = cloneOuter;
              return clone;
            });
            settestMap(cloneOuter);
          }}
          onChangeText={(val) => {
            const re = /^-?\d*\.?\d*$/;

            // if value is not blank, then test the regex

            if (val === "" || re.test(val)) {
              setpriceIncreaseBeforeBlur(val);
            }
          }}
          value={priceIncreaseBeforeBlur}
          style={
            newProductOptions[index].numOfSelectable > 0
              ? { width: "18%" }
              : { width: "35%" }
          }
          label="Price increase"
          variant="outlined"
          color="black"
        />
        {newProductOptions[index].numOfSelectable > 0 && (
          <TextInput
            placeholder="How many selections does it count as (leave empty for 1)"
            onBlur={() => {
              const cloneOuter = structuredClone(testMap);
              cloneOuter[indexInnerList].countsAs = countsAsValueBeforeBlur;
              // newProductOptions.current[index].optionsList = cloneOuter;
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].optionsList = cloneOuter;
                return clone;
              });
              settestMap(cloneOuter);
            }}
            onChangeText={(val) => {
              const re = /^[0-9.]+$/;

              // if value is not blank, then test the regex

              if (val === "" || re.test(val)) {
                setcountsAsValueBeforeBlur(val);
              }
            }}
            value={countsAsValueBeforeBlur}
            style={{ width: "16%" }}
            label="Counts as"
            variant="outlined"
            color="black"
          />
        )}
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 25,
            backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            //  cloneOuter.splice(indexInnerList, 1);
            //  setnewProductOptions((prev) => {
            //    const clone = structuredClone(prev);
            //    clone[index].optionsList = cloneOuter;
            //    return clone;
            //  });
            // settestMap(cloneOuter);

            if (testMap.length > 1 && indexInnerList !== testMap.length - 1) {
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                const f = clone[index].optionsList.splice(indexInnerList, 1)[0];
                clone[index].optionsList.splice(indexInnerList + 1, 0, f);
                settestMap(clone[index].optionsList);
                return clone;
              });
            }
          }}
        >
          <MaterialCommunityIcons name="chevron-down" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 25,
            backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (testMap.length > 1 && indexInnerList !== 0) {
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                const f = clone[index].optionsList.splice(indexInnerList, 1)[0];
                clone[index].optionsList.splice(indexInnerList - 1, 0, f);
                settestMap(clone[index].optionsList);
                return clone;
              });
            }
          }}
        >
          <MaterialCommunityIcons name="chevron-up" size={32} color="white" />
        </TouchableOpacity>
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
            const cloneOuter = structuredClone(testMap);
            cloneOuter.splice(indexInnerList, 1);
            // newProductOptions.current[index].optionsList = clone;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].optionsList = cloneOuter;
              return clone;
            });
            settestMap(cloneOuter);
          }}
        >
          <Feather name="x" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const ESelectedCaseListMapItem = ({ ifStatement, indexOfIf }) => {
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
        key={"D" + indexOfIf.toString()}
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
              let clone;
              setnewProductOptions((prev) => {
                clone = structuredClone(prev);
                clone[index].selectedCaseList[indexOfIf].selectedCaseKey =
                  val.value;
                return clone;
              });
              sete((prev) => ({
                ...prev,
                selectedCaseList: clone[index].selectedCaseList,
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
              let clone;
              setnewProductOptions((prev) => {
                clone = structuredClone(prev);
                clone[index].selectedCaseList[indexOfIf].selectedCaseValue =
                  val.value;
                return clone;
              });
              sete((prev) => ({
                ...prev,
                selectedCaseList: clone[index].selectedCaseList,
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
            let clone;
            setnewProductOptions((prev) => {
              clone = structuredClone(prev);
              clone[index].selectedCaseList.splice(indexOfIf, 1);
              return clone;
            });
            sete((prev) => ({
              ...prev,
              selectedCaseList: clone[index].selectedCaseList,
            }));
          }}
        >
          <Feather name="x" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const [optionLabelBeforeBlur, setoptionLabelBeforeBlur] = useState(e.label);
  const [numOfSelectableBeforeBlur, setnumOfSelectableBeforeBlur] = useState(
    e.numOfSelectable ? e.numOfSelectable : ""
  );

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
          onBlur={() => {
            sete((prevState) => ({
              ...prevState,
              label: optionLabelBeforeBlur,
            }));
            // newProductOptions.current[index].label = optionLabelBeforeBlur;
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone[index].label = optionLabelBeforeBlur;
              return clone;
            });
          }}
          onChangeText={(val) => {
            setoptionLabelBeforeBlur(val);
          }}
          value={optionLabelBeforeBlur}
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
                // newProductOptions.current[index].optionType = val.value;
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  clone[index].optionType = val.value;
                  return clone;
                });
              } else {
                // newProductOptions.current[index] = {
                //   ...e,
                //   optionType: val.value,
                // };
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  clone[index] = {
                    ...e,
                    optionType: val.value,
                  };
                  return clone;
                });
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
            onBlur={() => {
              sete((prevState) => ({
                ...prevState,
                numOfSelectable: numOfSelectableBeforeBlur,
              }));
              // newProductOptions.current[index].numOfSelectable = numOfSelectableBeforeBlur;
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].numOfSelectable = numOfSelectableBeforeBlur;
                return clone;
              });
            }}
            onChangeText={(val) => {
              const re = /^[0-9\b]+$/;

              // if value is not blank, then test the regex

              if (val === "" || re.test(val)) {
                if (e.optionType === "Multi Choice") {
                  setnumOfSelectableBeforeBlur(val);
                }
              }
            }}
            value={numOfSelectableBeforeBlur}
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
              // newProductOptions.current[index].isRequired = val;
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone[index].isRequired = val;
                return clone;
              });
            }}
          />
        </View>
      </View>
      {/* Convert .map to flatlist */}
      <FlatList
        data={testMap}
        renderItem={({ item, index }) => (
          <TestMapItem
            key={"D" + index.toString()}
            eInnerListStart={item}
            indexInnerList={index}
          />
        )}
        listKey={(item, index) => "D" + index.toString()}
        keyExtractor={(item, index) => "D" + index.toString()}
      />
      <Button
        title="Add Option Choice"
        onPress={() => {
          const cloneOuter = structuredClone(testMap);
          cloneOuter.push({
            label: null,
            priceIncrease: null,
          });
          // newProductOptions.current[index].optionsList = clone;
          setnewProductOptions((prev) => {
            const clone = structuredClone(prev);
            clone[index].optionsList = cloneOuter;
            return clone;
          });
          settestMap(cloneOuter);
        }}
        
        disabled={
          testMap.length > 0 && testMap[testMap.length - 1].label === null
        }
        style={{
          marginBottom: 25,
          marginTop: 25,
          backgroundColor: "#4050B5",
        }}
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
      <FlatList
        data={e.selectedCaseList}
        renderItem={({ item, index }) => (
          <ESelectedCaseListMapItem ifStatement={item} indexOfIf={index} />
        )}
        listKey={(item, index) => "D" + index.toString()}
      />
      {optionLbls.length > 1 && (
        <Button
          title="Add If Statement"
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
  setnewProductOptions,
  indexOn,
  setindexOn,
}) => {
  const [e, sete] = useState(structuredClone(item));

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
              if (
                newProductOptions.length > 1 &&
                index !== newProductOptions.length - 1
              ) {
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  const f = clone.splice(index, 1)[0];
                  clone.splice(index + 1, 0, f);
                  return clone;
                });

                setnewProduct((prevState) => ({
                  ...prevState,
                  options: newProductOptions,
                }));
                setindexOn(null);
              }
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
              if (newProductOptions.length > 1 && index !== 0) {
                setnewProductOptions((prev) => {
                  const clone = structuredClone(prev);
                  const f = clone.splice(index, 1)[0];
                  clone.splice(index - 1, 0, f);
                  return clone;
                });

                setnewProduct((prevState) => ({
                  ...prevState,
                  options: newProductOptions,
                }));
                setindexOn(null);
              }
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
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone.push({
                  ...item,
                  label: item.label + " Copy",
                  id: Math.random().toString(36).substr(2, 9),
                });
                return clone;
              });

              setnewProduct((prevState) => ({
                ...prevState,
                options: newProductOptions,
              }));
              setindexOn(newProductOptions.length);
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
              const newProductOptionsUpdated = newProduct.options.filter(
                (e, filterIndex) => filterIndex !== index && e.id !== item.id
              );
              // newProductOptions.current.splice(index, 1);
              setnewProductOptions((prev) => {
                const clone = structuredClone(prev);
                clone.splice(index, 1);
                return clone;
              });

              setnewProduct((prevState) => ({
                ...prevState,
                options: newProductOptionsUpdated,
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
              key={"D" + index.toString()}
              item={item}
              index={index}
              newProduct={newProduct}
              newProductOptions={newProductOptions}
              setnewProductOptions={setnewProductOptions}
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
            setnewProductOptions((prev) => {
              const clone = structuredClone(prev);
              clone.push({
                label: null,
                optionsList: [],
                selectedCaseKey: null,
                selectedCaseValue: null,
                numOfSelectable: null,
                id: Math.random().toString(36).substr(2, 9),
                optionType: null,
              });
              return clone;
            });

            // setnewProduct((prevState) => ({
            //   ...prevState,
            //   options: newProductOptions,
            // }));
            setindexOn(newProductOptions.length);
          }}
          disabled={e.label === null}
          style={{ marginBottom: 25, backgroundColor: "#4050B5" }}
        />
      )}
    </View>
  );
};

export default OptionView;
