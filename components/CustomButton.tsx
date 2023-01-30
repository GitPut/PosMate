import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ containerStyle, titleStyle, title, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "rgba(51,81,243,1)",
          borderRadius: 30,
          width: 160,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle && containerStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          { fontSize: 18, color: "white", fontWeight: "600" },
          titleStyle && titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
