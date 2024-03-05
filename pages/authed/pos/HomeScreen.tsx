import { Dimensions, View } from "react-native";
import React, { useEffect } from "react";
import MenuScreen from "components/menu/MenuScreen";
import CartScreen from "components/cart/CartScreen";
import OrderPagePosHome from "components/MainPosPage/OrderPagePosHome";

const HomeScreen = (props) => {
  const width = Dimensions.get("window").width;
  useEffect(() => {
    localStorage.setItem("isAuthedBackend", false);
  }, []);

  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      {/* <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: width < 1400 ? "65%" : "70%", height: "100%" }}>
          <MenuScreen />
        </View>
        <CartScreen navigation={props.navigation} />
      </View> */}
      <OrderPagePosHome navigation={props.navigation} />
    </View>
  );
};

export default HomeScreen;
