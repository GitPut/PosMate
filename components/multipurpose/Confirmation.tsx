import { Text, Pressable, useWindowDimensions, View } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";

const Confirmation = ({ confirmLbl, yesAction, noAction }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Pressable
        style={{
          backgroundColor: "black",
          opacity: 0.5,
          height: "100%",
          width: "100%",
        }}
        onPress={noAction}
      />
      <View
        style={{
          height: width * 0.2,
          width: width * 0.2,
          backgroundColor: "white",
          borderRadius: 10,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          {confirmLbl}
        </Text>
        <Button
          title="Yes"
          onPress={yesAction}
          style={{
            marginBottom: 10,
            marginTop: 25,
            backgroundColor: "#4050B5",
            width: "50%",
          }}
        />
        <Button
          title="No"
          onPress={noAction}
          style={{
            marginBottom: 10,
            marginTop: 25,
            backgroundColor: "#4050B5",
            width: "50%",
          }}
        />
      </View>
    </View>
  );
};

export default Confirmation;
