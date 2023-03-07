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
  const [isTutorialComplete, setisTutorialComplete] = useState(false);

  useEffect(() => {
    const isTutorialCompleteLocal = localStorage.getItem("tutorialComplete");
    if (isTutorialCompleteLocal == "true") {
      setisTutorialComplete(true);
    } else {
      setisTutorialComplete(false);
    }
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: (props) => (
            <Tutorial setisTutorialComplete={setisTutorialComplete} />
          ),
          headerShown: !isTutorialComplete,
        }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsHome}
        options={{ title: "Settings" }}
      />
      <Stack.Screen name="Edit Categories" component={AddCategory} />
      <Stack.Screen name="Edit ProductList" component={EditProductList} />
      <Stack.Screen name="AddProduct" component={AddProduct} options={{}} />
    </Stack.Navigator>
  );
}
