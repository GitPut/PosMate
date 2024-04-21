import React, { useState } from "react";
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
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
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
import { updatePosHomeState } from "state/posHomeState";
import { CustomerProp } from "types/global";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

interface CustomerDetailsModalProps {
  setcustomerSelected: (val: CustomerProp | null) => void;
  customerSelected: CustomerProp;
  closeAll: () => void;
}

function CustomerDetailsModal({
  setcustomerSelected,
  customerSelected,
  closeAll,
}: CustomerDetailsModalProps) {
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

  const removeCustomerOrder = (removeIndex: number) => {
    const updatedOrderHistory = structuredClone(customerSelected.orders);
    updatedOrderHistory.splice(removeIndex, 1);
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("customers")
      .doc(customerSelected.id)
      .update({
        orders: updatedOrderHistory,
      });
    setcustomerSelected({
      orders: updatedOrderHistory,
      name: customerSelected.name,
      phone: customerSelected.phone,
      address: customerSelected.address,
      buzzCode: customerSelected.buzzCode,
      unitNumber: customerSelected.unitNumber,
      id: customerSelected.id,
    });
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
                  <Entypo name="chevron-left" style={styles.goBackIcon} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setcustomerSelected(null);
                    closeAll();
                  }}
                >
                  <Ionicons name="close" style={styles.closeIcon} />
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
                  <Text style={styles.georgesOrders}>&apos;s Orders</Text>
                </View>
              ) : (
                <Text style={styles.georgesOrders}>
                  {customerSelected.name}&apos;s Orders
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
                  <FontAwesome name="phone" style={styles.phoneIcon} />
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
                  <Entypo name="home" style={styles.addressIcon} />
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
                            value: newAddress,
                            onChange: setnewAddress,
                            placeholder: "Enter customer's address",
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
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
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
                          value={newUnitNumber ? newUnitNumber : ""}
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
                          value={newBuzzCode ? newBuzzCode : ""}
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
                                : "No Address"}
                            </Text>
                          ) : (
                            <View style={styles.addressGroup}>
                              <Text style={styles.address}>
                                {customerSelected.address?.label
                                  ? customerSelected.address?.label
                                  : "No Address"}
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
                        setcustomerSelected({
                          name: newName,
                          phone: newPhoneNumber,
                          address: newAddress,
                          buzzCode: newBuzzCode,
                          unitNumber: newUnitNumber,
                          orders: customerSelected.orders,
                          id: customerSelected.id,
                        });
                        setEdit(false);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <MaterialCommunityIcons
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
                      <MaterialCommunityIcons
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
                      setCustomersList(
                        customers.filter((e) => e.id !== customerSelected.id)
                      );
                      setcustomerSelected(null);
                    }}
                  >
                    <FontAwesome name="trash" style={styles.deleteIcon} />
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
                        updatePosHomeState({
                          deliveryChecked: false,
                          ongoingDelivery: true,
                          name: customerSelected.name,
                          phone: customerSelected.phone,
                          address: customerSelected.address,
                          buzzCode: customerSelected.buzzCode,
                          unitNumber: customerSelected.unitNumber,
                        });
                        setcustomerSelected(null);
                        closeAll();
                      }}
                      setOrderDelivery={() => {
                        setCartState(prevOrder.cart);
                        updatePosHomeState({
                          deliveryChecked: true,
                          ongoingDelivery: true,
                          name: customerSelected.name,
                          phone: customerSelected.phone,
                          address: customerSelected.address,
                          buzzCode: customerSelected.buzzCode,
                          unitNumber: customerSelected.unitNumber,
                        });
                        setcustomerSelected(null);
                        closeAll();
                      }}
                      isDeliverable={
                        storeDetails?.acceptDelivery && customerSelected.address
                          ? true
                          : false
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
                    updatePosHomeState({
                      deliveryChecked: false,
                      ongoingDelivery: true,
                      name: customerSelected.name,
                      phone: customerSelected.phone,
                      address: customerSelected.address,
                      buzzCode: customerSelected.buzzCode,
                      unitNumber: customerSelected.unitNumber,
                    });
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
