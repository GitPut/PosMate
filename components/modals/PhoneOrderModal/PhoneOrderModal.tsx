import {
  StyleSheet,
  Text,
  Pressable,
  View,
  useWindowDimensions,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { customersList, setCustomersList, storeDetailState } from "state/state";
import { Switch } from "react-native-gesture-handler";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { addCustomerDetailsToDb } from "state/firebaseFunctions";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import GeneralSwitch from "components/GeneralSwitch";
import { GooglePlacesStyles } from "components/functional/GooglePlacesStyles";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const PhoneOrderModal = ({
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
  setsaveCustomerModal,
  buzzCode,
  setBuzzCode,
  unitNumber,
  setUnitNumber,
  savedCustomerDetails,
}) => {
  const [localAddress, setlocalAddress] = useState(null);
  const [saveCustomerChecked, setsaveCustomerChecked] = useState(false);
  const customers = customersList.use();
  const storeDetails = storeDetailState.use();
  const { height, width } = useWindowDimensions();

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

  const SaveCustomer = () => {
    addCustomerDetailsToDb({
      name: name,
      phone: phone,
      address: address ? address : null,
      buzzCode: buzzCode ? buzzCode : null,
      unitNumber: unitNumber ? unitNumber : null,
      orders: [],
    }).then((docRef) => {
      setsavedCustomerDetails({
        name: name,
        phone: phone,
        address: address ? address : null,
        buzzCode: buzzCode ? buzzCode : null,
        unitNumber: unitNumber ? unitNumber : null,
        orders: [],
        id: docRef.id,
      });

      setCustomersList([
        ...customers,
        {
          name: name,
          phone: phone,
          address: address ? address : null,
          buzzCode: buzzCode ? buzzCode : null,
          unitNumber: unitNumber ? unitNumber : null,
          orders: [],
          id: docRef.id,
        },
      ]);
    });
  };

  useEffect(() => {
    if (address) {
      console.log("Set address: ", address);
      setlocalAddress(address);
      try {
        calculateDistanceBetweenAddresses(
          storeDetails.address.value.reference,
          address.value.reference
        ).then((distance) => {
          if (distance !== null) {
            console.log(
              `Distance between addresses: ${distance.toFixed(2)} km`
            );
            if (storeDetails.deliveryRange) {
              if (
                distance > parseFloat(storeDetails.deliveryRange) &&
                deliveryChecked
              ) {
                alert("The delivery address is out of range");
              }
            }
          }
        });
      } catch {
        console.log("Error calculating distance between addresses");
      }
    }
  }, []);

  useEffect(() => {
    if (localAddress) {
      setAddress(localAddress);
      try {
        calculateDistanceBetweenAddresses(
          storeDetails.address.value.reference,
          localAddress.value.reference
        ).then((distance) => {
          if (distance !== null) {
            console.log(
              `Distance between addresses: ${distance.toFixed(2)} km`
            );
            if (storeDetails.deliveryRange) {
              if (
                distance > parseFloat(storeDetails.deliveryRange) &&
                deliveryChecked
              ) {
                alert("The delivery address is out of range");
              }
            }
          }
        });
      } catch {
        console.log("Error calculating distance between addresses");
      }
    }
  }, [localAddress]);

  return (
    <Pressable
      onPress={() => {
        setDeliveryModal(false);
        setOngoingDelivery(false);
        setName("");
        setPhone("");
        setAddress(null);
        setBuzzCode("");
        setUnitNumber("");
        setDeliveryChecked(false);
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
            <View style={styles.topHeaderAndCloseGroup}>
              <View style={styles.closeRow}>
                <Pressable
                  onPress={() => {
                    setDeliveryModal(false);
                    setOngoingDelivery(false);
                    setName("");
                    setPhone("");
                    setAddress(null);
                    setBuzzCode("");
                    setUnitNumber("");
                    setDeliveryChecked(false);
                  }}
                >
                  <Ionicons name="md-close" style={styles.escapeIcon} />
                </Pressable>
              </View>
              <Text style={styles.phoneOrder}>Phone Order</Text>
            </View>
            <View style={styles.middleGroup}>
              <View style={styles.customerNameRow}>
                <MaterialIcons
                  name="person"
                  style={styles.customerIcon}
                ></MaterialIcons>
                <TextInput
                  placeholder="Enter name"
                  style={styles.namedTxtBox}
                  value={name}
                  onChangeText={(val) => setName(val)}
                />
              </View>
              <View style={styles.customerPhoneRow}>
                <FontAwesome
                  name="phone"
                  style={styles.numberIcon}
                ></FontAwesome>
                <TextInput
                  placeholder="Enter phone number"
                  style={styles.phoneNumberTxtBox}
                  value={phone}
                  onChangeText={(val) => setPhone(val)}
                />
              </View>
              {!savedCustomerDetails && (
                <View style={styles.saveCustomerRow}>
                  <Text style={styles.savedCustomersTxt}>
                    Would you like to save customer?
                  </Text>
                  <GeneralSwitch
                    isActive={saveCustomerChecked}
                    toggleSwitch={() =>
                      setsaveCustomerChecked(!saveCustomerChecked)
                    }
                  />
                </View>
              )}
              <View style={styles.deliveryRow}>
                <Text style={styles.delivery}>Delivery</Text>
                <GeneralSwitch
                  isActive={deliveryChecked}
                  toggleSwitch={() => setDeliveryChecked(!deliveryChecked)}
                />
              </View>
              {storeDetails.acceptDelivery && deliveryChecked && (
                <View style={styles.addressTxtBox}>
                  <View style={{ width: "60%", height: "100%" }}>
                    <GooglePlacesAutocomplete
                      apiOptions={{
                        region: "CA",
                      }}
                      debounce={800}
                      apiKey={GOOGLE_API_KEY}
                      selectProps={{
                        localAddress,
                        onChange: setlocalAddress,
                        placeholder: "Enter customer address",
                        defaultValue: address,
                        menuPortalTarget: document.body,
                        styles: GooglePlacesStyles,
                      }}
                    />
                  </View>
                  <TextInput
                    placeholder="Unit #"
                    style={{
                      width: "18%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,1)",
                      borderWidth: 1,
                      borderColor: "#000000",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  />
                  <TextInput
                    placeholder="Buzz #"
                    style={{
                      width: "18%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,1)",
                      borderWidth: 1,
                      borderColor: "#000000",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  />
                </View>
              )}
            </View>
            <View style={styles.bottomGroup}>
              <Pressable
                style={styles.orderButton}
                onPress={() => {
                  if (name && phone) {
                    setDeliveryModal(false);
                    setOngoingDelivery(true);
                    if (saveCustomerChecked) {
                      SaveCustomer();
                    }
                  }
                }}
              >
                <Text style={styles.orderButtonTxt}>
                  {ongoingDelivery ? "Update" : "Order"}
                </Text>
              </Pressable>
              <Pressable
                style={styles.viewSavedCustomersRow}
                onPress={() => {
                  setOngoingDelivery(false);
                  setName("");
                  setPhone("");
                  setAddress(null);
                  setBuzzCode("");
                  setUnitNumber("");
                  setsaveCustomerChecked(false);
                  setDeliveryChecked(false);
                  setDeliveryModal(false);
                  setsaveCustomerModal(true);
                }}
              >
                <MaterialIcons
                  name="history"
                  style={styles.savedCustomersIcon}
                />
                <Text style={styles.savedCustomers}>Saved Customers</Text>
              </Pressable>
            </View>
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
};

export default PhoneOrderModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: 540,
    height: 608,
    backgroundColor: "rgba(255,255,255,1)",
  },
  topHeaderAndCloseGroup: {
    width: 495,
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  closeRow: {
    height: 36,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  escapeIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
  },
  phoneOrder: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  middleGroup: {
    width: 400,
    height: 285,
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerNameRow: {
    width: 400,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customerIcon: {
    color: "#1d284e",
    fontSize: 45,
  },
  namedTxtBox: {
    width: 344,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
  },
  customerPhoneRow: {
    width: 394,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  numberIcon: {
    color: "#1c294e",
    fontSize: 42,
  },
  phoneNumberTxtBox: {
    width: 344,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
  },
  saveCustomerRow: {
    width: 396,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  savedCustomersTxt: {
    color: "#121212",
    fontSize: 15,
  },
  savedCustomerSwitchBox: {
    width: 39,
    height: 18,
    backgroundColor: "#E6E6E6",
    opacity: 0,
  },
  deliveryRow: {
    width: 395,
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  delivery: {
    color: "#121212",
    fontSize: 15,
  },
  deliverySwitchBox: {
    width: 39,
    height: 18,
    backgroundColor: "#E6E6E6",
    opacity: 0,
  },
  addressTxtBox: {
    width: 394,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomGroup: {
    width: 283,
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  orderButton: {
    width: 283,
    height: 43,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  orderButtonTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  viewSavedCustomersRow: {
    width: 153,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  savedCustomersIcon: {
    color: "rgba(2,2,2,1)",
    fontSize: 30,
  },
  savedCustomers: {
    color: "#797272",
    fontSize: 15,
  },
});
