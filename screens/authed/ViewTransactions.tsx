import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text } from "@react-native-material/core";
import { storeDetailState, transListState } from "state/state";

const ViewTransactions = () => {
  const local = transListState.use();
  const [transList, settransList] = useState();
  const today = new Date();
  const [todaysDetails, setTodaysDetails] = useState({
    todaysReceiptValue: 0,
    todaysReceipts: 0,
  });
  const storeDetails = storeDetailState.use();

  useEffect(() => {
    local
      .sort(function (a, b) {
        if (a.date && b.date) {
          return a.date.seconds - b.date.seconds;
        } else if (a.date && b.date_created) {
          const bDate = new Date(b.date_created).getTime() / 1000;
          return a.date.seconds - bDate;
        } else if (a.date_created && b.date) {
          const aDate = new Date(a.date_created).getTime() / 1000;
          return aDate - b.date.seconds;
        } else {
          const aDate = new Date(a.date_created).getTime() / 1000;
          const bDate = new Date(b.date_created).getTime() / 1000;
          return aDate - bDate;
        }
      })
      .reverse();
    settransList(local);
    const todaysReceiptValue = local.reduce((accumulator, current) => {
      let date;
      if (current.date) {
        date = new Date(current.date.seconds * 1000);
      } else {
        date = new Date(current.date_created);
        console.log("seconds is: ", date.getTime() / 1000);
      }
      if (date.toLocaleDateString() === today.toLocaleDateString()) {
        return accumulator + parseFloat(current.total);
      } else {
        return accumulator;
      }
    }, 0);
    const todaysReceipts = local.reduce((accumulator, current) => {
      let date;
      if (current.date) {
        date = new Date(current.date.seconds * 1000);
      } else {
        date = new Date(current.date_created);
      }

      if (date.toLocaleDateString() === today.toLocaleDateString()) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    setTodaysDetails({
      todaysReceiptValue: todaysReceiptValue.toFixed(2),
      todaysReceipts: todaysReceipts,
    });
  }, []);

  const PrintTodaysTotal = () => {
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
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30", // left align
      "\x0A" + "\x0A",
      "Number Of Receipts: " + todaysDetails.todaysReceipts + "\x0A" + "\x0A",
      "Sub-Total: " +
        "$" +
        (todaysDetails.todaysReceiptValue / 1.13).toFixed(2) +
        "\x0A" +
        "\x0A",
      "Tax: " +
        "$" +
        ((todaysDetails.todaysReceiptValue / 1.13) * 0.13).toFixed(2) +
        "\x0A" +
        "\x0A",
      "Total Including (13% Tax): " +
        "$" +
        todaysDetails.todaysReceiptValue +
        "\x0A" +
        "\x0A",
      "------------------------------------------" + "\x0A",
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x1D" + "\x56" + "\x00",
      "\x1D" + "\x56" + "\x30",
    ];

    fetch("http://localhost:8080/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        printData: data,
        comSelected: storeDetails.comSelected,
      }),
    })
      .then((response) => response.json())
      .then((respData) => {
        console.log(respData);
      })
      .catch((e) => alert("Error with printer"));
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
          onPress={PrintTodaysTotal}
        />
        <Text style={{ textAlign: "center", margin: 25 }}>
          Todays Total Receipts: {todaysDetails.todaysReceipts}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {transList ? (
          transList?.map((element, index) => {
            // if (date.toLocaleDateString() === today.toLocaleDateString()) {
            //   setTodaysDetails((prevState) => prevState + 1);
            // }

            const date = element.date
              ? new Date(element.date.seconds * 1000)
              : element.date_created
              ? new Date(element.date_created)
              : null;

            return (
              <View
                style={{ backgroundColor: "grey", padding: 30, margin: 10 }}
                key={index}
              >
                <Text>{date.toLocaleString()}</Text>
                {element.cart?.map((cartItem, index) => (
                  <View style={{ marginBottom: 20 }} key={index}>
                    <Text>Name: {cartItem.name}</Text>
                    <Text>Quantity: {cartItem.quantity}</Text>
                    <Text>Price: {cartItem.price}</Text>
                    {cartItem.options &&
                      cartItem.options?.map((option) => <Text>{option}</Text>)}
                  </View>
                ))}
                {element.line_items?.map((cartItem, index) => (
                  <View style={{ marginBottom: 20 }} key={index}>
                    <Text>Name: {cartItem.name}</Text>
                    <Text>Quantity: {cartItem.quantity}</Text>
                    <Text>Price: {cartItem.price}</Text>
                    {cartItem.meta_data?.map((meta, index) => {
                      if (index === cartItem.meta_data.length - 1) return;
                      return <Text>{`${meta.key} : ${meta.value}`}</Text>;
                    })}
                  </View>
                ))}
                <Button
                  title="Print"
                  onPress={() => {
                    if (element.date) {
                      let total = 0;

                      let data = [
                        "\x1B" + "\x40", // init
                        "\x1B" + "\x61" + "\x31", // center align
                        storeDetails.name,
                        "\x0A",
                        storeDetails.address + "\x0A",
                        storeDetails.website + "\x0A", // text and line break
                        storeDetails.phoneNumber + "\x0A", // text and line break
                        date.toLocaleDateString() +
                          " " +
                          date.toLocaleTimeString() +
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

                      fetch("http://localhost:8080/print", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          printData: data,
                          comSelected: storeDetails.comSelected,
                        }),
                      })
                        .then((response) => response.json())
                        .then((respData) => {
                          console.log(respData);
                        })
                        .catch((e) => alert("Error with printer"));
                    } else {
                      const printData = [];

                      printData.push(
                        "\x1B" + "\x40", // init
                        "\x1B" + "\x61" + "\x31", // center align
                        storeDetails.name,
                        "\x0A",
                        storeDetails.address + "\x0A",
                        storeDetails.website + "\x0A", // text and line break
                        storeDetails.phoneNumber + "\x0A", // text and line break
                        element.date_created + "\x0A",
                        "\x0A",
                        "Online Order" + "\x0A", // text and line break
                        `Transaction # ${element.number}` + "\x0A",
                        "\x0A",
                        "\x0A",
                        "\x0A",
                        "\x1B" + "\x61" + "\x30" // left align
                      );

                      element.line_items?.map((cartItem) => {
                        printData.push("\x0A");
                        printData.push(`Name: ${cartItem.name}`);
                        printData.push("\x0A");
                        printData.push(`Quantity: ${cartItem.quantity}`);
                        printData.push("\x0A");
                        printData.push(`Price: $${cartItem.price}`);
                        printData.push("\x0A");

                        if (cartItem.meta_data) {
                          cartItem.meta_data?.map((meta, index) => {
                            if (index === 0) {
                              printData.push(`${meta.key} : ${meta.value}`);
                              if (
                                cartItem.meta_data[index + 1].key !== meta.key
                              ) {
                                printData.push("\x0A");
                              }
                            } else {
                              if (index !== cartItem.meta_data.length - 1) {
                                if (
                                  cartItem.meta_data[index - 1].key === meta.key
                                ) {
                                  printData.push(` , ${meta.value}`);
                                } else {
                                  printData.push(`${meta.key} : ${meta.value}`);
                                }

                                if (
                                  cartItem.meta_data[index + 1].key !== meta.key
                                ) {
                                  printData.push("\x0A");
                                }
                              }
                            }
                          });
                        } else {
                          printData.push("\x0A" + "\x0A");
                        }
                      });

                      printData.push("\x0A");
                      printData.push("\x0A");
                      printData.push(`Customer Details:`);
                      printData.push("\x0A");
                      printData.push(`Address: ${element.shipping.address_1}`);
                      printData.push("\x0A");
                      printData.push(`City: ${element.shipping.city}`);
                      printData.push("\x0A");
                      printData.push(
                        `Zip/Postal Code: ${element.shipping.postcode}`
                      );
                      printData.push("\x0A");
                      printData.push(
                        `Province/State: ${element.shipping.state}`
                      );
                      printData.push("\x0A");
                      printData.push(
                        `Name: ${element.shipping.first_name} ${element.shipping.last_name}`
                      );
                      printData.push("\x0A");
                      element.shipping_lines.map((line) =>
                        printData.push(`Shipping Method: ${line.method_title}`)
                      );
                      printData.push("\x0A");
                      printData.push("\x0A");

                      printData.push(
                        "\x0A",
                        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
                        "\x0A" + "\x0A",
                        "Payment Method: " +
                          element.payment_method_title +
                          "\x0A" +
                          "\x0A",
                        "Total Including (13% Tax): " +
                          "$" +
                          (
                            parseFloat(element.total) +
                            parseFloat(element.total_tax)
                          ).toFixed(2) +
                          "\x0A" +
                          "\x0A",
                        "------------------------------------------" + "\x0A",
                        "\x0A", // line break
                        "\x0A", // line break
                        "\x0A", // line break
                        "\x0A", // line break
                        "\x0A", // line break
                        "\x0A" // line break
                      );

                      printData.push("\x1D" + "\x56" + "\x00");

                      fetch("http://localhost:8080/print", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(printData),
                      })
                        .then((response) => response.json())
                        .then((respData) => {
                          console.log(respData);
                        })
                        .catch((e) => alert("Error with printer"));
                    }
                  }}
                />
              </View>
            );
          })
        ) : (
          <Text>No receipts yet</Text>
        )}
        {/* {transList &&
          transList?.map((element, index) => {
            const date = new Date(element.date);
            // if (date.toLocaleDateString() === today.toLocaleDateString()) {
            //   setTodaysDetails((prevState) => prevState + 1);
            // }
            return (
              <View
                style={{ backgroundColor: "grey", padding: 30, margin: 10 }}
                key={index}
              >
                {element.cart?.map((cartItem, index) => (
                  <View style={{ marginBottom: 20 }} key={index}>
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
                      storeDetails.name,
                      "\x0A",
                      storeDetails.address + "\x0A",
                      storeDetails.website + "\x0A", // text and line break
                      storeDetails.phoneNumber + "\x0A", // text and line break
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
          })} */}
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
