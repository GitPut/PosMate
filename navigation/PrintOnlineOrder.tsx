import { View, Text } from "react-native";
import React from "react";
import { storeDetailState } from "state/state";

const PrintOnlineOrder = ({ newItems }) => {
  const storeDetails = storeDetailState.use();

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

  if (newItems.length > 1) {
    newItems.forEach((e) => {
      const printData = [];
      const dateString = e.date_created;
      const newDate = new Date(dateString + "Z");
      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const resultDate = tz(newDate)
        .tz(targetTimezone, true)
        .format("dddd, MMMM Do YYYY, h:mm:ss a z");

      printData.push(
        "\x1B\x40", // init
        "\x1B" + "\x61" + "\x31", // center align
        storeDetails.name,
        "\x0A",
        storeDetails.address?.label + "\x0A",
        storeDetails.website + "\x0A", // text and line break
        storeDetails.phoneNumber + "\x0A", // text and line break
        resultDate + "\x0A",
        "\x0A",
        "Online Order" + "\x0A", // text and line break
        `Transaction ID ${e.number}` + "\x0A",
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
      printData.push(`Address: ${e.shipping.address_1}`);
      printData.push("\x0A");
      printData.push(`City: ${e.shipping.city}`);
      printData.push("\x0A");
      printData.push(`Zip/Postal Code: ${e.shipping.postcode}`);
      printData.push("\x0A");
      printData.push(`Province/State: ${e.shipping.state}`);
      printData.push("\x0A");
      printData.push(`Name: ${e.shipping.first_name} ${e.shipping.last_name}`);
      printData.push("\x0A");
      printData.push(`Phone Number: ${e.billing.phone}`);
      printData.push("\x0A");
      e.shipping_lines.map((line) => {
        printData.push(`Shipping Method: ${line.method_title}`);
        printData.push("\x0A");
      });
      if (e.customer_note) {
        printData.push(`Customer Note: ${e.customer_note}`);
        printData.push("\x0A");
      }
      printData.push("\x0A");
      printData.push("\x0A");

      printData.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Payment Method: " + e.payment_method_title + "\x0A" + "\x0A",
        `Total Including (${
          storeDetails.taxRate ? storeDetails.taxRate : "13"
        }% Tax): ` +
          "$" +
          e.total +
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

      const qz = require("qz-tray");
      qz.websocket
        .connect()
        .then(function () {
          const config = qz.configs.create(storeDetails.comSelected);
          return qz.print(config, printData);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          console.error(err);
        });
    });
  } else {
    const e = newItems[0];
    const printData = [];
    const dateString = e.date_created;
    const newDate = new Date(dateString + "Z");
    const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
      `Transaction ID ${e.number}` + "\x0A",
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
    printData.push(`Address: ${e.shipping.address_1}`);
    printData.push("\x0A");
    printData.push(`City: ${e.shipping.city}`);
    printData.push("\x0A");
    printData.push(`Zip/Postal Code: ${e.shipping.postcode}`);
    printData.push("\x0A");
    printData.push(`Province/State: ${e.shipping.state}`);
    printData.push("\x0A");
    printData.push(`Name: ${e.shipping.first_name} ${e.shipping.last_name}`);
    printData.push("\x0A");
    printData.push(`Phone Number: ${e.billing.phone}`);
    printData.push("\x0A");
    e.shipping_lines.map((line) => {
      printData.push(`Shipping Method: ${line.method_title}`);
      printData.push("\x0A");
    });
    if (e.customer_note) {
      printData.push(`Customer Note: ${e.customer_note}`);
      printData.push("\x0A");
    }
    printData.push("\x0A");
    printData.push("\x0A");

    printData.push(
      "\x0A",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
      "\x0A" + "\x0A",
      "Payment Method: " + e.payment_method_title + "\x0A" + "\x0A",
      `Total Including (${
        storeDetails.taxRate ? storeDetails.taxRate : "13"
      }% Tax): ` +
        "$" +
        e.total +
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

    const qz = require("qz-tray");
    qz.websocket
      .connect()
      .then(function () {
        const config = qz.configs.create(storeDetails.comSelected);
        return qz.print(config, printData);
      })
      .then(qz.websocket.disconnect)
      .catch(function (err) {
        console.error(err);
      });
  }
};

export default PrintOnlineOrder;
