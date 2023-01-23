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
console.log('looking')
            if (newArray.length > transList.length) {
              console.log('Got new')
              const printData = { printData: transList.length.toString()};
              updateTransList(newArray);
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
