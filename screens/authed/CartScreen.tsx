import { Modal, ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { cartState, setCartState } from "state/state";
import { Button } from "@react-native-material/core";
import DeliveryScreen from "components/DeliveryScreen";
import CashScreen from "components/CashScreen";
import ChangeScreen from "components/ChangeScreen";

const sh = Dimensions.get('window').height

const CartScreen = () => {
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [ongoingDelivery, setOngoingDelivery] = useState(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [changeDue, setChangeDue] = useState();
  const cart = cartState.use();
  const [cartSub, setCartSub] = useState(0);
  
    useEffect(
      () => {
  if(cart.length > 0){
      let newVal = 0
    for(var i = 0; i < cart.length; i++){
      newVal += parseFloat(cart[i].price) ;
    }
    setCartSub(newVal)
      } else {
        setCartSub(0)
      }
      }
    ,[cart])
  
    const GetTrans = async (method) => {
      const socket = io("http://localhost:8443");
      socket.emit("getTrans");
      socket.on("getTrans", (res) => {
       Print(method, parseInt(res.transList.length));
      });
    };
  
    const AddToList = async (payload) => {
      const socket = io("http://localhost:8443");
      socket.emit("addTrans", payload);
    };

  const Print = (method, transNum) => {
    if(method === 'deliveryOrder'){
        let total = 5.5;
        const qz = require("qz-tray");
        const today = new Date();
    
        let data = [
          "\x1B" + "\x40", // init
          "\x1B" + "\x61" + "\x31", // center align
          "Dream City Pizza",
          "\x0A",
          "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
          "www.dreamcitypizza.com" + "\x0A", // text and line break
          "(519) 650-0409" + "\x0A", // text and line break
          today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
          "\x0A",
          `Transaction # ${transNum}` + "\x0A",
          "\x0A",
          "Delivery Order: $5.50 Fee" + "\x0A",
          "\x0A",
          "\x0A",
          "\x0A",
          "\x1B" + "\x61" + "\x30", // left align
        ];
    
        cart.map((cartItem) => {
          total += parseFloat(cartItem.price);
          data.push(`Name: ${cartItem.name}`);
          data.push("\x0A");
          data.push(`Quantity: ${cartItem.quantity}`);
          data.push("\x0A");
          data.push(`Price: $${cartItem.price}`);
    
          if (cartItem.options) {
            data.push("\x0A");
            cartItem.options.map((option) => {
              data.push(option);
              data.push("\x0A");
            });
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
    
        AddToList({

            date: today,
            transNum: transNum,
            total: total,
            method: "deliveryOrder",
            cart: cart,
        
        });
    
        qz.websocket
          .connect()
          .then(function () {
            let config = qz.configs.create("jZebra");
            return qz.print(config, data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error(err);
          });
        setCartState([]);
        setDeliveryModal(false);
    }
    if(method === 'pickupOrder'){
      let total = 0;
      const qz = require("qz-tray");
      const today = new Date();
  
      let data = [
        "\x1B" + "\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        "Dream City Pizza",
        "\x0A",
        "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
        "www.dreamcitypizza.com" + "\x0A", // text and line break
        "(519) 650-0409" + "\x0A", // text and line break
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
        data.push("\x0A");
        data.push(`Quantity: ${cartItem.quantity}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price}`);
  
        if (cartItem.options) {
          data.push("\x0A");
          cartItem.options.map((option) => {
            data.push(option);
            data.push("\x0A");
          });
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
  
      AddToList({
    
          date: today,
          transNum: transNum,
          total: total,
          method: "pickupOrder",
          cart: cart,
  
      });
  
      qz.websocket
        .connect()
        .then(function () {
          let config = qz.configs.create("jZebra");
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          console.error(err);
        });
      setCartState([]);
      setDeliveryModal(false);
  }

    let total = 0;
    const qz = require("qz-tray");
    const today = new Date();

    let data = [
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      "Dream City Pizza",
      "\x0A",
      "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
      "www.dreamcitypizza.com" + "\x0A", // text and line break
      "(519) 650-0409" + "\x0A", // text and line break
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
      data.push(`Quantity: ${cartItem.quantity}`);
      data.push("\x0A");
      data.push(`Price: $${cartItem.price}`);

      if (cartItem.options) {
        data.push("\x0A");
        cartItem.options.map((option) => {
          data.push(option);
          data.push("\x0A");
        });
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

    AddToList({
  
        date: today,
        transNum: transNum,
        total: total,
        method: method,
        cart: cart,
   
    });

    qz.websocket
      .connect()
      .then(function () {
        let config = qz.configs.create("jZebra");
        return qz.print(config, data);
      })
      .then(qz.websocket.disconnect)
      .catch(function (err) {
        console.error(err);
      });
    setCartState([]);
  };

  const DeliveryBtn = () => {
    if(ongoingDelivery === null) {
      return <Button
          title="Phone Order"
          onPress={() => setDeliveryModal(true)}
          disabled={cart.length > 0}
          style={{marginBottom: 20}}
        />
    }
    if(ongoingDelivery && cart.length > 0){
      return <Button
      title="Complete"
      onPress={() => {
        GetTrans(deliveryChecked ? 'deliveryOrder' : 'pickupOrder');
         setOngoingDelivery(null); 
         setName(null);
          setPhone(null);
           setAddress(null);
          }}
          style={{marginBottom: 20}}
    />
    } else {
      return <Button
      title= "Cancel"
      onPress={() => setOngoingDelivery(null)}
      style={{marginBottom: 20}}
    />
    }
  }

  return (
      <View style={styles.container}>
        <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        {cart.map((cartItem) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Name: {cartItem.name}</Text>
            <Text>Quantity: {cartItem.quantity}</Text>
            <Text>Price: {cartItem.price}</Text>
            {cartItem.options &&
              cartItem.options.map((option) => <Text>{option}</Text>)}
            <Text
              style={{ color: "blue" }}
              onPress={() =>{
                const newVal = cart.filter((e) => e.name !== cartItem.name)
                setCartState(newVal)
              }
              }
            >
              Remove
            </Text>
          </View>
        ))}
      </View>
      <View>
      <Text>Sub: {cartSub.toFixed(2)}</Text>
      <Text>Total: {(cartSub * 1.13).toFixed(2)}</Text>
        <Button
          title="Cash"
          onPress={() => setCashModal(true)}
          disabled={cart.length < 1 || ongoingDelivery}
          style={{ marginBottom: 20 }}
        />
        <Button
          title="Card"
          onPress={() => GetTrans("Card")}
          disabled={cart.length < 1 || ongoingDelivery}
          style={{ marginBottom: 20 }}
        />
<DeliveryBtn />
<Button
          title="Change"
          onPress={() => setChangeModal(true)}
          disabled={cart.length > 0 || ongoingDelivery}
        />
      </View>
      <Modal visible={deliveryModal}>
        <DeliveryScreen setDeliveryModal={setDeliveryModal} setOngoingDelivery={setOngoingDelivery} setName={setName} setPhone={setPhone}  setAddress={setAddress} name={name} phone={phone} address={address} deliveryChecked={deliveryChecked} setDeliveryChecked={setDeliveryChecked} />
      </Modal>
      <Modal visible={cashModal}>
        <CashScreen setCashModal={setCashModal} GetTrans={() => GetTrans("Cash")} total={(cartSub * 1.13).toFixed(2)} setChangeDue={setChangeDue} />
      </Modal>
      <Modal visible={changeModal}>
        <ChangeScreen setChangeModal={setChangeModal} />
      </Modal>
    </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    flex: 1,
    height: sh - 125,
  },
  contentContainer: {
    backgroundColor: "lightgrey",
    flex: 1,
    height: sh - 125,
    justifyContent: "space-between",
    padding: 20,
  },
});
