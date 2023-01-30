import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import { Button } from "@react-native-material/core";
import { userStoreState } from "state/state";
import { auth } from "state/firebaseConfig";
import Logo from "assets/dpos-logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import useWindowDimensions from "components/useWindowDimensions";

const HomeScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();

  const Header = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 80,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(31,35,48,1)",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Image
          source={Logo}
          style={{ width: 200, height: 160, resizeMode: "contain" }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SettingsHome")}>
          <Ionicons name="settings" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, height: height, width: width }}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: "70%", height: "100%" }}>
          <Header />
          <MenuScreen catalog={catalog} navigation={navigation} />
        </View>
        <CartScreen />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
