import React, { Suspense, useEffect, useRef, useState } from "react";
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
  setUserStoreState,
  trialDetailsState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import { updateFreeTrial } from "state/firebaseFunctions";
import { Animated, Image, View } from "react-native";
import qz from "qz-tray";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NonAuthRoute from "./non-authed/NonAuthRoute";
import ScrollToTop from "components/functional/ScrollToTop";
import { useAlert } from "react-alert";
import { CustomerProp, Device, Employee, ProductProp } from "types/global";
import * as Font from "expo-font";
import {
  Feather,
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
const NavigationContent = React.lazy(() => import("./NavigationContent"));

const Loader = () => {
  return (
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
        style={{ width: 450, height: 450, resizeMode: "contain" }}
        key={"loading"}
      />
    </View>
  );
};

const RouteManager = () => {
  const savedUserState = JSON.parse(
    localStorage.getItem("savedUserState") as string
  );
  const [loading, setloading] = useState<boolean | null>(true);
  const [isNewUser, setisNewUser] = useState<boolean | null>(null);
  const [isSubscribed, setisSubscribed] = useState<boolean | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [viewVisible, setviewVisible] = useState<boolean>(true);
  const [isCanceled, setisCanceled] = useState<boolean | null>(null);
  const trialDetails = trialDetailsState.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function preloadFonts() {
    await Font.loadAsync({
      // Load Feather and other fonts you use here
      ...Feather.font,
      ...Entypo.font,
      ...MaterialIcons.font,
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
      ...FontAwesome.font,
      ...SimpleLineIcons.font,
    });
  }

  useEffect(() => {
    async function loadFonts() {
      await preloadFonts();
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    if (myDeviceDetails.docID && auth.currentUser) {
      // console.log("Listening for print requests");
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("devices")
        .doc(myDeviceDetails.docID)
        .collection("printRequests")
        .onSnapshot((snapshot) => {
          if (snapshot.empty) return;

          snapshot.forEach((doc) => {
            qz.websocket
              .connect()
              .then(function () {
                if (!myDeviceDetails.printToPrinter) {
                  alertP.error("You must specify a printer in device settings");
                  return;
                }
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

            if (!myDeviceDetails.docID) return;

            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("devices")
              .doc(myDeviceDetails.docID)
              .collection("printRequests")
              .doc(doc.id)
              .delete();
          });
        });
    }
  }, [myDeviceDetails]);

  const customSort = (a: ProductProp, b: ProductProp) => {
    // Handle cases where one or both items don't have a rank
    const rankA = parseInt(a.rank ?? "0") || Number.MAX_SAFE_INTEGER;
    const rankB = parseInt(b.rank ?? "0") || Number.MAX_SAFE_INTEGER;

    // Compare based on ranks
    return rankA - rankB;
  };

  useEffect(() => {
    const unsubscribeAuthStateChanged = auth.onAuthStateChanged((user) => {
      fadeAnim.setValue(1);
      setviewVisible(true);
      if (user) {
        localStorage.setItem("savedUserState", "true");

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            let extraDevicesPayingFor = 0;
            const products: ProductProp[] = [];

            doc.ref
              .collection("products")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  docs.forEach((element) => {
                    const productData = element.data();

                    products.push({
                      ...productData,
                      name: productData.name,
                      price: productData.price,
                      description: productData.description,
                      options: productData.options,
                      id: productData.id,
                    });
                  });
                }
              })
              .catch(() =>
                // console.log("Error has occured with db products: ", e)
                alertP.error(
                  "An error has occured with starting up the app. Please refresh the page."
                )
              );

            setUserStoreState({
              products: products.sort(customSort),
              categories: doc.data()?.categories ? doc.data()?.categories : [],
            });

            if (doc.data()?.storeDetails) {
              setStoreDetailState(doc.data()?.storeDetails);
            }

            doc.ref
              .collection("employees")
              .get()
              .then((docs) => {
                if (!docs.empty) {
                  const localEmployees: Employee[] = [];
                  docs.forEach((element) => {
                    const employeeData = element.data();

                    localEmployees.push({
                      ...employeeData,
                      name: employeeData.name,
                      pin: employeeData.pin,
                      id: employeeData.id,
                    });
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
                          .doc(auth.currentUser?.uid)
                          .update({
                            onlineStoreActive: false,
                          });
                        db.collection("public")
                          .doc(auth.currentUser?.uid)
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
                          .doc(auth.currentUser?.uid)
                          .update({
                            onlineStoreActive: false,
                          });
                        db.collection("public")
                          .doc(auth.currentUser?.uid)
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
                // console.log("Error has occured with db extra devices")
                alertP.error(
                  "An error has occured with starting up the app. Please refresh the page."
                )
              );

            doc.ref
              .collection("customers")
              .get()
              .then((docs) => {
                const newCustomerList: CustomerProp[] = [];

                docs.forEach((element) => {
                  const customerData = element.data();

                  newCustomerList.push({
                    ...element.data(),
                    name: customerData.name,
                    phone: customerData.phone,
                    address: customerData.address,
                    buzzCode: customerData.buzzCode,
                    unitNumber: customerData.unitNumber,
                    orders: customerData.orders,
                    id: element.id,
                  });
                });

                setCustomersList(newCustomerList);
              })
              .catch(() =>
                // console.log("Error has occured with db customers: ", e)
                alertP.error(
                  "An error has occured with starting up the app. Please refresh the page."
                )
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

            function getCookie(name: string) {
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
                const devices: Device[] = [];

                docs.forEach((element) => {
                  const deviceData = element.data();

                  devices.push({
                    ...element.data(),
                    name: deviceData.name,
                    id: deviceData.id,
                    docID: element.id,
                    useDifferentDeviceToPrint:
                      deviceData.useDifferentDeviceToPrint,
                    printToPrinter: deviceData.printToPrinter,
                    sendPrintToUserID: deviceData.sendPrintToUserID,
                    printOnlineOrders: deviceData.printOnlineOrders,
                  });

                  if (element.data().id === deviceID) {
                    setMyDeviceDetailsState({
                      ...element.data(),
                      name: deviceData.name,
                      id: deviceData.id,
                      docID: element.id,
                      useDifferentDeviceToPrint:
                        deviceData.useDifferentDeviceToPrint,
                      printToPrinter: deviceData.printToPrinter,
                      sendPrintToUserID: deviceData.sendPrintToUserID,
                      printOnlineOrders: deviceData.printOnlineOrders,
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

            // const unsub = db
            //   .collection("users")
            //   .doc(user.uid)
            //   .onSnapshot((updatedDoc) => {
            //     const updatedProducts: ProductProp[] = [];

            //     updatedDoc.ref
            //       .collection("products")
            //       .get()
            //       .then((updatedProductDocs) => {
            //         if (!updatedProductDocs.empty) {
            //           updatedProductDocs.forEach((element) => {
            //             const productData = element.data();

            //             updatedProducts.push({
            //               ...productData,
            //               name: productData.name,
            //               price: productData.price,
            //               description: productData.description,
            //               options: productData.options,
            //               id: productData.id,
            //             });
            //           });
            //           updatedProducts.sort(customSort);
            //         }
            //       })
            //       .catch(() =>
            //         // console.log("Error has occured with db products: ", e)
            //         alertP.error(
            //           "An error has occured with starting up the app. Please refresh the page."
            //         )
            //       );

            //     setUserStoreState({
            //       products: updatedProducts.sort(customSort),
            //       categories: updatedDoc.data()?.categories
            //         ? updatedDoc.data()?.categories
            //         : [],
            //     });
            //     // if (updatedDoc.data()?.wooCredentials) {
            //     //   setWoocommerceState(updatedDoc.data()?.wooCredentials);
            //     // }
            //     if (updatedDoc.data()?.storeDetails) {
            //       setStoreDetailState(updatedDoc.data()?.storeDetails);
            //     }
            //   });

            setloading(false);
            setviewVisible(false);

            // return () => {
            //   unsub();
            // };
          })
          .catch(() => {
            // console.log("Error has occured with db users: ", e)
            alertP.error(
              "An error has occured with starting up the app. Please refresh the page."
            );
          });
      } else {
        localStorage.removeItem("savedUserState");
        setUserStoreState({ products: [], categories: [] });
        setisNewUser(false);
        setisSubscribed(false);
        setloading(false);
        setviewVisible(false);
      }
    });

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [savedUserState]);

  const resetLoader = () => {
    setviewVisible(true);
  };

  return (
    <Router>
      <ScrollToTop />
      {/* <Switch> */}
      {auth.currentUser && (
        <Suspense fallback={<Loader />}>
          <NavigationContent
            resetLoader={resetLoader}
            isNewUser={isNewUser}
            isCanceled={isCanceled}
            isSubscribed={isSubscribed}
            trialDetails={trialDetails}
          />
        </Suspense>
      )}
      {!auth.currentUser && !loading && (
        <Route path="/" component={NonAuthRoute} />
      )}
      {/* </Switch> */}
      {/* <Modal
        isVisible={viewVisible || !fontsLoaded}
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
            style={{ width: 450, height: 450, resizeMode: "contain" }}
            key={"loading"}
          />
        </View>
      </Modal> */}
    </Router>
  );
};

export default RouteManager;
