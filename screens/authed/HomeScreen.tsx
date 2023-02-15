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
import useWindowDimensions from "components/useWindowDimensions";
import CompletePaymentPhoneOrder from "components/CompletePaymentPhoneOrder";
import SettingsPasswordModal from "components/SettingsPasswordModal";
import { updateTransList } from "state/firebaseFunctions";

const HomeScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const storeDetails = storeDetailState.use();
  const [ongoingOrderListModal, setongoingOrderListModal] = useState(false);
  const [settingsPasswordModalVis, setsettingsPasswordModalVis] =
    useState(false);
  
  //only used for fixing purposes :)
  // const transList = transListState.use();

  // const Test = () => {
  //   const newtrans = JSON.parse(transList);

  //   newtrans.forEach((element) => {
  //     updateTransList(element);
  //   });
  // };
  //Dont use again :(

  const Header = () => {
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
        <Image
          source={Logo}
          style={{ width: 200, height: 160, resizeMode: "contain" }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setongoingOrderListModal(true)}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 62,
              height: 58,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Ionicons name="chevron-down" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigation.navigate("SettingsHome")}
            onPress={() =>
              storeDetails.settingsPassword
                ? setsettingsPasswordModalVis(true)
                : navigation.navigate("Settings")
            }
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 62,
              height: 58,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Ionicons name="settings" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, height: height, width: width }}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: "70%", height: "100%" }}>
          <Header />
          <MenuScreen catalog={catalog} navigation={navigation} />
        </View>
        <CartScreen navigation={navigation} />
      </View>
      <Modal visible={ongoingOrderListModal} transparent={true}>
        <CompletePaymentPhoneOrder
          setongoingOrderListModal={setongoingOrderListModal}
        />
      </Modal>
      <Modal visible={settingsPasswordModalVis} transparent={true}>
        <SettingsPasswordModal
          setsettingsPasswordModalVis={setsettingsPasswordModalVis}
          navigation={navigation}
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
