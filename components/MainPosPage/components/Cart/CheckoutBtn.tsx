import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth, db } from "state/firebaseConfig";
import Print from "./Print";

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

interface Customer {
  id: string;
  name: string;
  orders?: CartItem[]; // Adjust according to actual structure
  // other customer details
}

interface OrderUpdate {
  id: string;
  // Other properties relevant to updating an order
}

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

interface CheckoutBtnProps {
  updatingOrder?: OrderUpdate | null;
  cart: CartItem[];
  setCartState: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setOngoingDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setPhone: React.Dispatch<React.SetStateAction<string | null>>;
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setDeliveryChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setupdatingOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setsavedCustomerDetails: React.Dispatch<
    React.SetStateAction<Customer | null | undefined>
  >;
  setDiscountAmount: React.Dispatch<React.SetStateAction<string | null>>;
  setBuzzCode: React.Dispatch<React.SetStateAction<string | null>>;
  setUnitNumber: React.Dispatch<React.SetStateAction<string | null>>;
  setCashModal: React.Dispatch<React.SetStateAction<boolean>>;
  ongoingDelivery: boolean;
  deliveryChecked: boolean;
  storeDetails: StoreDetails;
  discountAmount: string;
  setDeliveryModal: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeDue: React.Dispatch<React.SetStateAction<string | null>>;
  setCustomersList: React.Dispatch<React.SetStateAction<Customer[]>>;
  customers: Customer[];
  savedCustomerDetails: Customer | null | undefined;
  myDeviceDetails: any; // Define more specifically if possible
  name: string;
  phone: string;
  address: string;
  changeDue: string;
  buzzCode: string;
  unitNumber: string;
  cartNote?: string | null;
  setcartNote: React.Dispatch<React.SetStateAction<string | null>>;
}

