import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainAuthed from "./authed/MainAuthed";
import {
  setStoreDetailState,
  setTransListState,
  setUserState,
  setUserStoreState,
  setWoocommerceState,
  storeDetailState,
  transListState,
  userState,
  woocommerceState,
} from "state/state";
import MainNonAuth from "./non-authed/MainNonAuth";
import { auth, db } from "state/firebaseConfig";
import Spinner from "components/Spinner";
import { updateTransList } from "state/firebaseFunctions";
const tz = require("moment-timezone");

const RouteManager = () => {
  const userS = userState.use();
  const wooCredentials = woocommerceState.use();
  const transList = transListState.use();
  const storeDetails = storeDetailState.use();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            setUserStoreState({
              products: doc.data().products,
              categories: doc.data().categories,
            });
            //Dont need now
            // if (doc.data().transList) {
            //   setTransListState(doc.data().transList);
            // }
            //dont plz :)
            if (doc.data().wooCredentials) {
              setWoocommerceState(doc.data().wooCredentials);
            }
            if (doc.data().storeDetails) {
              setStoreDetailState(doc.data().storeDetails);
            }
          });
        setTimeout(() => {
          setloading(false);
        }, 1);
      } else {
        setUserState(null);
        setUserStoreState({ products: null, categories: null });
        setTimeout(() => {
          setloading(false);
        }, 1);
      }
    });
  }, []);

  useEffect(() => {
    if (userS) {
      const unsub = db
        .collection("users")
        .doc(userS.uid)
        .onSnapshot((doc) => {
          // setloading(true);
          setUserStoreState({
            products: doc.data().products,
            categories: doc.data().categories,
          });
          // if (doc.data().transList) {
          //   setTransListState(doc.data().transList);
          // }
          if (doc.data().wooCredentials) {
            setWoocommerceState(doc.data().wooCredentials);
          }
          if (doc.data().storeDetails) {
            setStoreDetailState(doc.data().storeDetails);
          }
          // setTimeout(() => {
          //   setloading(false);
          // }, 1);
        });
      return () => unsub();
    }
  }, [userS]);

  useEffect(() => {
    if (wooCredentials.useWoocommerce === true) {
      const interval = setInterval(() => {
        try {
          const WooCommerceAPI = require("woocommerce-api");

          const WooCommerce = new WooCommerceAPI({
            url: wooCredentials.apiUrl,
            consumerKey: wooCredentials.ck,
            consumerSecret: wooCredentials.cs,
            wpAPI: true,
            version: "wc/v1",
          });

          let page = 1;
          let orders = [];

          const getOrders = async () => {
            const response = await WooCommerce.getAsync(
              `orders?page=${page}&per_page=100`
            );
            const data = JSON.parse(response.body);
            orders = [...orders, ...data];
            if (data.length === 100) {
              page++;
              getOrders();
            } else {
              // console.log(orders);
            }
          };

          getOrders().then(() => {
            let array1 = localStorage.getItem("prevWooOrders");
            if (array1) {
              const array2 = orders;

              const newArray = [];

              let acc = [];

              if (Array.isArray(array1)) {
                array1.concat(array2).forEach((combinedItem) => {
                  if (!acc.includes(combinedItem.id)) {
                    acc.push(combinedItem.id);
                    newArray.push(combinedItem);
                  }
                });
              } else {
                JSON.parse(array1)
                  .concat(array2)
                  .forEach((combinedItem) => {
                    if (!acc.includes(combinedItem.id)) {
                      acc.push(combinedItem.id);
                      newArray.push(combinedItem);
                    }
                  });
              }
              // array1.concat(array2).forEach((combinedItem) => {
              //   if (!acc.includes(combinedItem.id)) {
              //     acc.push(combinedItem.id);
              //     newArray.push(combinedItem);
              //   }
              // });

              if (newArray.length > transList.length) {
                const newItems = structuredClone(newArray).splice(
                  transList.length,
                  newArray.length - transList.length
                );
                // updateTransList(newArray);
                localStorage.setItem("prevWooOrders", JSON.stringify(newArray));

                if (newItems.length > 1) {
                  newItems.forEach((e) => {
                    const printData = [];
                    const dateString = e.date_created;
                    const newDate = new Date(dateString + "Z");
                    const targetTimezone =
                      Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const resultDate = tz(newDate)
                      .tz(targetTimezone, true)
                      .format("dddd, MMMM Do YYYY, h:mm:ss a z");

                    printData.push(
                      "\x1B\x40", // init
                      "\x1B" + "\x61" + "\x31", // center align
                      storeDetails.name,
                      "\x0A",
                      storeDetails.address + "\x0A",
                      storeDetails.website + "\x0A", // text and line break
                      storeDetails.phoneNumber + "\x0A", // text and line break
                      resultDate + "\x0A",
                      "\x0A",
                      "Online Order" + "\x0A", // text and line break
                      `Transaction # ${e.number}` + "\x0A",
                      "\x0A",
                      "\x0A",
                      "\x0A",
                      "\x1B" + "\x61" + "\x30" // left align
                    );

                    e.line_items?.map((cartItem) => {
                      printData.push("\x0A");
                      printData.push(`Name: ${cartItem.name}`);
                      printData.push("\x0A");
                      printData.push(`Quantity: ${cartItem.quantity}`);
                      printData.push("\x0A");
                      printData.push(`Price: $${cartItem.price}`);
                      printData.push("\x0A");

                      if (cartItem.meta) {
                        cartItem.meta?.map((meta, index) => {
                          if (index === 0) {
                            printData.push(`${meta.key} : ${meta.value}`);
                            if (cartItem.meta[index + 1].key !== meta.key) {
                              printData.push("\x0A");
                            }
                          } else {
                            if (index !== cartItem.meta.length - 1) {
                              if (cartItem.meta[index - 1].key === meta.key) {
                                printData.push(` , ${meta.value}`);
                              } else {
                                printData.push(`${meta.key} : ${meta.value}`);
                              }

                              if (cartItem.meta[index + 1].key !== meta.key) {
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
                    printData.push(`Address: ${e.shipping.address_1}`);
                    printData.push("\x0A");
                    printData.push(`City: ${e.shipping.city}`);
                    printData.push("\x0A");
                    printData.push(`Zip/Postal Code: ${e.shipping.postcode}`);
                    printData.push("\x0A");
                    printData.push(`Province/State: ${e.shipping.state}`);
                    printData.push("\x0A");
                    printData.push(
                      `Name: ${e.shipping.first_name} ${e.shipping.last_name}`
                    );
                    printData.push("\x0A");
                    printData.push(`Phone Number: ${e.billing.phone}`);
                    printData.push("\x0A");
                    e.shipping_lines.map((line) =>
                      printData.push(`Shipping Method: ${line.method_title}`)
                    );
                    if (e.customer_note) {
                      printData.push(`Customer Note: ${e.customer_note}`);
                      printData.push("\x0A");
                    }
                    printData.push("\x0A");
                    printData.push("\x0A");

                    printData.push(
                      "\x0A",
                      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
                      "\x0A" + "\x0A",
                      "Payment Method: " +
                        e.payment_method_title +
                        "\x0A" +
                        "\x0A",
                      "Total Including (13% Tax): " +
                        "$" +
                        e.total +
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
                          "storeDetails.comSelected"
                        );
                        return qz.print(config, printData);
                      })
                      .then(qz.websocket.disconnect)
                      .catch(function (err) {
                        console.error(err);
                      });
                    // async () =>
                    //   await fetch("http://localhost:8080/print", {
                    //     method: "POST",
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify({
                    //       printData: printData,
                    //       comSelected: storeDetails.comSelected,
                    //     }),
                    //   })
                    //     .then((response) => response.json())
                    //     .then((respData) => {
                    //       console.log(respData);
                    //     })
                    //     .catch((e) => console.log("Error with printer"));
                  });
                } else {
                  const e = newItems[0];
                  const printData = [];
                  const dateString = e.date_created;
                  const newDate = new Date(dateString + "Z");
                  const targetTimezone =
                    Intl.DateTimeFormat().resolvedOptions().timeZone;
                  const resultDate = tz(newDate)
                    .tz(targetTimezone, true)
                    .format("dddd, MMMM Do YYYY, h:mm:ss a z");

                  printData.push(
                    "\x1B" + "\x40", // init
                    "\x1B" + "\x61" + "\x31", // center align
                    storeDetails.name,
                    "\x0A",
                    storeDetails.address + "\x0A",
                    storeDetails.website + "\x0A", // text and line break
                    storeDetails.phoneNumber + "\x0A", // text and line break
                    resultDate + "\x0A",
                    "\x0A",
                    "Online Order" + "\x0A", // text and line break
                    `Transaction # ${e.number}` + "\x0A",
                    "\x0A",
                    "\x0A",
                    "\x0A",
                    "\x1B" + "\x61" + "\x30" // left align
                  );

                  e.line_items?.map((cartItem) => {
                    printData.push("\x0A");
                    printData.push(`Name: ${cartItem.name}`);
                    printData.push("\x0A");
                    printData.push(`Quantity: ${cartItem.quantity}`);
                    printData.push("\x0A");
                    printData.push(`Price: $${cartItem.price}`);
                    printData.push("\x0A");

                    if (cartItem.meta) {
                      cartItem.meta?.map((meta, index) => {
                        if (index === 0) {
                          printData.push(`${meta.key} : ${meta.value}`);
                          if (cartItem.meta[index + 1].key !== meta.key) {
                            printData.push("\x0A");
                          }
                        } else {
                          if (index !== cartItem.meta.length - 1) {
                            if (cartItem.meta[index - 1].key === meta.key) {
                              printData.push(` , ${meta.value}`);
                            } else {
                              printData.push(`${meta.key} : ${meta.value}`);
                            }

                            if (cartItem.meta[index + 1].key !== meta.key) {
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
                  printData.push(`Address: ${e.shipping.address_1}`);
                  printData.push("\x0A");
                  printData.push(`City: ${e.shipping.city}`);
                  printData.push("\x0A");
                  printData.push(`Zip/Postal Code: ${e.shipping.postcode}`);
                  printData.push("\x0A");
                  printData.push(`Province/State: ${e.shipping.state}`);
                  printData.push("\x0A");
                  printData.push(
                    `Name: ${e.shipping.first_name} ${e.shipping.last_name}`
                  );
                  printData.push("\x0A");
                  printData.push(`Phone Number: ${e.billing.phone}`);
                  printData.push("\x0A");
                  e.shipping_lines.map((line) =>
                    printData.push(`Shipping Method: ${line.method_title}`)
                  );
                  if (e.customer_note) {
                    printData.push(`Customer Note: ${e.customer_note}`);
                    printData.push("\x0A");
                  }
                  printData.push("\x0A");
                  printData.push("\x0A");

                  printData.push(
                    "\x0A",
                    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
                    "\x0A" + "\x0A",
                    "Payment Method: " +
                      e.payment_method_title +
                      "\x0A" +
                      "\x0A",
                    "Total Including (13% Tax): " +
                      "$" +
                      e.total +
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
                        "storeDetails.comSelected"
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
              }
            } else {
              localStorage.setItem("prevWooOrders", JSON.stringify(orders));
            }
          });
        } catch {
          console.log("Error has occured with woocommerce");
        }
      }, 5000); // this will check for new orders every minute
      return () => clearInterval(interval);
    }
  }, [wooCredentials, transList]);

  const linking = {
    prefixes: [
      /* your linking prefixes */
    ],
    config: {
      screens: {
        Home: "",
        Features: "features",
        "About Us": "about-us",
        Pricing: "pricing",
        Faqs: "faqs",
        Contact: "contact",
        Login: "log-in",
        Signup: "sign-up",
        "Reset Password": "reset-password",
        "Latest Updates": "latest-updates",
        "Not Found": "*",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {loading ? (
        <Spinner isModalVisible={true} />
      ) : (
        <>{userS ? <MainAuthed /> : <MainNonAuth />}</>
      )}
    </NavigationContainer>
  );
};

export default RouteManager;
