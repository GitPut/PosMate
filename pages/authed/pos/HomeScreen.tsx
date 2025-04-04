import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
} from "react-native";
import {
  ProductBuilderState,
  cartState,
  myDeviceDetailsState,
  storeDetailState,
  userStoreState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import ReceiptPrint from "components/functional/ReceiptPrint";
import CashScreen from "components/modals/PayByCashModal";
import PendingOrderModal from "components/modals/PendingOrdersModal/PendingOrdersModal";
import SettingsPasswordModal from "components/modals/SettingsPasswordModal";
import DiscountModal from "components/modals/DiscountModal/DiscountModal";
import PhoneOrderModal from "components/modals/PhoneOrderModal/PhoneOrderModal";
import SavedCustomersModal from "components/modals/SavedCustomersModal/SavedCustomersModal";
import ClockinModal from "components/modals/ClockInModal/ClockinModal";
import LeftMenuBar from "pages/authed/pos/MainPosPage/components/LeftMenuBar";
import Cart from "pages/authed/pos/MainPosPage/components/Cart";
import Modal from "react-native-modal-web";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import CustomCashModal from "components/modals/CustomCashModal";
import AuthPasswordModal from "components/modals/AuthPasswordModal";
import { useAlert } from "react-alert";
import qz from "qz-tray";
import ProductBuilderModal from "pages/authed/pos/MainPosPage/components/ProductBuilderModal/ProductBuilderModal";
import CartMobile from "pages/authed/pos/MainPosPage/phoneComponents/CartMobile";
import { Feather } from "@expo/vector-icons";
import ParseDate from "components/functional/ParseDate";
import { TransListStateItem } from "types/global";
const CategorySection = React.lazy(
  () => import("pages/authed/pos/MainPosPage/components/CategorySection")
);
const ProductsSection = React.lazy(
  () => import("pages/authed/pos/MainPosPage/components/ProductsSection")
);

function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const cart = cartState.use();
  const storeDetails = storeDetailState.use();
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert();
  const [cartOpen, setcartOpen] = useState(false);
  // const [openSideBar, setopenSideBar] = useState(false);

  const {
    section,
    deliveryChecked,
    saveCustomerModal,
    discountAmount,
    cartSub,
  } = posHomeState.use();
  const ProductBuilderProps = ProductBuilderState.use();
  if (!storeDetails) return null;

  useEffect(() => {
    if (catalog.categories.length > 0) {
      updatePosHomeState({ section: catalog.categories[0] });
    }
    const unsub = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("pendingOrders")
      .onSnapshot((snapshot) => {
        const list: TransListStateItem[] = [];
        snapshot.forEach((doc) => {
          list.push({
            ...doc.data(),
            id: doc.id,
            cart: doc.data().cart,
            cartNote: doc.data().cartNote,
            customer: doc.data().customer,
            date: doc.data().date,
            method: doc.data().method,
            online: doc.data().online,
            isInStoreOrder: doc.data().method === "inStoreOrder",
          });
          if (
            doc.data().online &&
            !doc.data().printed &&
            myDeviceDetails.printOnlineOrders
          ) {
            const data = ReceiptPrint(
              {
                ...doc.data(),
                cart: doc.data().cart,
                cartNote: doc.data().cartNote,
                date: doc.data().date,
                method: doc.data().method,
                paymentMethod: doc.data().paymentMethod,
                total: doc.data().total,
                transNum: doc.data().transNum,
                id: doc.data().id,
              },
              storeDetails
            );
            qz.websocket
              .connect()
              .then(function () {
                if (!myDeviceDetails.printToPrinter) {
                  alertP.error("You must specify a printer in device settings");
                  return;
                }
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
                } else if (
                  err.message.includes("Cannot find printer with name")
                ) {
                  alertP.error(
                    "Printer not found. Please check your printer settings."
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
          // Parse the dates once and convert to milliseconds since the Unix epoch or 0 if null
          const parsedDateA = ParseDate(a.date);
          const parsedDateB = ParseDate(b.date);

          // Use the parsed dates if not null, otherwise default to 0
          const dateA = parsedDateA ? parsedDateA.getTime() : 0;
          const dateB = parsedDateB ? parsedDateB.getTime() : 0;

          // Compare dates by their numeric timestamps
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
          newVal +=
            parseFloat(cart[i]?.price ?? 0) *
            parseFloat(cart[i]?.quantity ?? "1");
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
          // setCartSub(parseFloat(newVal) - parseFloat(newVal) * discount);
          updatePosHomeState({
            cartSub: newVal - newVal * discount,
          });
        } else {
          // setCartSub(parseFloat(newVal) - parseFloat(discountAmount));
          updatePosHomeState({
            cartSub: newVal - parseFloat(discountAmount),
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
    catalog.products.map((product) => {
      const element = document.getElementById(product.id);
      if (product.category === section) {
        if (element) element.style.display = "flex";
      } else {
        if (element) element.style.display = "none";
      }
    });
  }, [section, catalog]);

  return (
    <View style={[styles.container]}>
      {width > 1250 && <LeftMenuBar />}
      <View
        style={[
          styles.menuContainer,
          width > 1300 ? { width: "65%" } : { width: "58%" },
          width < 1000 && { width: "100%" },
        ]}
      >
        {width < 1000 && (
          <View
            style={{
              flexDirection: "row",
              width: "88%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={() => {
                // setopenSideBar(true);
              }}
              style={{
                backgroundColor: "#1D294E",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                width: 34,
                height: 34,
              }}
            >
              <Feather name="log-out" style={{ color: "white" }} size={20} />
            </Pressable>
            <Pressable
              onPress={() => {
                setcartOpen(true);
              }}
              style={{
                backgroundColor: "#1D294E",
                borderRadius: 10,
                justifyContent: "space-between",
                alignItems: "center",
                width: 58,
                height: 34,
                flexDirection: "row",
                padding: 5,
              }}
            >
              <Feather
                name="shopping-cart"
                style={{ color: "white" }}
                size={20}
              />
              <Text style={{ color: "white", fontSize: 20 }}>
                {cart.length}
              </Text>
            </Pressable>
          </View>
        )}
        {catalog.products.length > 0 && (
          <>
            <CategorySection catalog={catalog} section={section} />
            <ProductsSection catalog={catalog} />
          </>
        )}
      </View>
      {width > 1000 ? (
        <Cart />
      ) : (
        <CartMobile
          cartOpen={cartOpen}
          setcartOpen={setcartOpen}
          cartSub={cartSub}
        />
      )}
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
      <Modal
        isVisible={ProductBuilderProps.isOpen ? true : false}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0}
        style={{
          margin: 0,
        }}
      >
        <View
          style={{
            height: height,
            width: width,
            flexDirection: "row",
          }}
        >
          <View
            style={[
              width > 1400
                ? {
                    height: "100%",
                    width: "70%",
                    borderTopRightRadius: 3,
                  }
                : {
                    height: "100%",
                    width: "100%",
                    borderTopRightRadius: 3,
                  },
            ]}
          >
            {ProductBuilderProps.product && <ProductBuilderModal />}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(238,242,255,1)",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    width: "100%",
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

export default HomeScreen;
