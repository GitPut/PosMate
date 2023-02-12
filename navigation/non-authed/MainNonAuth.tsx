import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "screens/non-authed/Login";
// import Register from "screens/non-authed/Register.old";
import WebHomeHeader from "components/WebHomeHeader";
import WebHome from "screens/non-authed/WebHome";
import AboutUs from "screens/non-authed/AboutUs";
import Features from "screens/non-authed/Features";
import NotFound from "screens/non-authed/NotFound";
import Pricing from "screens/non-authed/Pricing";
import Faqs from "screens/non-authed/Faqs";
import Contact from "screens/non-authed/Contact";
import Signup from "screens/non-authed/Signup";
import ResetPassword from "screens/non-authed/ResetPassword";
import LatestUpdates from "screens/non-authed/LatestUpdates";
import Legal from "screens/non-authed/Legal";

const Stack = createStackNavigator();

export default function MainNonAuth() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <WebHomeHeader {...props} />,
        headerMode: "screen",
      }}
    >
      <Stack.Screen name="Home" component={WebHome} />
      <Stack.Screen name="Features" component={Features} />
      <Stack.Screen name="About Us" component={AboutUs} />
      <Stack.Screen name="Pricing" component={Pricing} />
      <Stack.Screen name="Faqs" component={Faqs} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Latest Updates" component={LatestUpdates} />
      <Stack.Screen name="Legal" component={Legal} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reset Password"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Register" component={Register} /> */}
      <Stack.Screen name="Not Found" component={NotFound} />
    </Stack.Navigator>
  );
}