const CheckoutBtn: React.FC<CheckoutBtnProps> = ({
  updatingOrder,
  cart,
  setCartState,
  setOngoingDelivery,
  setName,
  setPhone,
  setAddress,
  setDeliveryChecked,
  setupdatingOrder,
  setsavedCustomerDetails,
  setDiscountAmount,
  setBuzzCode,
  setUnitNumber,
  setCashModal,
  ongoingDelivery,
  deliveryChecked,
  storeDetails,
  discountAmount,
  setDeliveryModal,
  setChangeDue,
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
  cartNote,
  setcartNote,
}) => {
  if (updatingOrder) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Pressable
          style={styles.checkoutBtn}
          disabled={cart.length < 1}
          onPress={() => {
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(updatingOrder.id)
              .delete();

            Print({
              method: deliveryChecked ? "deliveryOrder" : "pickupOrder",
              dontAddToOngoing: false,
              deliveryChecked: deliveryChecked,
              storeDetails: storeDetails,
              cart: cart,
              setCartState: setCartState,
              setDiscountAmount: setDiscountAmount,
              discountAmount: discountAmount,
              setDeliveryModal: setDeliveryModal,
              setName: setName,
              setPhone: setPhone,
              setAddress: setAddress,
              setChangeDue: setChangeDue,
              setDeliveryChecked: setDeliveryChecked,
              setCustomersList: setCustomersList,
              customers: customers,
              savedCustomerDetails: savedCustomerDetails,
              myDeviceDetails: myDeviceDetails,
              name: name,
              phone: phone,
              address: address,
              changeDue: changeDue,
              buzzCode: buzzCode,
              unitNumber: unitNumber,
              setUnitNumber: setUnitNumber,
              setBuzzCode: setBuzzCode,
              cartNote: cartNote,
              setcartNote: setcartNote,
            });
            setOngoingDelivery(null);
            setName("");
            setPhone("");
            setAddress(null);
            setDeliveryChecked(false);
            setupdatingOrder(false);
            setsavedCustomerDetails(null);
            setDiscountAmount(null);
          }}
        >
          <Text style={styles.checkoutLbl}>Update</Text>
        </Pressable>
        <Pressable
          style={[styles.checkoutBtn, { backgroundColor: "red" }]}
          onPress={() => {
            setCartState([]);
            setName("");
            setPhone("");
            setAddress(null);
            setDeliveryChecked(false);
            setOngoingDelivery(null);
            setupdatingOrder(false);
            setsavedCustomerDetails(null);
            setDiscountAmount(null);
            setBuzzCode("");
            setUnitNumber("");
            setcartNote(null);
          }}
        >
          <Text style={styles.checkoutLbl}>Cancel</Text>
        </Pressable>
      </View>
    );
  }

  if (!ongoingDelivery) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Pressable
          style={styles.checkoutBtn}
          onPress={() => setCashModal(true)}
          disabled={cart.length < 1 || ongoingDelivery}
        >
          <Text style={styles.checkoutLbl}>Cash</Text>
        </Pressable>
        <Pressable
          style={styles.checkoutBtn}
          onPress={() => {
            Print({
              method: "Card",
              deliveryChecked: deliveryChecked,
              storeDetails: storeDetails,
              cart: cart,
              setCartState: setCartState,
              setDiscountAmount: setDiscountAmount,
              discountAmount: discountAmount,
              setDeliveryModal: setDeliveryModal,
              setName: setName,
              setPhone: setPhone,
              setAddress: setAddress,
              setChangeDue: setChangeDue,
              setDeliveryChecked: setDeliveryChecked,
              setCustomersList: setCustomersList,
              customers: customers,
              savedCustomerDetails: savedCustomerDetails,
              myDeviceDetails: myDeviceDetails,
              name: name,
              phone: phone,
              address: address,
              changeDue: changeDue,
              buzzCode: buzzCode,
              unitNumber: unitNumber,
              setUnitNumber: setUnitNumber,
              setBuzzCode: setBuzzCode,
              cartNote: cartNote,
              setcartNote: setcartNote,
            });
            setDiscountAmount(null);
          }}
          disabled={cart.length < 1 || ongoingDelivery}
        >
          <Text style={styles.checkoutLbl}>Card</Text>
        </Pressable>
      </View>
    );
  }
  if (ongoingDelivery && cart.length > 0) {
    return (
      <Pressable
        style={styles.checkoutBtn}
        onPress={() => {
          Print({
            method: deliveryChecked ? "deliveryOrder" : "pickupOrder",
            dontAddToOngoing: false,
            deliveryChecked: deliveryChecked,
            storeDetails: storeDetails,
            cart: cart,
            setCartState: setCartState,
            setDiscountAmount: setDiscountAmount,
            discountAmount: discountAmount,
            setDeliveryModal: setDeliveryModal,
            setName: setName,
            setPhone: setPhone,
            setAddress: setAddress,
            setChangeDue: setChangeDue,
            setDeliveryChecked: setDeliveryChecked,
            setCustomersList: setCustomersList,
            customers: customers,
            savedCustomerDetails: savedCustomerDetails,
            myDeviceDetails: myDeviceDetails,
            name: name,
            phone: phone,
            address: address,
            changeDue: changeDue,
            buzzCode: buzzCode,
            unitNumber: unitNumber,
            setUnitNumber: setUnitNumber,
            setBuzzCode: setBuzzCode,
            cartNote: cartNote,
            setcartNote: setcartNote,
          });
          setOngoingDelivery(null);
          setName("");
          setPhone("");
          setAddress(null);
          setDeliveryChecked(false);
          setDiscountAmount(null);
        }}
      >
        <Text style={styles.checkoutLbl}>Checkout</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={styles.checkoutBtn}
        onPress={() => {
          setOngoingDelivery(null);
          setDeliveryChecked(false);
          setName(null);
          setPhone(null);
          setAddress(null);
          setChangeDue(null);
          setDiscountAmount(null);
        }}
      >
        <Text style={styles.checkoutLbl}>Cancel</Text>
      </Pressable>
    );
  }
};

export default CheckoutBtn;

const styles = StyleSheet.create({
  checkoutBtn: {
    width: 170,
    height: 48,
    backgroundColor: "#1a2951",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutLbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
});
