import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StageStepView from "./StageStepView";
import StageIconBar from "./StageIconBar";

interface SideBarProps {
  stageNum: number;
  planType: string | null;
  CheckOutFunc: () => void;
  setstageNum: (num: number) => void;
  detailsFilledOut: boolean;
}

const SideBar = ({
  stageNum,
  planType,
  CheckOutFunc,
  setstageNum,
  detailsFilledOut,
}: SideBarProps) => {
  return (
    <View style={styles.rightContainer}>
      <View style={styles.inner}>
        <StageIconBar stageNum={stageNum} />
        <View style={styles.pageStatusTxtContainer}>
          <StageStepView
            step={1}
            stageLbl="Subscription"
            stageDesc="Plan Info"
            stageNum={stageNum}
          />
          <View
            style={{
              height: 55,
              width: 2,
              backgroundColor: "rgba(155,155,155,1)",
              marginLeft: 10,
              marginBottom: 10,
            }}
          />
          <StageStepView
            step={2}
            stageLbl="Store Setup"
            stageDesc="Store Info"
            stageNum={stageNum}
          />
        </View>
        <View style={styles.priceAndBtnContainer}>
          <View style={styles.group17}>
            {stageNum === 1 ? (
              <Pressable
                style={[
                  styles.rect34,
                  planType !== null && {
                    backgroundColor: "rgba(20,112,239,1)",
                  },
                ]}
                disabled={!planType}
                onPress={() => setstageNum(2)}
              >
                <Text
                  style={[
                    styles.checkOut1,
                    planType !== null && { opacity: 1, color: "white" },
                  ]}
                >
                  Next
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={[
                  styles.rect34,
                  detailsFilledOut && {
                    backgroundColor: "rgba(20,112,239,1)",
                  },
                ]}
                disabled={!detailsFilledOut}
                onPress={CheckOutFunc}
              >
                <Text
                  style={[
                    styles.checkOut1,
                    detailsFilledOut && { opacity: 1, color: "white" },
                  ]}
                >
                  Check Out
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  rightContainer: {
    width: "28%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "96%",
    height: "96%",
    backgroundColor: "#1D294E",
    shadowColor: "rgba(85,85,85,1)",
    shadowOffset: {
      width: -3,
      height: -3,
    },
    elevation: 15,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
  },
  pageStatusContainer: {
    width: 279,
    height: 65,
  },
  pageStatusTxtContainer: {
    width: 315,
    height: 252,
  },
  priceAndBtnContainer: {
    width: 336,
    height: 131,
  },
  group18: {
    width: 336,
    height: 38,
    flexDirection: "row",
  },
  planPrice1: {
    fontWeight: "600",
    color: "rgba(74,74,74,1)",
    fontSize: 23,
  },
  wooCommerce1: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    opacity: 0.44,
    marginLeft: 16,
  },
  planPrice1Row: {
    height: 38,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  group17: {
    width: 288,
    height: 60,
    marginTop: 33,
    marginLeft: 24,
  },
  rect34: {
    width: 288,
    height: 60,
    backgroundColor: "rgba(155,155,155,0.68)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  checkOut1: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 26,
    opacity: 0.26,
  },
});
