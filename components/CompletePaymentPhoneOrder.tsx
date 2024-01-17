import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text } from "@react-native-material/core";
import { updateTransList } from "state/firebaseFunctions";
import ChangeScreen from "./ChangeScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useWindowDimensions from "./useWindowDimensions";
import { auth, db } from "state/firebaseConfig";

const CompletePaymentPhoneOrder = ({
  setongoingOrderListModal,
  updateOrderHandler,
  ongoingListState,
  setongoingListState,
}) => {
  const { height, width } = useWindowDimensions();
  const [changeModal, setChangeModal] = useState(false);
  const [currentOrder, setcurrentOrder] = useState({
    element: null,
    index: null,
  });

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
    <>
      <TouchableOpacity
        onPress={() => setongoingOrderListModal(false)}
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
              onPress={() => setongoingOrderListModal(false)}
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
              Pending Orders
            </Text>
            <View style={{ width: "25%" }} />
          </View>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={{ height: height * 0.5, width: "100%" }}
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

                element.cart.map((cartItem) => {
                  cartString += `Name: ${cartItem.name}\n`;

                  if (cartItem.quantity > 1) {
                    cartString += `Quantity: ${cartItem.quantity}\n`;
                    cartString += `Price: $${
                      cartItem.price * cartItem.quantity
                    }`;
                  } else {
                    cartString += `Price: $${cartItem.price}`;
                  }

                  if (cartItem.description) {
                    cartString += `\n${cartItem.description}`;
                  }

                  if (cartItem.options) {
                    cartString += `\n`;
                    cartItem.options.map((option) => {
                      cartString += `${option}\n`;
                    });
                  }

                  if (cartItem.extraDetails) {
                    cartString += `$cartItem.extraDetails}\n`;
                  }
                });

                return (
                  <TouchableOpacity
                    onPress={() =>
                      setongoingListState((prev) => {
                        prev[index].open = !prev[index].open;
                        return [...prev];
                      })
                    }
                    style={{ marginBottom: 20 }}
                    key={index}
                  >
                    {element.online && (
                      <View
                        style={{
                          backgroundColor: "green",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 5,
                          width: "100%",
                          borderTopLeftRadius: 30,
                          borderTopRightRadius: 30,
                        }}
                      >
                        <Text>ONLINE ORDER</Text>
                      </View>
                    )}
                    <View
                      style={[
                        {
                          backgroundColor: "rgba(243,243,243,1)",
                          borderRadius: 30,
                          width: "100%",
                          height: 68,
                          padding: 30,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        },
                        element.open && {
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                        element.online && {
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                        },
                      ]}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "60%",
                        }}
                      >
                        <Text>
                          {element.customer
                            ? element.customer?.name.toUpperCase()
                            : `Order ID: ${element.transNum.toUpperCase()}`}
                        </Text>
                        <Text>{date?.toLocaleTimeString()}</Text>
                      </View>
                      <View
                        style={{
                          borderRightWidth: 1,
                          height: 35,
                          backgroundColor: "black",
                        }}
                      />
                      {element.online && (
                        <>
                          {element.method === "pickupOrder" && (
                            <TouchableOpacity
                              style={{ padding: 5 }}
                              onPress={() => {
                                db.collection("users")
                                  .doc(auth.currentUser.uid)
                                  .collection("pendingOrders")
                                  .doc(element.id)
                                  .delete();
                                updateTransList(element);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="store"
                                size={26}
                                color="rgba(74,74,74,1)"
                              />
                            </TouchableOpacity>
                          )}
                          {element.method === "deliveryOrder" && (
                            <TouchableOpacity
                              style={{ padding: 5 }}
                              onPress={() => {
                                db.collection("users")
                                  .doc(auth.currentUser.uid)
                                  .collection("pendingOrders")
                                  .doc(element.id)
                                  .delete();
                                updateTransList(element);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="car"
                                size={26}
                                color="rgba(74,74,74,1)"
                              />
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                      {/* NOT ONLINE */}
                      {!element.online && (
                        <>
                          {element.method === "pickupOrder" && (
                            <TouchableOpacity
                              style={{ padding: 5 }}
                              onPress={() => {
                                setChangeModal(true);
                                setcurrentOrder({
                                  element: element,
                                  index: index,
                                });
                                updateTransList(element);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="store"
                                size={26}
                                color="rgba(74,74,74,1)"
                              />
                            </TouchableOpacity>
                          )}
                          {element.method === "deliveryOrder" && (
                            <TouchableOpacity
                              style={{ padding: 5 }}
                              onPress={() => {
                                db.collection("users")
                                  .doc(auth.currentUser.uid)
                                  .collection("pendingOrders")
                                  .doc(element.id)
                                  .delete();
                                updateTransList(element);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="car"
                                size={26}
                                color="rgba(74,74,74,1)"
                              />
                            </TouchableOpacity>
                          )}
                          {element.method === "inStoreOrder" && (
                            <TouchableOpacity
                              style={{ padding: 5 }}
                              onPress={() => {
                                db.collection("users")
                                  .doc(auth.currentUser.uid)
                                  .collection("pendingOrders")
                                  .doc(element.id)
                                  .delete();
                                updateTransList(element);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="check"
                                size={26}
                                color="rgba(74,74,74,1)"
                              />
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={() => {
                              db.collection("users")
                                .doc(auth.currentUser.uid)
                                .collection("pendingOrders")
                                .doc(element.id)
                                .delete();
                            }}
                          >
                            <MaterialCommunityIcons
                              name="cancel"
                              size={26}
                              color="rgba(74,74,74,1)"
                            />
                          </TouchableOpacity>
                          {element.method !== "inStoreOrder" &&
                            !element.online && (
                              <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {
                                  updateOrderHandler({
                                    ...element,
                                    index: index,
                                  });
                                }}
                              >
                                <MaterialCommunityIcons
                                  name="square-edit-outline"
                                  size={26}
                                  color="rgba(74,74,74,1)"
                                />
                              </TouchableOpacity>
                            )}
                        </>
                      )}
                    </View>
                    {element.open && (
                      <ScrollView
                        style={{
                          backgroundColor: "rgba(243,243,243,1)",
                          padding: 30,
                          borderTopWidth: 1,
                          borderBottomLeftRadius: 30,
                          borderBottomRightRadius: 30,
                        }}
                      >
                        <Text>{cartString}</Text>
                      </ScrollView>
                    )}
                  </TouchableOpacity>
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
          <Modal visible={changeModal} transparent={true}>
            <ChangeScreen
              setongoingOrderListModal={setongoingOrderListModal}
              setChangeModal={setChangeModal}
              setcurrentOrder={setcurrentOrder}
              order={currentOrder.element}
              completeOrder={() => {
                db.collection("pendingOrders").doc(currentOrder.id).delete();
                // ongoingList.splice(currentOrder.index, 1);
                // localStorage.setItem("ongoingList", JSON.stringify(ongoingList));
                setChangeModal(false);
              }}
              goBack={() => {
                setcurrentOrder({
                  element: null,
                  index: null,
                });
                setChangeModal(false);
              }}
            />
          </Modal>
        </View>
      </View>
    </>
  );
};

export default CompletePaymentPhoneOrder;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    height: "95%",
    width: "100%",
    alignItems: "center",
  },
});
