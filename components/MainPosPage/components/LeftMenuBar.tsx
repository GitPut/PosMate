import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { logout } from "state/firebaseFunctions";
import { Feather, Entypo } from "@expo/vector-icons";
import { updatePosHomeState } from "state/posHomeState";

const LeftMenuBar = ({
  ongoingOrderListModal,
  clockinModal,
  deliveryModal,
  discountModal,
  settingsPasswordModalVis,
  setIsSignedInSettingsState,
  history,
  storeDetails,
}) => {
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
          <Feather
            name="percent"
            color={discountModal ? "white" : "black"}
            size={35}
          />
        </Pressable>
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
      <Pressable onPress={logout}>
        <Feather name="log-out" style={styles.icon} />
      </Pressable>
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
