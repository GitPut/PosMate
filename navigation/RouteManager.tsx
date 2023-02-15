import React, { useEffect, useRef, useState } from "react";
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
import useSound from "use-sound";
import mySound from "assets/alarm.mp3";
import PlanUpdateTest from "screens/authed/PlanUpdateTest";
import NewUserPayment from "screens/authed/NewUserPayment";
import { Animated, Image, Modal, View } from "react-native";

const RouteManager = () => {
  const savedUserState = JSON.parse(localStorage.getItem("savedUserState"));
  const userS = userState.use();
  const wooCredentials = woocommerceState.use();
  const storeDetails = storeDetailState.use();
  const [loading, setloading] = useState(true);
  const [playSound] = useSound(mySound);
  const [isNewUser, setisNewUser] = useState(null);
  const [isSubscribed, setisSubscribed] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [viewVisible, setviewVisible] = useState(true);

  useEffect(() => {
    setUserState(savedUserState ? savedUserState : null);
    auth.onAuthStateChanged((user) => {
      fadeAnim.setValue(1);
      setviewVisible(true);
      if (user) {
        localStorage.setItem("savedUserState", true);
        setUserState(user);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            doc.ref
              .collection("subscriptions")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  docs.forEach((element) => {
                    if (
                      element.data().status === "active" &&
                      element.data().role === "Test Plan"
                    ) {
                      setisSubscribed(true);
                      setisNewUser(false);
                    }
                    // console.log("DATA: ", element.data());
                  });
                } else {
                  setisNewUser(true);
                  setisSubscribed(false);
                }
              });
            setUserStoreState({
              products: doc.data().products ? doc.data().products : [],
              categories: doc.data().categories ? doc.data().categories : [],
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
      } else {
        localStorage.removeItem("savedUserState");
        setUserState(null);
        setUserStoreState({ products: null, categories: null });
        setisNewUser(false);
        setisSubscribed(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userS && isSubscribed) {
      const unsub = db
        .collection("users")
        .doc(userS.uid)
        .onSnapshot((doc) => {
          // setloading(true);
          setUserStoreState({
            products: doc.data().products ? doc.data().products : [],
            categories: doc.data().categories ? doc.data().categories : [],
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
  }, [userS, isSubscribed]);

  useEffect(() => {
    if (wooCredentials.useWoocommerce === true && isSubscribed) {
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

          getOrders()
            .then(() => {
              let array1 = localStorage.getItem("prevWooOrders");
              array1 = JSON.parse(array1);
              if (array1) {
                const array2 = orders;

                // console.log('prev: ', array1, ' New: ', orders, ' are the same? ', JSON.stringify(array1) === JSON.stringify(array2))

                const newArray = [];

                let acc = [];

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

                // if (Array.isArray(array1)) {
                //   array1.concat(array2).forEach((combinedItem) => {
                //     if (!acc.includes(combinedItem.id)) {
                //       acc.push(combinedItem.id);
                //       newArray.push(combinedItem);
                //     }
                //   });
                // } else {
                //   JSON.parse(array1)
                //     .concat(array2)
                //     .forEach((combinedItem) => {
                //       if (!acc.includes(combinedItem.id)) {
                //         acc.push(combinedItem.id);
                //         newArray.push(combinedItem);
                //       }
                //     });
                // }
                array1.concat(array2).forEach((combinedItem) => {
                  if (!acc.includes(combinedItem.id)) {
                    acc.push(combinedItem.id);
                    newArray.push(combinedItem);
                  }
                });
                if (newArray.length > array1.length) {
                  playSound();
                  const newItems = structuredClone(newArray).splice(
                    array1.length,
                    newArray.length - array1.length
                  );
                  // updateTransList(newArray);
                  localStorage.setItem(
                    "prevWooOrders",
                    JSON.stringify(newArray)
                  );

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
                        `Transaction ID ${e.number}` + "\x0A",
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
                          CleanupOps(cartItem.meta).map((returnedItem) => {
                            printData.push(`${returnedItem.key} : `);
                            printData.push("\x0A");
                            returnedItem.vals.map((val, index) => {
                              printData.push(`${val}`);
                              printData.push("\x0A");
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
                      e.shipping_lines.map((line) => {
                        printData.push(`Shipping Method: ${line.method_title}`);
                        printData.push("\x0A");
                      });
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
                            storeDetails.comSelected
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
                      `Transaction ID ${e.number}` + "\x0A",
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
                        CleanupOps(cartItem.meta).map((returnedItem) => {
                          printData.push(`${returnedItem.key} : `);
                          printData.push("\x0A");
                          returnedItem.vals.map((val, index) => {
                            printData.push(`${val}`);
                            printData.push("\x0A");
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
                    e.shipping_lines.map((line) => {
                      printData.push(`Shipping Method: ${line.method_title}`);
                      printData.push("\x0A");
                    });
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
                }
              } else {
                localStorage.setItem("prevWooOrders", JSON.stringify(orders));
              }
            })
            .catch((e) =>
              console.log("Error has occured when trying to get WooOrders")
            );
        } catch {
          console.log("Error has occured with woocommerce");
        }
      }, 5000); // this will check for new orders every minute
      return () => clearInterval(interval);
    }
  }, [wooCredentials, isSubscribed]);

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
        Legal: "legal",
        "Reset Password": "reset-password",
        "Latest Updates": "latest-updates",
        "Not Found": "*",
      },
    },
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setviewVisible(false));
  };

  useEffect(() => {
    if (isNewUser !== null && isSubscribed !== null) {
      //  setTimeout(() => setloading(false), 2);
      setloading(false);
      fadeOut();
    }
  }, [isNewUser, isSubscribed]);

  return (
    <NavigationContainer linking={linking}>
      {userS ? (
        <>
          {isSubscribed ? (
            <MainAuthed />
          ) : isNewUser ? (
            <NewUserPayment />
          ) : (
            <PlanUpdateTest />
          )}
          {viewVisible && (
            <Animated.View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                position: "absolute",
                opacity: fadeAnim,
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                source={require("assets/loading.gif")}
                style={{ width: 450, height: 450, resizeMode: "contain" }}
              />
            </Animated.View>
          )}
        </>
      ) : (
        <MainNonAuth />
      )}
    </NavigationContainer>
  );
};

export default RouteManager;
