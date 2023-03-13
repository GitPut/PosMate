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
import Logo from "assets/dpos-logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import {
  setTutorialDetailsState,
  storeDetailState,
  tutorialDetailsState,
} from "state/state";
import TutorialStep from "./tutorial/TutorialStep";

const LogoImage = React.memo(
  () => (
    <Image
      source={Logo}
      style={{ width: 200, height: 160, resizeMode: "contain" }}
    />
  ),
  []
);

const AuthHomeHeader = (props) => {
  const storeDetails = storeDetailState.use();
  const tutorialDetails = tutorialDetailsState.use();

  return (
    <View
      style={{
        width: "100%",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(31,35,48,1)",
        paddingLeft: 25,
        paddingRight: 25,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
          width: -3,
          height: 3,
        },
        elevation: 30,
        shadowOpacity: 0.5,
        shadowRadius: 5,
      }}
    >
      <LogoImage />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => props.setongoingOrderListModal(true)}
          style={{
            backgroundColor: "rgba(41,44,56,1)",
            borderRadius: 100,
            width: 55,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Ionicons name="chevron-down" size={28} color="white" />
        </TouchableOpacity>
        <TutorialStep
          step={1}
          helpDescription="Click here to go to the settings page"
          setStepDetails={setTutorialDetailsState}
          stepDetails={tutorialDetails}
          changeNextBtnFunc={() => {
            storeDetails.settingsPassword
              ? props.setsettingsPasswordModalVis(true)
              : props.navigation.navigate("settings");
          }}
        >
          <TouchableOpacity
            // onPress={() => navigation.navigate("SettingsHome")}
            onPress={() =>
              storeDetails.settingsPassword
                ? props.setsettingsPasswordModalVis(true)
                : props.navigation.navigate("settings")
            }
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 55,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Entypo name="cog" size={28} color="white" />
          </TouchableOpacity>
        </TutorialStep>
      </View>
    </View>
  );
};

export default React.memo(AuthHomeHeader);
