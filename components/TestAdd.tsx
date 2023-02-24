import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import DropDown from "./DropDown";
import { userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import OptionView from "./OptionView";

const AddProduct = ({ route, navigation }) => {
  const { existingProduct, existingProductIndex } = route.params
    ? route.params
    : { existingProduct: null, existingProductIndex: null };

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
  const newProductOptions = useRef(
    existingProduct ? existingProduct.options : []
  );
  const [indexOn, setindexOn] = useState(0);

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
      updateData(
        [...catalog.categories],
        [...catalog.products, copyProductData]
      );
      navigation.goBack();
    } else if (existingProduct) {
      let copy = structuredClone(catalog.products);
      const newProductUseRef = {
        ...newProduct,
        options: newProductOptions.current,
      };
      copy[existingProductIndex] = newProductUseRef;
      updateData([...catalog.categories], copy);
      navigation.goBack();
    } else {
      updateData([...catalog.categories], [...catalog.products, newProduct]);
      navigation.goBack();
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
        <Button
          title="Add Product Option"
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
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={{ width: "100%", height: "100%", flex: 1 }}
      contentContainerStyle={{
        width: "93%",
        alignSelf: "center",
        marginTop: 25,
      }}
    >
      <>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
          color="black"
          placeholder="Enter Product Name"
          onChangeText={(val) => {
            setnewProduct((prevState) => ({ ...prevState, name: val }));
          }}
          value={newProduct.name}
          style={{ marginBottom: 25 }}
        />
        <TextInput
          color="black"
          placeholder="Enter any other items that come with this"
          onChangeText={(val) => {
            setnewProduct((prevState) => ({ ...prevState, description: val }));
          }}
          style={{ marginBottom: 25 }}
          value={newProduct.description}
        />
        <TextInput
          color="black"
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
          onPress={() => {
            handleDataUpdate();
          }}
          style={{
            marginBottom: 25,
            marginTop: 25,
            backgroundColor: "lightgreen",
          }}
        />
      </>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
