import { View, Text } from "react-native";
import React from "react";
const tz = require("moment-timezone");

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

const ReceiptPrint = (element, storeDetails) => {
  console.log("ELEMENT DETAILS FROM RECEIPT PRINT: ", element);
  let data = [];

  let date;

  // if (element.date_created) {
  //   const dateString = element.date_created;

  //   const newDate = new Date(dateString + "Z");

  //   const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //   const result = tz(newDate)
  //     .tz(targetTimezone, true)
  //     .format("dddd, MMMM Do YYYY, h:mm:ss a z");

  //   date = result;
  // } else

  if (element.date) {
    const newDate = new Date(element.date.seconds * 1000);
    const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const result = tz(newDate)
      .tz(targetTimezone, true)
      .format("dddd, MMMM Do YYYY, h:mm:ss a z");

    date = result;
  }

  if (element.method === "deliveryOrder") {
    data.push(
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      date + "\x0A",
      "\x0A",
      `Transaction ID ${element.transNum}` + "\x0A",
      "\x0A",
      `Delivery Order: $${
        storeDetails.deliveryPrice ? storeDetails.deliveryPrice : "0"
      } Fee` + "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30" // left align
    );

    element.cart.map((cartItem) => {
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");

      if (cartItem.quantity > 1) {
        data.push(`Quantity: ${cartItem.quantity}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price * cartItem.quantity}`);
      } else {
        data.push(`Price: $${cartItem.price}`);
      }

      if (cartItem.description) {
        data.push("\x0A");
        data.push(cartItem.description);
      }

      if (cartItem.options) {
        data.push("\x0A");
        cartItem.options.map((option) => {
          data.push(option);
          data.push("\x0A");
        });
      }

      if (cartItem.extraDetails) {
        data.push(cartItem.extraDetails);
        data.push("\x0A");
      }

      data.push("\x0A" + "\x0A");
    });

    //push ending
    data.push(
      "\x0A",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
      "\x0A" + "\x0A",
      "Customer Name: " + element.customer.name,
      "\x0A" + "\x0A",
      "Customer Phone #:  " + element.customer.phone,
      "\x0A" + "\x0A",
      "Customer Address #:  " + element.customer.address?.label,
      "\x0A" + "\x0A",
      `Total Including (${
        storeDetails.taxRate ? storeDetails.taxRate : "13"
      }% Tax): ` +
        element.total +
        "\x0A" +
        "\x0A",
      "------------------------------------------" + "\x0A",
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x1D" + "\x56" + "\x30"
    );
  } else if (element.method === "pickupOrder") {
    data.push(
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      date + "\x0A",
      "\x0A",
      `Transaction ID ${element.transNum}` + "\x0A",
      "\x0A",
      "Pickup Order" + "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30" // left align
    );

    element.cart.map((cartItem) => {
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");

      if (cartItem.quantity > 1) {
        data.push(`Quantity: ${cartItem.quantity}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price * cartItem.quantity}`);
      } else {
        data.push(`Price: $${cartItem.price}`);
      }

      if (cartItem.description) {
        data.push("\x0A");
        data.push(cartItem.description);
      }

      if (cartItem.options) {
        data.push("\x0A");
        cartItem.options.map((option) => {
          data.push(option);
          data.push("\x0A");
        });
      }

      if (cartItem.extraDetails) {
        data.push(cartItem.extraDetails);
        data.push("\x0A");
      }

      data.push("\x0A" + "\x0A");
    });

    //push ending
    data.push(
      "\x0A",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
      "\x0A" + "\x0A",
      "Customer Name: " + element.customer.name,
      "\x0A" + "\x0A",
      "Customer Phone #:  " + element.customer.phone,
      "\x0A" + "\x0A",
      `Total Including (${
        storeDetails.taxRate ? storeDetails.taxRate : "13"
      }% Tax): ` +
        element.total +
        "\x0A" +
        "\x0A",
      "------------------------------------------" + "\x0A",
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x0A", // line break
      "\x1D" + "\x56" + "\x30"
    );
  } else if (element.cart_hash) {
    data.push(
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      date + "\x0A",
      "\x0A",
      "Online Order" + "\x0A", // text and line break
      `Transaction ID ${element.number}` + "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30" // left align
    );

    element.line_items?.map((cartItem) => {
      data.push("\x0A");
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");
      data.push(`Quantity: ${cartItem.quantity}`);
      data.push("\x0A");
      data.push(`Price: $${cartItem.price}`);
      data.push("\x0A");

      if (cartItem.meta) {
        CleanupOps(cartItem.meta).map((returnedItem) => {
          data.push(`${returnedItem.key} : `);
          returnedItem.vals.map((val, index) => {
            data.push(`${val}`);
            if (index >= 0 && index < returnedItem.vals.length - 1) {
              data.push(", ");
            }
          });
          data.push("\x0A");
        });
      } else {
        data.push("\x0A" + "\x0A");
      }
    });

    data.push("\x0A");
    data.push("\x0A");
    data.push(`Customer Details:`);
    data.push("\x0A");
    data.push(`Address: ${element.shipping.address_1}`);
    data.push("\x0A");
    data.push(`City: ${element.shipping.city}`);
    data.push("\x0A");
    data.push(`Zip/Postal Code: ${element.shipping.postcode}`);
    data.push("\x0A");
    data.push(`Province/State: ${element.shipping.state}`);
    data.push("\x0A");
    data.push(
      `Name: ${element.shipping.first_name} ${element.shipping.last_name}`
    );
    data.push("\x0A");
    element.shipping_lines.map((line) => {
      data.push(`Shipping Method: ${line.method_title}`);
      data.push("\x0A");
    });
    if (element.billing) {
      data.push(`Phone Number: ${element.billing.phone}`);
      data.push("\x0A");
    }
    if (element.customer_note) {
      data.push(`Customer Note: ${element.customer_note}`);
      data.push("\x0A");
    }
    data.push("\x0A");
    data.push("\x0A");

    data.push(
      "\x0A",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
      "\x0A" + "\x0A",
      "Payment Method: " + element.payment_method_title + "\x0A" + "\x0A",
      `Total Including (${
        storeDetails.taxRate ? storeDetails.taxRate : "13"
      }% Tax): ` +
        "$" +
        element.total +
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

    data.push("\x1D" + "\x56" + "\x00");
  } else {
    data = [
      "\x1B" + "\x40", // init
      "\x1B" + "\x61" + "\x31", // center align
      storeDetails.name,
      "\x0A",
      storeDetails.address?.label + "\x0A",
      storeDetails.website + "\x0A", // text and line break
      storeDetails.phoneNumber + "\x0A", // text and line break
      date + "\x0A",
      "\x0A",
      `Transaction ID ${element.transNum}` + "\x0A",
      "\x0A",
      "\x0A",
      "\x0A",
      "\x1B" + "\x61" + "\x30", // left align
    ];

    element.cart.map((cartItem) => {
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");

      if (cartItem.quantity > 1) {
        data.push(`Quantity: ${cartItem.quantity}`);
        data.push("\x0A");
        data.push(`Price: $${cartItem.price * cartItem.quantity}`);
      } else {
        data.push(`Price: $${cartItem.price}`);
      }

      if (cartItem.description) {
        data.push("\x0A");
        data.push(cartItem.description);
      }

      if (cartItem.options) {
        data.push("\x0A");
        cartItem.options.map((option) => {
          data.push(option);
          data.push("\x0A");
        });
      }

      if (cartItem.extraDetails) {
        data.push(cartItem.extraDetails);
        data.push("\x0A");
      }

      data.push("\x0A" + "\x0A");
    });

    if (element.method === "Cash") {
      //push ending
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Payment method: " + element.method + "\x0A" + "\x0A",
        `Total Including (${
          storeDetails.taxRate ? storeDetails.taxRate : "13"
        }% Tax): ` +
          "$" +
          element.total +
          "\x0A" +
          "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        //"\x1D" + "\x56" + "\x00",
        "\x1D" + "\x56" + "\x30"
      );
    } else {
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Payment method: " + element.method + "\x0A" + "\x0A",
        `Total Including (${
          storeDetails.taxRate ? storeDetails.taxRate : "13"
        }% Tax): ` +
          "$" +
          element.total +
          "\x0A" +
          "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        //"\x1D" + "\x56" + "\x00",
        "\x1D" + "\x56" + "\x30"
      );
    }
  }
  console.log("DATA TO RETURN TO PRINTER: ", data);
  return data;
};

export default ReceiptPrint;
