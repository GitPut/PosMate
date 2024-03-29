import { View, Text } from "react-native";
import React from "react";
const tz = require("moment-timezone");

const ReceiptPrint = (element, storeDetails, reprint) => {
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

  function parseDate(input) {
    // Check if the input is a Date object
    if (Object.prototype.toString.call(input) === "[object Date]") {
      if (!isNaN(input.getTime())) {
        // It's a valid Date object, return it
        return input;
      }
    }

    // Check if the input is a string
    if (typeof input === "string") {
      const dateObject = new Date(input);

      // Check if the dateObject is a valid Date
      if (!isNaN(dateObject.getTime())) {
        // It's a valid Date object, return it
        return dateObject;
      }
    }

    // If neither a Date object nor a valid date string, return null or handle accordingly
    return null;
  }

  let data = [];
  let total = 0;

  let date;
  //If woo order
  if (element.date_created) {
    const dateString = element.date_created;

    const newDate = new Date(dateString + "Z");

    const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const result = tz(newDate)
      .tz(targetTimezone, true)
      .format("dddd, MMMM Do YYYY, h:mm:ss a z");

    date = result;

    data.push(
      "\x1B" + "\x40", // init
      "                                                                              ", // line break
      "\x0A",
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
      if (cartItem.price) {
        data.push(`Price: $${parseFloat(cartItem.price).toFixed(2)}`);
      }
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
      "\x0A", // line break
      "\x0A" // line break
    );

    data.push("\x1D" + "\x56" + "\x00");

    return data;
  } else {
    if (element.online) {
      const localDate = parseDate(element.date);
      // Convert to a nice date and time format
      date = localDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else if (element.date.seconds) {
      const localDate = new Date(element.date.seconds * 1000);
      // Convert to a nice date and time format
      date = localDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      const localDate = element.date;
      // Convert to a nice date and time format
      date = localDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }

    if (element.method === "deliveryOrder") {
      total += parseFloat(storeDetails.deliveryPrice);
      data = element.online
        ? [
            "\x1B" + "\x40", // init
            "                                                                              ", // line break
            "\x0A",
            "\x1B" + "\x61" + "\x31", // center align
            storeDetails.name,
            "\x0A",
            storeDetails.address?.label + "\x0A",
            storeDetails.website + "\x0A", // text and line break
            storeDetails.phoneNumber + "\x0A", // text and line break
            date + "\x0A",
            "\x0A",
            element.online && "Online Order" + "\x0A", // text and line break
            `Transaction ID ${element.transNum}` + "\x0A",
            "\x0A",
            `Delivery Order: $${
              storeDetails.deliveryPrice ? storeDetails.deliveryPrice : "0"
            } Fee` + "\x0A",
            "\x0A",
            "\x0A",
            "\x0A",
            "\x1B" + "\x61" + "\x30", // left align
          ]
        : [
            "\x1B" + "\x40", // init
            "                                                                              ", // line break
            "\x0A",
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
            "\x1B" + "\x61" + "\x30", // left align
          ];

      element.cart.map((cartItem) => {
        data.push(`Name: ${cartItem.name}`);
        data.push("\x0A");

        if (cartItem.quantity > 1) {
          if (cartItem.price) {
            total +=
              parseFloat(parseFloat(cartItem.price).toFixed(2)) *
              cartItem.quantity;
          }
          data.push(`Quantity: ${cartItem.quantity}`);
          if (cartItem.price) {
            data.push("\x0A");
            data.push(
              `Price: $${
                parseFloat(cartItem.price).toFixed(2) *
                parseFloat(cartItem.quantity)
              }`
            );
          }
        } else {
          if (cartItem.price) {
            total += parseFloat(parseFloat(cartItem.price).toFixed(2));
            data.push(`Price: $${parseFloat(cartItem.price).toFixed(2)}`);
          }
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
          data.push("Note: " + cartItem.extraDetails);
          data.push("\x0A");
        }

        data.push("\x0A" + "\x0A");
      });

      total = storeDetails.taxRate
        ? total * (1 + storeDetails.taxRate / 100)
        : total * 1.13;
      total = total.toFixed(2);

      //push ending
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Customer Name: " + element.customer?.name,
        "\x0A" + "\x0A",
        "Customer Phone #:  " + element.customer?.phone,
        "\x0A" + "\x0A",
        "Customer Address: " + element.customer?.address?.label,
        "\x0A" + "\x0A",
        `Total Including (${
          storeDetails.taxRate ? storeDetails.taxRate : "13"
        }% Tax): ` +
          total +
          "\x0A" +
          "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x1D" + "\x56" + "\x30"
      );
    } else if (element.method === "pickupOrder") {
      data = element.online
        ? [
            "\x1B" + "\x40", // init
            "                                                                              ", // line break
            "\x0A",
            "\x1B" + "\x61" + "\x31", // center align
            storeDetails.name,
            "\x0A",
            storeDetails.address?.label + "\x0A",
            storeDetails.website + "\x0A", // text and line break
            storeDetails.phoneNumber + "\x0A", // text and line break
            date + "\x0A",
            "\x0A",
            element.online && "Online Order" + "\x0A", // text and line break
            `Transaction ID ${element.transNum}` + "\x0A",
            `                                `,
            "\x0A",
            "Pickup Order" + "\x0A", // text and line break
            "\x0A",
            "\x0A",
            "\x1B" + "\x61" + "\x30", // left align
          ]
        : [
            "\x1B" + "\x40", // init
            "                                                                              ", // line break
            "\x0A",
            "\x1B" + "\x61" + "\x31", // center align
            storeDetails.name,
            "\x0A",
            storeDetails.address?.label + "\x0A",
            storeDetails.website + "\x0A", // text and line break
            storeDetails.phoneNumber + "\x0A", // text and line break
            date + "\x0A",
            "\x0A",
            `Transaction ID ${element.transNum}` + "\x0A",
            `                                `,
            "\x0A",
            "Pickup Order" + "\x0A", // text and line break
            "\x0A",
            "\x0A",
            "\x1B" + "\x61" + "\x30", // left align
          ];

      element.cart.map((cartItem) => {
        data.push(`Name: ${cartItem.name}`);
        data.push("\x0A");

        if (cartItem.quantity > 1) {
          if (cartItem.price) {
            total +=
              parseFloat(parseFloat(cartItem.price).toFixed(2)) *
              cartItem.quantity;
          }
          data.push(`Quantity: ${cartItem.quantity}`);
          if (cartItem.price) {
            data.push("\x0A");
            data.push(
              `Price: $${
                parseFloat(cartItem.price).toFixed(2) *
                parseFloat(cartItem.quantity)
              }`
            );
          }
        } else {
          if (cartItem.price) {
            total += parseFloat(parseFloat(cartItem.price).toFixed(2));
            data.push(`Price: $${parseFloat(cartItem.price).toFixed(2)}`);
          }
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
          data.push("Note: " + cartItem.extraDetails);
          data.push("\x0A");
        }

        data.push("\x0A" + "\x0A");
      });

      total = storeDetails.taxRate
        ? total * (1 + storeDetails.taxRate / 100)
        : total * 1.13;
      total = total.toFixed(2);

      //push ending
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        "\x0A" + "\x0A",
        "Customer Name: " + element.customer?.name,
        "\x0A" + "\x0A",
        "Customer Phone #:  " + element.customer?.phone,
        "\x0A" + "\x0A",
        "Customer Address: N/A                            ",
        "\x0A",
        `Total Including (${
          storeDetails.taxRate ? storeDetails.taxRate : "13"
        }% Tax): ` +
          total +
          "\x0A" +
          "\x0A",
        "------------------------------------------" + "\x0A",
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x0A", // line break
        "\x1D" + "\x56" + "\x30"
      );
    } else {
      data = [
        "\x1B" + "\x40", // init
        "                                                                              ", // line break
        "\x0A",
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
          if (cartItem.price) {
            total +=
              parseFloat(parseFloat(cartItem.price).toFixed(2)) *
              cartItem.quantity;
          }
          data.push(`Quantity: ${cartItem.quantity}`);
          if (cartItem.price) {
            data.push("\x0A");
            data.push(
              `Price: $${
                parseFloat(cartItem.price).toFixed(2) *
                parseFloat(cartItem.quantity)
              }`
            );
          }
        } else {
          if (cartItem.price) {
            total += parseFloat(parseFloat(cartItem.price).toFixed(2));
            data.push(`Price: $${parseFloat(cartItem.price).toFixed(2)}`);
          }
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
          data.push("Note: " + cartItem.extraDetails);
          data.push("\x0A");
        }

        data.push("\x0A" + "\x0A");
      });

      total = total * 1.13;
      total = total.toFixed(2);

      if (element.paymentMethod === "Cash") {
        //push ending
        data.push(
          "\x0A",
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
          "\x0A" + "\x0A",
          "Payment Method: " + element.paymentMethod + "\x0A" + "\x0A",
          `Total Including (${
            storeDetails.taxRate ? storeDetails.taxRate : "13"
          }% Tax): ` +
            "$" +
            total +
            "\x0A" +
            "\x0A",
          "Change Due: " + "$" + element.changeDue + "\x0A" + "\x0A",
          "------------------------------------------" + "\x0A",
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          //"\x1D" + "\x56" + "\x00",
          reprint === true
            ? "\x1D" + "\x56" + "\x30"
            : "\x1D" +
                "\x56" +
                "\x30" +
                "\x10" +
                "\x14" +
                "\x01" +
                "\x00" +
                "\x05"
        );
      } else {
        data.push(
          "\x0A",
          "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
          "\x0A" + "\x0A",
          "Payment Method: " + element.paymentMethod + "\x0A" + "\x0A",
          `Total Including (${
            storeDetails.taxRate ? storeDetails.taxRate : "13"
          }% Tax): ` +
            "$" +
            total +
            "\x0A" +
            "\x0A",
          "------------------------------------------" + "\x0A",
          "\x0A", // line break
          "\x0A", // line break
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
  }
  return { data: data, total: total };
};

export default ReceiptPrint;
