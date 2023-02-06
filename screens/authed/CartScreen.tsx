import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  const transList = transListState.use();
  const storeDetails = storeDetailState.use();
  const [cartSub, setCartSub] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      let newVal = 0;
      for (var i = 0; i < cart.length; i++) {
        newVal += parseFloat(cart[i].price);
      }
      setCartSub(newVal);
    } else {
      setCartSub(0);
    }
  }, [cart]);

  useEffect(() => {
    if (
      !deliveryModal &&
      !cashModal &&
      !changeModal &&
      !ongoingDelivery &&
      cart.length === 0
    ) {
      const waitTranslist = localStorage.getItem("waitTranslist");
      if (waitTranslist) {
        updateTransList(waitTranslist);
        localStorage.removeItem("waitTranslist");
      }
    }
  }, [deliveryModal, cashModal, changeModal, ongoingDelivery, cart]);

  const AddToList = async (payload) => {
    const local = structuredClone(transList);

    const waitTranslist = localStorage.getItem("waitTranslist");

    if (waitTranslist) {
      waitTranslist.push(payload);
      updateTransList(waitTranslist);
      localStorage.removeItem("waitTranslist");
    } else {
      local.push(payload);
      updateTransList(local);
    }
  };

  const Print = (method) => {
    const transNum = transList?.length + 1;
    if (method === "deliveryOrder") {
      let total =
        storeDetails.deliveryPrice > 0
          ? parseFloat(storeDetails.deliveryPrice)
          : 0;
      const today = new Date();

      let data = [
        "\x1B" + "\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        storeDetails.name,
        "\x0A",
        storeDetails.address + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction # ${transNum}` + "\x0A",
        "\x0A",
        `Delivery Order: $${storeDetails.deliveryPrice} Fee` + "\x0A",
        "\x0A",
        "\x0A",
        "\x0A",
        "\x1B" + "\x61" + "\x30", // left align
      ];

      cart.map((cartItem) => {
        total += parseFloat(cartItem.price);
        data.push(`Name: ${cartItem.name}`);
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
        "Customer Address #:  " + address,
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
          let config = qz.configs.create("storeDetails.comSelected");
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
        completed: false,
        customer: {
          name: name,
          phone: phone,
          address: address,
        },
      });

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
        storeDetails.address + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction # ${transNum}` + "\x0A",
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
          let config = qz.configs.create("storeDetails.comSelected");
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
        completed: false,
        customer: {
          name: name,
          phone: phone,
          address: address,
        },
      });

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
        storeDetails.address + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction # ${transNum}` + "\x0A",
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
          let config = qz.configs.create("storeDetails.comSelected");
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
          }}
        >
          <TouchableOpacity
            style={styles({ height, width }).cashButton}
            onPress={() => setCashModal(true)}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles({ height, width }).btnTxt}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles({ height, width }).cardButton}
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
          onPress={() => setOngoingDelivery(null)}
        >
          <Text style={styles({ height, width }).btnTxt}>Cancel</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles({ height, width }).container}>
      <View style={styles({ height, width }).cartHeader}>
        <Text style={{ fontSize: 25, width: "50%", color: "white" }}>
          Bill Total
        </Text>
        <TouchableOpacity style={styles({ height, width }).iconContainer}>
          <Ionicons name="person-add" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles({ height, width }).iconContainer}
          onPress={() => setDeliveryModal(true)}
          disabled={cart.length > 0}
        >
          <Foundation name="telephone" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles({ height, width }).contentContainer}
      >
        <View>
          {cart.map((cartItem, index) => (
            <View
              style={{
                backgroundColor: "white",
                shadowColor: "rgba(0,0,0,1)",
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
                elevation: 30,
                shadowOpacity: 0.07,
                shadowRadius: 10,
                marginBottom: 20,
                padding: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={{ width: "33%" }}>
                  <View
                    style={{
                      backgroundColor: "#E6E6E6",
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles({ height, width }).headerTxt}>
                      {index + 1}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "33%",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles({ height, width }).headerTxt}>
                    {cartItem.name}
                  </Text>
                </View>
                <View
                  style={{
                    width: "33%",
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 15, fontWeight: "600" }}
                    onPress={() => {
                      const local = structuredClone(cart);
                      local.splice(index, 1);
                      setCartState(local);
                    }}
                  >
                    X
                  </Text>
                </View>
              </View>
              <Text style={styles({ height, width }).innerTxt}>
                Price: ${cartItem.price}
              </Text>
              {cartItem.description && (
                <Text style={styles({ height, width }).innerTxt}>
                  Description: {cartItem.description}
                </Text>
              )}
              {cartItem.options &&
                cartItem.options.map((option) => (
                  <Text style={styles({ height, width }).innerTxt}>
                    {option}
                  </Text>
                ))}
              {cartItem.extraDetails && (
                <Text style={styles({ height, width }).innerTxt}>
                  Extra Info: {cartItem.extraDetails}
                </Text>
              )}
              <Button title="Edit" onPress={() => navigation.navigate('ProductListing', {product: cartItem.editableObj, itemIndex: index})} />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles({ height, width }).totalContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles({ height, width }).totalTxt}>Sub:</Text>
          <Text style={styles({ height, width }).totalTxtPrice}>
            ${cartSub.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles({ height, width }).totalTxt}>Total:</Text>
          <Text style={styles({ height, width }).totalTxtPrice}>
            ${(cartSub * 1.13).toFixed(2)}
          </Text>
        </View>
        <DeliveryBtn />
      </View>
      <Modal visible={deliveryModal} transparent={true}>
        <DeliveryScreen
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
      shadowRadius: 10,
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
      borderRadius: 20,
      width: 62,
      height: 58,
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
  });
