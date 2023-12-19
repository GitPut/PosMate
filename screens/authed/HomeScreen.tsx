import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";

const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: "70%", height: "100%" }}>
          {/* <AuthHomeHeader
            setsettingsPasswordModalVis={setsettingsPasswordModalVis}
            setongoingOrderListModal={setongoingOrderListModal}
          /> */}
          <MenuScreen />
        </View>
        <CartScreen navigation={props.navigation} />
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
