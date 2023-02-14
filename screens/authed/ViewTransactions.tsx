import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text } from "@react-native-material/core";
import {
  storeDetailState,
  transListState,
  woocommerceState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
const tz = require("moment-timezone");

const ViewTransactions = () => {
  const today = new Date();
  const storeDetails = storeDetailState.use();
  const wooCredentials = woocommerceState.use();
  const [transList, settransList] = useState([]);
  const [todaysDetails, setTodaysDetails] = useState({
    todaysReceiptValue: 0,
    todaysReceipts: 0,
  });

  // useEffect(() => {
  //   try {
  //     db.collection("users")
  //       .doc(auth.currentUser?.uid)
  //       .collection("transList")
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           // console.log(doc.id, " => ", doc.data());
  //           settransList((prevState) => [...prevState, doc.data()]);
  //           console.log(doc.data());
  //         });
  //       });
  //   } catch {
  //     console.log("Error occured retrieving tranasctions");
  //   }

  //   if (wooCredentials.useWoocommerce === true) {
  //     try {
  //       const WooCommerceAPI = require("woocommerce-api");

  //       const WooCommerce = new WooCommerceAPI({
  //         url: wooCredentials.apiUrl,
  //         consumerKey: wooCredentials.ck,
  //         consumerSecret: wooCredentials.cs,
  //         wpAPI: true,
  //         version: "wc/v1",
  //       });

  //       let page = 1;
  //       let orders = [];

  //       const getOrders = async () => {
  //         const response = await WooCommerce.getAsync(
  //           `orders?page=${page}&per_page=100`
  //         );
  //         const data = JSON.parse(response.body);
  //         orders = [...orders, ...data];
  //         if (data.length === 100) {
  //           page++;
  //           getOrders();
  //         } else {
  //           // console.log(orders);
  //         }
  //       };

  //       getOrders()
  //         .then(() => settransList((prevState) => [...prevState, ...orders]))
  //         .catch((e) => console.log("error has occured"));
  //     } catch {
  //       console.log("Something occured with woo");
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     if (transList.length > 0) {
  //       settransList((prev) =>
  //         prev
  //           .sort(function (a, b) {
  //             if (a.date && b.date) {
  //               return a.date.seconds - b.date.seconds;
  //             } else if (a.date && b.date_created) {
  //               const targetTimezone =
  //                 Intl.DateTimeFormat().resolvedOptions().timeZone;
  //               const newDateA = new Date(a.date.seconds * 1000);
  //               const newDateB = new Date(b.date_created + "Z");
  //               const resultA = tz(newDateA).tz(targetTimezone, true);
  //               const resultB = tz(newDateB).tz(targetTimezone, true);

  //               return resultA.valueOf() - resultB.valueOf();
  //             } else if (a.date_created && b.date) {
  //               const targetTimezone =
  //                 Intl.DateTimeFormat().resolvedOptions().timeZone;
  //               const newDateA = new Date(a.date_created + "Z");
  //               const newDateB = new Date(b.date.seconds * 1000);
  //               const resultA = tz(newDateA).tz(targetTimezone, true);
  //               const resultB = tz(newDateB).tz(targetTimezone, true);

  //               return resultA.valueOf() - resultB.valueOf();
  //             } else {
  //               const targetTimezone =
  //                 Intl.DateTimeFormat().resolvedOptions().timeZone;
  //               const newDateA = new Date(a.date_created + "Z");
  //               const newDateB = new Date(b.date_created + "Z");
  //               const resultA = tz(newDateA).tz(targetTimezone, true);
  //               const resultB = tz(newDateB).tz(targetTimezone, true);

  //               return resultA.valueOf() - resultB.valueOf();
  //             }
  //           })
  //           .reverse()
  //       );
  //       // settransList(sortedTransList);
  //       const todaysReceiptValue = transList.reduce((accumulator, current) => {
  //         let date;
  //         const targetTimezone =
  //           Intl.DateTimeFormat().resolvedOptions().timeZone;
  //         if (current.date) {
  //           const localDatePreConv = new Date(current.date.seconds * 1000);
  //           date = tz(localDatePreConv).tz(targetTimezone, true);
  //         } else {
  //           const localDatePreConv = new Date(current.date_created + "Z");
  //           date = tz(localDatePreConv).tz(targetTimezone, true);
  //         }
  //         // Get the current date in the desired time zone
  //         let today = tz().tz(targetTimezone);

  //         if (
  //           today.year() === date.year() &&
  //           today.month() === date.month() &&
  //           today.dayOfYear() === date.dayOfYear()
  //         ) {
  //           return (
  //             accumulator +
  //             parseFloat(current.date ? current.total : current.total / 1.13)
  //           );
  //         } else {
  //           return accumulator;
  //         }
  //       }, 0);
  //       const todaysReceipts = transList.reduce((accumulator, current) => {
  //         let date;
  //         const targetTimezone =
  //           Intl.DateTimeFormat().resolvedOptions().timeZone;
  //         if (current.date) {
  //           const localDatePreConv = new Date(current.date.seconds * 1000);
  //           date = tz(localDatePreConv).tz(targetTimezone, true);
  //         } else {
  //           const localDatePreConv = new Date(current.date_created + "Z");
  //           date = tz(localDatePreConv).tz(targetTimezone, true);
  //         }
  //         // Get the current date in the desired time zone
  //         let today = tz().tz(targetTimezone);

  //         if (
  //           today.year() === date.year() &&
  //           today.month() === date.month() &&
  //           today.dayOfYear() === date.dayOfYear()
  //         ) {
  //           return accumulator + 1;
  //         } else {
  //           return accumulator;
  //         }
  //       }, 0);
  //       setTodaysDetails({
  //         todaysReceiptValue: todaysReceiptValue.toFixed(2),
  //         todaysReceipts: todaysReceipts,
  //       });
  //     }
  //   } catch {
  //     console.log("Error Occured when sorting dates");
  //   }
  // }, [transList]);

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
      "\x1D" + "\x56" + "\x30",
    ];

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
  };

  const CleanupOps = (metaList) => {
    const opsArray = [];

    metaList.forEach((op) => {
      const arrContaingMe = opsArray.filter(
        (filterOp) => filterOp.key === op.key
      );

      if (arrContaingMe.length > 0) {
        opsArray.forEach((opsArrItem, index) => {
          if (opsArrItem.key === op.key) {
            opsArray[index].vals.push(op.value);
          }
        });
      } else {
        opsArray.push({ key: op.key, vals: [op.value] });
      }
    });
    return opsArray;
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
          <FlatList
            maxToRenderPerBatch={6}
            data={transList}
            renderItem={({ item, index }) => {
              const element = item;
              let date;

              if (element.date_created) {
                const dateString = element.date_created;

                const newDate = new Date(dateString + "Z");

                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;

                const result = tz(newDate)
                  .tz(targetTimezone, true)
                  .format("dddd, MMMM Do YYYY, h:mm:ss a z");

                date = result;
              } else if (element.date) {
                const newDate = new Date(element.date.seconds * 1000);
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;

                const result = tz(newDate)
                  .tz(targetTimezone, true)
                  .format("dddd, MMMM Do YYYY, h:mm:ss a z");

                date = result;
              }

              return (
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    padding: 30,
                    margin: 10,
                  }}
                  key={index}
                >
                  <Text>
                    {element.cart_hash ? "Online Order" : "POS Order"}
                  </Text>
                  {element.customer && (
                    <>
                      <Text>
                        {element.customer.address
                          ? `Delivery Order To: ${element.customer.address}`
                          : "Pickup Order"}
                      </Text>
                      <Text>Name: {element.customer.name}</Text>
                      <Text>Phone Number: {element.customer.phone}</Text>
                    </>
                  )}
                  <Text style={{ marginBottom: 10 }}>{date}</Text>
                  {element.cart?.map((cartItem, index) => (
                    <View style={{ marginBottom: 20 }} key={index}>
                      <Text>Name: {cartItem.name}</Text>
                      <Text>Quantity: {cartItem.quantity}</Text>
                      <Text>Price: {cartItem.price}</Text>
                      {cartItem.options &&
                        cartItem.options?.map((option) => (
                          <Text>{option}</Text>
                        ))}
                    </View>
                  ))}
                  {element.line_items?.map((cartItem, index) => (
                    <View style={{ marginBottom: 20 }} key={index}>
                      <Text>Name: {cartItem.name}</Text>
                      <Text>Quantity: {cartItem.quantity}</Text>
                      <Text>Price: {cartItem.price}</Text>
                      {cartItem.meta &&
                        CleanupOps(cartItem.meta).map((returnedItem) => (
                          <View style={{ flexDirection: "row" }}>
                            <Text>{returnedItem.key} : </Text>
                            {returnedItem.vals.map((val, index) => (
                              <Text>
                                {val}
                                {index >= 0 &&
                                  index < returnedItem.vals.length - 1 &&
                                  ", "}
                              </Text>
                            ))}
                          </View>
                        ))}
                    </View>
                  ))}
                  {element.billing && (
                    <>
                      <Text>Customer Details:</Text>
                      <Text>Address: {element.shipping.address_1}</Text>
                      <Text>City: {element.shipping.city}</Text>
                      <Text>Postal Code: {element.shipping.postcode}</Text>
                      <Text>Province/State: {element.shipping.state}</Text>
                      <Text>
                        Name: {element.shipping.first_name}{" "}
                        {element.shipping.last_name}
                      </Text>
                      {element.shipping_lines.map((line) => (
                        <Text>Shipping Method: {line.method_title}</Text>
                      ))}
                      <Text>Phone Number: {element.billing.phone}</Text>
                      {element.customer_note?.length > 0 && (
                        <Text>Customer Note: {element.customer_note}</Text>
                      )}
                    </>
                  )}
                  <Button
                    title="Print"
                    style={{ marginTop: 10 }}
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
                          date + "\x0A",
                          "\x0A",
                          `Transaction ID ${element.transNum}` + "\x0A",
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

                        if (element.billing) {
                          data.push(`Phone Number: ${element.billing.phone}`);
                          data.push("\x0A");
                        }

                        if (element.customer_note) {
                          data.push(`Customer Note: ${element.customer_note}`);
                          data.push("\x0A");
                        }

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

                        const qz = require("qz-tray");
                        qz.websocket
                          .connect()
                          .then(function () {
                            let config = qz.configs.create(
                              storeDetails.comSelected
                            );
                            return qz.print(config, data);
                          })
                          .then(qz.websocket.disconnect)
                          .catch(function (err) {
                            console.error(err);
                          });
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
                          date + "\x0A",
                          "\x0A",
                          "Online Order" + "\x0A", // text and line break
                          `Transaction ID ${element.number}` + "\x0A",
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

                          if (cartItem.meta) {
                            CleanupOps(cartItem.meta).map((returnedItem) => {
                              printData.push(`${returnedItem.key} : `);
                              returnedItem.vals.map((val, index) => {
                                printData.push(`${val}`);
                                if (
                                  index >= 0 &&
                                  index < returnedItem.vals.length - 1
                                ) {
                                  printData.push(", ");
                                }
                              });
                              printData.push("\x0A");
                            });
                          } else {
                            printData.push("\x0A" + "\x0A");
                          }
                        });

                        printData.push("\x0A");
                        printData.push("\x0A");
                        printData.push(`Customer Details:`);
                        printData.push("\x0A");
                        printData.push(
                          `Address: ${element.shipping.address_1}`
                        );
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
                        element.shipping_lines.map((line) => {
                          printData.push(
                            `Shipping Method: ${line.method_title}`
                          );
                          printData.push("\x0A");
                        });
                        if (element.billing) {
                          printData.push(
                            `Phone Number: ${element.billing.phone}`
                          );
                          printData.push("\x0A");
                        }
                        if (element.customer_note) {
                          printData.push(
                            `Customer Note: ${element.customer_note}`
                          );
                          printData.push("\x0A");
                        }
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
                            element.total +
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

                        const qz = require("qz-tray");
                        qz.websocket
                          .connect()
                          .then(function () {
                            let config = qz.configs.create(
                              storeDetails.comSelected
                            );
                            return qz.print(config, printData);
                          })
                          .then(qz.websocket.disconnect)
                          .catch(function (err) {
                            console.error(err);
                          });

                        // fetch("http://localhost:8080/print", {
                        //   method: "POST",
                        //   headers: {
                        //     "Content-Type": "application/json",
                        //   },
                        //   body: JSON.stringify({
                        //     printData: printData,
                        //     comSelected: storeDetails.comSelected,
                        //   }),
                        // })
                        //   .then((response) => response.json())
                        //   .then((respData) => {
                        //     console.log(respData);
                        //   })
                        //   .catch((e) => alert("Error with printer"));
                      }
                    }}
                  />
                </View>
              );
            }}
          />
        ) : (
          <Text>No receipts yet</Text>
        )}
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
