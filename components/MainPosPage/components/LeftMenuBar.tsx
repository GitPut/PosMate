import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import { setIsSignedInSettingsState, storeDetailState } from "state/state";
import { useHistory } from "react-router-dom";

const LeftMenuBar = () => {
  const {
    ongoingOrderListModal,
    clockinModal,
    deliveryModal,
    discountModal,
    settingsPasswordModalVis,
    customCashModal,
  } = posHomeState.use();
  const history = useHistory();
  const storeDetails = storeDetailState.use();

  return (
    <View style={styles.leftMenuBarContainer}>
      <View>
        <Pressable
          style={[
            !ongoingOrderListModal &&
            !clockinModal &&
            !deliveryModal &&
            !settingsPasswordModalVis
              ? styles.activeBtn
              : styles.notActiveBtn,
          ]}
        >
          <Entypo
            name="menu"
            style={[
              styles.menuIcon,
              !ongoingOrderListModal &&
              !clockinModal &&
              !deliveryModal &&
              !settingsPasswordModalVis
                ? { color: "white" }
                : { color: "black" },
            ]}
          />
        </Pressable>
        <Pressable
          style={[
            ongoingOrderListModal ? styles.activeBtn : styles.notActiveBtn,
          ]}
          onPress={() => {
            updatePosHomeState({ ongoingOrderListModal: true });
          }}
        >
          <img
            src={require("../assets/images/pendingOrderIcon.png")}
            style={
              ongoingOrderListModal
                ? {
                    filter: "invert(100%)",
                    width: 40,
                    height: 40,
                  }
                : { width: 40, height: 40 }
            }
          />
        </Pressable>
        <Pressable
          style={[clockinModal ? styles.activeBtn : styles.notActiveBtn]}
          onPress={() => {
            updatePosHomeState({ clockinModal: true });
          }}
        >
          <img
            src={require("../assets/images/clockInIcon.png")}
            style={
              clockinModal
                ? {
                    filter: "invert(100%)",
                    width: 40,
                    height: 40,
                  }
                : { width: 40, height: 40 }
            }
          />
        </Pressable>
        <Pressable
          style={[deliveryModal ? styles.activeBtn : styles.notActiveBtn]}
          onPress={() => {
            updatePosHomeState({ deliveryModal: true });
          }}
        >
          <img
            src={require("../assets/images/phoneOrderIcon.png")}
            style={
              deliveryModal
                ? {
                    filter: "invert(100%)",
                    width: 40,
                    height: 40,
                  }
                : { width: 40, height: 40 }
            }
          />
        </Pressable>
        <Pressable
          style={[discountModal ? styles.activeBtn : styles.notActiveBtn]}
          onPress={() => {
            updatePosHomeState({ discountModal: true });
          }}
        >
          <img
            src={require("../assets/images/percentIcon.png")}
            style={
              discountModal
                ? {
                    filter: "invert(100%)",
                    width: 30,
                    height: 30,
                  }
                : { width: 30, height: 30 }
            }
          />
        </Pressable>
        <Pressable
          style={[customCashModal ? styles.activeBtn : styles.notActiveBtn]}
          onPress={() => {
            updatePosHomeState({ customCashModal: true });
          }}
        >
          <img
            src={require("../assets/images/dollarSignIcon.png")}
            style={
              customCashModal
                ? {
                    filter: "invert(100%)",
                    width: 40,
                    height: 40,
                  }
                : { width: 40, height: 40 }
            }
          />
        </Pressable>
      </View>
      <View style={{ marginBottom: 15 }}>
        <Pressable
          style={[
            settingsPasswordModalVis ? styles.activeBtn : styles.notActiveBtn,
          ]}
          onPress={() => {
            if (storeDetails.settingsPassword?.length > 0) {
              updatePosHomeState({ settingsPasswordModalVis: true });
            } else {
              setIsSignedInSettingsState(true);
              history.push("/authed/dashboard");
              localStorage.setItem("isAuthedBackend", true);
            }
          }}
        >
          <img
            src={require("../assets/images/settingsIcon.png")}
            style={
              settingsPasswordModalVis
                ? {
                    filter: "invert(100%)",
                    width: 40,
                    height: 40,
                  }
                : { width: 40, height: 40 }
            }
          />
        </Pressable>
      </View>
    </View>
  );
};

export default LeftMenuBar;

const styles = StyleSheet.create({
  leftMenuBarContainer: {
    width: "5%",
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: "stretch",
  },
  activeBtn: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(29,41,78,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  notActiveBtn: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  menuIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 30,
  },
});
