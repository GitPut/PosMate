import React, { Component, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import FieldInputWithLabel from "./FieldInputWithLabel";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GooglePlacesStyles } from "components/functional/GooglePlacesStyles";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

function DeliveryDetails({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
  width,
}) {
  const [localName, setlocalName] = useState(orderDetails.customer.name);
  const [localPhoneNumber, setlocalPhoneNumber] = useState(
    orderDetails.customer.phoneNumber
  );
  const [localAddress, setlocalAddress] = useState(orderDetails.address);
  const [localBuzzCode, setlocalBuzzCode] = useState(
    orderDetails.customer.buzzCode
  );
  const [localUnitNumber, setlocalUnitNumber] = useState(
    orderDetails.customer.unitNumber
  );

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

  //////////////////////////

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: 390,
    },
    fieldsGroup: {
      width: width,
      height: 325,
      justifyContent: "space-between",
    },
    nameField: {
      height: 70,
      width: width,
    },
    addressField: {
      height: 70,
      width: width,
    },
    buzzCodeAndPhoneRow: {
      width: width,
      height: 70,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buzzCodeField: {
      height: 70,
      width: width === 380 ? 175 : "48%",
    },
    phoneNumberField: {
      height: 70,
      width: width === 380 ? 175 : "48%",
    },
    continueBtn: {
      width: 219,
      height: 60,
      backgroundColor: "rgba(238,125,67,1)",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 30,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      marginTop: 10,
    },
    continueBtnTxt: {
      color: "rgba(255,255,255,1)",
      fontSize: 18,
      fontWeight: "700",
    },
  });

  return (
    <>
      <View style={styles.fieldsGroup}>
        <FieldInputWithLabel
          txtInput="Name"
          label="Name*"
          style={styles.nameField}
          value={localName}
          onChangeText={(text) => setlocalName(text)}
          textContentType="name"
        />
        <FieldInputWithLabel
          txtInput="(123) 456-7890"
          label="Phone Number*"
          style={styles.nameField}
          value={localPhoneNumber}
          onChangeText={(text) => setlocalPhoneNumber(text)}
          textContentType="telephoneNumber"
        />
        <FieldInputWithLabel
          txtInput="Delivery Address"
          label="Delivery Address*"
          style={styles.addressField}
          customInput={() => (
            <GooglePlacesAutocomplete
              apiOptions={{
                region: "CA",
              }}
              debounce={800}
              apiKey={GOOGLE_API_KEY}
              // onSelect={handleAddress}
              selectProps={{
                address: localAddress,
                onChange: (address) => setlocalAddress(address),
                defaultValue: localAddress,
                menuPortalTarget: document.body,
                styles: GooglePlacesStyles,
              }}
              renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                <div>
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
        />
        <View style={styles.buzzCodeAndPhoneRow}>
          <FieldInputWithLabel
            txtInput="#"
            label="Buzz Code"
            style={styles.buzzCodeField}
            value={localBuzzCode}
            onChangeText={(text) => setlocalBuzzCode(text)}
            textContentType="none"
          />
          <FieldInputWithLabel
            txtInput="#"
            label="Unit Number"
            style={styles.phoneNumberField}
            value={localUnitNumber}
            onChangeText={(text) => setlocalUnitNumber(text)}
            textContentType="none"
          />
        </View>
      </View>
      <Pressable
        style={styles.continueBtn}
        onPress={() => {
          if (
            localName === "" ||
            localPhoneNumber === "" ||
            localAddress === ""
          )
            return alert("Please fill in all fields");
          calculateDistanceBetweenAddresses(
            storeDetails.address.value.reference,
            localAddress.value.reference
          ).then((distance) => {
            if (distance !== null) {
              console.log(
                `Distance between addresses: ${distance.toFixed(2)} km`
              );
              if (storeDetails.deliveryRange) {
                if (distance > parseFloat(storeDetails.deliveryRange)) {
                  alert("The delivery address is out of range");
                } else {
                  setorderDetails((prev) => ({
                    ...prev,
                    address: localAddress,
                    customer: {
                      ...prev.customer,
                      name: localName,
                      phoneNumber: localPhoneNumber,
                      buzzCode: localBuzzCode,
                      unitNumber: localUnitNumber,
                    },
                  }));
                  setpage(4);
                }
              } else {
                setorderDetails((prev) => ({
                  ...prev,
                  address: localAddress,
                  customer: {
                    ...prev.customer,
                    name: localName,
                    phoneNumber: localPhoneNumber,
                    buzzCode: localBuzzCode,
                    unitNumber: localUnitNumber,
                  },
                }));
                setpage(4);
              }
            } else {
              alert(
                "Distance calculation between the store and your location failed. Please refresh page."
              );
            }
          });
        }}
      >
        <Text style={styles.continueBtnTxt}>CONTINUE</Text>
      </Pressable>
    </>
  );
}

export default DeliveryDetails;
