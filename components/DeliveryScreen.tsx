import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "@react-native-material/core";
import {
  cartState,
  customersList,
  setCartState,
  setCustomersList,
  storeDetailState,
} from "state/state";
import { Switch } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { addCustomerDetailsToDb } from "state/firebaseFunctions";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const DeliveryScreen = ({
  setDeliveryModal,
  setOngoingDelivery,
  setName,
  setPhone,
  setAddress,
  name,
  phone,
  address,
  deliveryChecked,
  setDeliveryChecked,
  setsavedCustomerDetails,
  ongoingDelivery,
}) => {
  const [localAddress, setlocalAddress] = useState(null);
  const [saveCustomerChecked, setsaveCustomerChecked] = useState(false);
  const customers = customersList.use();
  const storeDetails = storeDetailState.use();

  //

  // Function to calculate distance between two points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  // Function to get the latitude and longitude of an address using the Google Maps Geocoding API
  async function getLatLng(placeId) {
    const response = await fetch(
      "https://us-central1-posmate-5fc0a.cloudfunctions.net/getLatLng",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId: placeId,
        }),
      }
    );

    try {
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        console.log("Success!");
        return responseData.data;
      } else {
        console.error(responseData.message);
      }
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
    }
  }

  // Function to calculate distance between two addresses using Google Places API
  async function calculateDistanceBetweenAddresses(address1, address2) {
    try {
      const { lat: lat1, lng: lon1 } = await getLatLng(address1);
      const { lat: lat2, lng: lon2 } = await getLatLng(address2);
      const distance = calculateDistance(lat1, lon1, lat2, lon2);
      return distance;
    } catch (error) {
      console.error("Error calculating distance:", error);
      return null;
    }
  }

  //

  useEffect(() => {
    if (address) {
      console.log("Set address: ", address);
      setlocalAddress(address);
      calculateDistanceBetweenAddresses(
        storeDetails.address.value.reference,
        address.address.value.reference
      ).then((distance) => {
        if (distance !== null) {
          console.log(`Distance between addresses: ${distance.toFixed(2)} km`);
          if (storeDetails.deliveryRange) {
            if (distance > parseFloat(storeDetails.deliveryRange)) {
              alert("The delivery address is out of range");
            }
            // else {
            //   setpage(2);
            // }
          }
          // else {
          //   setpage(2);
          // }
        }
        // else {
        //   alert(
        //     "Distance calculation between the store and your location failed. Please refresh page."
        //   );
        // }
      });
    }
  }, []);

  useEffect(() => {
    if (localAddress) {
      setAddress(localAddress);
      calculateDistanceBetweenAddresses(
        storeDetails.address.value.reference,
        localAddress.value.reference
      ).then((distance) => {
        if (distance !== null) {
          console.log(`Distance between addresses: ${distance.toFixed(2)} km`);
          if (storeDetails.deliveryRange) {
            if (distance > parseFloat(storeDetails.deliveryRange)) {
              alert("The delivery address is out of range");
            }
            // else {
            //   setpage(2);
            // }
          }
          // else {
          //   setpage(2);
          // }
        }
        // else {
        //   alert(
        //     "Distance calculation between the store and your location failed. Please refresh page."
        //   );
        // }
      });
    }
  }, [localAddress]);

  const SaveCustomer = () => {
    addCustomerDetailsToDb({
      name: name,
      phone: phone,
      address: address ? address : null,
      orders: [],
    }).then((docRef) => {
      setsavedCustomerDetails({
        name: name,
        phone: phone,
        address: address ? address : null,
        orders: [],
        id: docRef.id,
      });

      setCustomersList([
        ...customers,
        {
          name: name,
          phone: phone,
          address: address ? address : null,
          orders: [],
          id: docRef.id,
        },
      ]);
    });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setDeliveryModal(false)}
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
          top: "15%",
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <Text
              style={{ fontWeight: "400", marginRight: 20, marginLeft: 30 }}
            >
              Would you like to save customer?
            </Text>
            <Switch
              value={saveCustomerChecked}
              onValueChange={() => {
                setsaveCustomerChecked(!saveCustomerChecked);
              }}
            />
          </View>
          {storeDetails.acceptDelivery && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <Text
                style={{ fontWeight: "400", marginRight: 20, marginLeft: 30 }}
              >
                Delivery Included?
              </Text>
              <Switch
                value={deliveryChecked}
                onValueChange={() => {
                  setDeliveryChecked(!deliveryChecked);
                }}
              />
            </View>
          )}
          {deliveryChecked && (
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
                placeholder: "Enter customer address",
                defaultValue: address,
                menuPortalTarget: document.body,
                styles: { menuPortal: (base) => ({ ...base, zIndex: 9999 }) },
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
          )}
          {/* <Text>ADDRESS: {address}</Text> */}
          <Button
            title={ongoingDelivery ? "Update" : "Order"}
            // onPress={GetTrans}
            onPress={() => {
              if (name && phone) {
                setDeliveryModal(false);
                setOngoingDelivery(true);
                if (saveCustomerChecked) {
                  SaveCustomer();
                }
              }
            }}
            contentContainerStyle={styles.btn}
            style={{ margin: 25, backgroundColor: "#4050B5" }}
          />
          <Button
            disabled={ongoingDelivery}
            title="Cancel"
            onPress={() => {
              setDeliveryModal(false);
              setOngoingDelivery(null);
              setName(null);
              setPhone(null);
              setAddress(null);
            }}
            contentContainerStyle={styles.btn}
            style={{ margin: 25, backgroundColor: "#4050B5" }}
          />
        </View>
      </View>
    </>
  );
};

export default DeliveryScreen;

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
