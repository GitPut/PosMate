import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { cartState, setCartState } from "state/state";
import { Switch } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { addCustomerDetailsToDb } from "state/firebaseFunctions";
import { auth, db } from "state/firebaseConfig";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const SaveCustomer = ({
  setSaveCustomerModal,
  setOngoingDelivery,
  setNameForDelivery,
  setPhoneForDelivery,
  setAddressForDelivery,
  setDeliveryChecked,
  setsavedCustomerDetails,
}) => {
  const [name, setname] = useState(null);
  const [phone, setphone] = useState(null);
  const [email, setemail] = useState(null);
  const [localAddress, setlocalAddress] = useState(null);
  const [viewCustomers, setviewCustomers] = useState(false);
  const [customers, setcustomers] = useState([]);
  const [customerSelected, setcustomerSelected] = useState(null);

  const addCustomerDetails = () => {
    if (name && phone) {
      addCustomerDetailsToDb({
        name: name,
        phone: phone,
        address: localAddress?.label,
        email: email,
      });
      setSaveCustomerModal(false);
    }
  };

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("customers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, " => ", doc.data());
          setcustomers((prevState) => [
            ...prevState,
            { ...doc.data(), id: doc.id },
          ]);
        });
      });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {viewCustomers ? (
        <View style={styles.modalContainer}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "600",
              color: "rgba(74,74,74,1)",
              marginBottom: 20,
            }}
          >
            Saved Customers
          </Text>
          {customerSelected ? (
            <View>
              {customerSelected.orders &&
                JSON.parse(customerSelected.orders).map(
                  (prevOrder, prevOrderIndex) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setCartState(prevOrder);
                          setOngoingDelivery(true);
                          setNameForDelivery(customerSelected.name);
                          setPhoneForDelivery(customerSelected.phone);
                          setAddressForDelivery(customerSelected.address);
                          setDeliveryChecked(false);
                        }}
                      >
                        <Text>Select Prev Order</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setCartState(prevOrder);
                          setOngoingDelivery(true);
                          setNameForDelivery(customerSelected.name);
                          setPhoneForDelivery(customerSelected.phone);
                          setAddressForDelivery(customerSelected.address);
                          setDeliveryChecked(true);
                        }}
                      >
                        <Text>Select Prev Order For Delivery</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          const localOrders = JSON.parse(
                            customerSelected.orders
                          );
                          localOrders.splice(prevOrderIndex, 1);
                          db.collection("users")
                            .doc(auth.currentUser?.uid)
                            .collection("customers")
                            .doc(customerSelected.id)
                            .update({
                              orders: JSON.stringify(localOrders),
                            });
                          setcustomerSelected((prev) => ({
                            ...prev,
                            orders: JSON.stringify(localOrders),
                          }));
                        }}
                      >
                        <Text>Delete Prev Order</Text>
                      </TouchableOpacity>
                    </View>
                  )
                )}
              <Button
                title="or Make new order"
                onPress={() => {
                  setsavedCustomerDetails(customerSelected);
                  setOngoingDelivery(true);
                  setNameForDelivery(customerSelected.name);
                  setPhoneForDelivery(customerSelected.phone);
                  setAddressForDelivery(customerSelected.address);
                  setDeliveryChecked(true);
                  setSaveCustomerModal(false);
                }}
              />
            </View>
          ) : (
            customers.map((customer) => {
              return (
                <TouchableOpacity onPress={() => setcustomerSelected(customer)}>
                  <Text>name: {customer.name}</Text>
                </TouchableOpacity>
              );
            })
          )}
          <Button
            title="Back"
            onPress={() => setviewCustomers(false)}
            contentContainerStyle={styles.btn}
            style={{ margin: 25 }}
          />
        </View>
      ) : (
        <View style={styles.modalContainer}>
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
              placeholder="Enter name"
              style={{ width: "80%" }}
              inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
              value={name}
              onChangeText={(val) => setname(val)}
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
              placeholder="Enter Phone #"
              style={{ width: "80%" }}
              inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
              value={phone}
              onChangeText={(val) => setphone(val)}
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
                name="email"
                size={32}
                color="rgba(74,74,74,1)"
              />
            </View>
            <TextInput
              placeholder="Enter Email Address"
              style={{ width: "80%" }}
              inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
              value={email}
              onChangeText={(val) => setemail(val)}
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
              localAddress,
              onChange: setlocalAddress,
            }}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
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
          <Button
            title="Save Customer"
            onPress={addCustomerDetails}
            contentContainerStyle={styles.btn}
            style={{ margin: 25 }}
          />
          <Button
            title="Cancel"
            //   onPress={() => {}}
            contentContainerStyle={styles.btn}
            style={{ margin: 25 }}
          />
          <Button
            title="View Customers"
            onPress={() => setviewCustomers(true)}
            contentContainerStyle={styles.btn}
            style={{ margin: 25 }}
          />
        </View>
      )}
    </View>
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
});
