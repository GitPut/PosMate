import ReceiptPrint from "components/functional/ReceiptPrint";
import { auth, db } from "state/firebaseConfig";
import { resetPosHomeState, updatePosHomeState } from "state/posHomeState";
import { setCartState, setCustomersList } from "state/state";
import { useAlert } from "react-alert";

interface PrintProps {
  dontAddToOngoing: boolean;
  method: string;
  discountAmount: string;
  deliveryChecked: boolean;
  changeDue: string;
  savedCustomerDetails: string;
  name: string;
  phone: string;
  address: string;
  buzzCode: string;
  unitNumber: string;
  cartNote: string;
  customers: any[];
  cart: any[];
  storeDetails: object;
  myDeviceDetails: {
    name: string;
    id: string;
    docID: string;
    useDifferentDeviceToPrint: boolean;
    printToPrinter: string;
    sendPrintToUserID: {
      label: string;
      value: string;
    };
    printOnlineOrders: boolean;
  };
}

const Print = ({ ...props }: PrintProps) => {
  const {
    dontAddToOngoing,
    method,
    discountAmount,
    deliveryChecked,
    changeDue,
    savedCustomerDetails,
    name,
    phone,
    address,
    buzzCode,
    unitNumber,
    cartNote,
    customers,
    cart,
    storeDetails,
    myDeviceDetails,
  } = props;
  const alertP = useAlert();


  try {
    let newVal = 0;
    const finalCart = cart;
    for (let i = 0; i < cart.length; i++) {
      try {
        if (cart[i].quantity > 1) {
          newVal += parseFloat(cart[i].price) * cart[i].quantity;
          // console.log("Cart item quantity ", cart[i].quantity);
        } else {
          newVal += parseFloat(cart[i].price);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (deliveryChecked) {
      newVal += parseFloat(storeDetails.deliveryPrice);
    }

    if (discountAmount) {
      if (discountAmount.includes("%")) {
        const discount = parseFloat(discountAmount.replace("%", "")) / 100;
        finalCart.push({
          name: "Cart Discount: " + discount * 100 + "%",
          price: -(newVal * discount),
          description: "Discount Applied to Cart",
          options: [],
          extraDetails: null,
          quantityNotChangable: true,
          percent: discount,
        });
      } else {
        finalCart.push({
          name: "Cart Discount: " + discountAmount,
          price: -parseFloat(discountAmount),
          description: "Discount Applied to Cart",
          options: [],
          extraDetails: null,
          quantityNotChangable: true,
        });
      }
    }

    if (!myDeviceDetails.id) {
      return alertP.error("Please set up a device in Settings -> Devices");
    }

    if (savedCustomerDetails) {
      if (savedCustomerDetails.orders?.length > 0) {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [...savedCustomerDetails.orders, { cart: finalCart }],
          });
        const indexOfCustomer = customers.findIndex(
          (customer) => customer.id === savedCustomerDetails.id
        );
        const newCustomers = structuredClone(customers);
        newCustomers[indexOfCustomer].orders.push({ cart: finalCart });
        setCustomersList(newCustomers);
      } else {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [{ cart: finalCart }],
          });
        const indexOfCustomer = customers.findIndex(
          (customer) => customer.id === savedCustomerDetails.id
        );
        const newCustomers = structuredClone(customers);
        newCustomers[indexOfCustomer].orders = [{ cart: finalCart }];
        setCustomersList(newCustomers);
      }
    }

    const transNum = Math.random().toString(36).substr(2, 9);

    if (method === "deliveryOrder") {
      const today = new Date();

      const element = {
        cartNote: cartNote,
        date: today,
        transNum: transNum,
        method: "deliveryOrder",
        cart: finalCart,
        customer: {
          name: name,
          phone: phone,
          address: address,
          buzzCode: buzzCode,
          unitNumber: unitNumber,
        },
      };

      const data = ReceiptPrint(element, storeDetails);

      if (!dontAddToOngoing) {
        console.log("Adding to pending orders");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("pendingOrders")
          .add({
            date: today,
            transNum: transNum,
            method: "deliveryOrder",
            cart: finalCart,
            cartNote: cartNote,
            total: data.total,
            customer: {
              name: name,
              phone: phone,
              address: address ? address : null,
              buzzCode: buzzCode,
              unitNumber: unitNumber,
            },
          });
      }

      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error("error printing: ", err);
            console.log("data: ", data);
            console.log("myDeviceDetails: ", myDeviceDetails);
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alertP.error("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alertP.error(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else {
              alertP.error(
                "An error occured while trying to print. Try refreshing the page and trying again."
              );
            }
          });
      }

      setCartState([]);
      // setDiscountAmount(null);
      // setDeliveryModal(false);
      updatePosHomeState({
        discountAmount: null,
        deliveryModal: false,
      });
    } else if (method === "pickupOrder") {
      const today = new Date();

      const element = {
        cartNote: cartNote,
        date: today,
        transNum: transNum,
        method: "pickupOrder",
        cart: finalCart,
        customer: {
          name: name,
          phone: phone,
          // address: address,
        },
      };

      const data = ReceiptPrint(element, storeDetails);

      if (!dontAddToOngoing) {
        console.log("Adding to pending orders");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("pendingOrders")
          .add({
            date: today,
            transNum: transNum,
            method: "pickupOrder",
            cart: finalCart,
            cartNote: cartNote,
            total: data.total,
            customer: {
              name: name,
              phone: phone,
              address: address ? address : "null",
            },
          });
      }

      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error("error printing: ", err);
            console.log("data: ", data);
            console.log("myDeviceDetails: ", myDeviceDetails);
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alertP.error("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alertP.error(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else {
              alertP.error(
                "An error occured while trying to print. Try refreshing the page and trying again."
              );
            }
          });
      }

      setCartState([]);
      resetPosHomeState();
    } else {
      const today = new Date();
      const element = {
        cartNote: cartNote,
        date: today,
        transNum: transNum,
        method: "inStoreOrder",
        cart: finalCart,
        customer: {
          name: name,
          phone: phone,
          address: address,
        },
        changeDue: changeDue,
        paymentMethod: method,
      };

      const data = ReceiptPrint(element, storeDetails);

      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("pendingOrders")
        .add({
          date: today,
          transNum: transNum,
          total: data.total,
          method: "inStoreOrder",
          paymentMethod: method,
          cart: finalCart,
          cartNote: cartNote,
        });
      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        const qz = require("qz-tray");
        qz.websocket
          .connect()
          .then(function () {
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            console.error("error printing: ", err);
            console.log("data: ", data);
            console.log("myDeviceDetails: ", myDeviceDetails);
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alertP.error("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alertP.error(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else {
              alertP.error(
                "An error occured while trying to print. Try refreshing the page and trying again."
              );
            }
          });
      }
    }

    setCartState([]);
    resetPosHomeState();
  } catch (error) {
    console.log(error);
  }
};

export default Print;
