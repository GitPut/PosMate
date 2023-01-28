import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { userStoreState } from "state/state";
import { Button, TextInput } from "@react-native-material/core";
import TestAdd from "./TestAdd";
import Spinner from "./Spinner";
import { updateData } from "state/firebaseFunctions";

const EditProductList = ({ navigation }) => {
  const catalog = userStoreState.use();
  const [isModalVisible, setisModalVisible] = useState(false);

  function handleRemoveCatagory(index) {
    const localCatalog = structuredClone(catalog);
    localCatalog.products.splice(index, 1);

    updateData(localCatalog.categories, localCatalog.products);
    // setisModalVisible(true);
  }

  return (
    <ScrollView style={{ padding: 25 }}>
      <Text style={{ fontSize: 17, fontWeight: "600" }}>Current Products</Text>
      {catalog.categories.length > 0 ? (
        catalog.products.map((e, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                margin: 10,
                backgroundColor: "lightgrey",
              }}
            >
              <Text style={{ fontSize: 17 }}>Product: {e.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "10%",
                }}
              >
                <Button
                  title="Edit"
                  // onPress={() => setProductEditModal(true)}
                  onPress={() =>
                    navigation.navigate("AddProduct", {
                      existingProduct: e,
                      existingProductIndex: index,
                    })
                  }
                  style={{ margin: 10 }}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveCatagory(index)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    backgroundColor: "red",
                    padding: 10,
                    margin: 10,
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "600", fontSize: 18 }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Modal visible={productEditModal}>
                <TestAdd
                  setProductModal={setProductEditModal}
                  setisModalVisible={setisModalVisible}
                  existingProduct={e}
                  existingProductIndex={index}
                />
              </Modal> */}
            </View>
          );
        })
      ) : (
        <Text style={{ marginTop: 50, marginBottom: 50 }}>
          You must add a category before you can add a product...
        </Text>
      )}
      {catalog.products.length < 1 && catalog.categories.length > 0 && (
        <Text style={{ marginTop: 50, marginBottom: 50 }}>
          You have no products...
        </Text>
      )}
      <Button
        title="Add New Product"
        // onPress={() => setProductModal(true)}
        onPress={() => navigation.navigate("AddProduct")}
        style={{ margin: 10 }}
        disabled={catalog.categories.length < 1}
      />
      {/* <Modal visible={productModal}>
        <TestAdd
          setProductModal={setProductModal}
          setisModalVisible={setisModalVisible}
        />
      </Modal> */}
      {/* <Spinner isModalVisible={isModalVisible} /> */}
    </ScrollView>
  );
};

export default EditProductList;

const styles = StyleSheet.create({});
