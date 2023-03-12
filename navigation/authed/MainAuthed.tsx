import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "screens/authed/HomeScreen";
import Register from "screens/non-authed/Register.old";
import EditProductList from "components/EditProductList";
import AddProduct from "components/ProductBuilder";
import EditStoreDetails from "components/EditStoreDetails";
import AddCategory from "components/AddCategory";
import ViewTransactions from "screens/authed/ViewTransactions";
import SettingsHome from "screens/authed/SettingsHome";
import CompletePaymentPhoneOrder from "components/CompletePaymentPhoneOrder";
import Tutorial from "components/Tutorial";

const Stack = createStackNavigator();

export default function MainAuthed() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="settings"
        component={SettingsHome}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}
