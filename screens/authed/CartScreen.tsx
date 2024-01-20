import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  cartState,
  setCartState,
  storeDetailState,
  setIsSignedInSettingsState,
  customersList,
  setCustomersList,
  myDeviceDetailsState,
} from "state/state";
import DeliveryScreen from "components/DeliveryScreen";
import CashScreen from "components/CashScreen";
import ChangeScreen from "components/ChangeScreen";
import { updateTransList } from "state/firebaseFunctions";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import SaveCustomer from "./SaveCustomer";
import { auth, db } from "state/firebaseConfig";
import Entypo from "@expo/vector-icons/Entypo";
import { useHistory } from "react-router-dom";
import CompletePaymentPhoneOrder from "components/CompletePaymentPhoneOrder";
import SettingsPasswordModal from "components/SettingsPasswordModal";
import CartItemEditable from "components/CartItemEditable";
import useWindowDimensions from "components/useWindowDimensions";
import ClockinModal from "./ClockinModal";
import ReceiptPrint from "components/ReceiptPrint";

const CartButton = (props) => {
  return (
    <>
      {props.notification ? (
        <View>
          <TouchableOpacity
            style={props.style}
            onPress={props.onPress}
            disabled={props.disabled}
          >
            <props.icon />
          </TouchableOpacity>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 5,
              backgroundColor: "green",
              position: "absolute",
              top: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{props.notification}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={props.style}
          onPress={props.onPress}
          disabled={props.disabled}
        >
          <props.icon />
        </TouchableOpacity>
      )}
    </>
  );
};

