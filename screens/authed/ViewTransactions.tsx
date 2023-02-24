import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  storeDetailState,
  transListState,
  woocommerceState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
const tz = require("moment-timezone");
import {
  ReactGrid,
  CellChange,
  Row,
  Column,
  Id,
  MenuOption,
  SelectionMode,
} from "@silevis/reactgrid";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import "@silevis/reactgrid/styles.css";
import ReceiptPrint from "components/ReceiptPrint";

const getDate = (receipt) => {
  if (receipt.date_created) {
    const dateString = receipt.date_created;

    const newDate = new Date(dateString + "Z");

    const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const result = tz(newDate)
      .tz(targetTimezone, true)
      .format("dddd, MMMM Do YYYY, h:mm:ss a z");

    return result;
  } else if (receipt.date) {
    const newDate = new Date(receipt.date.seconds * 1000);
    const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const result = tz(newDate)
      .tz(targetTimezone, true)
      .format("dddd, MMMM Do YYYY, h:mm:ss a z");

    return result;
  }
};

const ViewTransactions = () => {
  const today = new Date();
  const storeDetails = storeDetailState.use();
  const wooCredentials = woocommerceState.use();
  const [transList, settransList] = useState([]);
  const [todaysDetails, setTodaysDetails] = useState({
    todaysReceiptValue: 0,
    todaysReceipts: 0,
  });
  const { width, height } = useWindowDimensions();
  const [search, setsearch] = useState(null);

  const getColumns = (): Column[] => [
    { columnId: "name", width: 150 },
    { columnId: "phone", width: 150 },
    { columnId: "address", width: 300 },
    { columnId: "orderFrom", width: 150 },
    { columnId: "method", width: 150 },
    { columnId: "cart", width: 150 },
    { columnId: "total", width: 150 },
    { columnId: "date", width: 300 },
  ];

  const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Name", nonEditable: true },
      { type: "header", text: "Phone #", nonEditable: true },
      { type: "header", text: "Address", nonEditable: true },
      { type: "header", text: "Order From", nonEditable: true },
      { type: "header", text: "Method", nonEditable: true },
      { type: "header", text: "ID", nonEditable: true },
      { type: "header", text: "Total", nonEditable: true },
      { type: "header", text: "Date", nonEditable: true },
    ],
  };

  const getRows = () => [
    headerRow,
    ...transList
      .filter(
        (fReceipt) =>
          !(
            search?.length > 0 &&
            !fReceipt.customer.name?.includes(search) &&
            !fReceipt.customer.phone?.includes(search) &&
            !fReceipt.customer.address?.label?.includes(search) &&
            !fReceipt.cart_hash?.includes(search) &&
            !fReceipt.method?.includes(search) &&
            !fReceipt.transNum?.includes(search) &&
            !getDate(fReceipt.date.seconds).includes(search)
          )
      )
      .map<Row>((receipt, idx) => {
        if (receipt.cart_hash) {
          return {
            rowId: idx,
            cells: [
              {
                type: "text",
                text:
                  receipt.shipping.first_name +
                  " " +
                  receipt.shipping.last_name,
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.billing.phone,
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text:
                  receipt.shipping.address_1 +
                  receipt.shipping.city +
                  receipt.shipping.postcode +
                  receipt.shipping.state,
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: "Online",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.shipping_lines[0].line.method_title,
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.transNum ? receipt.transNum : "",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.total,
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: getDate(receipt),
                nonEditable: true,
                style: { flex: 1 },
              },
            ],
          };
        } else {
          return {
            rowId: idx,
            cells: [
              {
                type: "text",
                text: receipt.customer.name,
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.customer.phone ? receipt.customer.phone : "",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.customer?.address?.label
                  ? receipt.customer?.address?.label
                  : receipt.customer?.address
                  ? receipt.customer?.address
                  : "",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.cart_hash ? "Online" : "POS",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text:
                  receipt.method === "deliveryOrder" ? "Delivery" : "Pickup",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.transNum ? receipt.transNum : "",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.total ? "$" + receipt.total : "",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: getDate(receipt),
                nonEditable: true,
                style: { flex: 1 },
              },
            ],
          };
        }
      }),
  ];

  ///

  const [rows, setrows] = useState(getRows());

  useEffect(() => {
    setrows(getRows());
  }, [search, transList]);

  const columns = getColumns();

  const testRef = useRef(null);

  ///

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
            settransList((prevState) => [...prevState, doc.data()]);
            console.log(doc.data());
          });
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
          .then(() => settransList((prevState) => [...prevState, ...orders]))
          .catch((e) => console.log("error has occured"));
      } catch {
        console.log("Something occured with woo");
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (transList.length > 0) {
        settransList((prev) =>
          prev
            .sort(function (a, b) {
              if (a.date && b.date) {
                return a.date.seconds - b.date.seconds;
              } else if (a.date && b.date_created) {
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                const newDateA = new Date(a.date.seconds * 1000);
                const newDateB = new Date(b.date_created + "Z");
                const resultA = tz(newDateA).tz(targetTimezone, true);
                const resultB = tz(newDateB).tz(targetTimezone, true);

                return resultA.valueOf() - resultB.valueOf();
              } else if (a.date_created && b.date) {
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                const newDateA = new Date(a.date_created + "Z");
                const newDateB = new Date(b.date.seconds * 1000);
                const resultA = tz(newDateA).tz(targetTimezone, true);
                const resultB = tz(newDateB).tz(targetTimezone, true);

                return resultA.valueOf() - resultB.valueOf();
              } else {
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                const newDateA = new Date(a.date_created + "Z");
                const newDateB = new Date(b.date_created + "Z");
                const resultA = tz(newDateA).tz(targetTimezone, true);
                const resultB = tz(newDateB).tz(targetTimezone, true);

                return resultA.valueOf() - resultB.valueOf();
              }
            })
            .reverse()
        );
        // settransList(sortedTransList);
        const todaysReceiptValue = transList.reduce((accumulator, current) => {
          let date;
          const targetTimezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (current.date) {
            const localDatePreConv = new Date(current.date.seconds * 1000);
            date = tz(localDatePreConv).tz(targetTimezone, true);
          } else {
            const localDatePreConv = new Date(current.date_created + "Z");
            date = tz(localDatePreConv).tz(targetTimezone, true);
          }
          // Get the current date in the desired time zone
          let today = tz().tz(targetTimezone);

          if (
            today.year() === date.year() &&
            today.month() === date.month() &&
            today.dayOfYear() === date.dayOfYear()
          ) {
            return (
              accumulator +
              parseFloat(current.date ? current.total : current.total / 1.13)
            );
          } else {
            return accumulator;
          }
        }, 0);
        const todaysReceipts = transList.reduce((accumulator, current) => {
          let date;
          const targetTimezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (current.date) {
            const localDatePreConv = new Date(current.date.seconds * 1000);
            date = tz(localDatePreConv).tz(targetTimezone, true);
          } else {
            const localDatePreConv = new Date(current.date_created + "Z");
            date = tz(localDatePreConv).tz(targetTimezone, true);
          }
          // Get the current date in the desired time zone
          let today = tz().tz(targetTimezone);

          if (
            today.year() === date.year() &&
            today.month() === date.month() &&
            today.dayOfYear() === date.dayOfYear()
          ) {
            return accumulator + 1;
          } else {
            return accumulator;
          }
        }, 0);
        setTodaysDetails({
          todaysReceiptValue: todaysReceiptValue.toFixed(2),
          todaysReceipts: todaysReceipts,
        });
      }
    } catch {
      console.log("Error Occured when sorting dates");
    }
  }, [transList]);

  const PrintTodaysTotal = () => {
    let data = [
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      today.toLocaleDateString() + " " + today.toLocaleTimeString() + "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30", // left align
      "\x0A" + "\x0A",
      "Number Of Receipts: " + todaysDetails.todaysReceipts + "\x0A" + "\x0A",
      "Sub-Total: " +
        "$" +
        (todaysDetails.todaysReceiptValue / 1.13).toFixed(2) +
        "\x0A" +
        "\x0A",
      "Tax: " +
        "$" +
        ((todaysDetails.todaysReceiptValue / 1.13) * 0.13).toFixed(2) +
        "\x0A" +
        "\x0A",
      "Total Including (13% Tax): " +
        "$" +
        todaysDetails.todaysReceiptValue +
        "\x0A" +
        "\x0A",
      "------------------------------------------" + "\x0A",
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x1D" + "\x56" + "\x30",
    ];

    const qz = require("qz-tray");
    qz.websocket
      .connect()
      .then(function () {
        let config = qz.configs.create(storeDetails.comSelected);
        return qz.print(config, data);
      })
      .then(qz.websocket.disconnect)
      .catch(function (err) {
        console.error(err);
      });
  };

  // useEffect(() => {
  //   if(transList.length > )
  // }, [search])

  return (
    <View style={styles.container}>
      {/* <Text style={{ textAlign: "center", margin: 25 }}>
        List Of Transactions
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", margin: 25 }}>
          Todays Total Price: {todaysDetails.todaysReceiptValue}
        </Text>
        <Button
          style={{ height: 40, alignItems: "center", justifyContent: "center" }}
          title="Print Todays Receipts"
          onPress={PrintTodaysTotal}
        />
        <Text style={{ textAlign: "center", margin: 25 }}>
          Todays Total Receipts: {todaysDetails.todaysReceipts}
        </Text>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Enter term to search by (name, phone, address, method, id, date)"
          onChangeText={(val) => setsearch(val)}
          value={search}
          style={{ width: "80%", height: 60, padding: 10 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "lightgrey",
            width: "20%",
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (testRef.current.state.selectedIds.length > 0) {
              let data = [];
              testRef.current.state.selectedIds.forEach((idx) => {
                const element = transList[idx];
                const formatedData = ReceiptPrint(element, storeDetails);
                data = data.concat(formatedData);
              });
              const qz = require("qz-tray");
              qz.websocket
                .connect()
                .then(function () {
                  let config = qz.configs.create(storeDetails.comSelected);
                  return qz.print(config, data);
                })
                .then(qz.websocket.disconnect)
                .catch(function (err) {
                  console.error(err);
                });
            } else if (testRef.current.state.selectedRanges[0].rows[0]) {
              let data = [];
              const element =
                transList[
                  testRef.current.state.selectedRanges[0].rows[0].rowId
                ];

              const formatedData = ReceiptPrint(element, storeDetails);
              data = data.concat(formatedData);

              const qz = require("qz-tray");
              qz.websocket
                .connect()
                .then(function () {
                  let config = qz.configs.create(storeDetails.comSelected);
                  return qz.print(config, data);
                })
                .then(qz.websocket.disconnect)
                .catch(function (err) {
                  console.error(err);
                });
            } else {
              alert(
                "Higlight one or multiple receipt then click to print them"
              );
            }
          }}
        >
          <MaterialCommunityIcons name="printer" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer} horizontal>
          <ReactGrid
            ref={testRef}
            rows={rows}
            columns={columns}
            enableRowSelection={true}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default ViewTransactions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    // justifyContent: "space-between",
    // paddingLeft: 50,
    // paddingRight: 50,
    // paddingBottom: 50,
    // padding: 50,
    height: "100%",
    width: "100%",
  },
});
