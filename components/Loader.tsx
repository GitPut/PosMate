import { View, Image } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <Image
        source={require("assets/loading.gif")}
        style={{ width: 450, height: 450, resizeMode: "contain" }}
        key={"loading"}
      />
    </View>
  );
};

export default Loader;
