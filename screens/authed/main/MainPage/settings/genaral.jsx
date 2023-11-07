import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Upload } from "../../EntryFile/imagePath";
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
import EditStoreDetails from "components/EditStoreDetails";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const GenaralSettings = () => {
  const options = [
    { id: 1, text: "Choose Time Zone", text: "Choose Time Zone" },
    { id: 2, text: "USD Time Zone", text: "USD Time Zone" },
  ];
  const options1 = [
    { id: 1, text: "INR", text: "INR" },
    { id: 2, text: "USA", text: "USA" },
  ];
  const options2 = [
    { id: 1, text: "DD/MM/YYYY", text: "DD/MM/YYYY" },
    { id: 2, text: "MM/DD/YYYY", text: "MM/DD/YYYY" },
  ];

  const storeDetails = storeDetailState.use();
  const [name, setname] = useState(storeDetails.name);
  const [phoneNumber, setphoneNumber] = useState(storeDetails.phoneNumber);
  const [address, setaddress] = useState(storeDetails.address);
  const [website, setwebsite] = useState(storeDetails.website);
  const [deliveryPrice, setdeliveryPrice] = useState(
    storeDetails.deliveryPrice
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
      });
      updateStoreDetails({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        website: website,
        deliveryPrice: deliveryPrice,
        comSelected: com,
        settingsPassword: settingsPassword,
      });
      if (customBtnExtraFunction) {
        customBtnExtraFunction();
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <EditStoreDetails />
      </div>
    </div >
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

export default GenaralSettings;
