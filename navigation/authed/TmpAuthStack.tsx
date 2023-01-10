import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "screens/authed/HomeScreen";
import Register from "screens/non-authed/Register";

const Stack = createStackNavigator();

export default function TmpAuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
