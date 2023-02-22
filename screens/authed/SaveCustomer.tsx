import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { cartState, setCartState } from "state/state";
import { Switch } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { addCustomerDetailsToDb } from "state/firebaseFunctions";
import { auth, db } from "state/firebaseConfig";
import CartItem from "components/CartItem";

const SaveCustomer = ({
  setSaveCustomerModal,
  setOngoingDelivery,
  setNameForDelivery,
  setPhoneForDelivery,
  setAddressForDelivery,
  setDeliveryChecked,
  setsavedCustomerDetails,
}) => {
  const [customers, setcustomers] = useState([]);
  const [customerSelected, setcustomerSelected] = useState(null);
  const { height, width } = useWindowDimensions();
  const [search, setsearch] = useState(null);

  useEffect(() => {
    let localCustomers = localStorage.getItem("customers");
    if (localCustomers) {
      localCustomers = JSON.parse(localCustomers);
      setcustomers(localCustomers);
    }
  }, []);

  // useEffect(() => {
  //   db.collection("users")
  //     .doc(auth.currentUser?.uid)
  //     .collection("customers")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         //   console.log(doc.id, " => ", doc.data());
  //         setcustomers((prevState) => [
  //           ...prevState,
  //           { ...doc.data(), id: doc.id },
  //         ]);
  //       });
  //     });
  // }, []);

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
                setAddressForDelivery(null);
                setDeliveryChecked(false);
                setSaveCustomerModal(false);
              }}
              style={{ backgroundColor: "#4050B5", marginRight: 10 }}
              titleStyle={{ textTransform: "capitalize" }}
            />
            <Button
              title="Delivery"
              onPress={() => {
                setCartState(prevOrder.cart);
                setOngoingDelivery(true);
                setNameForDelivery(customerSelected.name);
                setPhoneForDelivery(customerSelected.phone);
                setAddressForDelivery(customerSelected.address);
                setDeliveryChecked(true);
                setSaveCustomerModal(false);
              }}
              style={{ backgroundColor: "#4050B5", marginRight: 10 }}
              titleStyle={{ textTransform: "capitalize" }}
            />
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

  return (
    <>
      <TouchableOpacity
        onPress={() => setSaveCustomerModal(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: width,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 30,
          shadowColor: "rgba(0,0,0,1)",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          elevation: 30,
          shadowOpacity: 0.57,
          shadowRadius: 10,
          width: "35%",
          height: "85%",
          padding: 40,
          alignSelf: "center",
          top: "7.5%",
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                borderBottomColor: "#F3F2F2",
                borderBottomWidth: 1,
                marginBottom: 25,
              },
              customerSelected
                ? { justifyContent: "space-between" }
                : { justifyContent: "center" },
            ]}
          >
            {customerSelected && (
              <TouchableOpacity onPress={() => setcustomerSelected(null)}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  style={styles.personIcon}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                margin: 25,
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {customerSelected
                ? `${customerSelected.name}'s Orders`
                : "Saved Customers"}
            </Text>
            {customerSelected && (
              <TouchableOpacity
                onPress={() => setaddPressed((prev) => !prev)}
                // onPress={() => {
                //   setsavedCustomerDetails(customerSelected);
                //   setOngoingDelivery(true);
                //   setNameForDelivery(customerSelected.name);
                //   setPhoneForDelivery(customerSelected.phone);
                //   setAddressForDelivery(customerSelected.address);
                //   setDeliveryChecked(true);
                //   setSaveCustomerModal(false);
                // }}
              >
                <MaterialCommunityIcons name="plus" style={styles.personIcon} />
                {addPressed && (
                  <View
                    style={{
                      backgroundColor: "white",
                      shadowColor: "rgba(0,0,0,1)",
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      elevation: 50,
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "space-around",
                      padding: 10,
                      position: "absolute",
                      left: 30,
                      bottom: -20,
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginBottom: 5 }}
                      onPress={() => {
                        setsavedCustomerDetails(customerSelected);
                        setOngoingDelivery(true);
                        setNameForDelivery(customerSelected.name);
                        setPhoneForDelivery(customerSelected.phone);
                        setAddressForDelivery(customerSelected.address);
                        setDeliveryChecked(true);
                        setSaveCustomerModal(false);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="car"
                        style={styles.deliveryIcon}
                      />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        setsavedCustomerDetails(customerSelected);
                        setOngoingDelivery(true);
                        setNameForDelivery(customerSelected.name);
                        setPhoneForDelivery(customerSelected.phone);
                        setAddressForDelivery(customerSelected.address);
                        setDeliveryChecked(false);
                        setSaveCustomerModal(false);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="store"
                        style={styles.pickupIcon}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
          {customerSelected ? (
            <View
              style={{
                width: "100%",
                backgroundColor: "#F3F2F2",
                padding: 15,
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="phone"
                  style={[styles.personIcon, { marginRight: 15 }]}
                />
                <Text>{customerSelected.phone}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="home"
                  style={[styles.personIcon, { marginRight: 15 }]}
                />
                <Text>{customerSelected.address}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  db.collection("users")
                    .doc(auth.currentUser?.uid)
                    .collection("customers")
                    .doc(customerSelected.id)
                    .delete();
                  setcustomers((prev) =>
                    prev.filter((e) => e.id !== customerSelected.id)
                  );
                  setcustomerSelected(null);
                }}
                style={{ width: 100 }}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginTop: 10,
                    fontFamily: "archivo-600",
                  }}
                >
                  Delete Customer
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TextInput
              placeholder="Enter any of customer details"
              value={search}
              onChangeText={(val) => setsearch(val)}
              style={{ width: "100%", alignSelf: "center" }}
            />
          )}
          <ScrollView style={{ height: "100%", minHeight: 300 }}>
            {customerSelected ? (
              <View>
                {customerSelected.orders.map((prevOrder, prevOrderIndex) => (
                  <PrevOrderItem
                    prevOrder={prevOrder}
                    prevOrderIndex={prevOrderIndex}
                  />
                ))}
              </View>
            ) : (
              customers.map((customer) => {
                if (
                  search?.length > 0 &&
                  !customer.name?.includes(search) &&
                  !customer.phone?.includes(search) &&
                  !customer.address?.includes(search)
                )
                  return;
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E6E6E6",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 40,
                      marginTop: 15,
                      borderWidth: 1,
                      width: "100%",
                      alignSelf: "center",
                    }}
                    onPress={() => setcustomerSelected(customer)}
                  >
                    <View style={styles.nameGroup}>
                      <MaterialCommunityIcons
                        name="account"
                        style={styles.personIcon}
                      />
                      <Text style={styles.customerNameTxt}>
                        {customer.name}
                      </Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      style={styles.moreInfoIcon}
                    />
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
          {!customerSelected && (
            <Button
              title="Cancel"
              onPress={() => {
                setSaveCustomerModal(false);
              }}
              contentContainerStyle={styles.btn}
              style={{ margin: 25, width: "80%", alignSelf: "center" }}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default SaveCustomer;

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  halfRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  toppingsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 25,
  },
  touchable: {
    margin: 25,
    width: 300,
  },
  modalContainer: {
    padding: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.57,
    shadowRadius: 10,
    width: "35%",
  },
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 25,
    marginBottom: 25,
  },
  nameGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  personIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    marginRight: 10,
  },
  customerNameTxt: {
    fontFamily: "archivo-500",
    color: "#121212",
    fontSize: 15,
  },
  moreInfoIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  innerTxt: {
    fontSize: 13,
    marginBottom: 10,
  },
  headerTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  empty: {
    fontFamily: "archivo-600",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    opacity: 0.44,
  },
  fillTheCart: {
    fontFamily: "archivo-500",
    color: "rgba(74,74,74,1)",
    fontSize: 20,
  },
  openItemContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#64c74c",
    borderLeftWidth: 2,
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  optionsContainer: {
    width: 122,
    height: 38,
    justifyContent: "space-between",
    margin: 13,
    marginLeft: 19,
  },
  optionTxt: {
    fontFamily: "archivo-500",
    color: "rgba(187,187,186,1)",
  },
  editContainer: {
    width: 61,
    height: 38,
    flexDirection: "row",
    margin: 13,
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 19,
  },
  editIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
  },
  editTxt: {
    fontFamily: "archivo-600",
    color: "rgba(74,74,74,1)",
  },
  closedItemContainer: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: 55,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  closedLeftContainer: {
    flexDirection: "row",
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  openCloseIcon: {
    color: "#b1b1b1",
    fontSize: 30,
    marginRight: 15,
  },
  productIndexTxt: {
    fontFamily: "archivo-600",
    color: "#75767e",
    fontSize: 16,
    marginRight: 15,
  },
  productNameTxt: {
    fontFamily: "archivo-600",
    color: "#63646e",
    fontSize: 16,
  },
  closedRightContainer: {
    flexDirection: "row",
    width: "25%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPriceTxt: {
    fontFamily: "archivo-600",
    color: "#63646e",
    fontSize: 16,
  },
  productRemoveIcon: {
    color: "#9f9f9e",
    fontSize: 27,
  },
  deliveryIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  pickupIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
});
