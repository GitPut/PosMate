import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { Text } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import PendingOrderItem from "./components/PendingOrderItem";
import PendingOrderShowDetails from "./PendingOrderShowDetails";
import FinishPaymentCash from "./FinishPaymentCash";

const PendingOrdersModal = ({
  setongoingOrderListModal,
  updateOrderHandler,
  ongoingListState,
  setongoingListState,
}) => {
  const { height, width } = useWindowDimensions();
  const [currentOrder, setcurrentOrder] = useState({
    element: null,
    index: null,
  });
  const xPos = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(xPos, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = (customFuncAfter) => {
    Animated.timing(xPos, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (customFuncAfter !== false) {
        customFuncAfter();
      } else {
        setcurrentOrder({ element: null, index: null });
      }
    });
  };

  function parseDate(input) {
    // Check if the input is a Date object
    if (Object.prototype.toString.call(input) === "[object Date]") {
      if (!isNaN(input.getTime())) {
        // It's a valid Date object, return it
        return input;
      }
    }

    // Check if the input is a string
    if (typeof input === "string") {
      const dateObject = new Date(input);

      // Check if the dateObject is a valid Date
      if (!isNaN(dateObject.getTime())) {
        // It's a valid Date object, return it
        return dateObject;
      }
    }

    // If neither a Date object nor a valid date string, return null or handle accordingly
    return null;
  }

  return (
    <Pressable
      onPress={() => setongoingOrderListModal(false)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View style={styles.pendingOrdersModalContainer}>
            <View style={styles.closeIconContainer}>
              <Pressable onPress={() => setongoingOrderListModal(false)}>
                <Ionicons name="md-close" style={styles.closeIcon} />
              </Pressable>
            </View>
            <View style={styles.secondAreaContainer}>
              <Text style={styles.pendingOrderLabel}>Pending Orders</Text>
              <View style={styles.pendingOrderScrollView}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={
                    styles.pendingOrderScrollView_contentContainerStyle
                  }
                >
                  {ongoingListState?.length > 0 ? (
                    ongoingListState?.map((element, index) => {
                      let date = null;

                      if (element.online) {
                        date = parseDate(element.date);
                      } else {
                        date = element.date.toDate();
                      }

                      let cartString = "";

                      element.cart.map((cartItem, index) => {
                        cartString += `${index + 1}. Name: ${cartItem.name}\n`;

                        if (cartItem.quantity > 1) {
                          cartString += `     Quantity: ${cartItem.quantity}\n`;
                          cartString += `     Price: $${
                            cartItem.price * cartItem.quantity
                          }`;
                        } else {
                          cartString += `    Price: $${cartItem.price}`;
                        }

                        if (cartItem.description) {
                          cartString += `     \n${cartItem.description}`;
                        }

                        if (cartItem.options) {
                          cartString += `\n`;
                          cartItem.options.map((option) => {
                            cartString += `    ${option}\n`;
                          });
                        }

                        if (cartItem.extraDetails) {
                          cartString += `     Note: ${cartItem.extraDetails}\n`;
                        }
                      });

                      return (
                        <PendingOrderItem
                          style={styles.pendingOrderItem1}
                          element={element}
                          index={index}
                          date={date}
                          cartString={cartString}
                          key={index}
                          setcurrentOrder={setcurrentOrder}
                          updateOrderHandler={updateOrderHandler}
                          fadeIn={fadeIn}
                        />
                      );
                    })
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>No Orders Yet</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
            {currentOrder.element && (
              <Animated.View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: 10,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: 540,
                  height: 609,
                  backgroundColor: "white",
                  opacity: xPos,
                }}
              >
                {currentOrder.type === "view" ? (
                  <PendingOrderShowDetails
                    currentOrder={currentOrder}
                    updateOrderHandler={updateOrderHandler}
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                    setcurrentOrder={setcurrentOrder}
                    setongoingOrderListModal={setongoingOrderListModal}
                  />
                ) : (
                  <FinishPaymentCash
                    currentOrder={currentOrder}
                    updateOrderHandler={updateOrderHandler}
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                    setcurrentOrder={setcurrentOrder}
                  />
                )}
              </Animated.View>
            )}
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
};

export default PendingOrdersModal;

const styles = StyleSheet.create({
  pendingOrdersModalContainer: {
    width: 540,
    height: 609,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    // position: "absolute",
    // left: 270,
    // top: 304,
  },
  closeIconContainer: {
    width: 540,
    height: 58,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  closeIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    margin: 20,
  },
  secondAreaContainer: {
    width: 421,
    height: 523,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pendingOrderLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  pendingOrderScrollView: {
    height: 470,
    margin: 0,
  },
  pendingOrderScrollView_contentContainerStyle: {
    width: 421,
    alignItems: "center",
    paddingTop: 3,
    paddingRight: 25,
    marginLeft: 25,
  },
  pendingOrderItem: {
    height: 84,
    width: "100%",
    marginBottom: 10,
  },
  pendingOrderItem1: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem2: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem3: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem4: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem5: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem6: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem7: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem8: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem9: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem10: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem11: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
  pendingOrderItem12: {
    height: 84,
    width: 415,
    marginBottom: 10,
  },
});
