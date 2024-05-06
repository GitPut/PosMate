import ReceiptPrint from "components/functional/ReceiptPrint";
import { auth, db } from "state/firebaseConfig";
import { resetPosHomeState, updatePosHomeState } from "state/posHomeState";
import { setCartState, setCustomersList } from "state/state";
import qz from "qz-tray";
import {
  AddressType,
  CartItemProp,
  CustomerProp,
  CustomersOrdersProp,
  MyDeviceDetailsProps,
  StoreDetailsProps,
} from "types/global";
import firebase from "firebase/compat/app";

interface PrintProps {
  dontAddToOngoing: boolean;
  method?: "deliveryOrder" | "pickupOrder" | "inStoreOrder" | "Card" | "Cash";
  discountAmount: string | null;
  deliveryChecked: boolean;
  changeDue: string;
  savedCustomerDetails: {
    id: string;
    orders: CustomersOrdersProp[];
  } | null;
  name: string;
  phone: string;
  address?: AddressType | null;
  buzzCode?: string | null;
  unitNumber?: string | null;
  cartNote: string;
  customers: CustomerProp[];
  cart: CartItemProp[];
  storeDetails: StoreDetailsProps;
  myDeviceDetails: MyDeviceDetailsProps;
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

  try {
    let newVal = 0;
    const finalCart = cart;
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      const quantity = parseFloat(element.quantity ?? "1");
      try {
        newVal += parseFloat(cart[i].price) * quantity;
      } catch (error) {
        // console.log(error);
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
          price: (-(newVal * discount)).toString(),
          description: "Discount Applied to Cart",
          options: [],
          extraDetails: null,
          quantityNotChangable: true,
          percent: discount.toString(),
        });
      } else {
        finalCart.push({
          name: "Cart Discount: " + discountAmount,
          price: (-parseFloat(discountAmount)).toString(),
          description: "Discount Applied to Cart",
          options: [],
          extraDetails: null,
          quantityNotChangable: true,
        });
      }
    }

    if (!myDeviceDetails.id) {
      return alert("Please set up a device in Settings -> Devices");
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
      const today = firebase.firestore.Timestamp.now();

      const element = {
        cartNote: cartNote,
        date: today,
        transNum: transNum,
        method: method,
        cart: finalCart,
        customer: {
          name: name,
          phone: phone,
          address: address ?? null,
          buzzCode: buzzCode ?? null,
          unitNumber: unitNumber ?? null,
        },
        id: transNum,
      };

      const data = ReceiptPrint(element, storeDetails);

      if (!dontAddToOngoing) {
        // console.log("Adding to pending orders");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("pendingOrders")
          .add({
            date: today,
            transNum: transNum,
            method: "deliveryOrder",
            cart: finalCart,
            cartNote: cartNote,
            total: data.total.toFixed(2),
            customer: {
              name: name ?? null,
              phone: phone ?? null,
              address: address ?? null,
              buzzCode: buzzCode ?? null,
              unitNumber: unitNumber ?? null,
            },
            online: false,
          });
      }

      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        // console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        qz.websocket
          .connect()
          .then(function () {
            if (!myDeviceDetails.printToPrinter) {
              alert("You must specify a printer in device settings");
              return;
            }
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            // console.error("error printing: ", err);
            // console.log("data: ", data);
            // console.log("myDeviceDetails: ", myDeviceDetails);
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alert("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alert(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else if (err.message.includes("Cannot find printer with name")) {
              alert("Printer not found. Please check your printer settings.");
            } else {
              alert(
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
      const today = firebase.firestore.Timestamp.now();

      const element = {
        cartNote: cartNote,
        date: today,
        transNum: transNum,
        method: method,
        cart: finalCart,
        customer: {
          name: name,
          phone: phone,
          // address: address,
        },
        id: transNum,
      };

      const data = ReceiptPrint(element, storeDetails);

      if (!dontAddToOngoing) {
        // console.log("Adding to pending orders");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("pendingOrders")
          .add({
            date: today,
            transNum: transNum,
            method: "pickupOrder",
            cart: finalCart,
            cartNote: cartNote,
            total: data.total.toFixed(2),
            customer: {
              name: name ?? null,
              phone: phone ?? null,
              address: address ?? null,
              buzzCode: buzzCode ?? null,
              unitNumber: unitNumber ?? null,
            },
            online: false,
          });
      }

      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        // console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        qz.websocket
          .connect()
          .then(function () {
            if (!myDeviceDetails.printToPrinter) return;
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            // console.error("error printing: ", err);
            // console.log("data: ", data);
            // console.log("myDeviceDetails: ", myDeviceDetails);
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alert("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alert(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else if (err.message.includes("Cannot find printer with name")) {
              alert("Printer not found. Please check your printer settings.");
            } else {
              alert(
                "An error occured while trying to print. Try refreshing the page and trying again."
              );
            }
          });
      }

      setCartState([]);
      resetPosHomeState();
    } else {
      const today = firebase.firestore.Timestamp.now();
      const element = {
        cartNote: cartNote,
        date: today,
        transNum: transNum,
        method: "inStoreOrder" as const,
        cart: finalCart,
        customer: {
          name: name,
          phone: phone,
          address: address ?? null,
          buzzCode: buzzCode ?? null,
          unitNumber: unitNumber ?? null,
        },
        changeDue: changeDue,
        paymentMethod: method,
        id: transNum,
      };

      console.log("Adding element to pending orders: ", element);

      const data = ReceiptPrint(element, storeDetails);

      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("pendingOrders")
        .add({
          date: today,
          transNum: transNum,
          method: "inStoreOrder",
          paymentMethod: method,
          cart: finalCart,
          cartNote: cartNote,
          total: data.total.toFixed(2),
          customer: {
            name: name ?? null,
            phone: phone ?? null,
            address: address ?? null,
            buzzCode: buzzCode ?? null,
            unitNumber: unitNumber ?? null,
          },
          online: false,
        });
      if (
        myDeviceDetails.sendPrintToUserID &&
        myDeviceDetails.useDifferentDeviceToPrint
      ) {
        // console.log("Sending print to different user");
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("devices")
          .doc(myDeviceDetails.sendPrintToUserID.value)
          .collection("printRequests")
          .add({
            printData: data.data,
          });
      } else {
        qz.websocket
          .connect()
          .then(function () {
            if (!myDeviceDetails.printToPrinter) return;
            const config = qz.configs.create(myDeviceDetails.printToPrinter);
            return qz.print(config, data.data);
          })
          .then(qz.websocket.disconnect)
          .catch(function (err) {
            // console.error("error printing: ", err);
            // console.log("data: ", data);
            // console.log("myDeviceDetails: ", myDeviceDetails);
            if (
              err.message.includes(
                "A printer must be specified before printing"
              )
            ) {
              alert("You must specify a printer in device settings");
            } else if (
              err.message.includes("Unable to establish connection with QZ")
            ) {
              alert(
                "You do not have Divine POS Helper installed. Please download from general settings"
              );
            } else if (err.message.includes("Cannot find printer with name")) {
              alert("Printer not found. Please check your printer settings.");
            } else {
              alert(
                "An error occured while trying to print. Try refreshing the page and trying again."
              );
            }
          });
      }
    }

    setCartState([]);
    resetPosHomeState();
  } catch (error) {
    // console.log(error);
  }
};

export default Print;