const CartScreen = ({ navigation }) => {
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [ongoingDelivery, setOngoingDelivery] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [changeDue, setChangeDue] = useState(null);
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const [cartSub, setCartSub] = useState(0);
  const [saveCustomerModal, setSaveCustomerModal] = useState(false);
  const [savedCustomerDetails, setsavedCustomerDetails] = useState(null);
  const [ongoingOrderListModal, setongoingOrderListModal] = useState(false);
  const [settingsPasswordModalVis, setsettingsPasswordModalVis] =
    useState(false);
  const history = useHistory();
  const height = useWindowDimensions().height;
  const [updatingOrder, setupdatingOrder] = useState(false);
  const [ongoingListState, setongoingListState] = useState([]);
  const customers = customersList.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const [clockinModal, setclockinModal] = useState(false);

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
  }

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("pendingOrders")
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
          if (
            doc.data().online &&
            !doc.data().printed &&
            myDeviceDetails.printOnlineOrders
          ) {
            console.log("Printing");
            const data = ReceiptPrint(doc.data(), storeDetails);
            const qz = require("qz-tray");
            qz.websocket
              .connect()
              .then(function () {
                const config = qz.configs.create(
                  myDeviceDetails.printToPrinter
                );
                return qz.print(config, data.data);
              })
              .then(qz.websocket.disconnect)
              .catch(function (err) {
                console.error(err);
              });
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(doc.id)
              .update({
                printed: true,
              });
          }
        });

        const sortedArray = list.sort((a, b) => {
          const dateA = a.online ? parseDate(a.date) : a.date.toDate();
          const dateB = b.online ? parseDate(b.date) : b.date.toDate();

          // Compare dates
          return dateB - dateA;
        });

        setongoingListState(sortedArray);
      });

    return () => unsub();
  }, []);

  useEffect(() => {
    // console.log("cart", cart);
    if (cart.length > 0) {
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
        setCartSub(newVal + parseFloat(storeDetails.deliveryPrice));
      } else {
        setCartSub(newVal);
      }
    } else {
      setCartSub(0);
    }
  }, [cart, deliveryChecked]);

  // const AddToList = async (payload) => {
  //   updateTransList(payload);
  // };

  const Print = (method, dontAddToOngoing) => {
    console.log("My device details state: ", myDeviceDetails);
    if (savedCustomerDetails) {
      if (savedCustomerDetails.orders?.length > 0) {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [...savedCustomerDetails.orders, { cart }],
          });
        const indexOfCustomer = customers.findIndex(
          (customer) => customer.id === savedCustomerDetails.id
        );
        const newCustomers = structuredClone(customers);
        newCustomers[indexOfCustomer].orders.push({ cart });
        setCustomersList(newCustomers);
      } else {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [{ cart }],
          });
        const indexOfCustomer = customers.findIndex(
          (customer) => customer.id === savedCustomerDetails.id
        );
        const newCustomers = structuredClone(customers);
        newCustomers[indexOfCustomer].orders = [{ cart }];
        setCustomersList(newCustomers);
      }
    }

    const transNum = Math.random().toString(36).substr(2, 9);

    if (method === "deliveryOrder") {
      const today = new Date();

      const element = {
        date: today,
        transNum: transNum,
        method: "deliveryOrder",
        cart: cart,
        customer: {
          name: name,
          phone: phone,
          address: address,
        },
      };

      const data = ReceiptPrint(element, storeDetails);

      if (!dontAddToOngoing) {
        console.log("Adding to pending orders");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("pendingOrders")
          .add({
            date: today,
            transNum: transNum,
            method: "deliveryOrder",
            cart: cart,
            total: data.total,
            customer: {
              name: name,
              phone: phone,
              address: address ? address : null,
            },
          });
      }

      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error(err);
          });
      }

      setCartState([]);
      setDeliveryModal(false);
    } else if (method === "pickupOrder") {
      const today = new Date();

      const element = {
        date: today,
        transNum: transNum,
        method: "pickupOrder",
        cart: cart,
        customer: {
          name: name,
          phone: phone,
          // address: address,
        },
      };

      const data = ReceiptPrint(element, storeDetails);

      if (!dontAddToOngoing) {
        console.log("Adding to pending orders");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("pendingOrders")
          .add({
            date: today,
            transNum: transNum,
            method: "pickupOrder",
            cart: cart,
            total: data.total,
            customer: {
              name: name,
              phone: phone,
              address: address ? address : "null",
            },
          });
      }

      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error(err);
          });
      }

      setCartState([]);
      setDeliveryModal(false);
      setName(null);
      setPhone(null);
      setAddress(null);
      setDeliveryChecked(false);
    } else {
      const today = new Date();
      const element = {
        date: today,
        transNum: transNum,
        method: "inStoreOrder",
        cart: cart,
        customer: {
          name: name,
          phone: phone,
          address: address,
        },
        changeDue: changeDue,
        paymentMethod: method,
      };

      const data = ReceiptPrint(element, storeDetails);

      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("pendingOrders")
        .add({
          date: today,
          transNum: transNum,
          total: data.total,
          method: "inStoreOrder",
          paymentMethod: method,
          cart: cart,
        });
      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error(err);
          });
      }
    }

    setCartState([]);
    setName(null);
    setPhone(null);
    setAddress(null);
    setDeliveryChecked(false);
    setChangeDue(null);
  };

  const DeliveryBtn = () => {
    if (updatingOrder) {
      return (
        <TouchableOpacity
          style={[styles.bigButton, cartSub === 0 && { opacity: 0.5 }]}
          disabled={cart.length < 1}
          onPress={() => {
            // const oldList = structuredClone(
            //   JSON.parse(localStorage.getItem("ongoingList"))
            // );
            // oldList[updatingOrder.index].cart = cart;
            // setongoingListState(oldList);
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(updatingOrder.id)
              .delete();

            Print(deliveryChecked ? "deliveryOrder" : "pickupOrder", false);
            setOngoingDelivery(null);
            setName(null);
            setPhone(null);
            setAddress(null);
            setDeliveryChecked(false);
            setupdatingOrder(false);
          }}
        >
          <Text style={styles.btnTxt}>Update Order</Text>
        </TouchableOpacity>
      );
    }

    if (ongoingDelivery === null) {
      return (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.cashButton, cartSub === 0 && { opacity: 0.5 }]}
            onPress={() => setCashModal(true)}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles.btnTxt}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton, cartSub === 0 && { opacity: 0.5 }]}
            onPress={() => {
              Print("Card");
            }}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles.btnTxt}>Card</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (ongoingDelivery && cart.length > 0) {
      return (
        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => {
            Print(deliveryChecked ? "deliveryOrder" : "pickupOrder", false);
            setOngoingDelivery(null);
            setName(null);
            setPhone(null);
            setAddress(null);
          }}
        >
          <Text style={styles.btnTxt}>Complete</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => {
            setOngoingDelivery(null);
            setDeliveryChecked(false);
            setName(null);
            setPhone(null);
            setAddress(null);
            setChangeDue(null);
          }}
        >
          <Text style={styles.btnTxt}>Cancel</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <Text
          style={{
            fontFamily: "archivo-600",
            color: "rgba(255,255,255,1)",
            fontSize: 25,
          }}
        >
          Order
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CartButton
            style={[
              styles.iconContainer,
              (cart.length > 0 || updatingOrder) && { opacity: 0.5 },
            ]}
            onPress={() => setclockinModal(true)}
            disabled={cart.length > 0 || updatingOrder}
            icon={() => (
              <MaterialCommunityIcons name="clock" size={26} color="white" />
            )}
          />
          <CartButton
            style={[
              styles.iconContainer,
              (cart.length > 0 || updatingOrder) && { opacity: 0.5 },
            ]}
            onPress={() => setSaveCustomerModal(true)}
            disabled={cart.length > 0 || updatingOrder}
            icon={() => (
              <MaterialCommunityIcons name="history" size={26} color="white" />
            )}
          />
          <CartButton
            style={[
              styles.iconContainer,
              (cart.length > 0 || updatingOrder) && { opacity: 0.5 },
            ]}
            disabled={cart.length > 0 || updatingOrder}
            onPress={() => setongoingOrderListModal(true)}
            icon={() => (
              <Ionicons name="chevron-down" size={28} color="white" />
            )}
            notification={ongoingListState.length}
          />
          <CartButton
            style={[
              styles.iconContainer,
              cart.length > 0 && !ongoingDelivery && { opacity: 0.5 },
            ]}
            onPress={() => setDeliveryModal(true)}
            disabled={cart.length > 0 && !ongoingDelivery}
            icon={() => <Feather name="phone-call" size={28} color="white" />}
          />
          {updatingOrder ? (
            <CartButton
              style={[styles.iconContainer]}
              onPress={() => {
                setCartState([]);
                setName(null);
                setPhone(null);
                setAddress(null);
                setDeliveryChecked(false);
                setOngoingDelivery(null);
                setongoingOrderListModal(false);
                setupdatingOrder(false);
              }}
              icon={() => <Entypo name="cross" size={28} color="white" />}
            />
          ) : (
            <CartButton
              disabled={ongoingDelivery}
              style={[
                styles.iconContainer,
                cart.length > 0 && { opacity: 0.5 },
              ]}
              onPress={() => {
                if (storeDetails.settingsPassword) {
                  setsettingsPasswordModalVis(true);
                } else {
                  setIsSignedInSettingsState(true);
                  history.push("/authed/dashboard");
                  localStorage.setItem("isAuthedBackend", true);
                }
              }}
              icon={() => <Entypo name="cog" size={28} color="white" />}
            />
          )}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={{ marginBottom: 10 }}
      >
        <View>
          {cart.length > 0 ? (
            cart.map((cartItem, index) => (
              <CartItemEditable
                key={index}
                cartItem={cartItem}
                index={index}
                removeAction={() => {
                  console.log("Removing");
                  const local = structuredClone(cart);
                  local.splice(index, 1);
                  setCartState(local);
                }}
                decreaseAction={() => {
                  const local = structuredClone(cart);
                  local[index].quantity--;
                  setCartState(local);
                }}
                increaseAction={() => {
                  const local = structuredClone(cart);
                  if (local[index].quantity) {
                    local[index].quantity++;
                  } else {
                    local[index].quantity = 2;
                  }
                  setCartState(local);
                }}
              />
            ))
          ) : (
            <View
              style={{
                height: height * 0.7,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.empty}>Empty...</Text>
              <Text style={styles.fillTheCart}>Fill the Cart!</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          width: "90%",
          alignSelf: "center",
        }}
      >
        {deliveryChecked && parseFloat(storeDetails.deliveryPrice) && (
          <View
            style={{
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "archivo-600",
                color: "rgba(74,74,74,1)",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              Delivery
            </Text>
            <Text
              style={[
                {
                  fontFamily: "archivo-600",
                  color: "rgba(255,255,255,1)",
                  fontSize: 20,
                  alignSelf: "flex-start",
                },
                cartSub === 0 && { opacity: 0.5 },
              ]}
            >
              ${parseFloat(storeDetails.deliveryPrice).toFixed(2)}
            </Text>
          </View>
        )}
        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text
            style={{
              fontFamily: "archivo-600",
              color: "rgba(74,74,74,1)",
              fontSize: 16,
              alignSelf: "flex-start",
            }}
          >
            Sub Total
          </Text>
          <Text
            style={[
              {
                fontFamily: "archivo-600",
                color: "rgba(255,255,255,1)",
                fontSize: 20,
                alignSelf: "flex-start",
              },
              cartSub === 0 && { opacity: 0.5 },
            ]}
          >
            ${cartSub.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text
            style={{
              fontFamily: "archivo-600",
              color: "rgba(74,74,74,1)",
              fontSize: 16,
              alignSelf: "flex-start",
            }}
          >
            Tax
          </Text>
          <Text
            style={[
              {
                fontFamily: "archivo-600",
                color: "rgba(255,255,255,1)",
                fontSize: 20,
                alignSelf: "flex-start",
              },
              cartSub === 0 && { opacity: 0.5 },
            ]}
          >
            $
            {(
              cartSub *
              (storeDetails.taxRate ? storeDetails.taxRate / 100 : 0.13)
            ).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "archivo-600",
              color: "rgba(74,74,74,1)",
              fontSize: 16,
              alignSelf: "flex-start",
            }}
          >
            Total
          </Text>
          <Text
            style={[
              {
                fontFamily: "archivo-600",
                color: "rgba(255,255,255,1)",
                fontSize: 20,
                alignSelf: "flex-start",
              },
              cartSub === 0 && { opacity: 0.5 },
            ]}
          >
            ${(cartSub * 1.13).toFixed(2)}
          </Text>
        </View>
        <DeliveryBtn />
      </View>
      <Modal visible={clockinModal} transparent={true}>
        <ClockinModal setclockinModal={setclockinModal} />
      </Modal>
      <Modal visible={saveCustomerModal} transparent={true}>
        <SaveCustomer
          setSaveCustomerModal={setSaveCustomerModal}
          setOngoingDelivery={setOngoingDelivery}
          setNameForDelivery={setName}
          setPhoneForDelivery={setPhone}
          setAddressForDelivery={setAddress}
          setDeliveryChecked={setDeliveryChecked}
          setsavedCustomerDetails={setsavedCustomerDetails}
        />
      </Modal>
      <Modal visible={deliveryModal} transparent={true}>
        <DeliveryScreen
          setsavedCustomerDetails={setsavedCustomerDetails}
          setDeliveryModal={setDeliveryModal}
          setOngoingDelivery={setOngoingDelivery}
          setName={setName}
          setPhone={setPhone}
          setAddress={setAddress}
          name={name}
          phone={phone}
          address={address}
          deliveryChecked={deliveryChecked}
          setDeliveryChecked={setDeliveryChecked}
          ongoingDelivery={ongoingDelivery}
        />
      </Modal>
      <Modal visible={cashModal} transparent>
        <CashScreen
          setCashModal={setCashModal}
          GetTrans={() => Print("Cash")}
          total={(cartSub * 1.13).toFixed(2)}
          setChangeDue={setChangeDue}
        />
      </Modal>
      <Modal visible={changeModal}>
        <ChangeScreen setChangeModal={setChangeModal} />
      </Modal>
      <Modal visible={ongoingOrderListModal} transparent={true}>
        <CompletePaymentPhoneOrder
          setongoingOrderListModal={setongoingOrderListModal}
          updateOrderHandler={(order) => {
            setCartState(order.cart);
            setName(order.customer.name);
            setPhone(order.customer.phone);
            setAddress(order.customer.address);
            setDeliveryChecked(order.method === "deliveryOrder");
            setOngoingDelivery(true);
            setongoingOrderListModal(false);
            setupdatingOrder(order);
          }}
          ongoingListState={ongoingListState}
          setongoingListState={setongoingListState}
        />
      </Modal>
      <Modal visible={settingsPasswordModalVis} transparent={true}>
        <SettingsPasswordModal
          setsettingsPasswordModalVis={setsettingsPasswordModalVis}
          navigation={navigation}
        />
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "30%",
    padding: 20,
    backgroundColor: "rgba(31,35,48,1)",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: -3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.92,
    shadowRadius: 5,
  },
  contentContainer: {
    height: "100%",
    justifyContent: "space-between",
    width: "100%",
  },
  totalContainer: {
    height: "14%",
    paddingTop: 10,
  },
  cartHeader: {
    height: "6%",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(41,44,56,1)",
    borderRadius: 15,
    width: 50,
    height: 50,
    margin: 10,
  },
  cashButton: {
    backgroundColor: "rgba(51,81,243,1)",
    borderRadius: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: "49.5%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  cardButton: {
    backgroundColor: "rgba(51,81,243,1)",
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: "49.5%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 20,
    color: "white",
  },
  totalTxt: {
    fontSize: 16,
    marginBottom: 5,
    color: "rgba(255,255,255,1)",
    fontWeight: "600",
  },
  totalTxtPrice: {
    fontSize: 16,
    marginBottom: 5,
    color: "rgba(255,255,255,1)",
    fontWeight: "600",
  },
  bigButton: {
    backgroundColor: "rgba(51,81,243,1)",
    borderRadius: 30,
    width: "98%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  innerTxt: {
    fontSize: 13,
    marginBottom: 10,
  },
  headerTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  empty: {
    fontFamily: "archivo-600",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    opacity: 0.44,
    marginTop: 20,
  },
  fillTheCart: {
    fontFamily: "archivo-500",
    color: "rgba(74,74,74,1)",
    fontSize: 20,
  },
});
