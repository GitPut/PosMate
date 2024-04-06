import React, { useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  cartState,
  customersList,
  myDeviceDetailsState,
  setCartState,
  storeDetailState,
  userStoreState,
  setIsSignedInSettingsState,
  setCustomersList,
} from "state/state";
import { useHistory } from "react-router-dom";
import { auth, db } from "state/firebaseConfig";
import ReceiptPrint from "components/functional/ReceiptPrint";
import CashScreen from "components/modals/PayByCashModal";
import PendingOrderModal from "components/modals/PendingOrdersModal/PendingOrdersModal";
import SettingsPasswordModal from "components/modals/SettingsPasswordModal";
import DiscountModal from "components/modals/DiscountModal/DiscountModal";
import PhoneOrderModal from "components/modals/PhoneOrderModal/PhoneOrderModal";
import SavedCustomersModal from "components/modals/SavedCustomersModal/SavedCustomersModal";
import ClockinModal from "components/modals/ClockInModal/ClockinModal";
import LeftMenuBar from "./components/LeftMenuBar";
import Cart from "./components/Cart";
import Modal from "react-native-modal";
import Print from "./components/Cart/Print";
import CategorySection from "./components/CategorySection";
import ProductsSection from "./components/ProductsSection";

function OrderPagePosHome() {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const [section, setsection] = useState(
    catalog.categories.length > 0 ? catalog.categories[0] : ""
  );
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const [ongoingDelivery, setOngoingDelivery] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(null);
  const [buzzCode, setBuzzCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [changeDue, setChangeDue] = useState("");
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const [cartSub, setCartSub] = useState(0);
  const [saveCustomerModal, setSaveCustomerModal] = useState(false);
  const [savedCustomerDetails, setsavedCustomerDetails] = useState(null);
  const [ongoingOrderListModal, setongoingOrderListModal] = useState(false);
  const [settingsPasswordModalVis, setsettingsPasswordModalVis] =
    useState(false);
  const history = useHistory();
  const [updatingOrder, setupdatingOrder] = useState(false);
  const [ongoingListState, setongoingListState] = useState([]);
  const customers = customersList.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const [clockinModal, setclockinModal] = useState(false);
  const [discountModal, setdiscountModal] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(null);
  const [cartNote, setcartNote] = useState(null);

  function parseDate(input: Date) {
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
  }

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("pendingOrders")
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
          if (
            doc.data().online &&
            !doc.data().printed &&
            myDeviceDetails.printOnlineOrders
          ) {
            console.log("Printing");
            const data = ReceiptPrint(doc.data(), storeDetails);
            const qz = require("qz-tray");
            qz.websocket
              .connect()
              .then(function () {
                const config = qz.configs.create(
                  myDeviceDetails.printToPrinter
                );
                return qz.print(config, data.data);
              })
              .then(qz.websocket.disconnect)
              .catch(function (err) {
                console.error("error printing: ", err);
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
                } else {
                  alert(
                    "An error occured while trying to print. Try refreshing the page and trying again."
                  );
                }
              });
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(doc.id)
              .update({
                printed: true,
              });
          }
        });

        const sortedArray = list.sort((a, b) => {
          const dateA = a.online ? parseDate(a.date) : a.date.toDate();
          const dateB = b.online ? parseDate(b.date) : b.date.toDate();

          // Compare dates
          return dateB - dateA;
        });

        setongoingListState(sortedArray);
      });

    return () => unsub();
  }, []);

  useEffect(() => {
    // console.log("cart", cart);
    if (cart.length > 0) {
      let newVal = 0;
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
          setCartSub(parseFloat(newVal) - parseFloat(newVal) * discount);
        } else {
          setCartSub(parseFloat(newVal) - parseFloat(discountAmount));
        }
      } else {
        setCartSub(newVal);
      }
    } else {
      setCartSub(0);
    }
  }, [cart, deliveryChecked, discountAmount]);

  useEffect(() => {
    catalog.products.map((product, index) => {
      if (product.category === section) {
        document.getElementById(product.id).style.display = "flex";
      } else {
        document.getElementById(product.id).style.display = "none";
      }
    });
  }, [section]);

  return (
    <View style={[styles.container, { maxHeight: height, maxWidth: width }]}>
      {width > 1250 && (
        <LeftMenuBar
          setongoingOrderListModal={setongoingOrderListModal}
          setclockinModal={setclockinModal}
          setDeliveryModal={setDeliveryModal}
          setdiscountModal={setdiscountModal}
          setsettingsPasswordModalVis={setsettingsPasswordModalVis}
          ongoingOrderListModal={ongoingOrderListModal}
          clockinModal={clockinModal}
          deliveryModal={deliveryModal}
          discountModal={discountModal}
          settingsPasswordModalVis={settingsPasswordModalVis}
          setIsSignedInSettingsState={setIsSignedInSettingsState}
          history={history}
          storeDetails={storeDetails}
        />
      )}
      <View
        style={[
          styles.menuContainer,
          width > 1300 ? { width: "65%" } : { width: "58%" },
          width < 1000 && { width: "100%" },
        ]}
      >
        <CategorySection
          catalog={catalog}
          section={section}
          setsection={setsection}
        />
        <ProductsSection catalog={catalog} />
      </View>
      <Cart
        cart={cart}
        setCartState={setCartState}
        setDiscountAmount={setDiscountAmount}
        discountAmount={discountAmount}
        storeDetails={storeDetails}
        deliveryChecked={deliveryChecked}
        cartSub={cartSub}
        width={width}
        setOngoingDelivery={setOngoingDelivery}
        setName={setName}
        setPhone={setPhone}
        setAddress={setAddress}
        setupdatingOrder={setupdatingOrder}
        setsavedCustomerDetails={setsavedCustomerDetails}
        setBuzzCode={setBuzzCode}
        setUnitNumber={setUnitNumber}
        setChangeDue={setChangeDue}
        changeDue={changeDue}
        setCashModal={setCashModal}
        ongoingDelivery={ongoingDelivery}
        updatingOrder={updatingOrder}
        setDeliveryChecked={setDeliveryChecked}
        setDeliveryModal={setDeliveryModal}
        setCustomersList={setCustomersList}
        customers={customers}
        savedCustomerDetails={savedCustomerDetails}
        myDeviceDetails={myDeviceDetails}
        name={name}
        phone={phone}
        address={address}
        buzzCode={buzzCode}
        unitNumber={unitNumber}
        cartNote={cartNote}
        setcartNote={setcartNote}
        setsaveCustomerChecked={setSaveCustomerModal}
      />

      <PendingOrderModal
        setongoingOrderListModal={setongoingOrderListModal}
        updateOrderHandler={(order) => {
          setCartState(order.cart);
          if (order.cartNote) {
            setcartNote(order.cartNote);
          }
          if (order.isInStoreOrder) {
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(order.id)
              .delete();
          } else {
            setName(order.customer?.name ? order.customer?.name : "");
            setPhone(order.customer?.phone ? order.customer?.phone : "");
            setAddress(
              order.customer?.address ? order.customer?.address : null
            );
            setDeliveryChecked(order.method === "deliveryOrder");
            setOngoingDelivery(true);
            setupdatingOrder(order);
          }
          setongoingOrderListModal(false);
        }}
        ongoingListState={ongoingListState}
        ongoingOrderListModal={ongoingOrderListModal}
      />
      <ClockinModal
        setclockinModal={setclockinModal}
        clockinModal={clockinModal}
      />
      <PhoneOrderModal
        setsavedCustomerDetails={setsavedCustomerDetails}
        setDeliveryModal={setDeliveryModal}
        setOngoingDelivery={setOngoingDelivery}
        setName={setName}
        setPhone={setPhone}
        setAddress={setAddress}
        name={name}
        phone={phone}
        address={address}
        deliveryChecked={deliveryChecked}
        setDeliveryChecked={setDeliveryChecked}
        ongoingDelivery={ongoingDelivery}
        setsaveCustomerModal={setSaveCustomerModal}
        setUnitNumber={setUnitNumber}
        setBuzzCode={setBuzzCode}
        unitNumber={unitNumber}
        buzzCode={buzzCode}
        savedCustomerDetails={savedCustomerDetails}
        deliveryModal={deliveryModal}
        updatingOrder={updatingOrder}
      />

      <SettingsPasswordModal
        setsettingsPasswordModalVis={setsettingsPasswordModalVis}
        settingsPasswordModalVis={settingsPasswordModalVis}
      />
      <Modal
        isVisible={saveCustomerModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        // backdropOpacity={0}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SavedCustomersModal
            setSaveCustomerModal={setSaveCustomerModal}
            setOngoingDelivery={setOngoingDelivery}
            setNameForDelivery={setName}
            setPhoneForDelivery={setPhone}
            setAddressForDelivery={setAddress}
            setBuzzCodeForDelivery={setBuzzCode}
            setUnitNumberForDelivery={setUnitNumber}
            setDeliveryChecked={setDeliveryChecked}
            setsavedCustomerDetails={setsavedCustomerDetails}
            setDeliveryModal={setDeliveryModal}
          />
        </View>
      </Modal>
      <CashScreen
        setCashModal={setCashModal}
        GetTrans={() =>
          Print({
            method: "Cash",
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
          })
        }
        total={(parseFloat(storeDetails.taxRate) >= 0
          ? cartSub * (1 + parseFloat(storeDetails.taxRate) / 100)
          : cartSub * 1.13
        ).toFixed(2)}
        setChangeDue={setChangeDue}
        cashModal={cashModal}
      />
      <DiscountModal
        setdiscountModal={setdiscountModal}
        cartSub={cartSub}
        cart={cart}
        deliveryChecked={deliveryChecked}
        storeDetails={storeDetails}
        setDiscountAmount={setDiscountAmount}
        discountAmount={discountAmount}
        discountModal={discountModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(238,242,255,1)",
    flexDirection: "row",
    alignItems: "center",
  },
  menuContainer: {
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bannerContainer: {
    width: "93%",
    height: 150,
    backgroundColor: "rgba(29,41,78,1)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  logo: {
    height: 75,
    width: 250,
    margin: 10,
  },
});

export default OrderPagePosHome;
