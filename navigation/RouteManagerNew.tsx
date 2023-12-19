import React, { useEffect, useRef, useState } from "react";
import {
  setStoreDetailState,
  setTrialDetailsState,
  setUserState,
  setUserStoreState,
  setWoocommerceState,
  trialDetailsState,
  userState,
  woocommerceState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import { updateFreeTrial } from "state/firebaseFunctions";
const tz = require("moment-timezone");
import useSound from "use-sound";
import mySound from "assets/alarm.mp3";
import NewUserPayment from "screens/authed/NewUserPayment";
import { Animated, Image } from "react-native";
import * as Font from "expo-font";
import TrialEnded from "components/TrialEnded";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./authed/AuthRoute";
import NonAuthRoute from "./non-authed/NonAuthRoute";
import PrintOnlineOrder from "./PrintOnlineOrder";

const RouteManagerNew = () => {
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
  const [playSound] = useSound(mySound);
  const [wooOrders, setwooOrders] = useState([]);

  const [fontsLoaded] = Font.useFonts({
    "archivo-600": require("assets/fonts/Archivo-SemiBold.ttf"),
    "archivo-500": require("assets/fonts/Archivo-Regular.ttf"),
  });

  useEffect(() => {
    setUserState(savedUserState);

    const unsubscribeAuthStateChanged = auth.onAuthStateChanged((user) => {
      fadeAnim.setValue(1);
      setviewVisible(true);
      if (user) {
        localStorage.setItem("savedUserState", true);
        setUserState(user);

        let customers = localStorage.getItem("customers");
        if (customers) {
          customers = JSON.parse(customers);
        }

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            import("assets/plugins/fontawesome/css/fontawesome.min.css");
            import("assets/plugins/fontawesome/css/all.min.css");
            import("assets/css/bootstrap.min.css");
            import("assets/js/bootstrap.bundle.min.js");
            import("assets/css/font-awesome.min.css");
            import("assets/css/line-awesome.min.css");
            import("assets/css/style.css");

            // setUserStoreState({
            //   categories: doc.data().products ? doc.data().products : [],
            //   products: doc.data().categories ? doc.data().categories : [],
            // });

            setUserStoreState({
              products: doc.data().products ? doc.data().products : [],
              categories: doc.data().categories ? doc.data().categories : [],
            });

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
                    // if (!element.data().printed) {
                    //   //print order because it hasnt been printed
                    //   //After printing, set printed to true
                    // }
                    setwooOrders((prev) => [...prev, element.data()]);
                  });
                }
              })
              .catch(() => console.log("Error has occured with db"));

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
                    // console.log("DATA: ", element.data());
                  });
                } else if (doc.data().freeTrial) {
                  setisSubscribed(true);
                  setisNewUser(false);
                } else {
                  setisNewUser(true);
                  setisSubscribed(false);
                }
              })
              .catch(() => console.log("Error has occured with db"));

            doc.ref
              .collection("customers")
              .get()
              .then((docs) => {
                const newCustomerList = [];

                docs.forEach((element) => {
                  newCustomerList.push({ ...element.data(), id: element.id });
                });

                if (
                  JSON.stringify(customers) !== JSON.stringify(newCustomerList)
                ) {
                  localStorage.setItem(
                    "customers",
                    JSON.stringify(newCustomerList)
                  );
                }
              })
              .catch(() => console.log("Error has occured with db"));

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

            const unsub = db
              .collection("users")
              .doc(user.uid)
              .onSnapshot((doc) => {
                // console.log("data updated in firebase");
                setUserStoreState({
                  products: doc.data()?.products || [],
                  categories: doc.data()?.categories || [],
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

            return () => unsub();
          })
          .catch(() => console.log("Error has occured with db"));
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

  useEffect(() => {
    if (wooCredentials.useWoocommerce === true && isSubscribed) {
      // console.log("USING WOOCOMMERCE");
      const interval = setInterval(() => {
        try {
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
              orders.forEach((order) => {
                let orderIndex;

                if (wooOrders.length > 0) {
                  orderIndex = wooOrders.findIndex((e) => e.id === order.id);
                  // console.log("orderIndex: ", orderIndex);
                } else {
                  orderIndex = -1;
                  // console.log("Order not found");
                }

                if (orderIndex === -1) {
                  db.collection("users")
                    .doc(userS.uid)
                    .collection("wooOrders")
                    .doc(order.id.toString())
                    .set({ ...order, printed: true })
                    .then(() => {
                      // console.log("order added to db");
                      playSound();
                      PrintOnlineOrder(order);
                      setwooOrders((prev) => [...prev, order]);
                    })
                    .catch((e) =>
                      console.log("Error has occured with db: ", e)
                    );
                } else if (!wooOrders[orderIndex].printed) {
                  db.collection("users")
                    .doc(userS.uid)
                    .collection("wooOrders")
                    .doc(order.id.toString())
                    .update({ printed: true })
                    .then(() => {
                      // console.log("order updated in db");
                      playSound();
                      PrintOnlineOrder(order);
                      setwooOrders((prev) => {
                        const newOrders = [...prev];
                        newOrders[orderIndex].printed = true;
                        return newOrders;
                      });
                    })
                    .catch((e) =>
                      console.log("Error has occured with db: ", e)
                    );
                }
              });
            })
            .catch((e) =>
              console.log("Error has occured when trying to get WooOrders: ", e)
            );
        } catch {
          console.log("Error has occured with woocommerce");
        }
      }, 10000); // this will check for new orders every minute
      return () => clearInterval(interval);
    }
  }, [wooCredentials, isSubscribed]);

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
      </>
    );
  };

  return (
    <Router>
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

export default RouteManagerNew;
