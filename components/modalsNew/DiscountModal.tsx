import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useWindowDimensions from "components/functional/useWindowDimensions";
import { addCartState, setCartState } from "state/state";

const DiscountModal = ({
  setdiscountModal,
  cartSub,
  cart,
  deliveryChecked,
  storeDetails,
}) => {
  const { height, width } = useWindowDimensions();
  const [discountAmount, setdiscountAmount] = useState("");
  const [code, setcode] = useState("");

  return (
    <>
      <TouchableOpacity
        onPress={() => setdiscountModal(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: width,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 30,
          shadowColor: "rgba(0,0,0,1)",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          elevation: 30,
          shadowOpacity: 0.57,
          shadowRadius: 10,
          height: height * 0.7,
          width: height * 0.7,
          padding: 20,
          alignSelf: "center",
          top: "15%",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              onPress={() => setdiscountModal(false)}
              name="close"
              size={26}
              color="rgba(74,74,74,1)"
              style={{ width: "25%", marginLeft: 20 }}
            />
            <Text
              style={{
                margin: 25,
                fontSize: 20,
                fontWeight: "600",
                width: "50%",
                textAlign: "center",
              }}
            >
              Apply Discount
            </Text>
            <View style={{ width: "25%", marginBottom: 20 }} />
          </View>
          <View style={{ margin: 15 }}>
            <TextInput
              placeholder="Enter Custom Amount or Percentage"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                width: "100%",
                padding: 10,
                marginBottom: 20,
              }}
              onChangeText={(text) => setdiscountAmount(text)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 10,
                    padding: 10,
                  },
                  {
                    backgroundColor:
                      discountAmount === "5%"
                        ? "rgba(52, 152, 219, 1)"
                        : "grey",
                  },
                ]}
                onPress={() => setdiscountAmount("5%")}
              >
                <Text style={{ color: "white" }}>5%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 10,
                    padding: 10,
                  },
                  {
                    backgroundColor:
                      discountAmount === "10%"
                        ? "rgba(52, 152, 219, 1)"
                        : "grey",
                  },
                ]}
                onPress={() => setdiscountAmount("10%")}
              >
                <Text style={{ color: "white" }}>10%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 10,
                    padding: 10,
                  },
                  {
                    backgroundColor:
                      discountAmount === "15%"
                        ? "rgba(52, 152, 219, 1)"
                        : "grey",
                  },
                ]}
                onPress={() => setdiscountAmount("15%")}
              >
                <Text style={{ color: "white" }}>15%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 10,
                    padding: 10,
                  },
                  {
                    backgroundColor:
                      discountAmount === "20%"
                        ? "rgba(52, 152, 219, 1)"
                        : "grey",
                  },
                ]}
                onPress={() => setdiscountAmount("20%")}
              >
                <Text style={{ color: "white" }}>20%</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Enter Code"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                width: "100%",
                padding: 10,
                marginBottom: 20,
                marginTop: 15,
              }}
              onChangeText={(text) => setcode(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor:
                  (!storeDetails.settingsPassword && discountAmount !== "") ||
                  (code.length > 0 && discountAmount !== "")
                    ? "rgba(52, 152, 219, 1)"
                    : "rgba(189, 195, 199, 0.5)",
                borderRadius: 10,
                padding: 10,
              }}
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
                  //if discount containts % then it is percentage
                  if (discountAmount.includes("%")) {
                    const discount =
                      parseFloat(discountAmount.replace("%", "")) / 100;
                    const isExistingDiscount =
                      cart.filter((item) => {
                        return item.name.includes("Cart Discount");
                      }).length > 0;
                    if (cart.length > 1 && isExistingDiscount) {
                      const newCart = structuredClone(cart);
                      newCart.map((item, index) => {
                        if (item.name.includes("Cart Discount")) {
                          newCart.splice(index, 1);
                        }
                      });

                      //New Cart Sub
                      let newCartSub = 0;
                      let newVal = 0;
                      for (let i = 0; i < newCart.length; i++) {
                        try {
                          if (newCart[i].quantity > 1) {
                            newVal +=
                              parseFloat(newCart[i].price) *
                              newCart[i].quantity;
                            // console.log("newCart item quantity ", newCart[i].quantity);
                          } else {
                            newVal += parseFloat(newCart[i].price);
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }
                      if (deliveryChecked) {
                        newCartSub =
                          newVal + parseFloat(storeDetails.deliveryPrice);
                      } else {
                        newCartSub = newVal;
                      }
                      //

                      newCart.push({
                        name: "Cart Discount: " + discount * 100 + "%",
                        price: -(newCartSub * discount),
                        description: "Discount Applied to Cart",
                        options: [],
                        extraDetails: null,
                          quantityNotChangable: true,
                        percent: discount,
                      });
                      setCartState(newCart);
                    } else {
                      addCartState(
                        {
                          name: "Cart Discount: " + discount * 100 + "%",
                          price: -(cartSub * discount),
                          description: "Discount Applied to Cart",
                          options: [],
                          extraDetails: null,
                          quantityNotChangable: true,
                          percent: discount,
                        },
                        cart
                      );
                    }
                  } else {
                    const isExistingDiscount =
                      cart.filter((item) => {
                        return item.name.includes("Cart Discount");
                      }).length > 0;
                    if (cart.length > 1 && isExistingDiscount) {
                      const newCart = structuredClone(cart);
                      newCart.map((item, index) => {
                        if (item.name.includes("Cart Discount")) {
                          newCart.splice(index, 1);
                        }
                      });
                      newCart.push({
                        name: "Cart Discount: $" + discountAmount,
                        price: -parseFloat(discountAmount),
                        description: "Discount Applied to Cart",
                        options: [],
                        extraDetails: null,
                        quantityNotChangable: true,
                      });
                      setCartState(newCart);
                    } else {
                      addCartState(
                        {
                          name: "Cart Discount: $" + discountAmount,
                          price: -parseFloat(discountAmount),
                          description: "Discount Applied to Cart",
                          options: [],
                          extraDetails: null,
                          quantityNotChangable: true,
                        },
                        cart
                      );
                    }
                  }
                  setdiscountModal(false);
                  setcode("");
                  setdiscountAmount("");
                } else {
                  alert("Incorrect Code");
                }
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color:
                    (!storeDetails.settingsPassword && discountAmount !== "") ||
                    (code.length > 0 && discountAmount !== "")
                      ? "#FFFFFF"
                      : "#CCCCCC",
                }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default DiscountModal;

const styles = StyleSheet.create({});
