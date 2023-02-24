import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "screens/authed/HomeScreen";
import Register from "screens/non-authed/Register.old";
import EditProductList from "components/EditProductList";
import AddProduct from "components/TestAdd";
import WoocommerceSettings from "components/WoocommerceSettings";
import EditStoreDetails from "components/EditStoreDetails";
import AddCategory from "components/AddCategory";
import ViewTransactions from "screens/authed/ViewTransactions";
import ProductListing from "components/ProductListing";
import SettingsHome from "screens/authed/SettingsHome";
import CompletePaymentPhoneOrder from "components/CompletePaymentPhoneOrder";

const Stack = createStackNavigator();

export default function TmpAuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsHome}
        options={{ headerShown: false, title: "Settings" }}
      />
      <Stack.Screen name="Edit Categories" component={AddCategory} />
      <Stack.Screen name="Edit ProductList" component={EditProductList} />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Listing"
        component={ProductListing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
