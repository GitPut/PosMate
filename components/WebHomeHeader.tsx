import { Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { auth } from "state/firebaseConfig";
import { sectionState, setsectionState, userStoreState } from "state/state";
import Logo from "../assets/dpos-logo.png";

const WebHomeHeader = ({ navigation, route, options, back }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(31,35,48,1)",
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      <Image
        source={Logo}
        style={{ width: 250, height: 160, resizeMode: "contain" }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(51,81,243,1)",
          borderRadius: 30,
          width: 160,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WebHomeHeader;
