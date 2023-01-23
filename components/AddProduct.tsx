import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import DropDown from "./DropDown";
import { userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";

const AddProduct = ({
  setProductModal,
  setisModalVisible,
  existingProduct,
  existingProductIndex,
}) => {
  const catalog = userStoreState.use();
  const [newProduct, setnewProduct] = useState(
    existingProduct
      ? existingProduct
      : {
          name: null,
          price: null,
          catagory: null,
          options: [],
          description: null,
        }
  );
  const [autoFocusOn, setautoFocusOn] = useState({
    index: null,
    inputName: null,
    innerList: null,
  });

  function handleDataUpdate(copyProductData) {
    if (copyProductData) {
      updateData(
        [...catalog.categories],
        [...catalog.products, copyProductData]
      );
    } else if (existingProduct) {
      let copy = structuredClone(catalog.products);
      copy[existingProductIndex] = newProduct;

      updateData([...catalog.categories], copy);
    } else {
      updateData([...catalog.categories], [...catalog.products, newProduct]);
    }
    setisModalVisible(true);
  }

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [newProduct]);

  const OptionsAddingSection = () => {
    return (
      <View>
        {newProduct.options.map((e, index) => {
          const [optionLblsValues, setoptionLblsValues] = useState([]);
          const [optionLbls, setoptionLbls] = useState([]);

          useEffect(() => {
            //setnewProduct(newProductSaved.current);
            if (newProduct.options.length > 1) {
              const optionLblsLocal = [];
              newProduct.options.forEach((checkUseE) => {
                if (checkUseE.label !== e.label)
                  optionLblsLocal.push(checkUseE.label);
              });
              setoptionLbls(optionLblsLocal);
            }
          }, []);

          useEffect(() => {
            if (e.selectedCaseKey !== null) {
              const local = newProduct.options.filter(
                (localE) => localE.label == e.selectedCaseKey
              );
              const optionLblsValuesLocal = [];
              local[0].optionsList.forEach((eVals) => {
                optionLblsValuesLocal.push(eVals.label);
              });
              setoptionLblsValues(optionLblsValuesLocal);
            }
          }, [optionLbls]);

          return (
            <View
              style={{
                padding: 25,
                margin: 15,
                backgroundColor: "lightgrey",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  const copy = structuredClone(newProduct);
                  copy.options.push({
                    ...e,
                    label: e.label + " Copy",
                  });

                  setnewProduct((prevState) => ({
                    ...prevState,
                    options: copy.options,
                  }));
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
                  const copy = structuredClone(newProduct);
                  copy.options.splice(index, 1);

                  setnewProduct((prevState) => ({
                    ...prevState,
                    options: copy.options,
                  }));
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
              <TextInput
                placeholder="Enter Select List Label"
                onChangeText={(val) => {
                  const newOptionsList = [...newProduct.options];
                  newOptionsList[index].label = val;
                  setautoFocusOn({
                    index: index,
                    inputName: "label",
                    innerList: false,
                  });
                  sessionStorage.setItem("scrollPosition", window.pageYOffset);
                  setnewProduct((prevState) => ({
                    ...prevState,
                    options: newOptionsList,
                  }));
                }}
                value={e.label}
                autoFocus={
                  autoFocusOn.index === index &&
                  autoFocusOn.innerList === false &&
                  autoFocusOn.inputName === "label"
                }
                style={{ marginBottom: 25 }}
              />
              <TextInput
                placeholder="Enter Number Of Selectable; If There Is"
                onChangeText={(val) => {
                  const newOptionsList = [...newProduct.options];
                  newOptionsList[index].numOfSelectable = val;
                  setautoFocusOn({
                    index: index,
                    inputName: "numOfSelectable",
                    innerList: false,
                  });
                  sessionStorage.setItem("scrollPosition", window.pageYOffset);
                  setnewProduct((prevState) => ({
                    ...prevState,
                    options: newOptionsList,
                  }));
                }}
                value={e.numOfSelectable}
                autoFocus={
                  autoFocusOn.index === index &&
                  autoFocusOn.innerList === false &&
                  autoFocusOn.inputName === "numOfSelectable"
                }
                style={{ marginBottom: 25 }}
              />
              {e.optionsList.map((eInnerList, indexInnerList) => {
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
                        const newOptionsList = structuredClone(newProduct);
                        newOptionsList.options[index].optionsList[
                          indexInnerList
                        ].label = val;
                        setautoFocusOn({
                          index: indexInnerList,
                          inputName: "label",
                          innerList: true,
                        });
                        sessionStorage.setItem(
                          "scrollPosition",
                          window.pageYOffset
                        );
                        setnewProduct(newOptionsList);
                      }}
                      value={eInnerList.label}
                      autoFocus={
                        autoFocusOn.index === indexInnerList &&
                        autoFocusOn.innerList === true &&
                        autoFocusOn.inputName === "label"
                      }
                    />
                    <TextInput
                      placeholder="Enter price increase"
                      onChangeText={(val) => {
                        const newOptionsList = structuredClone(newProduct);
                        newOptionsList.options[index].optionsList[
                          indexInnerList
                        ].priceIncrease = val;
                        setautoFocusOn({
                          index: indexInnerList,
                          inputName: "priceIncrease",
                          innerList: true,
                        });
                        sessionStorage.setItem(
                          "scrollPosition",
                          window.pageYOffset
                        );
                        setnewProduct(newOptionsList);
                      }}
                      value={eInnerList.priceIncrease}
                      autoFocus={
                        autoFocusOn.index === indexInnerList &&
                        autoFocusOn.innerList === true &&
                        autoFocusOn.inputName === "priceIncrease"
                      }
                      style={{ marginLeft: 20, marginRight: 20 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        const copy = structuredClone(newProduct);
                        copy.options[index].optionsList.splice(
                          indexInnerList,
                          1
                        );

                        setnewProduct((prevState) => ({
                          ...prevState,
                          options: copy.options,
                        }));

                        setnewProduct((prevState) => ({
                          ...prevState,
                          options: copy.options,
                        }));
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
                  const newOptionsList = [...newProduct.options];
                  newOptionsList[index].optionsList.push({
                    label: null,
                    priceIncrease: null,
                  });
                  setnewProduct((prevState) => ({
                    ...prevState,
                    options: newOptionsList,
                  }));
                  setautoFocusOn({
                    index: newOptionsList[index].optionsList.length - 1,
                    inputName: "label",
                    innerList: true,
                  });
                  sessionStorage.setItem("scrollPosition", window.pageYOffset);
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
                      const newOptionsList = [...newProduct.options];
                      newOptionsList[index].selectedCaseKey = val;
                      setnewProduct((prevState) => ({
                        ...prevState,
                        options: newOptionsList,
                      }));
                      sessionStorage.setItem(
                        "scrollPosition",
                        window.pageYOffset
                      );
                      setautoFocusOn({
                        index: null,
                        inputName: null,
                        innerList: null,
                      });
                    }}
                    value={e.selectedCaseKey}
                    style={{ marginBottom: 25 }}
                  />
                  <Text>"="</Text>
                  <DropDown
                    label="Show if..."
                    options={optionLblsValues}
                    setValue={(val) => {
                      const newOptionsList = [...newProduct.options];
                      newOptionsList[index].selectedCaseValue = val;
                      setnewProduct((prevState) => ({
                        ...prevState,
                        options: newOptionsList,
                      }));
                      sessionStorage.setItem(
                        "scrollPosition",
                        window.pageYOffset
                      );

                      setautoFocusOn({
                        index: null,
                        inputName: null,
                        innerList: null,
                      });
                    }}
                    value={e.selectedCaseValue}
                    style={{ marginBottom: 25 }}
                  />
                </View>
              )}
            </View>
          );
        })}
        <Button
          title="Add Product Option"
          onPress={() => {
            sessionStorage.setItem("scrollPosition", window.pageYOffset);

            setnewProduct((prevState) => ({
              ...prevState,
              options: [
                ...prevState.options,
                {
                  label: null,
                  optionsList: [],
                  selectedCaseKey: null,
                  selectedCaseValue: null,
                  numOfSelectable: null,
                },
              ],
            }));

            // Not using -1 on length since this is before the new option is added to list
            setautoFocusOn({
              index: newProduct.options.length,
              inputName: "label",
              innerList: false,
            });
          }}
          style={{ marginBottom: 25 }}
        />
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        width: "93%",
        alignSelf: "center",
        marginTop: 25,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setProductModal(false)}>
          <Text style={{ marginBottom: 25, fontWeight: "700", color: "red" }}>
            X
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let copy = structuredClone(newProduct);
            copy.name = copy.name + " Copy";
            handleDataUpdate(copy);
          }}
        >
          <Text style={{ marginBottom: 25, fontWeight: "700", color: "red" }}>
            Copy
          </Text>
        </TouchableOpacity>
        <Text style={{ marginBottom: 25 }}>AddProduct</Text>
      </View>
      <TextInput
        placeholder="Enter Product Name"
        onChangeText={(val) => {
          setnewProduct((prevState) => ({ ...prevState, name: val }));
        }}
        value={newProduct.name}
        style={{ marginBottom: 25 }}
      />
      <TextInput
        placeholder="Enter any other items that come with this"
        onChangeText={(val) => {
          setnewProduct((prevState) => ({ ...prevState, description: val }));
        }}
        style={{ marginBottom: 25 }}
        value={newProduct.description}
      />
      <TextInput
        placeholder="Enter Product Price"
        onChangeText={(val) => {
          setnewProduct((prevState) => ({ ...prevState, price: val }));
        }}
        style={{ marginBottom: 25 }}
        value={newProduct.price}
      />
      <DropDown
        label="Choose catagory"
        options={catalog.categories}
        setValue={(val) => {
          setnewProduct((prevState) => ({ ...prevState, catagory: val }));
        }}
        value={newProduct.catagory}
        style={{ marginBottom: 25 }}
      />
      <OptionsAddingSection />
      <Button
        title="Add/Save Product"
        onPress={() => handleDataUpdate()}
        style={{
          marginBottom: 25,
          marginTop: 25,
          backgroundColor: "lightgreen",
        }}
      />
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
