import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import DropDown from "./DropDown";
import { userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import OptionView from "./OptionView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import ReactSelect from "react-select";

const Confirmation = ({ confirmLbl, yesAction, noAction }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TouchableOpacity
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
            fontFamily: "archivo-500",
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
