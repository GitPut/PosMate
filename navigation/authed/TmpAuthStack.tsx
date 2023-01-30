import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "screens/authed/HomeScreen";
import Register from "screens/non-authed/Register";
import EditProductList from "components/EditProductList";
import AddProduct from "components/TestAdd";
import WoocommerceSettings from "components/WoocommerceSettings";
import EditStoreDetails from "components/EditStoreDetails";
import AddCategory from "components/AddCategory";
import ViewTransactions from "screens/authed/ViewTransactions";
import CustomHeader from "components/CustomHeader";
import ProductListing from "components/ProductListing";
import SettingsHome from "screens/authed/SettingsHome";

const Stack = createStackNavigator();

export default function TmpAuthStack() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   header: (props) => <CustomHeader {...props} />,
    //   headerMode: "screen",
    // }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SettingsHome" component={SettingsHome} />
      <Stack.Screen name="EditCategories" component={AddCategory} />
      <Stack.Screen name="EditProductList" component={EditProductList} />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditWoocommerce" component={WoocommerceSettings} />
      <Stack.Screen name="StoreDetails" component={EditStoreDetails} />
      <Stack.Screen name="Transactions" component={ViewTransactions} />
      <Stack.Screen
        name="ProductListing"
        component={ProductListing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
