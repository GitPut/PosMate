import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface StageIconBarProps {
  stageNum: number;
}

const StageIconBar = ({ stageNum }: StageIconBarProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={
          1 <= stageNum
            ? styles.ActiveIconContainer
            : styles.notActiveIconContainer
        }
      >
        <Ionicons name="person" style={styles.icon} />
      </View>
      <View
        style={
          2 <= stageNum ? styles.greyDivider : styles.darkGreyDivider
        }
      />
      <View
        style={
          2 <= stageNum
            ? styles.ActiveIconContainer
            : styles.notActiveIconContainer
        }
      >
        <MaterialCommunityIcons name="store" style={styles.icon} />
      </View>
      <View
        style={
          3 <= stageNum ? styles.greyDivider : styles.darkGreyDivider
        }
      />
      <View
        style={
          3 <= stageNum
            ? styles.ActiveIconContainer
            : styles.notActiveIconContainer
        }
      >
        <Entypo name="link" style={styles.icon} />
      </View>
    </View>
  );
};

export default StageIconBar;

const styles = StyleSheet.create({
  ActiveIconContainer: {
    width: 66,
    height: 66,
    backgroundColor: "rgba(51,81,243,1)",
    borderRadius: 33,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 90,
    shadowOpacity: 0.54,
    shadowRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
  },
  notActiveIconContainer: {
    width: 66,
    height: 66,
    backgroundColor: "rgba(208,213,243,1)",
    borderRadius: 33,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 150,
    shadowOpacity: 0.61,
    shadowRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  greyDivider: {
    width: 71,
    height: 5,
    backgroundColor: "rgba(155,155,155,1)",
  },
  darkGreyDivider: {
    width: 71,
    height: 5,
    backgroundColor: "rgba(155,155,155,1)",
    opacity: 0.15,
  },
});
