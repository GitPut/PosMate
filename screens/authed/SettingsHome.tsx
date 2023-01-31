import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import { logout } from "state/firebaseFunctions";

const SettingsHome = ({ navigation }) => {
  return (
    <View>
      <Text>Settings Home</Text>
      <Button
        title="Edit Categories"
        onPress={() => navigation.navigate("EditCategories")}
        style={{ marginBottom: 15 }}
      />
      <Button
        title="Edit Products"
        onPress={() => navigation.navigate("EditProductList")}
        style={{ marginBottom: 15 }}
      />
      <Button
        title="Edit Woocommerce Settings"
        onPress={() => navigation.navigate("EditWoocommerce")}
        style={{ marginBottom: 15 }}
      />
      <Button
        title="Edit Store Details"
        onPress={() => navigation.navigate("StoreDetails")}
        style={{ marginBottom: 15 }}
      />
      <Button
        title="View Transactions"
        onPress={() => navigation.navigate("Transactions")}
        style={{ marginBottom: 15 }}
      />
      <Button title="Logout" onPress={logout} style={{ marginBottom: 15 }} />
    </View>
  );
};

export default SettingsHome;

const styles = StyleSheet.create({});
