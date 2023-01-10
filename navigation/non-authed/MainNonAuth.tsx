import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "screens/non-authed/Login";
import Register from "screens/non-authed/Register";

const Stack = createStackNavigator();

export default function MainNonAuth() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
