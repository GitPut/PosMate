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
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import { Button } from "@react-native-material/core";
import { storeDetailState, transListState, userStoreState } from "state/state";
import { auth } from "state/firebaseConfig";
import Logo from "assets/dpos-logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import useWindowDimensions from "components/useWindowDimensions";
import CompletePaymentPhoneOrder from "components/CompletePaymentPhoneOrder";
import SettingsPasswordModal from "components/SettingsPasswordModal";
import { updateTransList } from "state/firebaseFunctions";
import AuthHomeHeader from "components/AuthHomeHeader";

const HomeScreen = (props) => {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const storeDetails = storeDetailState.use();
  const [ongoingOrderListModal, setongoingOrderListModal] = useState(false);
  const [settingsPasswordModalVis, setsettingsPasswordModalVis] =
    useState(false);

  return (
    <View style={{ flex: 1, height: height, width: width }}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: "70%", height: "100%" }}>
          <AuthHomeHeader
            setsettingsPasswordModalVis={setsettingsPasswordModalVis}
            setongoingOrderListModal={setongoingOrderListModal}
          />
          <MenuScreen catalog={catalog} navigation={props.navigation} />
        </View>
        <CartScreen navigation={props.navigation} />
      </View>
      <Modal visible={ongoingOrderListModal} transparent={true}>
        <CompletePaymentPhoneOrder
          setongoingOrderListModal={setongoingOrderListModal}
        />
      </Modal>
      <Modal visible={settingsPasswordModalVis} transparent={true}>
        <SettingsPasswordModal
          setsettingsPasswordModalVis={setsettingsPasswordModalVis}
          navigation={props.navigation}
        />
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
