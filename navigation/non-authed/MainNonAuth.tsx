import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "screens/non-authed/Login";
import Register from "screens/non-authed/Register";
import WebHomeHeader from "components/WebHomeHeader";
import WebHome from "screens/non-authed/WebHome";

const Stack = createStackNavigator();

export default function MainNonAuth() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <WebHomeHeader {...props} />,
        headerMode: "screen",
      }}
    >
      <Stack.Screen name="WebHome" component={WebHome} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
