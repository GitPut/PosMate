import { View, Text, Button } from "react-native";
import React from "react";

const ProductAndCatManager = ({ navigation }) => {
  return (
    <View>
      <Text>ProductAndCatManager</Text>
      <Button
        title="Edit Products"
        onPress={() => navigation.navigate("Edit ProductList")}
      />
      <Button
        title="Edit Categories"
        onPress={() => navigation.navigate("Edit Categories")}
      />
    </View>
  );
};

export default ProductAndCatManager;
