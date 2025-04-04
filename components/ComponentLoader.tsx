import { View, Image } from "react-native";
import React from "react";

const ComponentLoader = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(250,250,250,0.5)",
        height: "100%",
        width: "100%",
      }}
    >
      <Image
        source={require("assets/loading2.gif")}
        style={{ width: 450, height: 450, resizeMode: "contain" }}
        key={"loading"}
      />
    </View>
  );
};

export default ComponentLoader;
