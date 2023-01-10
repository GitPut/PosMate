import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text } from "@react-native-material/core";

const ViewTransactions = () => {
  const [transList, setTransList] = useState([]);
  const today = new Date();
  const [todaysDetails, setTodaysDetails] = useState({
    todaysReceiptValue: 0,
    todaysReceipts: 0,
  });

  // const GetTrans = async () => {
  //   socket.emit("getTrans");
  //   socket.on("getTrans", (res) => {
  //     setTransList(res.transList.reverse());
  //     const todaysReceiptValue = res.transList.reduce(
  //       (accumulator, current) => {
  //         const date = new Date(current.date);
  //         if (date.toLocaleDateString() === today.toLocaleDateString()) {
  //           return accumulator + parseFloat(current.total);
  //         } else {
  //           return accumulator;
  //         }
  //       },
  //       0
  //     );
  //     const todaysReceipts = res.transList.reduce((accumulator, current) => {
  //       const date = new Date(current.date);
  //       if (date.toLocaleDateString() === today.toLocaleDateString()) {
  //         return accumulator + 1;
  //       } else {
  //         return accumulator;
  //       }
  //     }, 0);
  //     setTodaysDetails({
  //       todaysReceiptValue: todaysReceiptValue.toFixed(2),
  //       todaysReceipts: todaysReceipts,
  //     });
  //   });
  // };

  useEffect(() => {
    //GetTrans();
  }, []);

  const Print = () => {
    const qz = require("qz-tray");

    const todaysReceiptsList = transList.filter(
      (i) =>
        new Date(i.date).toLocaleDateString() === today.toLocaleDateString()
    );

    let data = [];

    todaysReceiptsList.forEach((element) => {
      let total = 0;
      data.push(
        "\x1B" + "\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        "Dream City Pizza",
        "\x0A",
        "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
        "www.dreamcitypizza.com" + "\x0A", // text and line break
        "(519) 650-0409" + "\x0A", // text and line break
        today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
        "\x0A",
        `Transaction # ${element.transNum}` + "\x0A",
        "\x0A",
        "\x0A",
        "\x0A",
        "\x1B" + "\x61" + "\x30" // left align
      );

      element.cart?.map((cartItem) => {
        total += cartItem.price;
        data.push(`Name: ${cartItem.name}`);
        data.push("\x0A");
        data.push(`Quantity: ${cartItem.quantity}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price}`);

        if (cartItem.options) {
          cartItem.options?.map((option) => {
            data.push(option);
            data.push("\x0A");
          });
        } else {
          data.push("\x0A" + "\x0A");
        }
      });

      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Payment Method: " + element.method + "\x0A" + "\x0A",
        "Total Including (13% Tax): " + "$" + element.total + "\x0A" + "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A" // line break
      );
    });

    data.push("\x1D" + "\x56" + "\x00", "\x1D" + "\x56" + "\x30");

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
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", margin: 25 }}>
        List Of Transactions
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", margin: 25 }}>
          Todays Total Price: {todaysDetails.todaysReceiptValue}
        </Text>
        <Button
          style={{ height: 40, alignItems: "center", justifyContent: "center" }}
          title="Print Todays Receipts"
          onPress={Print}
        />
        <Text style={{ textAlign: "center", margin: 25 }}>
          Todays Total Receipts: {todaysDetails.todaysReceipts}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {transList &&
          transList?.map((element) => {
            const date = new Date(element.date);
            // if (date.toLocaleDateString() === today.toLocaleDateString()) {
            //   setTodaysDetails((prevState) => prevState + 1);
            // }
            return (
              <View
                style={{ backgroundColor: "grey", padding: 30, margin: 10 }}
                key={element.transNum}
              >
                {element.cart?.map((cartItem) => (
                  <View style={{ marginBottom: 20 }} key={element.transNum}>
                    <Text>Name: {cartItem.name}</Text>
                    <Text>Quantity: {cartItem.quantity}</Text>
                    <Text>Price: {cartItem.price}</Text>
                    <Text>Date: {date.toLocaleDateString()}</Text>
                    {cartItem.options &&
                      cartItem.options?.map((option) => <Text>{option}</Text>)}
                  </View>
                ))}
                <Button
                  title="Print"
                  onPress={() => {
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
                      today.toLocaleDateString() +
                        " " +
                        today.toLocaleTimeString() +
                        "\x0A",
                      "\x0A",
                      `Transaction # ${element.transNum}` + "\x0A",
                      "\x0A",
                      "\x0A",
                      "\x0A",
                      "\x1B" + "\x61" + "\x30", // left align
                    ];

                    element.cart?.map((cartItem) => {
                      total += parseFloat(cartItem.price);
                      data.push(`Name: ${cartItem.name}`);
                      data.push("\x0A");
                      data.push(`Quantity: ${cartItem.quantity}`);
                      data.push("\x0A");
                      data.push(`Price: $${cartItem.price}`);

                      if (cartItem.options) {
                        data.push("\x0A");
                        cartItem.options?.map((option) => {
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
                      "Total Including (13% Tax): " +
                        "$" +
                        total +
                        "\x0A" +
                        "\x0A",
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
                  }}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default ViewTransactions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});
