import {
  CartItemProp,
  StoreDetailsProps,
  TransListStateItem,
} from "types/global";
import ParseDate from "./ParseDate";

function ReceiptPrint(
  element: TransListStateItem,
  storeDetails: StoreDetailsProps,
  reprint?: boolean
): { data: string[]; total: number } {
  let data: string[] = [];
  let total: number = 0;

  let date;

  const parsedDate = ParseDate(element.date);
  if (parsedDate) {
    date = parsedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  if (element.method === "deliveryOrder") {
    total += parseFloat(
      storeDetails.deliveryPrice ? storeDetails.deliveryPrice : "0"
    );
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

    element.cart?.map((cartItem: CartItemProp) => {
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");

      if (cartItem.quantity) {
        if (cartItem.price) {
          total +=
            parseFloat(cartItem.price ?? "0") *
            (parseFloat(cartItem.quantity) ?? 1);
        }
        data.push(`Quantity: ${cartItem.quantity}`);
        if (cartItem.price) {
          data.push("\x0A");
          data.push(
            `Price: $${(
              parseFloat(cartItem.price ?? "0") *
              (parseFloat(cartItem.quantity) ?? 1)
            ).toFixed(2)}`
          );
        }
      } else {
        if (cartItem.price) {
          total += parseFloat(cartItem.price);
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

    total =
      parseFloat(storeDetails.taxRate) >= 0
        ? total * (1 + parseFloat(storeDetails.taxRate) / 100)
        : total * 1.13;

    //push ending
    data.push(
      "\x0A",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
      element.cartNote
        ? "\x0A" + "\x0A" + "Note: " + element.cartNote + "\x0A" + "\x0A"
        : "\x0A" + "\x0A",
      "Customer Name: " + element.customer?.name,
      "\x0A" + "\x0A",
      "Customer Phone #:  " + element.customer?.phone,
      "\x0A" + "\x0A",
      "Customer Address: " + element.customer?.address?.label,
      "\x0A" + "\x0A",
      `Unit #: ${
        element.customer?.unitNumber ? element.customer?.unitNumber : "N/A"
      }        Buzz Code: ${
        element.customer?.buzzCode ? element.customer?.buzzCode : "N/A"
      }\x0A\x0A`,
      `Total Including (${
        parseFloat(storeDetails.taxRate) >= 0 ? storeDetails.taxRate : "13"
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

    element.cart?.map((cartItem) => {
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");

      if (cartItem.quantity) {
        if (cartItem.price) {
          total += parseFloat(cartItem.price) * parseFloat(cartItem.quantity);
        }
        data.push(`Quantity: ${cartItem.quantity}`);
        if (cartItem.price) {
          data.push("\x0A");
          data.push(
            `Price: $${(parseFloat(cartItem.price) * parseFloat(cartItem.quantity)).toFixed(2)}`
          );
        }
      } else {
        if (cartItem.price) {
          total += parseFloat(cartItem.price);
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

    total =
      parseFloat(storeDetails.taxRate) >= 0
        ? total * (1 + parseFloat(storeDetails.taxRate) / 100)
        : total * 1.13;

    //push ending
    data.push(
      "\x0A",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
      element.cartNote
        ? "\x0A" + "\x0A" + "Note: " + element.cartNote + "\x0A" + "\x0A"
        : "\x0A" + "\x0A",
      "Customer Name: " + element.customer?.name,
      "\x0A" + "\x0A",
      "Customer Phone #:  " + element.customer?.phone,
      "\x0A" + "\x0A",
      "Customer Address: N/A                            ",
      "\x0A",
      `Total Including (${
        parseFloat(storeDetails.taxRate) >= 0 ? storeDetails.taxRate : "13"
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

    element.cart?.map((cartItem) => {
      data.push(`Name: ${cartItem.name}`);
      data.push("\x0A");

      if (cartItem.quantity) {
        if (cartItem.price) {
          total += parseFloat(cartItem.price) * parseFloat(cartItem.quantity);
        }
        data.push(`Quantity: ${cartItem.quantity}`);
        if (cartItem.price) {
          data.push("\x0A");
          data.push(
            `Price: $${(parseFloat(cartItem.price) * parseFloat(cartItem.quantity)).toFixed(2)}`
          );
        }
      } else {
        if (cartItem.price) {
          total += parseFloat(cartItem.price);
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

    total =
      parseFloat(storeDetails.taxRate) >= 0
        ? total * (1 + parseFloat(storeDetails.taxRate) / 100)
        : total * 1.13;

    if (element.paymentMethod === "Cash") {
      //push ending
      data.push(
        "\x0A",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + "\x0A",
        element.cartNote
          ? "\x0A" + "\x0A" + "Note: " + element.cartNote + "\x0A" + "\x0A"
          : "\x0A" + "\x0A",
        "Payment Method: " + element.paymentMethod + "\x0A" + "\x0A",
        `Total Including (${
          parseFloat(storeDetails.taxRate) >= 0
            ? parseFloat(storeDetails.taxRate)
            : "13"
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
        element.cartNote
          ? "\x0A" + "\x0A" + "Note: " + element.cartNote + "\x0A" + "\x0A"
          : "\x0A" + "\x0A",
        "Payment Method: " + element.paymentMethod + "\x0A" + "\x0A",
        `Total Including (${
          parseFloat(storeDetails.taxRate) >= 0
            ? parseFloat(storeDetails.taxRate)
            : "13"
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
  return { data: data, total: total };
}

export default ReceiptPrint;
