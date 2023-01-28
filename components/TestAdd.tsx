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

const MyListItem = ({
  item,
  index,
  setnewProduct,
  newProduct,
  newProductOptions,
  flatListRef,
  yPosition,
}) => {
  const memoizedItem = useMemo(() => item, [item]);

  const [optionLblsValues, setoptionLblsValues] = useState([]);
  const [e, sete] = useState(memoizedItem);
  var optionLbls = newProduct.options.map(function (el) {
    if (el.label !== e.label && el.label !== null) {
      return el.label;
    }
  });

  useEffect(() => {
    if (e.selectedCaseKey !== null) {
      const local = newProduct.options.filter(
        (localE) => localE.label == e.selectedCaseKey
      );
      const optionLblsValuesLocal = local[0].optionsList.map(function (el) {
        return el.label;
      });
      setoptionLblsValues(optionLblsValuesLocal);
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
          onPress={() => {
            newProductOptions.current.push({
              ...e,
              label: e.label + " Copy",
            });
            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            flatListRef.current.scrollToOffset({
              offset: yPosition,
              animated: false,
            });
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
            flatListRef.current.scrollToOffset({
              offset: yPosition,
              animated: false,
            });
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
            flatListRef.current.scrollToOffset({
              offset: yPosition,
              animated: false,
            });
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
        {e.optionsList.map((eInnerListStart, indexInnerList) => {
          const [eInnerList, seteInnerList] = useState(eInnerListStart);
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
                  newProductOptions.current[index].optionsList[
                    indexInnerList
                  ].label = val;
                  seteInnerList((prevState) => ({
                    ...prevState,
                    label: val,
                  }));
                }}
                value={eInnerList.label}
              />
              <TextInput
                placeholder="Enter price increase"
                onChangeText={(val) => {
                  newProductOptions.current[index].optionsList[
                    indexInnerList
                  ].priceIncrease = val;
                  seteInnerList((prevState) => ({
                    ...prevState,
                    priceIncrease: val,
                  }));
                }}
                value={eInnerList.priceIncrease}
                style={{ marginLeft: 20, marginRight: 20 }}
              />
              <TouchableOpacity
                onPress={() => {
                  newProductOptions.current[index].optionsList.splice(
                    indexInnerList,
                    1
                  );
                  setnewProduct((prevState) => ({
                    ...prevState,
                    options: newProductOptions.current,
                  }));
                  flatListRef.current.scrollToOffset({
                    offset: yPosition,
                    animated: false,
                  });
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
            newProductOptions.current[index].optionsList.push({
              label: null,
              priceIncrease: null,
            });
            setnewProduct((prevState) => ({
              ...prevState,
              options: newProductOptions.current,
            }));
            flatListRef.current.scrollToOffset({
              offset: yPosition,
              animated: false,
            });
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
                sete((prevState) => ({ ...prevState, selectedCaseValue: val }));
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
};

const AddProduct = ({ route, navigation }) => {
  const { existingProduct, existingProductIndex } = route.params;
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

  const flatListRef = useRef(null);
  const [yPosition, setYPosition] = useState(0);

  // we set the height of item is fixed
  const getItemLayout = (data, index) => ({
    length: 400,
    offset: 400 * index,
    index,
  }); 

  const OptionsAddingSection = () => {
    return (
      <View>
        <FlatList
          ref={flatListRef}
          getItemLayout={getItemLayout}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          onScroll={(e) => {
            setYPosition(e.nativeEvent.contentOffset.y);
          }}
          data={newProduct.options}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item, index }) => (
            <MyListItem
              item={item}
              index={index}
              newProduct={newProduct}
              setnewProduct={setnewProduct}
              newProductOptions={newProductOptions}
              flatListRef={flatListRef}
              yPosition={yPosition}
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
            flatListRef.current.scrollToOffset({
              offset: yPosition,
              animated: false,
            });
          }}
          style={{ marginBottom: 25 }}
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
