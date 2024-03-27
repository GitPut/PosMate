import React, { useEffect, useRef, useState } from "react";
import {
  myDeviceDetailsState,
  setCustomersList,
  setDeviceIdState,
  setDeviceTreeState,
  setEmployeesState,
  setMyDeviceDetailsState,
  setOnlineStoreState,
  setStoreDetailState,
  setTrialDetailsState,
  setUserState,
  setUserStoreState,
  setWoocommerceState,
  storeDetailState,
  trialDetailsState,
  userState,
  woocommerceState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import { logout, updateFreeTrial } from "state/firebaseFunctions";
const tz = require("moment-timezone");
import NewUserPayment from "components/modals/NewUserPayment";
import { Animated, Image } from "react-native";
import * as Font from "expo-font";
import TrialEnded from "components/modals/TrialEnded";
const qz = require("qz-tray");

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./authed/AuthRoute";
import NonAuthRoute from "./non-authed/NonAuthRoute";
import useInterval from "components/functional/useInterval";
import ScrollToTop from "components/functional/ScrollToTop";
import PaymentUpdateNotification from "components/modals/PaymentUpdateNotification";

const RouteManager = () => {
  const savedUserState = JSON.parse(localStorage.getItem("savedUserState"));
  const userS = userState.use();
  const [loading, setloading] = useState(true);
  const [isNewUser, setisNewUser] = useState(null);
  const [isSubscribed, setisSubscribed] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [viewVisible, setviewVisible] = useState(true);
  const [isCanceled, setisCanceled] = useState(null);
  const trialDetails = trialDetailsState.use();
  const wooCredentials = woocommerceState.use();
  const [wooOrders, setwooOrders] = useState([]);
  const storeDetails = storeDetailState.use();
  const [isWooError, setisWooError] = useState(false);
  const myDeviceDetails = myDeviceDetailsState.use();

  useEffect(() => {
    if (myDeviceDetails.docID && userS) {
      console.log("Listening for print requests");
      db.collection("users")
        .doc(userS.uid)
        .collection("devices")
        .doc(myDeviceDetails.docID)
        .collection("printRequests")
        .onSnapshot((snapshot) => {
          if (snapshot.empty) return;

          snapshot.forEach((doc) => {
            // console.log("Data to print recieved: ", doc.data().printData);

            const qz = require("qz-tray");
            qz.websocket
              .connect()
              .then(function () {
                const config = qz.configs.create(
                  myDeviceDetails.printToPrinter
                );
                return qz.print(config, doc.data().printData);
              })
              .then(qz.websocket.disconnect)
              .catch(function (err) {
                // console.error(err);
                alert(
                  "An error occured while trying to print. Try refreshing the page and trying again."
                );
              });
            //print then delete

            db.collection("users")
              .doc(userS.uid)
              .collection("devices")
              .doc(myDeviceDetails.docID)
              .collection("printRequests")
              .doc(doc.id)
              .delete();
          });
        });
    }
  }, [myDeviceDetails, userS]);

  const customSort = (a, b) => {
    // Handle cases where one or both items don't have a rank
    const rankA = a.rank || Number.MAX_SAFE_INTEGER;
    const rankB = b.rank || Number.MAX_SAFE_INTEGER;

    // Compare based on ranks
    return rankA - rankB;
  };

  useEffect(() => {
    setUserState(savedUserState);

    const unsubscribeAuthStateChanged = auth.onAuthStateChanged((user) => {
      fadeAnim.setValue(1);
      setviewVisible(true);
      if (user) {
        localStorage.setItem("savedUserState", true);
        setUserState(user);

        // let customers = localStorage.getItem("customers");
        // if (customers) {
        //   customers = JSON.parse(customers);
        // }

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            const products = [];
            let extraDevicesPayingFor = 0;

            doc.ref
              .collection("products")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  docs.forEach((element) => {
                    products.push(element.data());
                  });
                  products.sort(customSort);
                }
              })
              .catch((e) =>
                console.log("Error has occured with db products: ", e)
              );

            setUserStoreState({
              products: products.sort(customSort),
              categories: doc.data().categories ? doc.data().categories : [],
            });

            // setOnlineStoreState({
            //   urlEnding: doc.data().urlEnding,
            //   onlineStoreActive: doc.data().onlineStoreActive,
            //   onlineStoreSetUp: doc.data().onlineStoreSetUp,
            //   stripePublicKey: doc.data().stripePublicKey,
            //   stripeSecretKey: doc.data().stripeSecretKey,
            // });

            if (doc.data().wooCredentials) {
              setWoocommerceState(doc.data().wooCredentials);
            }
            if (doc.data().storeDetails) {
              setStoreDetailState(doc.data().storeDetails);
            }

            doc.ref
              .collection("wooOrders")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  docs.forEach((element) => {
                    setwooOrders((prev) => [...prev, element.data()]);
                  });
                }
              })
              .catch((e) =>
                console.log("Error has occured with db wooorders: ", e)
              );

            doc.ref
              .collection("employees")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  const localEmployees = [];
                  docs.forEach((element) => {
                    localEmployees.push(element.data());
                  });
                  setEmployeesState(localEmployees);
                }
              })
              .catch((e) =>
                console.log("Error has occured with db employees: ", e)
              );

            doc.ref
              .collection("subscriptions")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  docs.forEach((element) => {
                    if (element.data().role === "Test Plan") {
                      if (element.data().status === "active") {
                        setisSubscribed(true);
                        setisNewUser(false);
                        if (doc.data().freeTrial) {
                          setTrialDetailsState({
                            endDate: null,
                            hasEnded: null,
                          });
                          updateFreeTrial(null);
                        }
                      } else if (element.data().status === "canceled") {
                        setisSubscribed(false);
                        setisNewUser(false);
                        setisCanceled(true);
                      } else {
                        setisSubscribed(false);
                        setisNewUser(false);
                      }
                    }

                    //if they are subscribed to pos plan
                    if (element.data().role === "Pos Software Plan") {
                      if (element.data().status === "active") {
                        setisSubscribed(true);
                        setisNewUser(false);
                        if (doc.data().freeTrial) {
                          setTrialDetailsState({
                            endDate: null,
                            hasEnded: null,
                          });
                          updateFreeTrial(null);
                        }
                      } else if (element.data().status === "canceled") {
                        setisSubscribed(false);
                        setisNewUser(false);
                        setisCanceled(true);
                      } else {
                        setisSubscribed(false);
                        setisNewUser(false);
                      }
                    }

                    //if they are subscribed to online store
                    if (element.data().role === "Online Store") {
                      if (element.data().status === "active") {
                        setOnlineStoreState({
                          urlEnding: doc.data().urlEnding,
                          onlineStoreActive: doc.data().onlineStoreActive,
                          onlineStoreSetUp: doc.data().onlineStoreSetUp,
                          stripePublicKey: doc.data().stripePublicKey,
                          stripeSecretKey: doc.data().stripeSecretKey,
                          paidStatus: "active",
                        });
                      } else if (element.data().status === "canceled") {
                        db.collection("users")
                          .doc(auth.currentUser.uid)
                          .update({
                            onlineStoreActive: false,
                          });
                        db.collection("public")
                          .doc(auth.currentUser.uid)
                          .update({
                            onlineStoreActive: false,
                          });
                        setOnlineStoreState({
                          urlEnding: doc.data().urlEnding,
                          onlineStoreActive: false,
                          onlineStoreSetUp: doc.data().onlineStoreSetUp,
                          stripePublicKey: doc.data().stripePublicKey,
                          stripeSecretKey: doc.data().stripeSecretKey,
                          paidStatus: "canceled",
                        });
                      } else {
                        db.collection("users")
                          .doc(auth.currentUser.uid)
                          .update({
                            onlineStoreActive: false,
                          });
                        db.collection("public")
                          .doc(auth.currentUser.uid)
                          .update({
                            onlineStoreActive: false,
                          });
                        setOnlineStoreState({
                          urlEnding: doc.data().urlEnding,
                          onlineStoreActive: false,
                          onlineStoreSetUp: doc.data().onlineStoreSetUp,
                          stripePublicKey: doc.data().stripePublicKey,
                          stripeSecretKey: doc.data().stripeSecretKey,
                          paidStatus: null,
                        });
                      }
                    }
                  });
                  const devicesAmount = docs.docs.filter(
                    (e) =>
                      e.data().role === "Extra Device" &&
                      e.data().status === "active"
                  ).length;
                  extraDevicesPayingFor = devicesAmount;
                } else if (doc.data().freeTrial) {
                  setisSubscribed(true);
                  setisNewUser(false);
                } else {
                  setisNewUser(true);
                  setisSubscribed(false);
                }
              })
              .catch(() =>
                console.log("Error has occured with db extra devices")
              );

            doc.ref
              .collection("customers")
              .get()
              .then((docs) => {
                const newCustomerList = [];

                docs.forEach((element) => {
                  newCustomerList.push({ ...element.data(), id: element.id });
                });

                setCustomersList(newCustomerList);
              })
              .catch((e) =>
                console.log("Error has occured with db customers: ", e)
              );

            if (doc.data().freeTrial) {
              setisNewUser(false);
              const firstDate = new Date(doc.data().freeTrial.seconds * 1000);
              const today = new Date();
              if (firstDate <= today) {
                setTrialDetailsState({
                  endDate: doc.data().freeTrial,
                  hasEnded: true,
                });
              } else {
                setTrialDetailsState({
                  endDate: doc.data().freeTrial,
                  hasEnded: false,
                });
              }
            }

            function getCookie(name) {
              const match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
              );
              if (match) return match[2];
            }

            const deviceID = getCookie("deviceID");

            if (!deviceID) {
              // Generate a random device ID
              const yourDeviceID =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);

              // Set a cookie
              document.cookie = `deviceID=${yourDeviceID}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

              setDeviceIdState(yourDeviceID);
            } else {
              setDeviceIdState(deviceID);
            }

            doc.ref
              .collection("devices")
              .get()
              .then((docs) => {
                const devices = [];

                docs.forEach((element) => {
                  devices.push({ ...element.data(), docID: element.id });
                  if (element.data().id === deviceID) {
                    console.log("found device: ", element.data());
                    setMyDeviceDetailsState({
                      ...element.data(),
                      docID: element.id,
                    });
                  }
                });

                setDeviceTreeState({ devices: devices, extraDevicesPayingFor });
              });

            const unsub = db
              .collection("users")
              .doc(user.uid)
              .onSnapshot((doc) => {
                setUserStoreState({
                  products: products.sort(customSort),
                  categories: doc.data().categories
                    ? doc.data().categories
                    : [],
                });
                if (doc.data().wooCredentials) {
                  setWoocommerceState(doc.data().wooCredentials);
                }
                if (doc.data().storeDetails) {
                  setStoreDetailState(doc.data().storeDetails);
                }
              });

            setloading(false);
            fadeOut();

            return () => {
              unsub();
            };
          })
          .catch((e) => console.log("Error has occured with db users: ", e));
      } else {
        localStorage.removeItem("savedUserState");
        setUserState(null);
        setUserStoreState({ products: null, categories: null });
        setisNewUser(false);
        setisSubscribed(false);
        setloading(false);
      }
    });

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [savedUserState]);

  useInterval(() => {
    if (
      wooCredentials.useWoocommerce &&
      isSubscribed &&
      !isWooError &&
      myDeviceDetails.printOnlineOrders
    ) {
      const WooCommerceAPI = require("woocommerce-api");

      const WooCommerce = new WooCommerceAPI({
        url: wooCredentials.apiUrl,
        consumerKey: wooCredentials.ck,
        consumerSecret: wooCredentials.cs,
        wpAPI: true,
        version: "wc/v3",
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
          //console.log("WOO ORDERS: ", orders);
        }
        // console.log("WOO ORDERS: ", orders);
      };

      getOrders()
        .then(() => {
          if (JSON.stringify(orders) === JSON.stringify(wooOrders)) return;
          for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            let orderIndex;
            if (wooOrders.length > 0) {
              orderIndex = wooOrders.findIndex((e) => e.id === order.id);
            } else {
              orderIndex = -1;
            }

            if (orderIndex === -1 || !wooOrders[orderIndex].printed) {
              if (orderIndex === -1) {
                db.collection("users")
                  .doc(userS.uid)
                  .collection("wooOrders")
                  .doc(order.id.toString())
                  .set({ ...order, printed: true })
                  .then(() => {
                    setwooOrders((prev) => [
                      ...prev,
                      { ...order, printed: true },
                    ]);
                    wooOrders.push({ ...order, printed: true });
                  })
                  .catch((e) =>
                    console.log(
                      "Error has occured with db wooOrders print: ",
                      e
                    )
                  );
              } else {
                db.collection("users")
                  .doc(userS.uid)
                  .collection("wooOrders")
                  .doc(order.id.toString())
                  .update({ printed: true })
                  .then(() => {
                    setwooOrders((prev) => {
                      const newOrders = [...prev];
                      newOrders[orderIndex].printed = true;
                      return newOrders;
                    });
                    wooOrders[index].printed = true;
                  })
                  .catch((e) =>
                    console.log(
                      "Error has occured with db wooOrder print second if: ",
                      e
                    )
                  );
              }

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

              const printData = [];
              const dateString = order.date_created;
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
                storeDetails.address?.label + "\x0A",
                storeDetails.website + "\x0A", // text and line break
                storeDetails.phoneNumber + "\x0A", // text and line break
                resultDate + "\x0A",
                "\x0A",
                "Online Order" + "\x0A", // text and line break
                `Transaction ID ${order.number}` + "\x0A",
                "\x0A",
                "\x0A",
                "\x0A",
                "\x1B" + "\x61" + "\x30" // left align
              );

              order.line_items?.map((cartItem) => {
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
                      if (index >= 0 && index < returnedItem.vals.length - 1) {
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
              printData.push(`Address: ${order.shipping.address_1}`);
              printData.push("\x0A");
              printData.push(`City: ${order.shipping.city}`);
              printData.push("\x0A");
              printData.push(`Zip/Postal Code: ${order.shipping.postcode}`);
              printData.push("\x0A");
              printData.push(`Province/State: ${order.shipping.state}`);
              printData.push("\x0A");
              printData.push(
                `Name: ${order.shipping.first_name} ${order.shipping.last_name}`
              );
              printData.push("\x0A");
              printData.push(`Phone Number: ${order.billing.phone}`);
              printData.push("\x0A");
              order.shipping_lines.map((line) => {
                printData.push(`Shipping Method: ${line.method_title}`);
                printData.push("\x0A");
              });
              if (order.customer_note) {
                printData.push(`Customer Note: ${order.customer_note}`);
                printData.push("\x0A");
              }
              printData.push("\x0A");
              printData.push("\x0A");

              printData.push(
                "\x0A",
                "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
                "\x0A" + "\x0A",
                "Payment Method: " +
                  order.payment_method_title +
                  "\x0A" +
                  "\x0A",
                `Total Including (${
                  storeDetails.taxRate ? storeDetails.taxRate : "13"
                }% Tax): ` +
                  "$" +
                  order.total +
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

              const doublePrint = printData.concat(printData);

              qz.websocket
                .connect()
                .then(function () {
                  const config = qz.configs.create(
                    myDeviceDetails.printToPrinter
                  );
                  return qz.print(config, doublePrint);
                })
                .then(qz.websocket.disconnect)
                .catch(function (err) {
                  // console.error(err);
                  alert(
                    "An error occured while trying to print. Try refreshing the page and trying again."
                  );
                });
            }
          }
        })
        .catch((e) => {
          console.log("Error has occured when trying to get WooOrders: ", e);
          alert(
            "There was an error connecting to your woocommerce store. Please refresh the page to try again."
          );
          setisWooError(true);
        });
    }
  }, 10000);

  const fadeIn = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setviewVisible(false));
  };

  const resetLoader = () => {
    setviewVisible(true);
    fadeIn();
  };

  const NavigationContent = () => {
    return (
      <>
        {isSubscribed && <Route path="/" component={AuthRoute} />}
        {trialDetails.hasEnded && <TrialEnded resetLoader={resetLoader} />}
        {isNewUser && <NewUserPayment resetLoader={resetLoader} />}
        {isCanceled && !isSubscribed && !isNewUser && (
          <PaymentUpdateNotification
            resetLoader={resetLoader}
            isCanceled={isCanceled}
          />
        )}
      </>
    );
  };

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        {userS && (
          <>
            <NavigationContent />
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
                  // source={require("assets/divinepos-loading.gif")}
                  style={{ width: 450, height: 450, resizeMode: "contain" }}
                />
              </Animated.View>
            )}
          </>
        )}
        {!userS && !loading && <Route path="/" component={NonAuthRoute} />}
      </Switch>
    </Router>
  );
};

export default RouteManager;
