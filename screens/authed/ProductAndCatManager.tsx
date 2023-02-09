import { View, Text, Button } from "react-native";
import React from "react";

const ProductAndCatManager = ({ navigation }) => {
  return (
    <View>
      <Text>ProductAndCatManager</Text>
      <Button
        title="Edit Products"
        onPress={() => navigation.navigate("EditProductList")}
      />
      <Button
        title="Edit Categories"
        onPress={() => navigation.navigate("EditCategories")}
      />
    </View>
  );
};

export default ProductAndCatManager;
