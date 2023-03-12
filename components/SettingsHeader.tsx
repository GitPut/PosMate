import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Logo from "assets/dpos-logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setTutorialDetailsState, tutorialDetailsState } from "state/state";
import HelpModal from "components/HelpModal";
import TutorialStep from "components/tutorial/TutorialStep";

const SettingsHeader = () => {
  const [showHelpModal, setshowHelpModal] = useState(false);
  const showHelpModalRef = useRef(false);
  const tutorialDetails = tutorialDetailsState.use();

  const modal = useMemo(
    () => (
      <Modal visible={showHelpModal} transparent>
        <HelpModal setshowHelpModal={setshowHelpModal} />
      </Modal>
    ),
    [showHelpModal]
  );

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
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="chevron-back" size={32} color="white" />
      </TouchableOpacity>
      <Image
        source={Logo}
        style={{ width: 200, height: 160, resizeMode: "contain" }}
      />
      <TutorialStep
        step={2}
        helpDescription="Click here to get more info about setting up shop"
        setStepDetails={setTutorialDetailsState}
        stepDetails={tutorialDetails}
        isLastStep={true}
        alignInfo="left"
        changePreviousBtnFunc={() => {
          setTutorialDetailsState({ step: 1, complete: false });
          localStorage.setItem(
            "tutorialComplete",
            JSON.stringify({
              complete: false,
              step: 1,
            })
          );
          navigation.navigate("Home");
        }}
      >
        <TouchableOpacity
          onPress={() => setshowHelpModal(true)}
          style={{ alignItems: "center", flexDirection: "row" }}
        >
          <Ionicons name="help-circle-outline" size={32} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginLeft: 10,
              fontWeight: "600",
            }}
          >
            Help
          </Text>
        </TouchableOpacity>
      </TutorialStep>
      {modal}
    </View>
  );
};

export default React.memo(SettingsHeader);
