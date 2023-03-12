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

const ViewTransactions = ({ transList, todaysDetails }) => {
  const storeDetails = storeDetailState.use();
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
            !fReceipt.customer?.name?.includes(search) &&
            !fReceipt.customer?.phone?.includes(search) &&
            !fReceipt.customer?.address?.label?.includes(search) &&
            !fReceipt.cart_hash?.includes(search) &&
            !fReceipt.method?.includes(search) &&
            !fReceipt.transNum?.includes(search) &&
            !getDate(fReceipt)?.includes(search) &&
            !fReceipt.shipping?.first_name?.includes(search) &&
            !fReceipt.shipping?.last_name?.includes(search) &&
            !fReceipt.billing?.phone?.includes(search) &&
            !fReceipt.shipping?.address_1?.includes(search) &&
            !fReceipt.shipping?.city?.includes(search) &&
            !fReceipt.shipping?.postcode?.includes(search) &&
            !fReceipt.shipping?.state?.includes(search)
          )
      )
      .map((receipt, idx) => {
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
                text: receipt.customer?.name ? receipt.customer?.name : "",
                nonEditable: true,
                style: { flex: 1 },
              },
              {
                type: "text",
                text: receipt.customer?.phone ? receipt.customer?.phone : "",
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

  return (
    <View style={styles.container}>
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
