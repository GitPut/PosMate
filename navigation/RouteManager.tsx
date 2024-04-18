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
import { updateFreeTrial } from "state/firebaseFunctions";
import { Animated, Image, View } from "react-native";
import TrialEnded from "components/UserPaymentScreens/TrialEnded/TrialEnded";
import qz from "qz-tray";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./authed/AuthRoute";
import NonAuthRoute from "./non-authed/NonAuthRoute";
import ScrollToTop from "components/functional/ScrollToTop";
import PaymentUpdateNotification from "components/UserPaymentScreens/PaymentDeclined/PaymentUpdateNotification";
import { useAlert } from "react-alert";
import NewUserPayment from "components/UserPaymentScreens/NewUserPayment/NewUserPayment";
import Modal from "react-native-modal-web";

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
  const alertP = useAlert();

  useEffect(() => {
    if (myDeviceDetails.docID && userS) {
      // console.log("Listening for print requests");
      db.collection("users")
        .doc(userS.uid)
        .collection("devices")
        .doc(myDeviceDetails.docID)
        .collection("printRequests")
        .onSnapshot((snapshot) => {
          if (snapshot.empty) return;

          snapshot.forEach((doc) => {
            qz.websocket
              .connect()
              .then(function () {
                const config = qz.configs.create(
                  myDeviceDetails.printToPrinter
                );
                return qz.print(config, doc.data()?.printData);
              })
              .then(qz.websocket.disconnect)
              .catch(function (err) {
                if (
                  err.message.includes(
                    "A printer must be specified before printing"
                  )
                ) {
                  alertP.error("You must specify a printer in device settings");
                } else if (
                  err.message.includes("Unable to establish connection with QZ")
                ) {
                  alertP.error(
                    "You do not have Divine POS Helper installed. Please download from general settings"
                  );
                } else if (
                  err.message.includes("Cannot find printer with name")
                ) {
                  alertP.error(
                    "Printer not found. Please check your printer settings."
                  );
                } else {
                  alertP.error(
                    "An error occured while trying to print. Try refreshing the page and trying again."
                  );
                }
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
              categories: doc.data()?.categories ? doc.data()?.categories : [],
            });

            // setOnlineStoreState({
            //   urlEnding: doc.data()?.urlEnding,
            //   onlineStoreActive: doc.data()?.onlineStoreActive,
            //   onlineStoreSetUp: doc.data()?.onlineStoreSetUp,
            //   stripePublicKey: doc.data()?.stripePublicKey,
            //   stripeSecretKey: doc.data()?.stripeSecretKey,
            // });

            if (doc.data()?.wooCredentials) {
              setWoocommerceState(doc.data()?.wooCredentials);
            }
            if (doc.data()?.storeDetails) {
              setStoreDetailState(doc.data()?.storeDetails);
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
                        if (doc.data()?.freeTrial) {
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
                        if (doc.data()?.freeTrial) {
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
                    if (element.data().role === "Premium Plan") {
                      if (element.data().status === "active") {
                        setisSubscribed(true);
                        setisNewUser(false);
                        setOnlineStoreState({
                          urlEnding: doc.data()?.urlEnding,
                          onlineStoreActive: doc.data()?.onlineStoreActive,
                          onlineStoreSetUp: doc.data()?.onlineStoreSetUp,
                          stripePublicKey: doc.data()?.stripePublicKey,
                          stripeSecretKey: doc.data()?.stripeSecretKey,
                          paidStatus: "active",
                        });
                        extraDevicesPayingFor += 1;
                        if (doc.data()?.freeTrial) {
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
                          urlEnding: doc.data()?.urlEnding,
                          onlineStoreActive: doc.data()?.onlineStoreActive,
                          onlineStoreSetUp: doc.data()?.onlineStoreSetUp,
                          stripePublicKey: doc.data()?.stripePublicKey,
                          stripeSecretKey: doc.data()?.stripeSecretKey,
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
                          urlEnding: doc.data()?.urlEnding,
                          onlineStoreActive: false,
                          onlineStoreSetUp: doc.data()?.onlineStoreSetUp,
                          stripePublicKey: doc.data()?.stripePublicKey,
                          stripeSecretKey: doc.data()?.stripeSecretKey,
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
                          urlEnding: doc.data()?.urlEnding,
                          onlineStoreActive: false,
                          onlineStoreSetUp: doc.data()?.onlineStoreSetUp,
                          stripePublicKey: doc.data()?.stripePublicKey,
                          stripeSecretKey: doc.data()?.stripeSecretKey,
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
                } else if (doc.data()?.freeTrial) {
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

            if (doc.data()?.freeTrial) {
              setisNewUser(false);
              const firstDate = new Date(doc.data()?.freeTrial.seconds * 1000);
              const today = new Date();
              if (firstDate <= today) {
                setTrialDetailsState({
                  endDate: doc.data()?.freeTrial,
                  hasEnded: true,
                });
              } else {
                setTrialDetailsState({
                  endDate: doc.data()?.freeTrial,
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
                    // console.log("found device: ", element.data());
                    setMyDeviceDetailsState({
                      ...element.data(),
                      docID: element.id,
                    });
                  }
                });

                //tonys uid for extra devices
                // console.log("USER UID ", user.uid);
                if (user.uid == "J6rAf2opwnSKAhefbOZW6HJdx1h2") {
                  // console.log("Matches uid");
                  extraDevicesPayingFor = 3;
                }

                setDeviceTreeState({ devices: devices, extraDevicesPayingFor });
              });

            const unsub = db
              .collection("users")
              .doc(user.uid)
              .onSnapshot((doc) => {
                setUserStoreState({
                  products: products.sort(customSort),
                  categories: doc.data()?.categories
                    ? doc.data()?.categories
                    : [],
                });
                if (doc.data()?.wooCredentials) {
                  setWoocommerceState(doc.data()?.wooCredentials);
                }
                if (doc.data()?.storeDetails) {
                  setStoreDetailState(doc.data()?.storeDetails);
                }
              });

            setloading(false);
            setviewVisible(false);

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

  const resetLoader = () => {
    setviewVisible(true);
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
            <Modal
              isVisible={viewVisible}
              animationIn="fadeIn"
              animationOut="fadeOut"
              style={{
                margin: 0,
              }}
              backdropOpacity={0}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Image
                  source={require("assets/loading.gif")}
                  // source={require("assets/divinepos-loading.gif")}
                  style={{ width: 450, height: 450, resizeMode: "contain" }}
                />
              </View>
            </Modal>
          </>
        )}
        {!userS && !loading && <Route path="/" component={NonAuthRoute} />}
      </Switch>
    </Router>
  );
};

export default RouteManager;
