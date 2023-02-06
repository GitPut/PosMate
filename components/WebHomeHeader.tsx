import { Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { auth } from "state/firebaseConfig";
import { sectionState, setsectionState, userStoreState } from "state/state";
import Logo from "assets/dpos-logo.png";
import Icon from "@expo/vector-icons/Entypo";

const WebHomeHeader = ({ navigation, route, options, back }) => {
  return (
    <View style={styles.container}>
      <Image source={Logo} resizeMode="contain" style={styles.logo}></Image>
      <TouchableOpacity>
        <Text style={styles.homeTxt}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.pricingTxt}>Pricing</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.demoTxt}>Demo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginTxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="help-with-circle" style={styles.helpIcon}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default WebHomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(31,35,48,1)",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 90,
  },
  logo: {
    width: 238,
    height: 65,
    margin: 35,
  },
  homeTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  pricingTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  demoTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  loginBtn: {
    width: 150,
    height: 45,
    backgroundColor: "rgba(29,128,246,1)",
    borderRadius: 14,
    margin: 35,
    justifyContent: "center",
  },
  loginTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    alignSelf: "center",
  },
  helpIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
  },
});
