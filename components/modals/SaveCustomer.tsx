import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "@react-native-material/core";
import {
  customersList,
  setCartState,
  setCustomersList,
  storeDetailState,
} from "state/state";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { auth, db } from "state/firebaseConfig";
import CartItem from "components/cart/CartItem";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const SaveCustomer = ({
  setSaveCustomerModal,
  setOngoingDelivery,
  setNameForDelivery,
  setPhoneForDelivery,
  setAddressForDelivery,
  setBuzzCodeForDelivery,
  setUnitNumberForDelivery,
  setDeliveryChecked,
  setsavedCustomerDetails,
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
                        setBuzzCodeForDelivery(customerSelected.buzzCode);
                        setUnitNumberForDelivery(customerSelected.unitNumber);
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
                        setBuzzCodeForDelivery(customerSelected.buzzCode);
                        setUnitNumberForDelivery(customerSelected.unitNumber);
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
                <Text>
                  {customerSelected.address?.label
                    ? customerSelected.address?.label
                    : customerSelected.address
                    ? customerSelected.address
                    : null}
                  <br />
                  {customerSelected.unitNumber &&
                    `Unit #: ${customerSelected.unitNumber}`}{" "}
                  -{" "}
                  {customerSelected.buzzCode &&
                    `Buzz Code: ${customerSelected.buzzCode}`}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEditModal(true);
                }}
                style={{ width: 100 }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 12,
                    marginTop: 10,
                    fontFamily: "archivo-600",
                  }}
                >
                  Edit Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
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
              color="black"
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
                    key={prevOrderIndex}
                    prevOrder={prevOrder}
                    prevOrderIndex={prevOrderIndex}
                  />
                ))}
              </View>
            ) : (
              customers.map((customer) => {
                const newAddress = customer.address?.label
                  ? customer.address?.label.toLowerCase()
                  : "";
                const newName = customer.name
                  ? customer.name?.toLowerCase()
                  : "";
                const lowerCaseSearch = search ? search?.toLowerCase() : "";
                if (
                  search?.length > 0 &&
                  !newName.includes(lowerCaseSearch) &&
                  !customer.phone?.toLowerCase().includes(lowerCaseSearch) &&
                  !newAddress.includes(lowerCaseSearch)
                )
                  return;
                return (
                  <TouchableOpacity
                    key={customer.id}
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
              style={{
                margin: 25,
                width: "80%",
                alignSelf: "center",
                backgroundColor: "#4050B5",
              }}
            />
          )}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={editModal}
          onRequestClose={() => {
            setEditModal(false);
          }}
        >
          <>
            <TouchableOpacity
              onPress={() => setEditModal(false)}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            />
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
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
                top: "7.5%",
                height: "85%",
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "600",
                    color: "rgba(74,74,74,1)",
                    marginBottom: 20,
                  }}
                >
                  Create Phone Order
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(243,243,243,1)",
                    borderRadius: 30,
                    height: 60,
                    marginBottom: 25,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(218,216,216,1)",
                      borderRadius: 30,
                      height: 60,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={32}
                      color="rgba(71,106,229,1)"
                    />
                  </View>
                  <TextInput
                    color="black"
                    placeholder="Enter name"
                    style={{ width: "80%" }}
                    inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
                    value={name}
                    onChangeText={(val) => setName(val)}
                    autoCorrect={false}
                    textContentType={"name"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(243,243,243,1)",
                    borderRadius: 30,
                    height: 60,
                    marginBottom: 25,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(218,216,216,1)",
                      borderRadius: 30,
                      height: 60,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={32}
                      color="rgba(74,74,74,1)"
                    />
                  </View>
                  <TextInput
                    color="black"
                    placeholder="Enter Phone #"
                    style={{ width: "80%" }}
                    inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
                    value={phone}
                    onChangeText={(val) => setPhone(val)}
                  />
                </View>
                <GooglePlacesAutocomplete
                  apiOptions={{
                    region: "CA",
                  }}
                  debounce={800}
                  apiKey={GOOGLE_API_KEY}
                  // onSelect={handleAddress}
                  selectProps={{
                    address,
                    onChange: setaddress,
                    placeholder: "Enter customer address",
                    defaultValue: address,
                    menuPortalTarget: document.body,
                    styles: {
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    },
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  <View style={{ width: "40%" }}>
                    <Text>Unit #:</Text>
                    <TextInput
                      placeholder="Enter Unit #"
                      onChangeText={(val) => setUnitNumber(val)}
                      style={{ width: "100%", height: 50 }}
                      value={unitNumber}
                    />
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text>Buzz Code:</Text>
                    <TextInput
                      placeholder="Enter Buzz Code"
                      onChangeText={(val) => setBuzzCode(val)}
                      style={{ width: "100%", height: 50 }}
                      value={buzzCode}
                    />
                  </View>
                </View>
                <Button
                  title="Update"
                  // onPress={GetTrans}
                  onPress={() => {
                    db.collection("users")
                      .doc(auth.currentUser?.uid)
                      .collection("customers")
                      .doc(customerSelected.id)
                      .update({
                        name,
                        phone,
                        address,
                        buzzCode,
                        unitNumber,
                      });
                    const clone = [...customers];
                    const index = clone.findIndex(
                      (e) => e.id === customerSelected.id
                    );
                    clone[index] = {
                      ...clone[index],
                      name,
                      phone,
                      address,
                      buzzCode,
                      unitNumber,
                    };
                    setCustomersList(clone);
                    setcustomerSelected((prev) => ({
                      ...prev,
                      name,
                      phone,
                      address,
                      buzzCode,
                      unitNumber,
                    }));
                    setEditModal(false);
                  }}
                  contentContainerStyle={styles.btn}
                  style={{ margin: 25, backgroundColor: "#4050B5" }}
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setEditModal(false);
                  }}
                  contentContainerStyle={styles.btn}
                  style={{ margin: 25, backgroundColor: "#4050B5" }}
                />
              </View>
            </View>
          </>
        </Modal>
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
