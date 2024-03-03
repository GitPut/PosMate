import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  customersList,
  setCartState,
  setCustomersList,
  storeDetailState,
} from "state/state";
import { Ionicons, Entypo } from "@expo/vector-icons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { auth, db } from "state/firebaseConfig";
import CartItem from "components/cart/CartItem";
import { TouchableWithoutFeedback } from "react-native";
import SavedCustomerItem from "./components/SavedCustomerItem";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const SavedCustomersModal = ({
  setSaveCustomerModal,
  setOngoingDelivery,
  setNameForDelivery,
  setPhoneForDelivery,
  setAddressForDelivery,
  setBuzzCodeForDelivery,
  setUnitNumberForDelivery,
  setDeliveryChecked,
  setsavedCustomerDetails,
  setDeliveryModal,
}) => {
  const [customerSelected, setcustomerSelected] = useState(null);
  const { height, width } = useWindowDimensions();
  const [search, setsearch] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setaddress] = useState(null);
  const [buzzCode, setBuzzCode] = useState(null);
  const [unitNumber, setUnitNumber] = useState(null);
  const customers = customersList.use();
  const storeDetails = storeDetailState.use();

  useEffect(() => {
    setName(customerSelected?.name);
    setPhone(customerSelected?.phone);
    setaddress(customerSelected?.address);
    setBuzzCode(customerSelected?.buzzCode);
    setUnitNumber(customerSelected?.unitNumber);
  }, [customerSelected]);

  const removeCustomerOrder = (removeIndex) => {
    const updatedOrderHistory = structuredClone(customerSelected.orders);
    updatedOrderHistory.splice(removeIndex, 1);
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("customers")
      .doc(customerSelected.id)
      .update({
        orders: updatedOrderHistory,
      });
    setcustomerSelected((prev) => ({ ...prev, orders: updatedOrderHistory }));
  };

  const PrevOrderItem = ({ prevOrder, prevOrderIndex }) => {
    return (
      <View
        style={{
          borderBottomColor: "#F3F2F2",
          borderBottomWidth: 2,
          paddingTop: 20,
          paddingBottom: 25,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              marginBottom: 15,
              fontSize: 16,
              fontFamily: "archivo-600",
            }}
          >
            Order #{prevOrderIndex + 1}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              title="Pickup"
              onPress={() => {
                setCartState(prevOrder.cart);
                setOngoingDelivery(true);
                setNameForDelivery(customerSelected.name);
                setPhoneForDelivery(customerSelected.phone);
                setAddressForDelivery(customerSelected.address);
                setBuzzCodeForDelivery(customerSelected.buzzCode);
                setUnitNumberForDelivery(customerSelected.unitNumber);
                setDeliveryChecked(false);
                setSaveCustomerModal(false);
              }}
              style={{ backgroundColor: "#4050B5", marginRight: 10 }}
              titleStyle={{ textTransform: "capitalize" }}
            />
            {storeDetails.acceptDelivery && (
              <Button
                disabled={!customerSelected.address}
                title="Delivery"
                onPress={() => {
                  setCartState(prevOrder.cart);
                  setOngoingDelivery(true);
                  setNameForDelivery(customerSelected.name);
                  setPhoneForDelivery(customerSelected.phone);
                  setAddressForDelivery(customerSelected.address);
                  setBuzzCodeForDelivery(customerSelected.buzzCode);
                  setUnitNumberForDelivery(customerSelected.unitNumber);
                  setDeliveryChecked(true);
                  setSaveCustomerModal(false);
                }}
                style={[
                  { backgroundColor: "#4050B5", marginRight: 10 },
                  !customerSelected.address && { opacity: 0.5 },
                ]}
                titleStyle={{ textTransform: "capitalize" }}
              />
            )}
            <TouchableOpacity
              onPress={() => removeCustomerOrder(prevOrderIndex)}
            >
              <Ionicons
                name="ios-add-circle"
                style={[
                  styles.productRemoveIcon,
                  {
                    transform: [{ rotate: "45deg" }],
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {prevOrder.cart?.map((cartItem, index) => (
          <CartItem cartItem={cartItem} index={index} isPrev={true} />
        ))}
      </View>
    );
  };

  const [addPressed, setaddPressed] = useState(false);

  const closeAll = () => {
    setDeliveryModal(false);
    setSaveCustomerModal(false);
  };

  return (
    <TouchableOpacity
      onPress={closeAll}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <TouchableWithoutFeedback>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <View style={styles.topGroup}>
              <View style={styles.topRow}>
                <TouchableOpacity onPress={() => setSaveCustomerModal(false)}>
                  <Entypo name="chevron-left" style={styles.goBackIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={closeAll}>
                  <Ionicons name="md-close" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.savedCustomersTxt}>Saved Customers</Text>
            </View>
            <View style={styles.bottomGroup}>
              <TextInput
                style={styles.searchSavedCustomersBox}
                placeholder="Enter Any Customer Details"
              />
              <View style={styles.scrollArea}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={
                    styles.scrollArea_contentContainerStyle
                  }
                >
                  <SavedCustomerItem style={styles.savedCustomerItem} />
                  <SavedCustomerItem style={styles.savedCustomerItem1} />
                  <SavedCustomerItem style={styles.savedCustomerItem2} />
                  <SavedCustomerItem style={styles.savedCustomerItem3} />
                  <SavedCustomerItem style={styles.savedCustomerItem4} />
                  <SavedCustomerItem style={styles.savedCustomerItem5} />
                  <SavedCustomerItem style={styles.savedCustomerItem6} />
                </ScrollView>
              </View>
            </View>
          </View>
        </div>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default SavedCustomersModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "space-around",
    width: 540,
    height: 608,
  },
  topGroup: {
    width: 493,
    height: 59,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topRow: {
    width: 493,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goBackIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
  },
  closeIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
  },
  savedCustomersTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  bottomGroup: {
    width: 439,
    height: 454,
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchSavedCustomersBox: {
    width: 439,
    height: 54,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
  },
  scrollArea: {
    width: 439,
    height: 325,
  },
  scrollArea_contentContainerStyle: {
    height: 325,
    width: 439,
  },
  savedCustomerItem: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem1: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem2: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem3: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem4: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem5: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem6: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
});
