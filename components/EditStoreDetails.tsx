import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import {
  setStoreDetailState,
  setWoocommerceState,
  storeDetailState,
  trialDetailsState,
  woocommerceState,
} from "state/state";
import {
  updateStoreDetails,
  updateWooCredentials,
} from "state/firebaseFunctions";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Foundation from "@expo/vector-icons/Foundation";
import { auth, db } from "state/firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import firebase from "firebase/app";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const EditStoreDetails = ({ customBtnLbl, customBtnExtraFunction }) => {
  const { width, height } = useWindowDimensions();
  const storeDetails = storeDetailState.use();
  const [name, setname] = useState(storeDetails.name);
  const [phoneNumber, setphoneNumber] = useState(storeDetails.phoneNumber);
  const [address, setaddress] = useState(storeDetails.address);
  const [website, setwebsite] = useState(storeDetails.website);
  const [deliveryPrice, setdeliveryPrice] = useState(
    storeDetails.deliveryPrice
  );
  const [taxRate, settaxRate] = useState(
    storeDetails.taxRate ? storeDetails.taxRate : "13"
  );
  const [com, setcom] = useState(storeDetails.comSelected);
  const [settingsPassword, setsettingsPassword] = useState(
    storeDetails.settingsPassword
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [viewVisible, setviewVisible] = useState(false);
  const [screen, setscreen] = useState("general");
  const wooCredentials = woocommerceState.use();
  const [apiUrl, setapiUrl] = useState(wooCredentials.apiUrl);
  const [ck, setck] = useState(wooCredentials.ck);
  const [cs, setcs] = useState(wooCredentials.cs);
  const [useWoocommerce, setuseWoocommerce] = useState(
    wooCredentials.useWoocommerce
  );
  const trialDetails = trialDetailsState.use();

  useEffect(() => {
    console.log("Store Details: ", storeDetails);
  }, [storeDetails]);

  const handleWooDataUpdate = () => {
    if (apiUrl !== null && ck !== null && cs !== null) {
      setWoocommerceState({
        apiUrl: apiUrl,
        ck: ck,
        cs: cs,
        useWoocommerce: useWoocommerce,
      });
      updateWooCredentials({
        apiUrl: apiUrl,
        ck: ck,
        cs: cs,
        useWoocommerce: useWoocommerce,
      });
    }
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const resetLoader = () => {
    setviewVisible(true);
    fadeIn();
  };

  const Manage = () => {
    resetLoader();
    firebase
      .functions()
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
        returnUrl: `${window.location.origin}`,
        locale: "auto",
      })
      .then((response) => {
        console.log(response.data);
        window.location = response.data.url;
      })
      .catch((error) => {
        alert("Unknown error has occured: ", error);
      });
  };

  const handleDataUpdate = () => {
    if (name !== null && phoneNumber !== null && address !== null) {
      setStoreDetailState({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        website: website,
        deliveryPrice: deliveryPrice,
        comSelected: com,
        settingsPassword: settingsPassword,
        taxRate: parseFloat(taxRate),
      });
      updateStoreDetails({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        website: website,
        deliveryPrice: deliveryPrice,
        comSelected: com,
        settingsPassword: settingsPassword,
        taxRate: parseFloat(taxRate),
      });
      if (customBtnExtraFunction) {
        customBtnExtraFunction();
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRowContainer}>
        <Text style={styles.headerTxt}>Store Details and POS Settings</Text>
      </View>
      <View style={styles.detailInputContainer}>
        <View
          style={{
            position: "absolute",
            top: -30,
            left: -1,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => setscreen("general")}
            style={{
              width: 120,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: screen === "general" ? "#D2D2D2" : "#F5F3F3",
            }}
          >
            <Text>General</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setscreen("woocommerce")}
            style={{
              width: 120,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: screen === "woocommerce" ? "#D2D2D2" : "#F5F3F3",
            }}
          >
            <Text>WooCommerce</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Manage}
            disabled={trialDetails.hasEnded}
            style={{
              width: 120,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F5F3F3",
            }}
          >
            <Text>Billing</Text>
          </TouchableOpacity>
        </View>
        {screen === "general" ? (
          <>
            <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Store Name"
                label="Enter Store Name"
                onChangeText={(val) => setname(val)}
                style={{ margin: 10, width: "48%" }}
                value={name}
              />
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Store Website Url"
                label="Enter Store Website Url"
                onChangeText={(val) => setwebsite(val)}
                style={{ margin: 10, width: "48%" }}
                value={website}
              />
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Store Phone Number"
                label="Enter Store Phone Number"
                onChangeText={(val) => setphoneNumber(val)}
                style={{ margin: 10, width: "48%" }}
                value={phoneNumber}
              />
              <View style={{ margin: 10, width: "48%" }}>
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
              </View>
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Delivery Price"
                label="Enter Delivery Price"
                onChangeText={(val) => setdeliveryPrice(val)}
                style={{ margin: 10, width: "48%" }}
                value={deliveryPrice}
              />
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Printer Name"
                label="Enter Printer Name"
                onChangeText={(val) => setcom(val)}
                style={{ margin: 10, width: "48%" }}
                value={com}
              />
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Settings Page Password"
                label="Enter Settings Page Password"
                onChangeText={(val) => setsettingsPassword(val)}
                style={{ margin: 10, width: "48%" }}
                value={settingsPassword}
              />
              <TextInput
                color="black"
                variant="outlined"
                placeholder="Enter Tax Rate Percentage"
                label="Enter Tax Rate Percentage"
                onChangeText={(val) => settaxRate(val)}
                style={{ margin: 10, width: "48%" }}
                value={taxRate}
              />
              <View style={{ margin: 10, width: "48%", height: 55 }}>
                <Button
                  title="Save"
                  onPress={handleDataUpdate}
                  pressableContainerStyle={{ width: "100%", height: "100%" }}
                  contentContainerStyle={{ width: "100%", height: "100%" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#4050B5",
                  }}
                  titleStyle={{ textAlign: "center" }}
                />
              </View>
            </View>
            <View style={styles.helperDownloadContainer}>
              <Text style={styles.helperTxt}>
                Download helper program that makes your printer work with our
                service
              </Text>
              <a
                href={require("assets/divine-pos-helper.exe")}
                download="Divine Pos Helper.exe"
              >
                <Image
                  source={require("assets/badge-windows.png")}
                  resizeMode="contain"
                  style={styles.badgeWindows}
                />
              </a>
              <a
                href={require("assets/divine-pos-helper.pkg")}
                download="Divine Pos Helper.pkg"
              >
                <Image
                  source={require("assets/badge-mac.png")}
                  resizeMode="contain"
                  style={styles.badgeMac}
                />
              </a>
            </View>
          </>
        ) : (
          <>
            <View style={{ margin: 10 }}>
              <Text style={{ paddingBottom: 30, fontSize: 17 }}>
                Connect your WooCommerce website using the 'Rest API'. Click
                help to learn more
              </Text>
              <Text style={{ marginBottom: 5, fontSize: 14 }}>
                Use WooCommerce?
              </Text>
              <Switch
                value={useWoocommerce}
                onValueChange={(val) => setuseWoocommerce(val)}
              />
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
              <TextInput
                color="black"
                label="Enter Woocommerce 'API Url'"
                variant="outlined"
                placeholder="Enter Woocommerce 'API Url'"
                onChangeText={(val) => setapiUrl(val)}
                style={{ margin: 10, width: "48%" }}
                value={apiUrl}
              />
              <TextInput
                color="black"
                label="Enter Woocommerce 'CK'"
                variant="outlined"
                placeholder="Enter Woocommerce 'CK'"
                onChangeText={(val) => setck(val)}
                style={{ margin: 10, width: "48%" }}
                value={ck}
              />
              <TextInput
                placeholder="Enter Woocommerce 'CS'"
                onChangeText={(val) => setcs(val)}
                label="Enter Woocommerce 'CS'"
                variant="outlined"
                style={{ margin: 10, width: "48%" }}
                color="black"
                value={cs}
              />
              <View style={{ margin: 10, width: "48%", height: 55 }}>
                <Button
                  title="Save"
                  onPress={handleWooDataUpdate}
                  pressableContainerStyle={{ width: "100%", height: "100%" }}
                  contentContainerStyle={{ width: "100%", height: "100%" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#4050B5",
                  }}
                  titleStyle={{ textAlign: "center" }}
                />
              </View>
            </View>
          </>
        )}
      </View>
      {viewVisible && (
        <Modal visible={true}>
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              position: "absolute",
              opacity: fadeAnim,
              height: "100%",
              width: "100%",
            }}
          >
            <Image
              source={require("assets/loading.gif")}
              style={{ width: 450, height: 450, resizeMode: "contain" }}
            />
          </Animated.View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  headerRowContainer: {
    width: "90%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTxt: {
    fontFamily: "archivo-600",
    color: "rgba(98,96,96,1)",
    fontSize: 20,
  },
  billingBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  billingIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  detailInputContainer: {
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(155,152,152,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 45,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    padding: 30,
    minHeight: "75%",
    marginTop: 15,
    borderTopLeftRadius: 0,
  },
  materialStackedLabelTextbox1: {
    height: 60,
    width: 483,
  },
  materialStackedLabelTextbox2: {
    height: 60,
    width: 483,
    marginLeft: 43,
  },
  materialStackedLabelTextbox1Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 36,
    marginRight: 32,
  },
  materialStackedLabelTextbox3: {
    height: 60,
    width: 483,
  },
  materialStackedLabelTextbox5: {
    height: 60,
    width: 483,
    marginLeft: 43,
  },
  materialStackedLabelTextbox3Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 36,
    marginRight: 32,
  },
  materialStackedLabelTextbox4: {
    height: 60,
    width: 483,
  },
  materialStackedLabelTextbox6: {
    height: 60,
    width: 483,
    marginLeft: 43,
  },
  materialStackedLabelTextbox4Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 29,
    marginLeft: 36,
    marginRight: 32,
  },
  materialStackedLabelTextbox7: {
    height: 60,
    width: 483,
  },
  materialButtonViolet2: {
    height: 48,
    width: 483,
    marginLeft: 43,
    marginTop: 12,
  },
  materialStackedLabelTextbox7Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 36,
    marginRight: 32,
  },
  helperDownloadContainer: {
    width: "100%",
    height: 79,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  helperTxt: {
    fontFamily: "archivo-500",
    color: "#121212",
    fontSize: 19,
    width: 483,
    height: 52,
  },
  badgeWindows: {
    width: 200,
    height: 79,
  },
  badgeMac: {
    width: 200,
    height: 79,
  },
});

export default EditStoreDetails;
