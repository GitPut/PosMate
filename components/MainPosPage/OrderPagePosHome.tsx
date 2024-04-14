import React, { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  cartState,
  myDeviceDetailsState,
  storeDetailState,
  userStoreState,
  setIsSignedInSettingsState,
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
import CategorySection from "./components/CategorySection";
import ProductsSection from "./components/ProductsSection";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import CustomCashModal from "components/modals/CustomCashModal";
import AuthPasswordModal from "components/modals/AuthPasswordModal";
import { useAlert } from "react-alert";

function OrderPagePosHome() {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert();

  const { section, deliveryChecked, saveCustomerModal, discountAmount } =
    posHomeState.use();

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
    if (catalog.categories.length > 0) {
      updatePosHomeState({ section: catalog.categories[0] });
    }
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

        // setongoingListState(sortedArray);
        updatePosHomeState({ ongoingListState: sortedArray });
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
          // setCartSub(parseFloat(newVal) - parseFloat(newVal) * discount);
          updatePosHomeState({
            cartSub: parseFloat(newVal) - parseFloat(newVal) * discount,
          });
        } else {
          // setCartSub(parseFloat(newVal) - parseFloat(discountAmount));
          updatePosHomeState({
            cartSub: parseFloat(newVal) - parseFloat(discountAmount),
          });
        }
      } else {
        // setCartSub(newVal);
        updatePosHomeState({ cartSub: newVal });
      }
    } else {
      // setCartSub(0);
      updatePosHomeState({ cartSub: 0 });
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
      {width > 1250 && <LeftMenuBar />}
      <View
        style={[
          styles.menuContainer,
          width > 1300 ? { width: "65%" } : { width: "58%" },
          width < 1000 && { width: "100%" },
        ]}
      >
        <CategorySection catalog={catalog} section={section} />
        <ProductsSection catalog={catalog} />
      </View>
      <Cart />
      <PendingOrderModal />
      <ClockinModal />
      <PhoneOrderModal />
      <SettingsPasswordModal />
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
          <SavedCustomersModal />
        </View>
      </Modal>
      <CashScreen />
      <CustomCashModal />
      <DiscountModal />
      <AuthPasswordModal />
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
