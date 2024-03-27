import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EntypoIcon from "@expo/vector-icons/Entypo";
import IoniconsIcon from "@expo/vector-icons/Ionicons";
import MaterialCommunityIconsIcon from "@expo/vector-icons/MaterialCommunityIcons";

function NewUserPaymentUpdate({
  currentStageNum,
  currentStageLbl,
  StageContent,
  planType,
  CheckOutFunc,
}) {
  const StageStepView = ({ stageNum, stageLbl, stageDesc }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontWeight: "600",
            color: "rgba(255,255,255,1)",
            fontSize: 30,
            opacity: stageNum <= currentStageNum ? 1 : 0.5,
          }}
        >
          {stageNum}
        </Text>
        <View style={styles.subscription1StackStack}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "600",
                color: "rgba(255,255,255,1)",
                fontSize: 25,
                marginRight: 25,
                opacity: stageNum <= currentStageNum ? 1 : 0.5,
              }}
            >
              {stageLbl}
            </Text>
            {stageNum < currentStageNum && (
              <View style={styles.stageChecked}>
                <EntypoIcon name="check" style={styles.checkedIcon} />
              </View>
            )}
          </View>
          <Text
            style={{
              fontWeight: "500",
              color: "rgba(155,155,155,1)",
              fontSize: 22,
              opacity: stageNum <= currentStageNum ? 1 : 0.5,
            }}
          >
            {stageDesc}
          </Text>
        </View>
      </View>
    );
  };

  const StageIconBar = () => {
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
            1 <= currentStageNum
              ? styles.ActiveIconContainer
              : styles.notActiveIconContainer
          }
        >
          <IoniconsIcon name="md-person" style={styles.icon} />
        </View>
        <View
          style={
            2 <= currentStageNum ? styles.greyDivider : styles.darkGreyDivider
          }
        />
        <View
          style={
            2 <= currentStageNum
              ? styles.ActiveIconContainer
              : styles.notActiveIconContainer
          }
        >
          <MaterialCommunityIconsIcon name="store" style={styles.icon} />
        </View>
        <View
          style={
            3 <= currentStageNum ? styles.greyDivider : styles.darkGreyDivider
          }
        />
        <View
          style={
            3 <= currentStageNum
              ? styles.ActiveIconContainer
              : styles.notActiveIconContainer
          }
        >
          <EntypoIcon name="link" style={styles.icon} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.storeDetailsTxtContainer}>
          <Text style={styles.storeDetails}>{currentStageLbl}</Text>
          <View style={styles.rect13}></View>
        </View>
        <StageContent />
      </View>
      <View style={styles.rightContainer}>
        <StageIconBar />
        <View style={styles.pageStatusTxtContainer}>
          <StageStepView
            stageNum={1}
            stageLbl="Subscription"
            stageDesc="Plan Info"
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
            stageNum={2}
            stageLbl="Store Setup"
            stageDesc="Store Info"
          />
        </View>
        <View style={styles.priceAndBtnContainer}>
          <View style={styles.group18}>
            <View style={styles.planPrice1Row}>
              <Text style={styles.planPrice1}>Plan Price:</Text>
              {planType.value === "monthly" && (
                <Text style={styles.wooCommerce1}>$50.00 / Monthly</Text>
              )}
              {planType.value === "yearly" && (
                <Text style={styles.wooCommerce1}>$480.00 / Yearly</Text>
              )}
              {planType.value === "freeTrial" && (
                <Text style={styles.wooCommerce1}>2 Week Free Trial</Text>
              )}
            </View>
          </View>
          <View style={styles.group17}>
            <TouchableOpacity
              style={[
                styles.rect34,
                currentStageNum === 2 && {
                  backgroundColor: "rgba(20,112,239,1)",
                },
              ]}
              disabled={currentStageNum < 2}
              onPress={CheckOutFunc}
            >
              <Text
                style={[
                  styles.checkOut1,
                  currentStageNum === 2 && { opacity: 1, color: "white" },
                ]}
              >
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  leftContainer: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  backAndForwardContainer: {
    width: 830,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon6: {
    color: "rgba(128,128,128,0.25)",
    fontSize: 50,
  },
  icon22: {
    color: "rgba(128,128,128,1)",
    fontSize: 50,
  },
  storeDetailsTxtContainer: {
    width: 280,
    height: 61,
    alignItems: "center",
    justifyContent: "space-between",
  },
  storeDetails: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 35,
    height: 38,
  },
  rect13: {
    width: 58,
    height: 10,
    backgroundColor: "rgba(218,215,215,1)",
    borderRadius: 30,
  },
  planItemContainer: {
    width: 691,
    height: 445,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 150,
    shadowOpacity: 0.22,
    shadowRadius: 50,
    justifyContent: "space-around",
  },
  pITopContainer: {
    height: 431,
    padding: 20,
  },
  group4: {
    width: 617,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  group24: {
    width: 227,
    height: 33,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  standard: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  plan2: {
    fontWeight: "600",
    color: "rgba(31,35,48,1)",
    fontSize: 25,
  },
  group23: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(51,81,243,1)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon16: {
    color: "rgba(255,255,255,1)",
    fontSize: 36,
  },
  allYearPayment: {
    fontWeight: "600",
    color: "rgba(155,155,155,1)",
    fontSize: 25,
    width: 240,
  },
  group6: {
    width: 428,
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },
  overview1: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 50,
  },
  monthly5: {
    fontWeight: "600",
    color: "rgba(31,35,48,1)",
    fontSize: 35,
  },
  group5: {
    width: 224,
    height: 45,
    flexDirection: "row",
    backgroundColor: "rgba(20,112,239,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-around",
  },
  monthly6: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 19,
  },
  icon14: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
  },
  group7: {
    width: 210,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cloudBased: {
    fontWeight: "500",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
  },
  checkIcon: {
    color: "rgba(74,74,74,1)",
    fontSize: 30,
  },
  group8: {
    width: 190,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  easyToUse: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  icon18: {
    color: "rgba(74,74,74,1)",
    fontSize: 50,
    width: 40,
    height: 44,
  },
  group9: {
    width: 365,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  easyToUse2: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  icon19: {
    color: "rgba(74,74,74,1)",
    fontSize: 50,
    width: 40,
    height: 44,
  },
  group10: {
    width: 206,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text9: {
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  icon20: {
    color: "rgba(74,74,74,1)",
    fontSize: 50,
    width: 40,
    height: 44,
  },
  pITBottomContainer: {
    width: 690,
    height: 12,
  },
  rect33: {
    width: 690,
    height: 12,
    backgroundColor: "rgba(208,208,208,0.96)",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  rect32: {
    width: 300,
    height: 12,
    backgroundColor: "rgba(51,81,243,1)",
    opacity: 0.96,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginLeft: 2,
  },
  downloadBtnContainer: {
    width: "100%",
  },
  group12: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  rect21: {
    width: 150,
    height: 100,
    alignItems: "center",
    backgroundColor: "rgba(20,112,239,1)",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.24,
    shadowRadius: 10,
  },
  icon9: {
    color: "rgba(255,255,255,1)",
    fontSize: 70,
  },
  rect22: {
    width: "100%",
    height: 12,
    position: "absolute",
    backgroundColor: "rgba(208,208,208,1)",
    bottom: 0,
    opacity: 0.74,
  },
  group12Stack: {
    width: "100%",
    alignItems: "center",
  },
  rightContainer: {
    width: "30%",
    height: "100%",
    backgroundColor: "rgba(31,35,48,1)",
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
  },
  pageStatusContainer: {
    width: 279,
    height: 65,
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
  rect41: {
    top: 0,
    left: 107,
    width: 66,
    height: 64,
    position: "absolute",
    backgroundColor: "rgba(51,81,243,1)",
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 150,
    shadowOpacity: 0.61,
    shadowRadius: 50,
  },
  icon25: {
    color: "rgba(255,255,255,1)",
    fontSize: 36,
    width: 40,
    height: 44,
    marginTop: 12,
    marginLeft: 14,
  },
  rect38Stack: {
    top: 0,
    left: 0,
    width: 173,
    height: 64,
    position: "absolute",
  },
  rect39: {
    top: 31,
    left: 0,
    width: 71,
    height: 5,
    position: "absolute",
    backgroundColor: "rgba(155,155,155,1)",
    opacity: 0.15,
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
  icon26: {
    color: "rgba(255,255,255,1)",
    fontSize: 36,
    width: 40,
    height: 44,
    marginTop: 12,
    marginLeft: 14,
  },
  rect39Stack: {
    top: 1,
    left: 160,
    width: 119,
    height: 64,
    position: "absolute",
  },
  rect38StackStack: {
    width: 279,
    height: 65,
  },
  pageStatusTxtContainer: {
    width: 315,
    height: 252,
  },
  onH1Txt: {
    position: "absolute",
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 246,
    height: 38,
  },
  stageChecked: {
    width: 26,
    height: 26,
    backgroundColor: "rgba(10,188,27,1)",
    borderRadius: 13,
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
  checkedIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  subscription1Stack: {
    top: 0,
    left: 0,
    width: 252,
    height: 50,
    position: "absolute",
  },
  planInfo1: {
    top: 38,
    left: 0,
    position: "absolute",
    fontWeight: "500",
    color: "rgba(155,155,155,1)",
    fontSize: 23,
  },
  subscription1StackStack: {
    width: 252,
    height: 50,
    marginLeft: 42,
  },
  onNumTxt: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    width: 22,
    height: 38,
    marginLeft: -294,
    marginTop: 14,
  },
  subscription1StackStackRow: {
    height: 52,
    flexDirection: "row",
    marginRight: 21,
  },
  storeSetup1: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    width: 246,
    height: 38,
  },
  storeInfo1: {
    fontWeight: "600",
    color: "rgba(155,155,155,1)",
    fontSize: 25,
  },
  storeSetup1Column: {
    width: 246,
    marginLeft: 39,
    marginBottom: 2,
  },
  text10: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    width: 22,
    height: 38,
    marginLeft: -285,
    marginTop: 2,
  },
  storeSetup1ColumnRow: {
    height: 40,
    flexDirection: "row",
    marginTop: 48,
    marginLeft: 1,
    marginRight: 29,
  },
  rect36: {
    width: 55,
    height: 2,
    backgroundColor: "rgba(155,155,155,1)",
    transform: [
      {
        rotate: "90.00deg",
      },
    ],
    marginTop: -67,
    marginLeft: -18,
  },
  rect37: {
    width: 55,
    height: 2,
    backgroundColor: "rgba(155,155,155,1)",
    transform: [
      {
        rotate: "90.00deg",
      },
    ],
    marginTop: 85,
    marginLeft: -18,
  },
  connectShop1: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 246,
    height: 38,
    opacity: 0.44,
  },
  link1: {
    fontWeight: "500",
    color: "rgba(155,155,155,1)",
    fontSize: 22,
    opacity: 0.44,
  },
  connectShop1Column: {
    width: 246,
    marginLeft: 39,
    marginBottom: 3,
  },
  offNumTxt: {
    fontWeight: "600",
    color: "rgba(255,255,255,0.5)",
    fontSize: 30,
    width: 22,
    height: 38,
    marginLeft: -285,
    marginTop: 3,
  },
  connectShop1ColumnRow: {
    height: 41,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 1,
    marginRight: 29,
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

export default NewUserPaymentUpdate;
