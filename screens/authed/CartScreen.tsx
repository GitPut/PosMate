import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  cartState,
  cartSubState,
  setCartState,
  setTransListState,
  storeDetailState,
  transListState,
} from "state/state";
import { Button } from "@react-native-material/core";
import DeliveryScreen from "components/DeliveryScreen";
import CashScreen from "components/CashScreen";
import ChangeScreen from "components/ChangeScreen";
import { updateTransList } from "state/firebaseFunctions";
import useWindowDimensions from "components/useWindowDimensions";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import SaveCustomer from "./SaveCustomer";
import { auth, db } from "state/firebaseConfig";
import CartItem from "components/CartItem";
import ProductListingTest from "components/ProductListingTest";

const CartItemEditable = ({ cartItem, index, removeAction }) => {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change xPos value to 0 in 3 seconds
    setshowProductScreen(true);
    Animated.timing(xPos, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(shadowOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(shadowOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(xPos, {
      toValue: -1000,
      duration: 100,
      useNativeDriver: false,
    }).start(() => setshowProductScreen(false));
  };

  return (
    <>
      <CartItem
        cartItem={cartItem}
        index={index}
        isPrev={false}
        removeAction={removeAction}
        editAction={() => fadeIn()}
      />
      {showProductScreen && (
        <Modal transparent={true}>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
              position: "absolute",
              height: "100%",
              width: "100%",
              bottom: 0,
              left: xPos,
              zIndex: 0,
            }}
          >
            <View
              style={{
                height: "90%",
                width: "70%",
                borderTopRightRadius: 3,
              }}
            >
              <ProductListingTest
                product={cartItem.editableObj}
                itemIndex={index}
                goBack={() => fadeOut()}
              />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              height: "100%",
              width: "30%",
              padding: 20,
              shadowColor: "rgba(0,0,0,1)",
              shadowOffset: {
                width: -3,
                height: 3,
              },
              elevation: 30,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              position: "absolute",
              opacity: shadowOpacity,
              right: 0,
              bottom: 0,
            }}
          />
          <Animated.View
            style={{
              height: "10%",
              width: "70%",
              padding: 20,
              shadowColor: "rgba(0,0,0,1)",
              shadowOffset: {
                width: -3,
                height: 3,
              },
              elevation: 30,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              position: "absolute",
              opacity: shadowOpacity,
              left: 0,
              top: 0,
            }}
          />
        </Modal>
      )}
    </>
  );
};

const CartScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [ongoingDelivery, setOngoingDelivery] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [changeDue, setChangeDue] = useState();
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const [cartSub, setCartSub] = useState(0);
  const [saveCustomerModal, setSaveCustomerModal] = useState(false);
  const [savedCustomerDetails, setsavedCustomerDetails] = useState(null);

  useEffect(() => {
    console.log("hello", cartSub);
    if (cart.length > 0) {
      let newVal = 0;
      for (var i = 0; i < cart.length; i++) {
        newVal += parseFloat(cart[i].price);
        console.log("item price: ", cart[i].price);
      }
      if (deliveryChecked) {
        setCartSub(newVal + parseFloat(storeDetails.deliveryPrice));
      } else {
        setCartSub(newVal);
      }
    } else {
      setCartSub(0);
    }
  }, [cart]);

  const AddToList = async (payload) => {
    updateTransList(payload);
  };

  const Print = (method) => {
    if (savedCustomerDetails) {
      if (savedCustomerDetails.orders?.length > 0) {
        console.log("Greater than 0");
        console.log("CART: ", cart);
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [...savedCustomerDetails.orders, { cart }],
          });
      } else {
        console.log("Not Greater than 0");
        console.log("CART: ", cart);
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [{ cart }],
          });
      }
    }

    const transNum = Math.random().toString(36).substr(2, 9);
    if (method === "deliveryOrder") {
      let total = cartSub;
      const today = new Date();

      let data = [
        "\x1B" + "\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        storeDetails.name,
        "\x0A",
        storeDetails.address?.label + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction ID ${transNum}` + "\x0A",
        "\x0A",
        `Delivery Order: $${
          storeDetails.deliveryPrice ? storeDetails.deliveryPrice : "0"
        } Fee` + "\x0A",
        "\x0A",
        "\x0A",
        "\x0A",
        "\x1B" + "\x61" + "\x30", // left align
      ];

      cart.map((cartItem) => {
        total += parseFloat(cartItem.price);
        data.push(`Name: ${cartItem.name}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price}`);

        if (cartItem.description) {
          data.push("\x0A");
          data.push(cartItem.description);
        }

        if (cartItem.options) {
          data.push("\x0A");
          cartItem.options.map((option) => {
            data.push(option);
            data.push("\x0A");
          });
        }

        if (cartItem.extraDetails) {
          data.push(cartItem.extraDetails);
          data.push("\x0A");
        }

        data.push("\x0A" + "\x0A");
      });

      total = total * 1.13;
      total = total.toFixed(2);

      //push ending
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Customer Name: " + name,
        "\x0A" + "\x0A",
        "Customer Phone #:  " + phone,
        "\x0A" + "\x0A",
        "Customer Address #:  " + address?.label,
        "\x0A" + "\x0A",
        "Total Including (13% Tax): " + total + "\x0A" + "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x1D" + "\x56" + "\x30"
      );
      // fetch("http://localhost:8080/print", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     printData: data,
      //     comSelected: storeDetails.comSelected,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((respData) => {
      //     console.log(respData);
      //   })
      //   .catch((e) => alert("Error with printer"));
      const qz = require("qz-tray");
      qz.websocket
        .connect()
        .then(function () {
          let config = qz.configs.create(storeDetails.comSelected);
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          console.error(err);
        });

      AddToList({
        id: Math.random().toString(36).substr(2, 9) + "-l",
        date: today,
        transNum: transNum,
        total: total,
        method: "deliveryOrder",
        cart: cart,
        // completed: false,
        customer: {
          name: name,
          phone: phone,
          address: address ? address : null,
        },
      });

      let ongoingList = JSON.parse(localStorage.getItem("ongoingList"));
      if (ongoingList) {
        ongoingList.push({
          id: Math.random().toString(36).substr(2, 9) + "-l",
          date: today,
          transNum: transNum,
          total: total,
          method: "deliveryOrder",
          cart: cart,
          customer: {
            name: name,
            phone: phone,
            address: address ? address : null,
          },
        });
        localStorage.setItem("ongoingList", JSON.stringify(ongoingList));
      } else {
        localStorage.setItem(
          "ongoingList",
          JSON.stringify([
            {
              id: Math.random().toString(36).substr(2, 9) + "-l",
              date: today,
              transNum: transNum,
              total: total,
              method: "deliveryOrder",
              cart: cart,
              customer: {
                name: name,
                phone: phone,
                address: address ? address : null,
              },
            },
          ])
        );
      }

      setCartState([]);
      setDeliveryModal(false);
    } else if (method === "pickupOrder") {
      let total = 0;
      const today = new Date();

      let data = [
        "\x1B" + "\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        storeDetails.name,
        "\x0A",
        storeDetails.address?.label + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction ID ${transNum}` + "\x0A",
        "\x0A",
        "Pickup Order" + "\x0A",
        "\x0A",
        "\x0A",
        "\x0A",
        "\x1B" + "\x61" + "\x30", // left align
      ];

      cart.map((cartItem) => {
        total += parseFloat(cartItem.price);
        data.push(`Name: ${cartItem.name}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price}`);

        if (cartItem.description) {
          data.push("\x0A");
          data.push(cartItem.description);
        }

        if (cartItem.options) {
          data.push("\x0A");
          cartItem.options.map((option) => {
            data.push(option);
            data.push("\x0A");
          });
        }

        if (cartItem.extraDetails) {
          data.push(cartItem.extraDetails);
          data.push("\x0A");
        }

        data.push("\x0A" + "\x0A");
      });

      total = total * 1.13;
      total = total.toFixed(2);

      //push ending
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Customer Name: " + name,
        "\x0A" + "\x0A",
        "Customer Phone #:  " + phone,
        "\x0A" + "\x0A",
        "Total Including (13% Tax): " + total + "\x0A" + "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x1D" + "\x56" + "\x30"
      );
      // fetch("http://localhost:8080/print", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     printData: data,
      //     comSelected: storeDetails.comSelected,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((respData) => {
      //     console.log(respData);
      //   })
      //   .catch((e) => alert("Error with printer"));
      const qz = require("qz-tray");
      qz.websocket
        .connect()
        .then(function () {
          let config = qz.configs.create(storeDetails.comSelected);
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          console.error(err);
        });

      AddToList({
        id: Math.random().toString(36).substr(2, 9) + "-l",
        date: today,
        transNum: transNum,
        total: total,
        method: "pickupOrder",
        cart: cart,
        customer: {
          name: name,
          phone: phone,
          address: address ? address : null,
        },
      });

      let ongoingList = JSON.parse(localStorage.getItem("ongoingList"));
      if (ongoingList) {
        ongoingList.push({
          id: Math.random().toString(36).substr(2, 9) + "-l",
          date: today,
          transNum: transNum,
          total: total,
          method: "pickupOrder",
          cart: cart,
          customer: {
            name: name,
            phone: phone,
            address: address ? address : null,
          },
        });
        localStorage.setItem("ongoingList", JSON.stringify(ongoingList));
      } else {
        localStorage.setItem(
          "ongoingList",
          JSON.stringify([
            {
              id: Math.random().toString(36).substr(2, 9) + "-l",
              date: today,
              transNum: transNum,
              total: total,
              method: "pickupOrder",
              cart: cart,
              customer: {
                name: name,
                phone: phone,
                address: address ? address : null,
              },
            },
          ])
        );
      }

      setCartState([]);
      setDeliveryModal(false);
    } else {
      let total = 0;
      const today = new Date();

      let data = [
        "\x1B" + "\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        storeDetails.name,
        "\x0A",
        storeDetails.address?.label + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction ID ${transNum}` + "\x0A",
        "\x0A",
        "\x0A",
        "\x0A",
        "\x1B" + "\x61" + "\x30", // left align
      ];

      cart.map((cartItem) => {
        total += parseFloat(cartItem.price);
        data.push(`Name: ${cartItem.name}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price}`);

        if (cartItem.description) {
          data.push("\x0A");
          data.push(cartItem.description);
        }

        if (cartItem.options) {
          data.push("\x0A");
          cartItem.options.map((option) => {
            data.push(option);
            data.push("\x0A");
          });
        }

        if (cartItem.extraDetails) {
          data.push(cartItem.extraDetails);
          data.push("\x0A");
        }

        data.push("\x0A" + "\x0A");
      });

      total = total * 1.13;
      total = total.toFixed(2);

      if (method === "Cash") {
        //push ending
        data.push(
          "\x0A",
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
          "\x0A" + "\x0A",
          "Payment Method: " + method + "\x0A" + "\x0A",
          "Total Including (13% Tax): " + "$" + total + "\x0A" + "\x0A",
          "Change Due: " + "$" + changeDue + "\x0A" + "\x0A",
          "------------------------------------------" + "\x0A",
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          //"\x1D" + "\x56" + "\x00",
          "\x1D" + "\x56" + "\x30",
          "\x10" + "\x14" + "\x01" + "\x00" + "\x05"
        );
      } else {
        data.push(
          "\x0A",
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
          "\x0A" + "\x0A",
          "Payment Method: " + method + "\x0A" + "\x0A",
          "Total Including (13% Tax): " + "$" + total + "\x0A" + "\x0A",
          "------------------------------------------" + "\x0A",
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          //"\x1D" + "\x56" + "\x00",
          "\x1D" + "\x56" + "\x30"
        );
      }

      // fetch("http://localhost:8080/print", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     printData: data,
      //     comSelected: storeDetails.comSelected,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((respData) => {
      //     console.log(respData);
      //   })
      //   .catch((e) => alert("Error with printer"));
      const qz = require("qz-tray");
      qz.websocket
        .connect()
        .then(function () {
          let config = qz.configs.create(storeDetails.comSelected);
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          console.error(err);
        });

      AddToList({
        id: Math.random().toString(36).substr(2, 9) + "-l",
        date: today,
        transNum: transNum,
        total: total,
        method: method,
        cart: cart,
      });
    }

    setCartState([]);
  };

  const DeliveryBtn = () => {
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
            style={[
              styles({ height, width }).cashButton,
              cartSub === 0 && { opacity: 0.5 },
            ]}
            onPress={() => setCashModal(true)}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles({ height, width }).btnTxt}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles({ height, width }).cardButton,
              cartSub === 0 && { opacity: 0.5 },
            ]}
            onPress={() => Print("Card")}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles({ height, width }).btnTxt}>Card</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (ongoingDelivery && cart.length > 0) {
      return (
        <TouchableOpacity
          style={styles({ height, width }).bigButton}
          onPress={() => {
            Print(deliveryChecked ? "deliveryOrder" : "pickupOrder");
            setOngoingDelivery(null);
            setName(null);
            setPhone(null);
            setAddress(null);
          }}
        >
          <Text style={styles({ height, width }).btnTxt}>Complete</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles({ height, width }).bigButton}
          onPress={() => {
            setOngoingDelivery(null);
            setDeliveryChecked(false);
          }}
        >
          <Text style={styles({ height, width }).btnTxt}>Cancel</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles({ height, width }).container}>
      <View style={styles({ height, width }).cartHeader}>
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
          <TouchableOpacity
            style={[
              styles({ height, width }).iconContainer,
              cart.length > 0 && { opacity: 0.5 },
            ]}
            onPress={() => setSaveCustomerModal(true)}
            disabled={cart.length > 0}
          >
            <MaterialCommunityIcons name="history" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles({ height, width }).iconContainer,
              cart.length > 0 && { opacity: 0.5 },
            ]}
            onPress={() => setDeliveryModal(true)}
            disabled={cart.length > 0}
          >
            <Feather name="phone-call" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles({ height, width }).contentContainer}
      >
        <View>
          {cart.length > 0 ? (
            cart.map((cartItem, index) => (
              <CartItemEditable
                cartItem={cartItem}
                index={index}
                removeAction={() => {
                  const local = structuredClone(cart);
                  local.splice(index, 1);
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
              <Text style={styles({ height, width }).empty}>Empty...</Text>
              <Text style={styles({ height, width }).fillTheCart}>
                Fill the Cart!
              </Text>
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
            ${(cartSub * 0.13).toFixed(2)}
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
        />
      </Modal>
      <Modal visible={cashModal}>
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
    </View>
  );
};

export default CartScreen;

const styles = (props) =>
  //81838B
  StyleSheet.create({
    container: {
      height: props.height,
      width: props.width * 0.3,
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
      height: props.height * 0.14,
      paddingTop: 10,
    },
    cartHeader: {
      height: props.height * 0.06,
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
    },
    fillTheCart: {
      fontFamily: "archivo-500",
      color: "rgba(74,74,74,1)",
      fontSize: 20,
    },
  });
