import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import DropDown from "./DropDown";
import { userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import OptionView from "./OptionView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import ReactSelect from "react-select";

const AddProduct = ({
  existingProductProp,
  existingProductIndexProp,
  goBack,
  productCategory,
}) => {
  const { existingProduct, existingProductIndex } = existingProductProp
    ? {
        existingProduct: existingProductProp,
        existingProductIndex: existingProductIndexProp,
      }
    : { existingProduct: null, existingProductIndex: null };

  const catalog = userStoreState.use();
  const [newProduct, setnewProduct] = useState(
    existingProduct
      ? existingProduct
      : {
          name: "",
          price: "",
          category: productCategory,
          options: [],
          description: "",
          id: Math.random().toString(36).substr(2, 9),
        }
  );
  const newProductOptions = useRef(
    existingProduct ? existingProduct.options : []
  );
  const [indexOn, setindexOn] = useState(0);
  const { width, height } = useWindowDimensions();

  // useEffect(() => {
  //   //setTimeout(() => {
  //   window.scrollTo({
  //     top: currentY,
  //     behavior: "instant",
  //   });
  //   //}, 500);
  // }, [currentY]);

  function handleDataUpdate(copyProductData) {
    if (copyProductData) {
      console.log("First if");
      updateData(
        [...catalog.categories],
        [...catalog.products, copyProductData]
      );
      goBack();
    } else if (existingProduct) {
      console.log("Second if");
      let copy = structuredClone(catalog.products);

      if (existingProduct.id) {
        console.log("if 2 1");
        const newProductUseRef = {
          ...newProduct,
          options: newProductOptions.current,
        };
        const findIndex = copy.findIndex((e) => e.id === existingProduct.id);
        copy[findIndex] = newProductUseRef;
      } else {
        console.log("if 2 2");
        const newProductUseRef = {
          ...newProduct,
          options: newProductOptions.current,
          id: Math.random().toString(36).substr(2, 9),
        };
        copy[existingProductIndex] = newProductUseRef;
      }
      updateData([...catalog.categories], copy);
      goBack();
    } else {
      console.log("Third if");
      updateData([...catalog.categories], [...catalog.products, newProduct]);
      goBack();
    }
  }

  const OptionsAddingSection = () => {
    return (
      <View>
        <FlatList
          // onLayout={() =>
          //   window.scrollTo({
          //     top: currentY,
          //     behavior: "instant",
          //   })
          // }
          getItemLayout={(data, index) => ({
            length: index === indexOn ? 400 * data.optionsList?.length : 100,
            offset: 400 * index,
            index,
          })}
          data={newProduct.options}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item, index }) => (
            <OptionView
              item={item}
              index={index}
              newProduct={newProduct}
              setnewProduct={setnewProduct}
              newProductOptions={newProductOptions}
              indexOn={indexOn}
              setindexOn={setindexOn}
            />
          )}
        />
        {newProduct.options.length === 0 && (
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
            disabled={
              newProduct.options.length > 0 &&
              newProduct.options[newProduct.options.length - 1].label === null
            }
          />
        )}
      </View>
    );
  };

  const [selectValues, setselectValues] = useState([]);

  useEffect(() => {
    if (catalog.categories) {
      const local = [];
      catalog.categories.map((val) => local.push({ value: val, label: val }));
      setselectValues(local);
    }
  }, []);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          opacity: 0.5,
          height: "100%",
          width: "100%",
        }}
        onPress={goBack}
      />
      {/* <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <View
        style={{
          height: height * 0.9,
          width: height * 0.9,
          backgroundColor: "white",
          borderRadius: 10,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 25,
          }}
        >
          <TouchableOpacity
            onPress={goBack}
            style={{
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color="#4A4A4A"
            />
          </TouchableOpacity>
          <Text style={{ fontFamily: "archivo-600", fontSize: 24 }}>
            {newProduct.name ? newProduct.name : "New Product"}
          </Text>
          {/* <Button
                  title="Save"
                  onPress={() => {
                    goBack();
                  }}
                  style={{
                    marginBottom: 25,
                    marginTop: 25,
                    backgroundColor: "#4050B5",
                  }}
                /> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                let copy = structuredClone(newProduct);
                copy.name = copy.name + " Copy";
                copy.id = Math.random().toString(36).substr(2, 9);
                handleDataUpdate(copy);
              }}
            >
              <Feather name="copy" size={32} color="#4A4A4A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDataUpdate(false)}>
              <Feather name="check" size={32} color="#4A4A4A" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
          }}
          contentContainerStyle={{
            borderRadius: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              padding: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <TextInput
                placeholder="Enter product name"
                onChangeText={(val) => {
                  setnewProduct((prevState) => ({ ...prevState, name: val }));
                }}
                value={newProduct.name}
                label="Enter product name"
                variant="outlined"
                style={{ margin: 10, width: "46%" }}
                color="black"
              />
              <TextInput
                placeholder="Enter any other items that come with this"
                onChangeText={(val) => {
                  setnewProduct((prevState) => ({
                    ...prevState,
                    description: val,
                  }));
                }}
                value={newProduct.description}
                label="Enter item description"
                variant="outlined"
                style={{ margin: 10, width: "46%" }}
                color="black"
              />
              <TextInput
                placeholder="Enter product price"
                onChangeText={(val) => {
                  setnewProduct((prevState) => ({
                    ...prevState,
                    price: val,
                  }));
                }}
                style={{ marginBottom: 25 }}
                value={newProduct.price}
                label="Enter product price"
                variant="outlined"
                style={{ margin: 10, width: "46%" }}
                color="black"
              />
              <View
                style={{
                  margin: 10,
                  width: "46%",
                  height: 52,
                }}
              >
                <ReactSelect
                  isDisabled={productCategory && !existingProduct}
                  options={selectValues}
                  value={
                    newProduct.catagory
                      ? {
                          value: newProduct.catagory,
                          label: newProduct.catagory,
                        }
                      : newProduct.category && {
                          value: newProduct.category,
                          label: newProduct.category,
                        }
                  }
                  onChange={(val) => {
                    setnewProduct((prevState) => ({
                      ...prevState,
                      category: val.value,
                    }));
                  }}
                  placeholder={"Choose product's category"}
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
            </View>
            <OptionsAddingSection />
          </View>
        </ScrollView>
      </View>
      {/* </View> */}
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
