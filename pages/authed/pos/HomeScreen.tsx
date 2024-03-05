import { View } from "react-native";
import React, { useEffect } from "react";
import OrderPagePosHome from "components/MainPosPage/OrderPagePosHome";

const HomeScreen = (props) => {
  useEffect(() => {
    localStorage.setItem("isAuthedBackend", false);
  }, []);

  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      <OrderPagePosHome navigation={props.navigation} />
    </View>
  );
};

export default HomeScreen;
