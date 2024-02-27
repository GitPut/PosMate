import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import CategoryBtn from "./components/cartOrder/CategoryBtn";
import ItemContainer from "./components/cartOrder/ItemContainer";
import CartItem from "./components/cartOrder/CartItem";
import UntitledComponent from "./components/cartOrder/UntitledComponent";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  cartState,
  customersList,
  myDeviceDetailsState,
  setCartState,
  storeDetailState,
  userStoreState,
  setCustomersList,
} from "state/state";
import ItemContainerMobile from "./components/cartOrder/ItemContainerMobile";
import Modal from "react-native-modal";
import { useHistory } from "react-router-dom";
import { auth, db } from "state/firebaseConfig";
import ReceiptPrint from "components/functional/ReceiptPrint";
import { logout } from "state/firebaseFunctions";
import CashScreen from "components/modalsNew/CashScreen";
import ChangeScreen from "components/modalsNew/ChangeScreen";
import PendingOrderModal from "components/modalsNew/PendingOrdersModal/PendingOrdersModal";
import SettingsPasswordModal from "components/modalsNew/SettingsPasswordModal";
import DiscountModal from "components/modalsNew/DiscountModal";
import DeliveryScreen from "components/modalsNew/DeliveryScreen";
import SaveCustomer from "components/modalsNew/SaveCustomer";
import ClockinModal from "components/modalsNew/ClockInModal/ClockinModal";
import "./custom.css";

