import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import FieldInputWithLabel from "./FieldInputWithLabel";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GooglePlacesStyles } from "components/functional/GooglePlacesStyles";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";
import { useAlert } from "react-alert";
import {
  OrderDetailsState,
  setOrderDetailsState,
  storeDetailState,
} from "state/state";
import { AddressType } from "types/global";

function DeliveryDetails() {
  const orderDetails = OrderDetailsState.use();
  const storeDetails = storeDetailState.use();
  const [localName, setlocalName] = useState(orderDetails.customer.name);
  const [localPhoneNumber, setlocalPhoneNumber] = useState(
    orderDetails.customer.phone
  );
  const [localAddress, setlocalAddress] = useState<AddressType | null>(
    orderDetails.address
  );
  const [localBuzzCode, setlocalBuzzCode] = useState(
    orderDetails.customer.buzzCode
  );
  const [localUnitNumber, setlocalUnitNumber] = useState(
    orderDetails.customer.unitNumber
  );
  const [checkingDeliveryRange, setcheckingDeliveryRange] = useState(false);
  const alertP = useAlert();
  const width = useWindowDimensions().width;

  // Function to calculate distance between two points using Haversine formula
  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
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
  async function getLatLng(placeId: string) {
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
  async function calculateDistanceBetweenAddresses(
    address1: string,
    address2: string
  ) {
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

  return (
    <>
      <View
        style={[styles.fieldsGroup, width < 1000 && { width: width * 0.9 }]}
      >
        <FieldInputWithLabel
          txtInput="Name"
          label="Name*"
          style={styles.nameField}
          value={localName}
          onChangeText={(text) => setlocalName(text)}
          textContentType="name"
          maxLength={25}
        />
        <FieldInputWithLabel
          txtInput="(123) 456-7890"
          label="Phone Number*"
          style={styles.nameField}
          value={localPhoneNumber}
          onChangeText={(text) => setlocalPhoneNumber(text)}
          textContentType="telephoneNumber"
          maxLength={10}
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
                value: localAddress,
                onChange: (address) => setlocalAddress(address),
                defaultValue: localAddress,
                menuPortalTarget: document.body,
                styles: GooglePlacesStyles,
              }}
              renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                <div>
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
        style={[
          styles.continueBtn,
          {
            opacity:
              checkingDeliveryRange ||
              (localAddress ?? false) ||
              localName === "" ||
              localPhoneNumber === ""
                ? 0.8
                : 1,
          },
        ]}
        disabled={
          checkingDeliveryRange ||
          (localAddress ?? false) ||
          localName === "" ||
          localPhoneNumber === ""
            ? true
            : false
        }
        onPress={() => {
          setcheckingDeliveryRange(true);
          if (
            localName === "" ||
            localPhoneNumber === "" ||
            (localAddress ?? false)
          )
            return alertP.error("Please fill in all fields");

          if (!storeDetails || !localAddress) return;

          if (
            !(
              typeof storeDetails.address === "object" &&
              "value" in storeDetails.address &&
              typeof storeDetails.address.value === "object" &&
              "reference" in storeDetails.address.value
            )
          )
            return;

          if (
            !(
              typeof localAddress === "object" &&
              "value" in localAddress &&
              typeof localAddress.value === "object" &&
              "reference" in localAddress.value
            )
          )
            return;

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
                  alertP.error("The delivery address is out of range");
                  setcheckingDeliveryRange(false);
                } else {
                  setOrderDetailsState({
                    address: localAddress,
                    customer: {
                      ...orderDetails.customer,
                      name: localName,
                      phone: localPhoneNumber,
                      buzzCode: localBuzzCode,
                      unitNumber: localUnitNumber,
                    },
                    delivery: true,
                  });
                  setOrderDetailsState({ page: 4 });
                  setcheckingDeliveryRange(false);
                }
              } else {
                setOrderDetailsState({
                  address: localAddress,
                  customer: {
                    ...orderDetails.customer,
                    name: localName,
                    phone: localPhoneNumber,
                    buzzCode: localBuzzCode,
                    unitNumber: localUnitNumber,
                  },
                  delivery: true,
                });
                setOrderDetailsState({ page: 4 });
                setcheckingDeliveryRange(false);
              }
            } else {
              alert(
                "Distance calculation between the store and your location failed. Please refresh page."
              );
              setcheckingDeliveryRange(false);
            }
          });
        }}
      >
        <Text style={styles.continueBtnTxt}>CONTINUE</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  fieldsGroup: {
    width: 380,
    height: 325,
    justifyContent: "space-between",
  },
  nameField: {
    height: 70,
    width: "100%",
  },
  addressField: {
    height: 70,
    width: "100%",
  },
  buzzCodeAndPhoneRow: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buzzCodeField: {
    height: 70,
    width: "48%",
  },
  phoneNumberField: {
    height: 70,
    width: "48%",
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

export default DeliveryDetails;
