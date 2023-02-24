import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { userStoreState } from "state/state";
import { Button, TextInput } from "@react-native-material/core";
import Spinner from "./Spinner";
import { updateData } from "state/firebaseFunctions";

const AddCategory = () => {
  const catalog = userStoreState.use();
  const [categoryName, setcategoryName] = useState();
  const [isModalVisible, setisModalVisible] = useState(false);

  function handleDataUpdate() {
    updateData([...catalog.categories, categoryName], catalog.products);
    // setisModalVisible(true);
  }

  function handleRemoveCategory(index) {
    const localCatalog = structuredClone(catalog);
    localCatalog.categories.splice(index, 1);

    updateData(localCatalog.categories, localCatalog.products);
    // setisModalVisible(true);
  }

  return (
    <ScrollView style={{ padding: 25 }}>
      <Text style={{ fontSize: 17, fontWeight: "600" }}>
        Current categories
      </Text>
      {catalog.categories.map((e, index) => {
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
            <Text style={{ fontSize: 17 }}>{e}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveCategory(index)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red", fontWeight: "600" }}>Remove X</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <TextInput
        color="black"
        placeholder="Enter New Category"
        onChangeText={(val) => setcategoryName(val)}
        style={{ margin: 10 }}
      />
      <Button
        title="Add New Category"
        onPress={handleDataUpdate}
        style={{ margin: 10, backgroundColor: "#4050B5" }}
      />
      <Spinner isModalVisible={isModalVisible} />
    </ScrollView>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
