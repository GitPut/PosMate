import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useWindowDimensions from "components/functional/useWindowDimensions";
import { addCartState, setCartState } from "state/state";
import PercentageBtn from "./components/PercentageBtn";

const DiscountModal = ({
  setdiscountModal,
  cartSub,
  cart,
  deliveryChecked,
  storeDetails,
  setDiscountAmount,
  discountAmount,
}) => {
  const { height, width } = useWindowDimensions();
  const [code, setcode] = useState("");
  const [totalWithoutDiscount, settotalWithoutDiscount] = useState(0);
  const [totalWithNewDiscount, settotalWithNewDiscount] = useState(0);
  const [localDiscountAmount, setLocalDiscountAmount] = useState(
    discountAmount ? discountAmount : ""
  );

  useEffect(() => {
    let newVal = 0;
    for (let i = 0; i < cart.length; i++) {
      try {
        if (cart[i].quantity > 1) {
          newVal += parseFloat(cart[i].price) * cart[i].quantity;
          // console.log("Cart item quantity ", cart[i].quantity);
        } else {
          newVal += parseFloat(cart[i].price);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (deliveryChecked) {
      newVal += parseFloat(storeDetails.deliveryPrice);
    }

    settotalWithoutDiscount(newVal);
  }, []);

  useEffect(() => {
    if (localDiscountAmount.includes("%")) {
      const discount = parseFloat(localDiscountAmount.replace("%", "")) / 100;
      settotalWithNewDiscount(
        parseFloat(totalWithoutDiscount) -
          parseFloat(totalWithoutDiscount) * discount
      );
    } else {
      settotalWithNewDiscount(
        parseFloat(totalWithoutDiscount) - parseFloat(localDiscountAmount)
      );
    }
  }, [localDiscountAmount]);

  return (
    <TouchableOpacity
      onPress={() => setdiscountModal(false)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <TouchableWithoutFeedback>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <View style={styles.innerContentContainer}>
              <View style={styles.labelAndInnerGroup}>
                <Text style={styles.containerLbl}>Discount</Text>
                <View style={styles.innerGroup}>
                  <Text style={styles.currentTotalLbl}>
                    Total Without Discount: ${totalWithoutDiscount.toFixed(2)}
                  </Text>
                  <View style={styles.inputWithPercentageRow}>
                    <TextInput
                      style={styles.customPercentageInput}
                      placeholder="Enter Custom Amount or Percentage"
                      onChangeText={(text) => setLocalDiscountAmount(text)}
                      value={localDiscountAmount}
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
                  />
                </View>
              </View>
              <View style={styles.confirmAndCancelBtnGroup}>
                <TouchableOpacity
                  disabled={
                    (!storeDetails.settingsPassword && discountAmount !== "") ||
                    (code.length > 0 && discountAmount !== "")
                      ? false
                      : true
                  }
                  onPress={() => {
                    if (
                      !storeDetails.settingsPassword ||
                      storeDetails.settingsPassword === code
                    ) {
                      console.log("Discount Amount", localDiscountAmount);
                      setDiscountAmount(localDiscountAmount);
                      setdiscountModal(false);
                    } else {
                      alert("Incorrect Code");
                    }
                  }}
                  style={styles.confirmBtn}
                >
                  <Text style={styles.confirmLbl}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setdiscountModal(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelLbl}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </div>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
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
