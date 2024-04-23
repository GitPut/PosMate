import React, { useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { auth, db } from "state/firebaseConfig";
import { updateTransList } from "state/firebaseFunctions";
import { storeDetailState } from "state/state";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import { CurrentOrderProp, OngoingListStateProp } from "types/global";
import ParseDate from "components/functional/ParseDate";

interface PendingOrderShowDetailsProps {
  updateOrderHandler: (val: OngoingListStateProp) => void;
  currentOrder: CurrentOrderProp;
  fadeOut: (val: boolean) => void;
  setcurrentOrder: (val: CurrentOrderProp) => void;
  setongoingOrderListModal: (val: boolean) => void;
}

function PendingOrderShowDetails({
  currentOrder,
  updateOrderHandler,
  fadeOut,
  setcurrentOrder,
  setongoingOrderListModal,
}: PendingOrderShowDetailsProps) {
  const { element, index, cartString, date } = currentOrder;
  const parsedDate = ParseDate(date as Date);
  const storeDetails = storeDetailState.use();
  const { managerAuthorizedStatus, pendingAuthAction } = posHomeState.use();

  useEffect(() => {
    if (
      managerAuthorizedStatus &&
      pendingAuthAction === `cancelOrder${element?.id}`
    ) {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("pendingOrders")
        .doc(element?.id)
        .delete();
      updatePosHomeState({
        managerAuthorizedStatus: false,
        pendingAuthAction: "",
      });
      fadeOut(false);
    } else if (
      managerAuthorizedStatus &&
      pendingAuthAction === `updateOrder${element?.id}` &&
      element?.id
    ) {
      updateOrderHandler({
        ...element,
        index: index,
        isInStoreOrder: element?.isInStoreOrder ?? false,
        id: element?.id ?? "", // Assign an empty string if 'element?.id' is undefined
        cart: element?.cart ?? [], // Assign an empty array if 'element?.cart' is undefined
        cartNote: element?.cartNote ?? "", // Assign an empty string if 'element?.cartNote' is undefined
        customer: element?.customer ?? null, // Assign null if 'element?.customer' is undefined
        method: element?.method ?? "", // Assign an empty string if 'element?.method' is undefined
        online: element?.online ?? false, // Assign false if 'element?.online' is
        transNum: element?.transNum ?? "", // Assign an empty string if 'element?.transNum' is undefined
        total: element?.total ?? "", // Assign an empty string if 'element?.total' is undefined
      });
      fadeOut(false);
    }
  }, [managerAuthorizedStatus, pendingAuthAction]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topRowContainer}>
          <View style={styles.backIconContainer}>
            <Pressable
              onPress={() => {
                fadeOut(false);
              }}
            >
              <Entypo
                name="chevron-small-left"
                style={styles.backIcon}
              ></Entypo>
            </Pressable>
          </View>
          <Text style={styles.pendingOrdersLabel}>Pending Orders</Text>
          <Pressable
            onPress={() => setongoingOrderListModal(false)}
            style={styles.closeIconContainer}
          >
            <Ionicons name="close" style={styles.closeIcon}></Ionicons>
          </Pressable>
        </View>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.orderNameRow}>
            <Text style={styles.orderNameLabel}>Order Name:</Text>
            <Text style={styles.orderNameValue}>
              {element?.customer
                ? element.customer?.name?.toUpperCase()
                : "N/A"}
            </Text>
          </View>
          <View style={styles.orderNumberRow}>
            <Text style={styles.orderNumberLabel}>Order Number:</Text>
            <Text style={styles.orderNumberValue}>
              {element?.transNum?.toUpperCase()}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.orderTypeWithDateRow}>
            {element?.online && (
              <Text style={[styles.orderType, { color: "#01C550" }]}>
                Online Order{"\n"}
                {element.method === "pickupOrder" && "Pickup"}
                {element.method === "deliveryOrder" && "Delivery"}
              </Text>
            )}
            {!element?.online && element?.customer && (
              <Text style={[styles.orderType, { color: "#FF0F00" }]}>
                Phone Order{"\n"}
                {element.method === "pickupOrder" && "Pickup"}
                {element.method === "deliveryOrder" && "Delivery"}
              </Text>
            )}
            {!element?.online && !element?.customer && (
              <Text style={[styles.orderType]}>
                POS Order{"\n"}
                {element?.method === "pickupOrder" && "Pickup"}
                {element?.method === "deliveryOrder" && "Delivery"}
              </Text>
            )}
            <Text style={styles.orderDate}>
              {parsedDate?.toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View style={styles.cartDetailsContainer}>
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            <Text style={styles.cartDetailsOrderLabel}>Order:</Text>
            <Pressable
              // disabled={!(element.method !== "inStoreOrder" && !element.online)}
              disabled={!!element?.online}
              onPress={() => {
                if (storeDetails.settingsPassword.length > 0) {
                  updatePosHomeState({
                    authPasswordModal: true,
                    pendingAuthAction: `updateOrder${element?.id}`,
                  });
                } else if (element && element.id) {
                  updateOrderHandler({
                    ...element,
                    index: index,
                    isInStoreOrder: element?.isInStoreOrder ?? false,
                    id: element.id,
                    cart: element.cart ?? [],
                    cartNote: element.cartNote ?? "",
                    customer: element.customer ?? null,
                    method: element.method ?? "",
                    online: element.online ?? false,
                    transNum: element.transNum ?? "",
                    total: element.total ?? "",
                  });
                  fadeOut(false);
                }
              }}
              style={{ marginLeft: 370 }}
            >
              <Feather
                name="edit"
                style={[
                  styles.editIcon,
                  // element.method !== "inStoreOrder" && !element.online
                  !element?.online ? { color: "black" } : { color: "grey" },
                ]}
              />
            </Pressable>
            <Text style={styles.cartDetails}>{cartString}</Text>
          </ScrollView>
        </View>
        <View style={styles.bottomBtnRow}>
          <Pressable
            style={styles.cancelBtn}
            onPress={() => {
              if (storeDetails.settingsPassword.length > 0) {
                updatePosHomeState({
                  authPasswordModal: true,
                  pendingAuthAction: `cancelOrder${element?.id}`,
                });
              } else {
                db.collection("users")
                  .doc(auth.currentUser?.uid)
                  .collection("pendingOrders")
                  .doc(element?.id)
                  .delete();
                fadeOut(false);
              }
            }}
          >
            <Text style={styles.cancelOrder}>Cancel Order</Text>
          </Pressable>
          <Pressable
            style={styles.completeBtn}
            onPress={() => {
              if (element?.online) {
                db.collection("users")
                  .doc(auth.currentUser?.uid)
                  .collection("pendingOrders")
                  .doc(element.id)
                  .delete();
                updateTransList(element);
                fadeOut(false);
              } else {
                if (element?.method === "pickupOrder") {
                  //   fadeOut(() => {
                  setcurrentOrder({
                    element: element,
                    index: index,
                    type: "pay",
                    cartString: cartString,
                    date: date,
                    // });
                    // fadeIn();
                  });
                  // fadeOut(false);
                } else {
                  db.collection("users")
                    .doc(auth.currentUser?.uid)
                    .collection("pendingOrders")
                    .doc(element?.id)
                    .delete();
                  updateTransList({
                    ...element,
                    date: element?.date ?? "",
                  });
                  fadeOut(false);
                }
              }
            }}
          >
            <Text style={styles.completeOrder}>Complete Order</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: 540,
    height: 609,
  },
  innerContainer: {
    width: 496,
    height: 550,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  topRowContainer: {
    width: 496,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  backIconContainer: {
    width: 50,
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 50,
  },
  pendingOrdersLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
    height: 47,
  },
  closeIconContainer: {
    width: 58,
    height: 74,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  closeIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
  },
  orderDetailsContainer: {
    width: 400,
    height: 102,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderNameRow: {
    width: "100%",
    height: 19,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  orderNameLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
    marginRight: 10,
  },
  orderNameValue: {
    color: "#121212",
    fontSize: 15,
  },
  orderNumberRow: {
    width: "100%",
    height: 19,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  orderNumberLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
    marginRight: 10,
  },
  orderNumberValue: {
    color: "#121212",
    fontSize: 15,
    width: 206,
    height: 18,
  },
  divider: {
    width: 399,
    height: 1,
    backgroundColor: "rgba(0,0,0,1)",
  },
  orderTypeWithDateRow: {
    width: 400,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderType: {
    fontWeight: "700",
    color: "#0029ff",
    fontSize: 15,
  },
  orderDate: {
    color: "#121212",
  },
  cartDetailsContainer: {
    width: 420,
    height: 300,
  },
  cartDetailsOrderLabel: {
    color: "#121212",
    fontSize: 15,
  },
  editIcon: {
    fontSize: 30,
  },
  cartDetails: {
    color: "#121212",
    fontSize: 15,
    width: 394,
    height: 169,
    marginLeft: 6,
  },
  bottomBtnRow: {
    width: 277,
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelBtn: {
    width: 128,
    height: 42,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelOrder: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  completeBtn: {
    width: 128,
    height: 42,
    backgroundColor: "#03c551",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  completeOrder: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
});

export default PendingOrderShowDetails;
