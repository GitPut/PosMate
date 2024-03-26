import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import index from "../../Router/index";

import Header from "./Header";
import Sidebar from "./sidebar";
import { auth, db } from "state/firebaseConfig";
import { setTransListState, setTransListTableOrgState, woocommerceState } from "state/state";

const tz = require("moment-timezone");

const DefaultLayout = (props) => {
  const { match } = props;

  const wooCredentials = woocommerceState.use()
  const [transList, setTransList] = useState([])
  const [transListTableOrg, setTransListTableOrg] = useState([])

  const getDate = (receipt) => {
    if (receipt.date_created) {
      const dateString = receipt.date_created;

      const newDate = new Date(dateString + "Z");

      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = tz(newDate)
        .tz(targetTimezone, true)
        .format("YYYY-MM-DD HH:mm a");

      return result;
    } else if (receipt.date) {
      const newDate = new Date(receipt.date.seconds * 1000);
      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = tz(newDate)
        .tz(targetTimezone, true)
        .format("YYYY-MM-DD HH:mm a");

      return result;
    }
  };

  useEffect(() => {
    try {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let orderType = "";
            if (doc.data().method === "deliveryOrder") {
              orderType = "Delivery";
            }
            if (doc.data().method === "pickupOrder") {
              orderType = "Pickup";
            }
            if (doc.data().method === "inStoreOrder") {
              orderType = "In Store";
            }

            setTransList((prevState) => [...prevState, { ...doc.data(), docID: doc.id }]);
            setTransListTableOrg((prevState) => [...prevState,
            {
              ...doc.data(),
              id: doc.data().transNum.toUpperCase(),
              number: doc.data().transNum,
              name: doc.data().customer?.name ? doc.data().customer?.name : "N/A",
              date: getDate(doc.data()),
              originalData: doc.data(),
              docID: doc.id,
              amount: doc.data().total,
              system: 'POS',
              type: orderType,
            }
            ]);
          });
          //sort by date
          setTransListTableOrg((prevState) => {
            const newList = [...prevState.sort((a, b) => new Date(b.originalData.date_created ? b.originalData.date_created : b.originalData.date.seconds * 1000) - new Date(a.originalData.date_created ? a.originalData.date_created : a.originalData.date.seconds * 1000))]
            setTransList(newList)

            return newList
          })

        });
    } catch {
      console.log("Error occured retrieving tranasctions");
    }

    if (wooCredentials.useWoocommerce === true) {
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
          .then(() => setTransList((prevState) => [...prevState, ...orders]))
          .catch((e) => console.log("error has occured"));
      } catch {
        console.log("Something occured with woo");
      }
    }
  }, []);

  useEffect(() => {
    setTransListState(transList)
    setTransListTableOrgState(transListTableOrg)
  }, [transList, transListTableOrg])

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div>
          {index &&
            index.map((route, key) => (
              <Route
                key={key}
                path={`${match.url}/${route.path}`}
                component={route.component}
              />
            ))}
        </div>
        <Sidebar />
      </div>
      <div className="sidebar-overlay"></div>
    </>
  );
}

export default withRouter(DefaultLayout);