function OrderPagePosHome({ navigation }) {
  const { height, width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const [section, setsection] = useState(
    catalog.categories.length > 0 ? catalog.categories[0] : ""
  );
  const [cartOpen, setcartOpen] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [ongoingDelivery, setOngoingDelivery] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [buzzCode, setBuzzCode] = useState(null);
  const [unitNumber, setUnitNumber] = useState(null);
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [changeDue, setChangeDue] = useState(null);
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
                // console.error(err);
                alert(
                  "An error occured while trying to print. Try refreshing the page and trying again."
                );
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
        setCartSub(newVal + parseFloat(storeDetails.deliveryPrice));
      } else {
        setCartSub(newVal);
      }
      //check if there is a discount in the cart then move it the end of the cart
      if (cart.length > 1) {
        if (!cart[cart.length - 1].name.includes("Cart Discount")) {
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].name.includes("Cart Discount")) {
              console.log("In first if");
              const discountItem = cart[i];
              const newCart = structuredClone(cart);
              newCart.splice(i, 1);

              if (discountItem.percent) {
                newCart.push({
                  ...discountItem,
                  price:
                    (newVal + -discountItem.price) * discountItem.percent * -1,
                });
              } else {
                newCart.push(discountItem);
              }
              setCartState(newCart);
            }
          }
        } else if (cart[cart.length - 1].percent) {
          console.log("In second if");
          const discountItem = cart[cart.length - 1];
          if (
            (newVal + -discountItem.price) * discountItem.percent * -1 !==
            discountItem.price
          ) {
            const newCart = structuredClone(cart);
            newCart.pop();
            newCart.push({
              ...discountItem,
              price: (newVal + -discountItem.price) * discountItem.percent * -1,
            });
            setCartState(newCart);
          }
        }
      }
    } else {
      setCartSub(0);
    }
  }, [cart, deliveryChecked]);

  const Print = (method, dontAddToOngoing) => {
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
            orders: [...savedCustomerDetails.orders, { cart }],
          });
        const indexOfCustomer = customers.findIndex(
          (customer) => customer.id === savedCustomerDetails.id
        );
        const newCustomers = structuredClone(customers);
        newCustomers[indexOfCustomer].orders.push({ cart });
        setCustomersList(newCustomers);
      } else {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("customers")
          .doc(savedCustomerDetails.id)
          .update({
            orders: [{ cart }],
          });
        const indexOfCustomer = customers.findIndex(
          (customer) => customer.id === savedCustomerDetails.id
        );
        const newCustomers = structuredClone(customers);
        newCustomers[indexOfCustomer].orders = [{ cart }];
        setCustomersList(newCustomers);
      }
    }

    const transNum = Math.random().toString(36).substr(2, 9);

    if (method === "deliveryOrder") {
      const today = new Date();

      const element = {
        date: today,
        transNum: transNum,
        method: "deliveryOrder",
        cart: cart,
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
            cart: cart,
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
            // console.error(err);
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          });
      }

      setCartState([]);
      setDeliveryModal(false);
    } else if (method === "pickupOrder") {
      const today = new Date();

      const element = {
        date: today,
        transNum: transNum,
        method: "pickupOrder",
        cart: cart,
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
            cart: cart,
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
            // console.error(err);
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          });
      }

      setCartState([]);
      setDeliveryModal(false);
      setName(null);
      setPhone(null);
      setAddress(null);
      setDeliveryChecked(false);
    } else {
      const today = new Date();
      const element = {
        date: today,
        transNum: transNum,
        method: "inStoreOrder",
        cart: cart,
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
          cart: cart,
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
            // console.error(err);
            alert(
              "An error occured while trying to print. Try refreshing the page and trying again."
            );
          });
      }
    }

    setCartState([]);
    setName(null);
    setPhone(null);
    setAddress(null);
    setDeliveryChecked(false);
    setChangeDue(null);
  };

  useEffect(() => {
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
        setCartSub(newVal + parseFloat(storeDetails.deliveryPrice));
      } else {
        setCartSub(newVal);
      }
    } else {
      setCartSub(0);
    }
  }, [cart]);

  useEffect(() => {
    catalog.products.map((product, index) => {
      if (product.category === section) {
        document.getElementById(product.id).style.display = "flex";
      } else {
        document.getElementById(product.id).style.display = "none";
      }
    });
  }, [section]);

  const CheckoutBtn = () => {
    if (updatingOrder) {
      return (
        <TouchableOpacity
          style={styles.checkoutBtn}
          disabled={cart.length < 1}
          onPress={() => {
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("pendingOrders")
              .doc(updatingOrder.id)
              .delete();

            Print(deliveryChecked ? "deliveryOrder" : "pickupOrder", false);
            setOngoingDelivery(null);
            setName(null);
            setPhone(null);
            setAddress(null);
            setDeliveryChecked(false);
            setupdatingOrder(false);
          }}
        >
          <Text style={styles.checkoutLbl}>Update Order</Text>
        </TouchableOpacity>
      );
    }

    if (ongoingDelivery === null) {
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
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => setCashModal(true)}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles.checkoutLbl}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              Print("Card");
            }}
            disabled={cart.length < 1 || ongoingDelivery}
          >
            <Text style={styles.checkoutLbl}>Card</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (ongoingDelivery && cart.length > 0) {
      return (
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => {
            Print(deliveryChecked ? "deliveryOrder" : "pickupOrder", false);
            setOngoingDelivery(null);
            setName(null);
            setPhone(null);
            setAddress(null);
          }}
        >
          <Text style={styles.checkoutLbl}>Checkout</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => {
            setOngoingDelivery(null);
            setDeliveryChecked(false);
            setName(null);
            setPhone(null);
            setAddress(null);
            setChangeDue(null);
          }}
        >
          <Text style={styles.checkoutLbl}>Cancel</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {width > 1250 && (
        <View style={styles.leftMenuBarContainer}>
          <View>
            <TouchableOpacity
              style={[
                !ongoingOrderListModal &&
                !clockinModal &&
                !deliveryModal &&
                !settingsPasswordModalVis
                  ? styles.activeBtn
                  : styles.notActiveBtn,
              ]}
            >
              <Entypo
                name="menu"
                style={[
                  styles.menuIcon,
                  !ongoingOrderListModal &&
                  !clockinModal &&
                  !deliveryModal &&
                  !settingsPasswordModalVis
                    ? { color: "white" }
                    : { color: "black" },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ongoingOrderListModal ? styles.activeBtn : styles.notActiveBtn,
              ]}
              onPress={() => {
                setongoingOrderListModal(true);
              }}
            >
              <img
                src={require("./assets/images/pendingOrderIcon.png")}
                style={
                  ongoingOrderListModal
                    ? {
                        filter: "invert(100%)",
                        width: 40,
                        height: 40,
                      }
                    : { width: 40, height: 40 }
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[clockinModal ? styles.activeBtn : styles.notActiveBtn]}
              onPress={() => {
                setclockinModal(true);
              }}
            >
              <img
                src={require("./assets/images/clockInIcon.png")}
                style={
                  clockinModal
                    ? {
                        filter: "invert(100%)",
                        width: 40,
                        height: 40,
                      }
                    : { width: 40, height: 40 }
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[deliveryModal ? styles.activeBtn : styles.notActiveBtn]}
              onPress={() => {
                setDeliveryModal(true);
              }}
            >
              <img
                src={require("./assets/images/phoneOrderIcon.png")}
                style={
                  deliveryModal
                    ? {
                        filter: "invert(100%)",
                        width: 40,
                        height: 40,
                      }
                    : { width: 40, height: 40 }
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                settingsPasswordModalVis
                  ? styles.activeBtn
                  : styles.notActiveBtn,
              ]}
              onPress={() => {
                setsettingsPasswordModalVis(true);
              }}
            >
              <img
                src={require("./assets/images/settingsIcon.png")}
                style={
                  settingsPasswordModalVis
                    ? {
                        filter: "invert(100%)",
                        width: 40,
                        height: 40,
                      }
                    : { width: 40, height: 40 }
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={logout}>
            <Feather name="log-out" style={styles.icon}></Feather>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          styles.menuContainer,
          width < 1250 && { width: "62%" },
          width < 1000 && { width: "100%" },
        ]}
      >
        {width < 1000 && (
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // setpage(1);
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
            </TouchableOpacity>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        )}
        {width > 1000 && (
          <View
            style={[
              styles.bannerContainer,
              width < 1000 && {
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={require("./assets/images/image_onW3..png")}
              resizeMode="contain"
              style={[
                styles.logo,
                width < 1000 && { height: 60, maxWidth: 250 },
              ]}
            ></Image>
          </View>
        )}
        <View style={styles.categoryContainer}>
          <Text style={styles.lblTxt}>Menu Category</Text>
          <View style={styles.scrollArea}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
              nativeID="scroll"
            >
              {catalog.categories?.map((category, index) => {
                if (
                  catalog.products.filter(
                    (x) => x.category === category && x.hasImage
                  ).length > 0
                ) {
                  return (
                    <CategoryBtn
                      key={index}
                      category={category}
                      onPress={() => {
                        setsection(category);
                      }}
                      isSelected={section === category}
                      style={styles.activeCategoryBtn}
                      imageUrl={
                        catalog.products[
                          catalog.products.findIndex(
                            (x) => x.category === category && x.hasImage
                          )
                        ]?.imageUrl
                      }
                    />
                  );
                } else {
                  return (
                    <CategoryBtn
                      key={index}
                      category={category}
                      onPress={() => {
                        setsection(category);
                      }}
                      isSelected={section === category}
                      style={styles.categoryBtn}
                      imageUrl={null}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.scrollAreaProducts}>
          <ScrollView
            contentContainerStyle={
              styles.scrollAreaProducts_contentContainerStyle
            }
            nativeID="scroll"
          >
            {catalog.products.map((product, index) =>
              width > 1250 ? (
                <ItemContainer
                  product={product}
                  productIndex={index}
                  key={index}
                  userUid={catalog.docID}
                  style={styles.itemContainer}
                />
              ) : (
                <ItemContainerMobile
                  product={product}
                  productIndex={index}
                  key={index}
                  userUid={catalog.docID}
                  style={{
                    height: 220,
                    width: 160, // Ensure this width accounts for any margins or padding
                    marginBottom: 30,
                  }}
                  setshowProduct={setshowProduct}
                />
              )
            )}
          </ScrollView>
        </View>
      </View>
      {width > 1000 ? (
        <View style={[styles.cartContainer, width < 1250 && { width: "38%" }]}>
          <Text style={styles.myCartTxt}>My Cart</Text>
          {cart.length > 0 ? (
            <View style={styles.cartItems}>
              <ScrollView
                horizontal={false}
                contentContainerStyle={styles.cartItems_contentContainerStyle}
                nativeID="scroll"
              >
                {cart?.map((cartItem, index) => (
                  <CartItem
                    style={styles.cartItem1}
                    key={index}
                    cartItem={cartItem}
                    index={index}
                    removeAction={() => {
                      console.log("Removing");
                      const local = structuredClone(cart);
                      local.splice(index, 1);
                      setCartState(local);
                    }}
                    decreaseAction={() => {
                      const local = structuredClone(cart);
                      local[index].quantity--;
                      setCartState(local);
                    }}
                    increaseAction={() => {
                      const local = structuredClone(cart);
                      if (local[index].quantity) {
                        local[index].quantity++;
                      } else {
                        local[index].quantity = 2;
                      }
                      setCartState(local);
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <Image
              source={require("./assets/images/noItemsImg.png")}
              style={{ width: 200, height: "35%", resizeMode: "contain" }}
            />
          )}
          <View style={styles.totalsContainer}>
            <View style={styles.topGroupTotalsContainer}>
              <UntitledComponent
                amountValue="N/A"
                amountLbl="Discount"
                style={styles.discountRow}
              />
              {deliveryChecked && parseFloat(storeDetails.deliveryPrice) && (
                <UntitledComponent
                  amountValue={`$${parseFloat(
                    storeDetails.deliveryPrice
                  ).toFixed(2)}`}
                  amountLbl="Delivery"
                  style={styles.discountRow}
                />
              )}
              <UntitledComponent
                amountValue={
                  deliveryChecked &&
                  parseFloat(storeDetails.deliveryPrice) &&
                  cartSub > 0
                    ? `$${(
                        cartSub - parseFloat(storeDetails.deliveryPrice)
                      ).toFixed(2)}`
                    : `$${cartSub.toFixed(2)}`
                }
                amountLbl="Subtotal"
                style={styles.subtotalRow}
              />
              <UntitledComponent
                amountValue={`$${(
                  cartSub *
                  (storeDetails.taxRate ? storeDetails.taxRate / 100 : 0.13)
                ).toFixed(2)}`}
                amountLbl="Tax"
                style={styles.taxRow}
              />
            </View>
            <View style={styles.totalRowGroup}>
              <View style={styles.totalRow}>
                <Text style={styles.total2}>Total</Text>
                <Text style={styles.totalValue}>
                  $
                  {(
                    Math.ceil(
                      cartSub *
                        (storeDetails.taxRate
                          ? 1 + storeDetails.taxRate / 100
                          : 1.13) *
                        10
                    ) / 10
                  ).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.discountCodeBtn}
                onPress={() => setdiscountModal(true)}
              >
                <Text style={styles.discountCode}>Discount Code</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CheckoutBtn />
        </View>
      ) : (
        <Modal
          isVisible={cartOpen}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{ margin: 0 }}
        >
          <View
            style={{
              width: width,
              height: height,
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setcartOpen(false);
                }}
              >
                <Feather
                  onPress={() => {
                    setcartOpen(false);
                  }}
                  name="chevron-down"
                  style={{ color: "grey" }}
                  size={40}
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#1D294E",
                  borderRadius: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 80,
                  height: 40,
                  flexDirection: "row",
                  padding: 15,
                }}
              >
                <Feather
                  name="shopping-cart"
                  style={{ color: "white" }}
                  size={22}
                />
                <Text style={{ color: "white", fontSize: 20 }}>
                  {cart.length}
                </Text>
              </View>
            </View>
            <Text style={styles.myCartTxt}>My Cart</Text>
            {cart.length > 0 ? (
              <View style={styles.cartItems}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={styles.cartItems_contentContainerStyle}
                  nativeID="scroll"
                >
                  {cart?.map((cartItem, index) => (
                    <CartItem
                      style={styles.cartItem1}
                      key={index}
                      cartItem={cartItem}
                      index={index}
                      removeAction={() => {
                        console.log("Removing");
                        const local = structuredClone(cart);
                        local.splice(index, 1);
                        setCartState(local);
                      }}
                      decreaseAction={() => {
                        const local = structuredClone(cart);
                        local[index].quantity--;
                        setCartState(local);
                      }}
                      increaseAction={() => {
                        const local = structuredClone(cart);
                        if (local[index].quantity) {
                          local[index].quantity++;
                        } else {
                          local[index].quantity = 2;
                        }
                        setCartState(local);
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            ) : (
              <Image
                source={require("./assets/images/noItemsImg.png")}
                style={{ width: 200, height: "35%", resizeMode: "contain" }}
              />
            )}
            <View style={[styles.totalsContainer, { height: 150 }]}>
              <View style={styles.topGroupTotalsContainer}>
                {deliveryChecked && parseFloat(storeDetails.deliveryPrice) && (
                  <UntitledComponent
                    amountValue={`$${parseFloat(
                      storeDetails.deliveryPrice
                    ).toFixed(2)}`}
                    amountLbl="Delivery"
                    style={styles.discountRow}
                  />
                )}
                <UntitledComponent
                  amountValue={
                    deliveryChecked &&
                    parseFloat(storeDetails.deliveryPrice) &&
                    cartSub > 0
                      ? `$${(
                          cartSub - parseFloat(storeDetails.deliveryPrice)
                        ).toFixed(2)}`
                      : `$${cartSub.toFixed(2)}`
                  }
                  amountLbl="Subtotal"
                  style={styles.subtotalRow}
                />
                <UntitledComponent
                  amountValue={`$${(
                    cartSub *
                    (storeDetails.taxRate ? storeDetails.taxRate / 100 : 0.13)
                  ).toFixed(2)}`}
                  amountLbl="Tax"
                  style={styles.taxRow}
                />
                <View style={styles.totalRow}>
                  <Text style={styles.total2}>Total</Text>
                  <Text style={styles.totalValue}>
                    $
                    {(
                      Math.ceil(
                        cartSub *
                          (storeDetails.taxRate
                            ? 1 + storeDetails.taxRate / 100
                            : 1.13) *
                          10
                      ) / 10
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <CheckoutBtn />
          </View>
        </Modal>
      )}
      <Modal
        isVisible={ongoingOrderListModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <PendingOrderModal
            setongoingOrderListModal={setongoingOrderListModal}
            updateOrderHandler={(order) => {
              setCartState(order.cart);
              setName(order.customer.name);
              setPhone(order.customer.phone);
              setAddress(order.customer.address);
              setDeliveryChecked(order.method === "deliveryOrder");
              setOngoingDelivery(true);
              setongoingOrderListModal(false);
              setupdatingOrder(order);
            }}
            ongoingListState={ongoingListState}
            setongoingListState={setongoingListState}
          />
        </View>
      </Modal>
      <Modal
        isVisible={clockinModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <ClockinModal setclockinModal={setclockinModal} />
        </View>
      </Modal>
      <Modal
        isVisible={deliveryModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <DeliveryScreen
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
          />
        </View>
      </Modal>
      <Modal
        isVisible={settingsPasswordModalVis}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <SettingsPasswordModal
            setsettingsPasswordModalVis={setsettingsPasswordModalVis}
            navigation={navigation}
          />
        </View>
      </Modal>
      <Modal
        isVisible={saveCustomerModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <SaveCustomer
            setSaveCustomerModal={setSaveCustomerModal}
            setOngoingDelivery={setOngoingDelivery}
            setNameForDelivery={setName}
            setPhoneForDelivery={setPhone}
            setAddressForDelivery={setAddress}
            setBuzzCodeForDelivery={setBuzzCode}
            setUnitNumberForDelivery={setUnitNumber}
            setDeliveryChecked={setDeliveryChecked}
            setsavedCustomerDetails={setsavedCustomerDetails}
          />
        </View>
      </Modal>
      <Modal isVisible={cashModal} animationIn="fadeIn" animationOut="fadeOut">
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
          <CashScreen
            setCashModal={setCashModal}
            GetTrans={() => Print("Cash")}
            total={(cartSub * 1.13).toFixed(2)}
            setChangeDue={setChangeDue}
          />
        </View>
      </Modal>
      <Modal
        isVisible={changeModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <ChangeScreen setChangeModal={setChangeModal} />
        </View>
      </Modal>
      <Modal
        isVisible={discountModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
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
          <DiscountModal
            setdiscountModal={setdiscountModal}
            cartSub={cartSub}
            cart={cart}
            deliveryChecked={deliveryChecked}
            storeDetails={storeDetails}
          />
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
  },
  leftMenuBarContainer: {
    width: "5%",
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: "stretch",
  },
  activeBtn: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(29,41,78,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  notActiveBtn: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  menuIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 30,
  },
  menuContainer: {
    width: "67%",
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
  categoryContainer: {
    width: "93%",
    height: 178,
    justifyContent: "space-between",
  },
  lblTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
    marginBottom: 10,
  },
  scrollArea: {
    alignSelf: "stretch",
  },
  scrollArea_contentContainerStyle: {
    width: "93%",
    height: 156,
    paddingBottom: 5,
  },
  activeCategoryBtn: {
    width: 125,
    marginRight: 15,
    height: 150,
  },
  categoryBtn: {
    width: 125,
    marginRight: 18,
    height: 150,
  },
  scrollAreaProducts: {
    width: "95%",
    height: "45%",
    justifyContent: "center",
  },
  scrollAreaProducts_contentContainerStyle: {
    flexWrap: "wrap",
    justifyContent: "space-between", // or 'space-between' if you want equal spacing
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 10,
    marginLeft: 10,
  },
  itemContainer: {
    height: 160,
    width: 290, // Ensure this width accounts for any margins or padding
    marginBottom: 30,
    // marginRight: 20, // You may need to adjust this based on the number of items per row
  },
  cartContainer: {
    width: "28%",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "center",
  },
  myCartTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 24,
    width: "90%",
    height: 29,
  },
  cartItems: {
    width: "90%",
    height: "40%",
  },
  cartItems_contentContainerStyle: {
    height: "100%",
    width: "100%",
  },
  cartItem1: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem2: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem3: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem4: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem5: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  totalsContainer: {
    width: "90%",
    height: 250,
    backgroundColor: "rgba(238,242,255,1)",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topGroupTotalsContainer: {
    width: 280,
    height: 85,
    justifyContent: "space-between",
  },
  discountRow: {
    height: 18,
    alignSelf: "stretch",
  },
  subtotalRow: {
    height: 18,
    alignSelf: "stretch",
  },
  taxRow: {
    height: 18,
    alignSelf: "stretch",
  },
  totalRowGroup: {
    width: 280,
    height: 66,
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalRow: {
    flexDirection: "row",
    height: 18,
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  total2: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
  totalValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
  discountCodeBtn: {
    minWidth: 140,
    minHeight: 35,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  discountCode: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
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

export default OrderPagePosHome;
