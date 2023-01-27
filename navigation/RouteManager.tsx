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
            if (doc.data().transList) {
              setTransListState(doc.data().transList);
            }
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
          setloading(true);
          setUserStoreState({
            products: doc.data().products,
            categories: doc.data().categories,
          });
          setTransListState(doc.data().transList);
          if (doc.data().wooCredentials) {
            setWoocommerceState(doc.data().wooCredentials);
          }
          if (doc.data().storeDetails) {
            setStoreDetailState(doc.data().storeDetails);
          }
          setTimeout(() => {
            setloading(false);
          }, 1);
        });
      return () => unsub();
    }
  }, [userS]);

  useEffect(() => {
    if (wooCredentials.useWoocommerce === true) {
      const interval = setInterval(() => {
        const WooCommerceAPI = require("woocommerce-api");

        const WooCommerce = new WooCommerceAPI({
          url: wooCredentials.apiUrl,
          consumerKey: wooCredentials.ck,
          consumerSecret: wooCredentials.cs,
        });

        WooCommerce.get("orders", function (err, data, res) {
          if (err) {
            console.log(err);
          } else {
            console.log(JSON.parse(res));

            const array1 = transList;
            const array2 = JSON.parse(res);

            const newArray = [];

            array1.concat(array2).reduce(function (acc, curr) {
              if (!acc.includes(curr.transaction_id)) {
                acc.push(curr.transaction_id);
                newArray.push(curr);
              }
              return acc;
            }, []);

            // console.log('checking')
            // console.log('translist: ', transList)
            // console.log('data: ', data)
            // console.log('new array: ', newArray)

            if (newArray.length > transList.length) {
              console.log("new item");
              const newItems = structuredClone(newArray).splice(
                transList.length,
                newArray.length - transList.length
              );

              updateTransList(newArray);

              if (newItems.length > 1) {
                newItems.forEach((e) => {
                  const printData = [];

                  printData.push(
                    "\x1B\x40", // init
                    "\x1B" + "\x61" + "\x31", // center align
                    storeDetails.name,
                    "\x0A",
                    storeDetails.address + "\x0A",
                    storeDetails.website + "\x0A", // text and line break
                    storeDetails.phoneNumber + "\x0A", // text and line break
                    e.date_created + "\x0A",
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

                    if (cartItem.meta_data) {
                      cartItem.meta_data?.map((meta, index) => {
                        if (index === 0) {
                          printData.push(`${meta.key} : ${meta.value}`);
                          if (cartItem.meta_data[index + 1].key !== meta.key) {
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
                  e.shipping_lines.map((line) =>
                    printData.push(`Shipping Method: ${line.method_title}`)
                  );
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
                      (parseFloat(e.total) + parseFloat(e.total_tax)).toFixed(
                        2
                      ) +
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
                    body: JSON.stringify({
                      printData: printData,
                      comSelected: storeDetails.comSelected,
                    }),
                  })
                    .then((response) => response.json())
                    .then((respData) => {
                      console.log(respData);
                    })
                    .catch((e) => alert("Error with printer"));
                });
              } else {
                const e = newItems[0];
                const printData = [];

                printData.push(
                  "\x1B" + "\x40", // init
                  "\x1B" + "\x61" + "\x31", // center align
                  storeDetails.name,
                  "\x0A",
                  storeDetails.address + "\x0A",
                  storeDetails.website + "\x0A", // text and line break
                  storeDetails.phoneNumber + "\x0A", // text and line break
                  e.date_created + "\x0A",
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

                  if (cartItem.meta_data) {
                    cartItem.meta_data?.map((meta, index) => {
                      if (index === 0) {
                        printData.push(`${meta.key} : ${meta.value}`);
                        if (cartItem.meta_data[index + 1].key !== meta.key) {
                          printData.push("\x0A");
                        }
                      } else {
                        if (index !== cartItem.meta_data.length - 1) {
                          if (cartItem.meta_data[index - 1].key === meta.key) {
                            printData.push(` , ${meta.value}`);
                          } else {
                            printData.push(`${meta.key} : ${meta.value}`);
                          }

                          if (cartItem.meta_data[index + 1].key !== meta.key) {
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
                e.shipping_lines.map((line) =>
                  printData.push(`Shipping Method: ${line.method_title}`)
                );
                printData.push("\x0A");
                printData.push("\x0A");

                printData.push(
                  "\x0A",
                  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
                  "\x0A" + "\x0A",
                  "Payment Method: " + e.payment_method_title + "\x0A" + "\x0A",
                  "Total Including (13% Tax): " +
                    "$" +
                    (parseFloat(e.total) + parseFloat(e.total_tax)).toFixed(2) +
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
                  body: JSON.stringify({
                    printData: printData,
                    comSelected: storeDetails.comSelected,
                  }),
                })
                  .then((response) => response.json())
                  .then((respData) => {
                    console.log(respData);
                  })
                  .catch((e) => alert("Error with printer"));
              }
            }
          }
        });
      }, 5000); // this will check for new orders every minute
      return () => clearInterval(interval);
    }
  }, [wooCredentials, transList]);

  return (
    <NavigationContainer>
      {loading ? (
        <Spinner isModalVisible={true} />
      ) : (
        <>{userS ? <MainAuthed /> : <MainNonAuth />}</>
      )}
    </NavigationContainer>
  );
};

export default RouteManager;
