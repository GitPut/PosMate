import ReceiptPrint from "components/functional/ReceiptPrint";
import { auth, db } from "state/firebaseConfig";

// Defining interfaces for props and other objects used
interface CartItem {
  imageUrl?: string;
  quantity?: number;
  name: string;
  price: number | string; // If price is a string, ensure to parse it when doing calculations
  quantityNotChangable?: boolean;
  editableObj?: any; // Specify further if possible
  description?: string;
  extraDetails?: string;
  options: string[]; // Assuming options are an array of strings, adjust if necessary
  percent?: number;
}

interface StoreDetails {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  comSelected: string;
  deliveryPrice: string;
  settingsPassword: string;
  taxRate: string;
  acceptDelivery: boolean;
  deliveryRange: string;
}

interface CustomerOrder {
  cart: CartItem[];
}

interface Customer {
  id: string;
  name: string;
  orders: CustomerOrder[]; // Adjust according to actual structure
  // Add other relevant fields
}

interface DeviceDetails {
  id?: string;
  printToPrinter?: string; // Adjust according to actual structure
  sendPrintToUserID?: {
    value: string;
  };
  useDifferentDeviceToPrint?: boolean;
  // Add other relevant fields
}

interface PrintProps {
  method: string;
  dontAddToOngoing?: boolean;
  deliveryChecked?: boolean;
  storeDetails: StoreDetails;
  cart: CartItem[];
  setCartState: (cart: CartItem[]) => void;
  setDiscountAmount: (amount: string | null) => void;
  discountAmount: string;
  setDeliveryModal: (show: boolean) => void;
  setName: (name: string | null) => void;
  setPhone: (phone: string | null) => void;
  setAddress: (address: string | null) => void;
  setChangeDue: (changeDue: string | null) => void;
  setDeliveryChecked: (checked: boolean) => void;
  setCustomersList: (customers: Customer[]) => void;
  customers: Customer[];
  savedCustomerDetails?: Customer | null | undefined;
  setsavedCustomerDetails: (customer: Customer | null) => void;
  myDeviceDetails: DeviceDetails;
  name: string;
  phone: string;
  address: string;
  changeDue: string;
  buzzCode?: string;
  unitNumber?: string;
  setUnitNumber: (unitNumber: string | null) => void;
  setBuzzCode: (buzzCode: string | null) => void;
  cartNote?: string | null;
  setcartNote: (note: string | null) => void;
  setsaveCustomerChecked: (checked: boolean) => void;
}

const Print: React.FC<PrintProps> = ({
  method,
  dontAddToOngoing,
  deliveryChecked,
  storeDetails,
  cart,
  setCartState,
  setDiscountAmount,
  discountAmount,
  setDeliveryModal,
  setName,
  setPhone,
  setAddress,
  setChangeDue,
  setDeliveryChecked,
  setCustomersList,
  customers,
  savedCustomerDetails,
  myDeviceDetails,
  name,
  phone,
  address,
  changeDue,
  buzzCode,
  unitNumber,
  setUnitNumber,
  setBuzzCode,
  cartNote,
  setcartNote,
  setsavedCustomerDetails,
  setsaveCustomerChecked,
}) => {
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
            err.message.includes("A printer must be specified before printing")
          ) {
            alert("You must specify a printer in device settings");
          } else if (
            err.message.includes("Unable to establish connection with QZ")
          ) {
            alert(
              "You do not have Divine POS Helper installed. Please download from general settings"
            );
          } else {
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          }
        });
    }

    setCartState([]);
    setDiscountAmount(null);
    setDeliveryModal(false);
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
            err.message.includes("A printer must be specified before printing")
          ) {
            alert("You must specify a printer in device settings");
          } else if (
            err.message.includes("Unable to establish connection with QZ")
          ) {
            alert(
              "You do not have Divine POS Helper installed. Please download from general settings"
            );
          } else {
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          }
        });
    }

    setCartState([]);
    setDeliveryModal(false);
    setName(null);
    setPhone(null);
    setAddress(null);
    setUnitNumber(null);
    setBuzzCode(null);
    setDiscountAmount(null);
    setDeliveryChecked(false);
    setsavedCustomerDetails(null);
    setsaveCustomerChecked(false);
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
            err.message.includes("A printer must be specified before printing")
          ) {
            alert("You must specify a printer in device settings");
          } else if (
            err.message.includes("Unable to establish connection with QZ")
          ) {
            alert(
              "You do not have Divine POS Helper installed. Please download from general settings"
            );
          } else {
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          }
        });
    }
  }

  setCartState([]);
  setName(null);
  setPhone(null);
  setAddress(null);
  setDeliveryChecked(false);
  setChangeDue(null);
  setDiscountAmount(null);
  setcartNote("");
  setsavedCustomerDetails(null);
  setsaveCustomerChecked(false);
};

export default Print;
