import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainAuthed from "./authed/MainAuthed";
import {
  setTransListState,
  setUserState,
  setUserStoreState,
  setWoocommerceState,
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
  const [savedTranslist, setsavedTranslist] = useState(transList);
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
          setTimeout(() => {
            setloading(false);
          }, 1);
        });
      return () => unsub();
    }
  }, [userS]);

  useEffect(() => {
    console.log(transList);
    if (wooCredentials.useWoocommerce === true) {
      const interval = setInterval(() => {
        fetch(wooCredentials.apiUrl, {
          headers: {
            Authorization:
              "Basic " + btoa(`${wooCredentials.ck}:${wooCredentials.cs}`),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // do something with the data, like checking for new orders
            //console.log(data);

            const array1 = transList;
            const array2 = data;

            const newArray = [];

            array1.concat(array2).reduce(function (acc, curr) {
              if (!acc.includes(curr.transaction_id)) {
                acc.push(curr.transaction_id);
                newArray.push(curr);
              }
              return acc;
            }, []);
            if (newArray.length > transList.length) {
              const newItems = structuredClone(newArray).splice(
                transList.length,
                newArray.length - transList.length
              );

              updateTransList(newArray);

              if (newItems.length > 1) {
                newItems.forEach((e) => {
                  const printData = [];

                  printData.push(
                    "\x1B" + "\x40", // init
                    "\x1B" + "\x61" + "\x31", // center align
                    "Tomas Pizza",
                    "\x0A",
                    "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
                    "www.dreamcitypizza.com" + "\x0A", // text and line break
                    "(519) 650-0409" + "\x0A", // text and line break
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
                    printData.push(`Name: ${cartItem.name}`);
                    printData.push("\x0A");
                    printData.push(`Quantity: ${cartItem.quantity}`);
                    printData.push("\x0A");
                    printData.push(`Price: $${cartItem.price}`);

                    if (cartItem.meta_data) {
                      cartItem.meta_data?.map((meta) => {
                        printData.push(`${meta.key} : ${meta.value}`);
                        printData.push("\x0A");
                      });
                    } else {
                      printData.push("\x0A" + "\x0A");
                    }
                  });

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
                      (parseFloat(e.total) + parseFloat(e.total_tax)) +
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

                  printData.push(
                    "\x1D" + "\x56" + "\x00",
                    "\x1D" + "\x56" + "\x30"
                  );

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
                    });
                });
              } else {
                const e = newItems[0];
                const printData = [];

                printData.push(
                  "\x1B" + "\x40", // init
                  "\x1B" + "\x61" + "\x31", // center align
                  "Tomas Pizza",
                  "\x0A",
                  "#B4-200 Preston Pkwy, Cambridge" + "\x0A",
                  "www.dreamcitypizza.com" + "\x0A", // text and line break
                  "(519) 650-0409" + "\x0A", // text and line break
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
                  printData.push(`Name: ${cartItem.name}`);
                  printData.push("\x0A");
                  printData.push(`Quantity: ${cartItem.quantity}`);
                  printData.push("\x0A");
                  printData.push(`Price: $${cartItem.price}`);

                  if (cartItem.meta_data) {
                    cartItem.meta_data?.map((meta) => {
                      printData.push(`${meta.key} : ${meta.value}`);
                      printData.push("\x0A");
                    });
                  } else {
                    printData.push("\x0A" + "\x0A");
                  }
                });

                printData.push(
                  "\x0A",
                  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
                  "\x0A" + "\x0A",
                  "Payment Method: " + e.payment_method_title + "\x0A" + "\x0A",
                  "Total Including (13% Tax): " +
                    "$" +
                    (parseFloat(e.total) + parseFloat(e.total_tax)) +
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

                printData.push(
                  "\x1D" + "\x56" + "\x00",
                  "\x1D" + "\x56" + "\x30"
                );

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
                  });
              }
            }
          })
          .catch((error) => {
            alert(
              "Error has errored with woocommerce api. Try refreshing or updating creditials"
            );
            clearInterval(interval);
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
