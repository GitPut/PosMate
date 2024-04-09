import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Modal,
} from "react-native";
import InputWithLabel from "./components/InputWithLabel";
import {
  onlineStoreState,
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
import GeneralSwitch from "components/GeneralSwitch";
import { GooglePlacesStyles } from "components/functional/GooglePlacesStyles";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

function GeneralSettings() {
  const storeDetails = storeDetailState.use();
  const [name, setname] = useState(storeDetails.name);
  const [phoneNumber, setphoneNumber] = useState(storeDetails.phoneNumber);
  const [address, setaddress] = useState(storeDetails.address);
  const [website, setwebsite] = useState(storeDetails.website);
  const [deliveryPrice, setdeliveryPrice] = useState(
    storeDetails.deliveryPrice
  );
  const [acceptDelivery, setacceptDelivery] = useState(
    storeDetails.acceptDelivery
  );
  const [deliveryRange, setdeliveryRange] = useState(
    storeDetails.deliveryRange
  );
  const [taxRate, settaxRate] = useState(
    storeDetails.taxRate ? parseFloat(storeDetails.taxRate) : "0"
  );
  const [settingsPassword, setsettingsPassword] = useState(
    storeDetails.settingsPassword
  );
  const [screen, setscreen] = useState("general");
  const wooCredentials = woocommerceState.use();
  const [apiUrl, setapiUrl] = useState(wooCredentials.apiUrl);
  const [ck, setck] = useState(wooCredentials.ck);
  const [cs, setcs] = useState(wooCredentials.cs);
  const [useWoocommerce, setuseWoocommerce] = useState(
    wooCredentials.useWoocommerce
  );

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

  const onlineStoreDetails = onlineStoreState.use();

  const handleDataUpdate = () => {
    if (name !== null && phoneNumber !== null && address !== null) {
      setStoreDetailState({
        name: name ? name : "",
        phoneNumber: phoneNumber ? phoneNumber : "",
        address: address ? address : "",
        website: website ? website : "",
        deliveryPrice: deliveryPrice ? deliveryPrice : "",
        settingsPassword: settingsPassword ? settingsPassword : "",
        taxRate: parseFloat(taxRate) >= 0 ? parseFloat(taxRate) : 13,
        onlineStoreActive: onlineStoreDetails.onlineStoreActive ? onlineStoreDetails.onlineStoreActive : false,
        acceptDelivery: acceptDelivery ? acceptDelivery : false,
        deliveryRange: deliveryRange ? deliveryRange : "",
      });
      updateStoreDetails({
        name: name ? name : "",
        phoneNumber: phoneNumber ? phoneNumber : "",
        address: address ? address : "",
        website: website ? website : "",
        deliveryPrice: deliveryPrice ? deliveryPrice : "",
        settingsPassword: settingsPassword ? settingsPassword : "",
        taxRate: parseFloat(taxRate) >= 0 ? parseFloat(taxRate) : 13,
        onlineStoreActive: onlineStoreDetails.onlineStoreActive ? onlineStoreDetails.onlineStoreActive : false,
        acceptDelivery: acceptDelivery ? acceptDelivery : false,
        deliveryRange: deliveryRange ? deliveryRange : "",
      });
      // if (customBtnExtraFunction) {
      //   customBtnExtraFunction();
      // }
      alert("Settings updated successfully");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    // <View style={styles.container}>
    //   <Text style={styles.headerLbl}>Online Store Settings</Text>
    <ScrollView style={styles.contentContainer} contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    }}>
      <View style={styles.inputsLeftAndRight}>
        <View style={styles.leftSideGroup}>
          <InputWithLabel
            lbl='Store Name'
            style={styles.storeNameInput}
            placeholder='Enter store name'
            onChangeText={(val) => setname(val)}
            value={name}
          />
          <InputWithLabel
            lbl="Store Website URL"
            style={styles.storeWebsiteUrlInput}
            placeholder='Enter store website URL'
            onChangeText={(val) => setwebsite(val)}
            value={website}
          />
          <InputWithLabel
            lbl="Store Phone Number"
            style={styles.storePhoneNumberInput}
            placeholder='Enter store phone number'
            onChangeText={(val) => setphoneNumber(val)}
            value={phoneNumber}
          />
          <InputWithLabel
            lbl="Settings Password"
            style={styles.settingsPasswordInput}
            placeholder='Enter settings password'
            onChangeText={(val) => setsettingsPassword(val)}
            value={settingsPassword}
          />
        </View>
        <View style={styles.rightSideGroup}>
          <InputWithLabel
            lbl="Tax Rate - Default (13%)"
            style={styles.taxRateInput}
            placeholder='Enter tax rate (Ex. 13%)'
            onChangeText={(val) => {
              // const re = /^[0-9]+$/;

              // if (re.test(val)) {
              //   if (parseFloat(val) > 100) {
              //     settaxRate(val);
              //   }
              // } else if (!val) {
              //   settaxRate("");
              // }
              settaxRate(val);
            }}
            value={taxRate ? taxRate.toString() : ""}
          />
          <View
            style={[styles.taxRateInput, { justifyContent: "space-between", }]}
          >
            <Text style={{
              fontWeight: "700",
              color: "#020202",
              fontSize: 17,
              height: 20,
              alignSelf: "stretch",
            }}>Store Address</Text>
            <GooglePlacesAutocomplete
              apiOptions={{
                region: "CA",
              }}
              debounce={800}
              apiKey={GOOGLE_API_KEY}
              selectProps={{
                address,
                onChange: setaddress,
                defaultValue: address,
                menuPortalTarget: document.body,
                styles: GooglePlacesStyles
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
          <View style={styles.acceptDeliveryGroup}>
            <Text style={styles.acceptDeliveryLbl}>Accept Delivery?</Text>
            <GeneralSwitch isActive={acceptDelivery} toggleSwitch={() => setacceptDelivery(prev => !prev)} />
          </View>
          {acceptDelivery &&
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <InputWithLabel
                lbl="Delivery Fee"
                style={{ height: 89, width: '48%' }}
                placeholder='Enter delivery price'
                onChangeText={(val) => setdeliveryPrice(val)}
                value={deliveryPrice}
              />
              <InputWithLabel
                lbl="Delivery Radius (KM)"
                style={{ height: 89, width: '48%' }}
                placeholder='Enter delivery range in KM'
                onChangeText={(val) => setdeliveryRange(val)}
                value={deliveryRange}
              />
            </View>
          }
          {
            !acceptDelivery &&
            <View style={{ height: 89, width: '100%' }} />
          }
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable activeOpacity={0.8} style={styles.saveBtn} onPress={handleDataUpdate}>
          <Text style={styles.saveBtnTxt}>Save</Text>
        </Pressable>
      </View>
      <View style={styles.downloadRow}>
        <View style={styles.downloadGroup}>
          <Text style={styles.downloadTxt}>
            Download our helper software to enable seamless integration of
            your printer with our service.
          </Text>
          <View style={styles.downloadsBtnsRow}>
            <a
              href={require("assets/divine-pos-helper.exe")}
              download="Divine Pos Helper.exe"
            >
              <Image
                source={require("./assets/images/image_E3zi..png")}
                resizeMode="contain"
                style={styles.windowsDownloadImg}
              />
            </a>
            <a
              href={require("assets/divine-pos-helper.pkg")}
              download="Divine Pos Helper.pkg"
            >
              <Image
                source={require("./assets/images/image_F2vF..png")}
                resizeMode="contain"
                style={styles.macDownloadImg}
              />
            </a>
          </View>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: "100%",
    height: 759
  },
  headerLbl: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 16
  },
  contentContainer: {
    width: '100%',
    height: '100%',
  },
  inputsLeftAndRight: {
    width: '95%',
    height: 414,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftSideGroup: {
    width: '40%',
    height: 414,
    justifyContent: "space-between"
  },
  storeNameInput: {
    height: 89,
    width: '100%'
  },
  storeWebsiteUrlInput: {
    height: 89,
    width: '100%'
  },
  storePhoneNumberInput: {
    height: 89,
    width: '100%'
  },
  settingsPasswordInput: {
    height: 89,
    width: '100%'
  },
  rightSideGroup: {
    width: '40%',
    height: 414,
    justifyContent: "space-between"
  },
  acceptDeliveryGroup: {
    width: '100%',
    height: 89,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingBottom: 27
  },
  acceptDeliveryLbl: {
    fontWeight: '700',
    color: "#121212",
    textDecorationLine: "underline",
    fontSize: 17,
    marginRight: 10
  },
  acceptDeliverySwitch: {
    width: 46,
    height: 20,
    backgroundColor: "#E6E6E6"
  },
  deliveryPriceInput: {
    height: 89,
    width: '100%'
  },
  deliveryRangeInput: {
    height: 89,
    width: '100%'
  },
  taxRateInput: {
    height: 89,
    width: '100%'
  },
  btnContainer: {
    width: '100%',
    height: 111,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  saveBtn: {
    width: 173,
    height: 46,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  saveBtnTxt: {
    fontWeight: '700',
    color: "rgba(255,245,245,1)",
    fontSize: 14
  },
  downloadRow: {
    height: 115,
    width: '95%'
  },
  downloadGroup: {
    width: 314,
    height: 115,
    justifyContent: "space-between"
  },
  downloadTxt: {
    color: "#121212",
    fontSize: 17,
    width: 314,
    height: 64,
    lineHeight: 14
  },
  downloadsBtnsRow: {
    width: 289,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  windowsDownloadImg: {
    height: 50,
    width: 132
  },
  macDownloadImg: {
    height: 50,
    width: 132
  }
});

export default GeneralSettings;
