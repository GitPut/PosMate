import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  TextInput,
} from "react-native";
import {
  Entypo as EntypoIcon,
  Ionicons,
  FontAwesome as FontAwesomeIcon,
  MaterialCommunityIcons as MaterialCommunityIconsIcon,
  MaterialIcons as MaterialIconsIcon,
} from "@expo/vector-icons";
import OrderItem from "./components/OrderItem";
import { auth, db } from "state/firebaseConfig";
import {
  customersList,
  setCartState,
  setCustomersList,
  storeDetailState,
} from "state/state";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GooglePlacesStyles } from "components/functional/GooglePlacesStyles";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

function CustomerDetailsModal({
  setcustomerSelected,
  customerSelected,
  setOngoingDelivery,
  setNameForDelivery,
  setPhoneForDelivery,
  setAddressForDelivery,
  setBuzzCodeForDelivery,
  setUnitNumberForDelivery,
  setDeliveryChecked,
  setsavedCustomerDetails,
  closeAll,
}) {
  const { height, width } = useWindowDimensions();
  const customers = customersList.use();
  const storeDetails = storeDetailState.use();
  const [edit, setEdit] = useState(false);
  const [newName, setnewName] = useState(customerSelected.name);
  const [newPhoneNumber, setnewPhoneNumber] = useState(customerSelected.phone);
  const [newAddress, setnewAddress] = useState(customerSelected.address);
  const [newUnitNumber, setnewUnitNumber] = useState(
    customerSelected.unitNumber
  );
  const [newBuzzCode, setnewBuzzCode] = useState(customerSelected.buzzCode);

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

  return (
    <Pressable
      onPress={() => {
        setcustomerSelected(null);
        closeAll();
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <View style={styles.topGroup}>
              <View style={styles.topRow}>
                <Pressable
                  onPress={() => {
                    setcustomerSelected(null);
                  }}
                >
                  <EntypoIcon name="chevron-left" style={styles.goBackIcon} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setcustomerSelected(null);
                    closeAll();
                  }}
                >
                  <Ionicons name="md-close" style={styles.closeIcon} />
                </Pressable>
              </View>
              {edit ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    placeholder="Name"
                    style={{
                      borderRadius: 10,
                      fontSize: 20,
                      fontWeight: "bold",
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "grey",
                      maxWidth: 200,
                      width: 5 * newName.length,
                      minWidth: 80,
                    }}
                    value={newName}
                    onChangeText={(val) => setnewName(val)}
                  />
                  <Text style={styles.georgesOrders}>'s Orders</Text>
                </View>
              ) : (
                <Text style={styles.georgesOrders}>
                  {customerSelected.name}'s Orders
                </Text>
              )}
            </View>
            <View style={styles.bottomContainer}>
              <View
                style={[
                  styles.customerDetailsContainer,
                  edit && { height: 200 },
                ]}
              >
                <View style={styles.customerPhoneNumberRow}>
                  <FontAwesomeIcon name="phone" style={styles.phoneIcon} />
                  {edit ? (
                    <TextInput
                      placeholder="Phone Number"
                      style={{
                        height: 40,
                        borderRadius: 10,
                        fontSize: 15,
                        backgroundColor: "white",
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "grey",
                      }}
                      value={newPhoneNumber}
                      onChangeText={(val) => setnewPhoneNumber(val)}
                    />
                  ) : (
                    <Text style={styles.phoneNumber}>
                      {customerSelected.phone}
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    styles.addressRow,
                    edit && { alignItems: "flex-start", height: 95 },
                  ]}
                >
                  <EntypoIcon name="home" style={styles.addressIcon} />
                  {edit ? (
                    <View style={{ width: 400 }}>
                      <View
                        style={{
                          width: "60%",
                          height: 40,
                          marginBottom: 15,
                        }}
                      >
                        <GooglePlacesAutocomplete
                          apiOptions={{
                            region: "CA",
                          }}
                          debounce={800}
                          apiKey={GOOGLE_API_KEY}
                          // onSelect={handleAddress}
                          selectProps={{
                            newAddress,
                            onChange: setnewAddress,
                            placeholder: "Enter customer address",
                            defaultValue: newAddress,
                            menuPortalTarget: document.body,
                            styles: GooglePlacesStyles,
                          }}
                          renderSuggestions={(
                            active,
                            suggestions,
                            onSelectSuggestion
                          ) => (
                            <div style={{ width: "80%" }}>
                              {suggestions.map((suggestion) => (
                                <div
                                  className="suggestion"
                                  onClick={(event) => {
                                    onSelectSuggestion(suggestion, event);
                                  }}
                                >
                                  {suggestion.description}
                                </div>
                              ))}
                            </div>
                          )}
                        />
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TextInput
                          placeholder="Unit #"
                          style={{
                            width: "18%",
                            height: 40,
                            backgroundColor: "rgba(255,255,255,1)",
                            borderWidth: 1,
                            borderColor: "grey",
                            borderRadius: 10,
                            padding: 10,
                            marginRight: 15,
                          }}
                          value={newUnitNumber}
                          onChangeText={(val) => setnewUnitNumber(val)}
                        />
                        <TextInput
                          placeholder="Buzz #"
                          style={{
                            width: "18%",
                            height: 40,
                            backgroundColor: "rgba(255,255,255,1)",
                            borderWidth: 1,
                            borderColor: "grey",
                            borderRadius: 10,
                            padding: 10,
                          }}
                          value={newBuzzCode}
                          onChangeText={(val) => setnewBuzzCode(val)}
                        />
                      </View>
                    </View>
                  ) : (
                    <>
                      {customerSelected.address ? (
                        <>
                          {!customerSelected.unitNumber &&
                          !customerSelected.buzzCode ? (
                            <Text style={styles.address}>
                              {customerSelected.address?.label
                                ? customerSelected.address?.label
                                : customerSelected.address
                                ? customerSelected.address
                                : null}
                            </Text>
                          ) : (
                            <View style={styles.addressGroup}>
                              <Text style={styles.address}>
                                {customerSelected.address?.label
                                  ? customerSelected.address?.label
                                  : customerSelected.address
                                  ? customerSelected.address
                                  : null}
                              </Text>
                              {!customerSelected.unitNumber &&
                                !customerSelected.buzzCode && (
                                  <View style={styles.addressExtraDetailsRow}>
                                    {customerSelected.unitNumber && (
                                      <Text style={styles.unitNumber}>
                                        Unit #: {customerSelected.unitNumber}
                                      </Text>
                                    )}
                                    {customerSelected.buzzCode && (
                                      <Text style={styles.buzzCode}>
                                        Buzz Code: {customerSelected.buzzCode}
                                      </Text>
                                    )}
                                  </View>
                                )}
                            </View>
                          )}
                        </>
                      ) : (
                        <Text style={styles.address}>No Address</Text>
                      )}
                    </>
                  )}
                </View>
                <View style={styles.customerOptionsBtnRow}>
                  {edit ? (
                    <Pressable
                      onPress={() => {
                        console.log(
                          "New Name:",
                          newName,
                          " New Phone: ",
                          newPhoneNumber,
                          " New Address: ",
                          newAddress,
                          " New Buzz: ",
                          newBuzzCode,
                          " New Unit: ",
                          newUnitNumber
                        );
                        db.collection("users")
                          .doc(auth.currentUser?.uid)
                          .collection("customers")
                          .doc(customerSelected.id)
                          .update({
                            name: newName,
                            phone: newPhoneNumber,
                            address: newAddress,
                            buzzCode: newBuzzCode,
                            unitNumber: newUnitNumber,
                          })
                          .then(() => console.log("Customer updated"))
                          .catch((e) => console.log(e));
                        const clone = [...customers];
                        const index = clone.findIndex(
                          (e) => e.id === customerSelected.id
                        );
                        clone[index] = {
                          ...clone[index],
                          name: newName,
                          phone: newPhoneNumber,
                          address: newAddress,
                          buzzCode: newBuzzCode,
                          unitNumber: newUnitNumber,
                        };
                        setCustomersList(clone);
                        setcustomerSelected((prev) => ({
                          ...prev,
                          name: newName,
                          phone: newPhoneNumber,
                          address: newAddress,
                          buzzCode: newBuzzCode,
                          unitNumber: newUnitNumber,
                        }));
                        setEdit(false);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <MaterialCommunityIconsIcon
                        name="check"
                        style={styles.editCustomerIcon}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        setEdit(true);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <MaterialCommunityIconsIcon
                        name="pencil"
                        style={styles.editCustomerIcon}
                      />
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => {
                      db.collection("users")
                        .doc(auth.currentUser?.uid)
                        .collection("customers")
                        .doc(customerSelected.id)
                        .delete();
                      setCustomersList(() =>
                        customers.filter((e) => e.id !== customerSelected.id)
                      );
                      setcustomerSelected(null);
                    }}
                  >
                    <FontAwesomeIcon name="trash" style={styles.deleteIcon} />
                  </Pressable>
                </View>
              </View>
              <View style={styles.orderScrollView}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={
                    styles.orderScrollView_contentContainerStyle
                  }
                >
                  {customerSelected.orders?.map((prevOrder, prevOrderIndex) => (
                    <OrderItem
                      key={prevOrderIndex}
                      prevOrder={prevOrder}
                      prevOrderIndex={prevOrderIndex}
                      setOrderPickUp={() => {
                        setCartState(prevOrder.cart);
                        setOngoingDelivery(true);
                        setNameForDelivery(customerSelected.name);
                        setPhoneForDelivery(customerSelected.phone);
                        setAddressForDelivery(customerSelected.address);
                        setBuzzCodeForDelivery(customerSelected.buzzCode);
                        setUnitNumberForDelivery(customerSelected.unitNumber);
                        setDeliveryChecked(false);
                        setcustomerSelected(null);
                        closeAll();
                      }}
                      setOrderDelivery={() => {
                        setCartState(prevOrder.cart);
                        setOngoingDelivery(true);
                        setNameForDelivery(customerSelected.name);
                        setPhoneForDelivery(customerSelected.phone);
                        setAddressForDelivery(customerSelected.address);
                        setBuzzCodeForDelivery(customerSelected.buzzCode);
                        setUnitNumberForDelivery(customerSelected.unitNumber);
                        setDeliveryChecked(true);
                        setcustomerSelected(null);
                        closeAll();
                      }}
                      isDeliverable={
                        storeDetails.acceptDelivery && customerSelected.address
                      }
                      removeCustomerOrder={() => {
                        removeCustomerOrder(prevOrderIndex);
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
              <View style={styles.addNewOrderRow}>
                <Pressable
                  onPress={() => {
                    setsavedCustomerDetails(customerSelected);
                    setOngoingDelivery(true);
                    setNameForDelivery(customerSelected.name);
                    setPhoneForDelivery(customerSelected.phone);
                    setAddressForDelivery(customerSelected.address);
                    setBuzzCodeForDelivery(customerSelected.buzzCode);
                    setUnitNumberForDelivery(customerSelected.unitNumber);
                    setDeliveryChecked(false);
                    setcustomerSelected(null);
                    closeAll();
                  }}
                >
                  <Text style={styles.addNewOrder}>+ Add New Order</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,1)",
    width: 540,
    height: 608,
  },
  topGroup: {
    width: 493,
    height: 59,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
  },
  topRow: {
    width: 493,
    height: 28,
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
  georgesOrders: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  bottomContainer: {
    width: 454,
    height: 454,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  customerDetailsContainer: {
    width: 439,
    height: 157,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    backgroundColor: "#edf1fe",
  },
  customerPhoneNumberRow: {
    width: 395,
    height: 35,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
    marginTop: 20,
  },
  phoneIcon: {
    color: "#1c294e",
    fontSize: 35,
    paddingRight: 15,
  },
  phoneNumber: {
    color: "#121212",
    fontSize: 15,
  },
  addressRow: {
    width: 395,
    height: 42,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
  },
  addressIcon: {
    color: "#1c294e",
    fontSize: 35,
    paddingRight: 10,
  },
  addressGroup: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  address: {
    color: "#121212",
    fontSize: 15,
  },
  addressExtraDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  unitNumber: {
    color: "#121212",
    fontSize: 15,
    marginRight: 30,
  },
  buzzCode: {
    color: "#121212",
    fontSize: 15,
  },
  customerOptionsBtnRow: {
    width: 395,
    height: 35,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  editCustomerIcon: {
    color: "#1c294e",
    fontSize: 32,
  },
  deleteIcon: {
    color: "#1c294e",
    fontSize: 32,
  },
  orderScrollView: {
    height: 239,
  },
  orderScrollView_contentContainerStyle: {
    paddingTop: 20,
    paddingRight: 15,
  },
  addNewOrderRow: {
    width: 439,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  addNewOrder: {
    color: "#121212",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

export default CustomerDetailsModal;
