import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text } from "@react-native-material/core";
import { storeDetailState, transListState } from "state/state";
import { updateTransList } from "state/firebaseFunctions";
import ChangeScreen from "./ChangeScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useWindowDimensions from "./useWindowDimensions";

const CompletePaymentPhoneOrder = ({ setongoingOrderListModal }) => {
  const { height, width } = useWindowDimensions();
  // const transList = transListState.use();
  const [ongoingListState, setongoingListState] = useState(
    JSON.parse(localStorage.getItem("ongoingList"))
  );
  const [changeModal, setChangeModal] = useState(false);
  const [currentOrder, setcurrentOrder] = useState({
    element: null,
    index: null,
  });

  useEffect(() => {
    localStorage.setItem("ongoingList", JSON.stringify(ongoingListState));
  }, [ongoingListState]);

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
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {ongoingListState?.length > 0 ? (
              ongoingListState?.map((element, index) => {
                try {
                  // if (element.id) {
                  //   if (
                  //     element.id?.substr(element.id?.length - 2, 2) === "-l" &&
                  //     element.completed === false &&
                  //     element.cancelled !== true
                  //   ) {
                  const date = new Date(element.date);

                  return (
                    <View
                      style={{
                        backgroundColor: "rgba(243,243,243,1)",
                        borderRadius: 30,
                        width: "100%",
                        height: 68,
                        padding: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20,
                      }}
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
                        <Text>{element.customer?.name}</Text>
                        <Text>{date?.toLocaleTimeString()}</Text>
                      </View>
                      <View
                        style={{
                          borderRightWidth: 1,
                          height: 35,
                          backgroundColor: "black",
                        }}
                      />
                      {element.method === "pickupOrder" ? (
                        <MaterialCommunityIcons
                          onPress={() => {
                            if (element.method === "pickupOrder") {
                              setChangeModal(true);
                              setcurrentOrder({
                                element: element,
                                index: index,
                              });
                            } else {
                              const local = structuredClone(ongoingListState);
                              if (local.length > 0) {
                                local.splice(index, 1);
                                setongoingListState(local);
                              } else {
                                setongoingListState([]);
                              }
                              // ongoingList.splice(index, 1);
                              // localStorage.setItem(
                              //   "ongoingList",
                              //   JSON.stringify(ongoingList)
                              // );
                            }
                          }}
                          name="store"
                          size={26}
                          color="rgba(74,74,74,1)"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          onPress={() => {
                            if (element.method === "pickupOrder") {
                              setChangeModal(true);
                              setcurrentOrder({
                                element: element,
                                index: index,
                              });
                            } else {
                              const local = structuredClone(ongoingListState);
                              if (local.length > 0) {
                                local.splice(index, 1);
                                setongoingListState(local);
                              } else {
                                setongoingListState([]);
                              }
                              // ongoingList.splice(index, 1);
                              // localStorage.setItem(
                              //   "ongoingList",
                              //   JSON.stringify(ongoingList)
                              // );
                            }
                          }}
                          name="car"
                          size={26}
                          color="rgba(74,74,74,1)"
                        />
                      )}
                      <MaterialCommunityIcons
                        onPress={() => {
                          const local = structuredClone(ongoingListState);
                          if (local.length > 0) {
                            local.splice(index, 1);
                            setongoingListState(local);
                          } else {
                            setongoingListState([]);
                          }
                          // ongoingList.splice(index, 1);
                          // localStorage.setItem(
                          //   "ongoingList",
                          //   JSON.stringify(ongoingList)
                          // );
                        }}
                        name="cancel"
                        size={26}
                        color="rgba(74,74,74,1)"
                      />
                      {/* <Text>
                      Method:{" "}
                      {element.method === "pickupOrder"
                        ? "Pick Up"
                        : "Delivery"}
                    </Text> */}
                      {/* <Button
                      title="Complete Order"
                      onPress={() => {
                        if (element.method === "pickupOrder") {
                          setChangeModal(true);
                          setcurrentOrder({ element: element, index: index });
                        } else {
                          const localChange = structuredClone(transList);
                          localChange[index].completed = true;
                          updateTransList(localChange);
                        }
                      }}
                      style={{ marginBottom: 10 }}
                    />
                    <Button
                      title="Cancel Order"
                      onPress={() => {
                        const localChange = structuredClone(transList);
                        localChange[index].cancelled = true;
                        updateTransList(localChange);
                      }}
                    /> */}
                    </View>
                  );
                  //   }
                  // }
                } catch {
                  console.log("Error at complete phone order");
                }
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
                const local = structuredClone(ongoingListState);
                if (local.length > 0) {
                  local.splice(currentOrder.index, 1);
                  setongoingListState(local);
                } else {
                  setongoingListState([]);
                }
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
