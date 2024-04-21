import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import PercentageBtn from "./components/PercentageBtn";
import Modal from "react-native-modal-web";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import { cartState, storeDetailState } from "state/state";
import { useAlert } from "react-alert";

const DiscountModal = () => {
  const { height, width } = useWindowDimensions();
  const { discountModal, discountAmount, deliveryChecked, cartSub } =
    posHomeState.use();
  const storeDetails = storeDetailState.use();
  const cart = cartState.use();

  const [code, setcode] = useState("");
  const [totalWithoutDiscount, settotalWithoutDiscount] = useState(0);
  const [totalWithNewDiscount, settotalWithNewDiscount] = useState(0);
  const [localDiscountAmount, setLocalDiscountAmount] = useState(
    discountAmount ? discountAmount : ""
  );
  const alertP = useAlert();

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      if (
        !storeDetails.settingsPassword ||
        storeDetails.settingsPassword === code
      ) {
        // setDiscountAmount(localDiscountAmount);
        // setdiscountModal(false);
        updatePosHomeState({
          discountAmount: localDiscountAmount,
          discountModal: false,
        });
      } else {
        alertP.error("Incorrect Code");
      }
    }
  };

  useEffect(() => {
    let newVal = 0;
    for (let i = 0; i < cart.length; i++) {
      try {
        if (cart[i].quantity ?? 0 > 1) {
          newVal += cart[i].price * (cart[i].quantity ?? 1);
          // console.log("Cart item quantity ", cart[i].quantity);
        } else {
          newVal += cart[i].price;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (deliveryChecked) {
      newVal += parseFloat(storeDetails.deliveryPrice);
    }

    settotalWithoutDiscount(newVal);
  }, [cart, deliveryChecked]);

  useEffect(() => {
    if (localDiscountAmount.includes("%")) {
      const discount = parseFloat(localDiscountAmount.replace("%", "")) / 100;
      settotalWithNewDiscount(
        totalWithoutDiscount - totalWithoutDiscount * discount
      );
    } else {
      settotalWithNewDiscount(
        totalWithoutDiscount - parseFloat(localDiscountAmount)
      );
    }
  }, [localDiscountAmount]);

  return (
    <Modal
      isVisible={discountModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            updatePosHomeState({ discountModal: false });
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <Pressable>
            <div style={{ cursor: "default" }}>
              <View style={styles.container}>
                <View style={styles.innerContentContainer}>
                  <View style={styles.labelAndInnerGroup}>
                    <Text style={styles.containerLbl}>Discount</Text>
                    <View style={styles.innerGroup}>
                      <Text style={styles.currentTotalLbl}>
                        Total Without Discount: $
                        {totalWithoutDiscount.toFixed(2)}
                      </Text>
                      <View style={styles.inputWithPercentageRow}>
                        <TextInput
                          style={styles.customPercentageInput}
                          placeholder="Enter Custom Amount or Percentage"
                          onChangeText={(text) => setLocalDiscountAmount(text)}
                          value={localDiscountAmount}
                          onKeyPress={(val) => handleKeyDown({ key: val.key })}
                        />
                        <View style={styles.percentageBtnsRow}>
                          <PercentageBtn
                            percentageAmount="5%"
                            style={styles.percentageBtn5}
                            onPress={() => setLocalDiscountAmount("5%")}
                            isSelected={localDiscountAmount === "5%"}
                          />
                          <PercentageBtn
                            percentageAmount="10%"
                            style={styles.percentageBtn10}
                            onPress={() => setLocalDiscountAmount("10%")}
                            isSelected={localDiscountAmount === "10%"}
                          />
                          <PercentageBtn
                            percentageAmount="15%"
                            style={styles.percentageBtn15}
                            onPress={() => setLocalDiscountAmount("15%")}
                            isSelected={localDiscountAmount === "15%"}
                          />
                        </View>
                      </View>
                      <Text style={styles.newTotalLbl}>
                        New Total: $
                        {totalWithNewDiscount
                          ? totalWithNewDiscount.toFixed(2)
                          : cartSub.toFixed(2)}
                      </Text>
                      <TextInput
                        placeholder="Enter Manager's Code"
                        onChangeText={(text) => setcode(text)}
                        style={styles.managerCodeInput}
                        onKeyPress={(val) => handleKeyDown(val)}
                      />
                    </View>
                  </View>
                  <View style={styles.confirmAndCancelBtnGroup}>
                    <Pressable
                      disabled={
                        (!storeDetails.settingsPassword &&
                          discountAmount !== "") ||
                        (code.length > 0 && discountAmount !== "")
                          ? false
                          : true
                      }
                      onPress={() => {
                        if (
                          !storeDetails.settingsPassword ||
                          storeDetails.settingsPassword === code
                        ) {
                          // setDiscountAmount(localDiscountAmount);
                          // setdiscountModal(false);
                          updatePosHomeState({
                            discountAmount: localDiscountAmount,
                            discountModal: false,
                          });
                        } else {
                          alertP.error("Incorrect Code");
                        }
                      }}
                      style={[
                        styles.confirmBtn,
                        !(
                          (!storeDetails.settingsPassword &&
                            discountAmount !== "") ||
                          (code.length > 0 && discountAmount !== "")
                        ) && { opacity: 0.8 },
                      ]}
                    >
                      <Text style={styles.confirmLbl}>Confirm</Text>
                    </Pressable>
                    <Pressable
                      // onPress={() => setdiscountModal(false)}
                      onPress={() => {
                        updatePosHomeState({ discountModal: false });
                      }}
                      style={styles.cancelBtn}
                    >
                      <Text style={styles.cancelLbl}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </div>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

export default DiscountModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,1)",
    width: 540,
    height: 439,
  },
  innerContentContainer: {
    width: 439,
    height: 382,
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelAndInnerGroup: {
    width: 439,
    height: 246,
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  innerGroup: {
    width: 439,
    height: 202,
    justifyContent: "space-between",
  },
  currentTotalLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 14,
  },
  inputWithPercentageRow: {
    width: 439,
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customPercentageInput: {
    width: 259,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  percentageBtnsRow: {
    width: 156,
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentageBtn5: {
    height: 46,
    width: 46,
  },
  percentageBtn10: {
    height: 46,
    width: 46,
  },
  percentageBtn15: {
    height: 46,
    width: 46,
  },
  newTotalLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 14,
  },
  managerCodeInput: {
    width: 438,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  confirmAndCancelBtnGroup: {
    width: 284,
    height: 101,
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmBtn: {
    width: 284,
    height: 42,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmLbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  cancelBtn: {
    width: 284,
    height: 42,
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelLbl: {
    fontWeight: "700",
    color: "rgba(0,0,0,1)",
    fontSize: 18,
  },
});
