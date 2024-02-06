import {
  View,
} from "react-native";
import React, { useEffect } from "react";
import MenuScreen from "components/menu/MenuScreen";
import CartScreen from "components/cart/CartScreen";

const HomeScreen = (props) => {
  useEffect(() => {
    localStorage.setItem("isAuthedBackend", false);
  }, []);

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
