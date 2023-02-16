import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import { setStoreDetailState, storeDetailState } from "state/state";
import { updateStoreDetails } from "state/firebaseFunctions";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

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
  const [com, setcom] = useState(storeDetails.comSelected);
  const [settingsPassword, setsettingsPassword] = useState(
    storeDetails.settingsPassword
  );

  useEffect(() => {
    console.log("Jellp address is: ", address);
  }, [address]);

  const handleDataUpdate = () => {
    if (
      name !== null &&
      phoneNumber !== null &&
      address !== null &&
      settingsPassword !== null
    ) {
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
    }
  };

  return (
    <ScrollView style={{ padding: 25 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
        <TextInput
          placeholder="Enter Store Name"
          onChangeText={(val) => setname(val)}
          style={{ margin: 10, minWidth: "30%", flex: 1 }}
          value={name}
        />
        <TextInput
          placeholder="Enter Store Website Url"
          onChangeText={(val) => setwebsite(val)}
          style={{ margin: 10, minWidth: "30%", flex: 1 }}
          value={website}
        />
        <TextInput
          placeholder="Enter Store Phone Number"
          onChangeText={(val) => setphoneNumber(val)}
          style={{ margin: 10, minWidth: "30%", flex: 1 }}
          value={phoneNumber}
        />
        <View style={{ margin: 10, minWidth: "30%", flex: 1 }}>
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
        </View>
        <TextInput
          placeholder="Enter Delivery Price"
          onChangeText={(val) => setdeliveryPrice(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={deliveryPrice}
        />
        <TextInput
          placeholder="Enter Printer Name"
          onChangeText={(val) => setcom(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={com}
        />
        <TextInput
          placeholder="Enter Settings Page Password"
          onChangeText={(val) => setsettingsPassword(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={settingsPassword}
        />
      </View>
      <Button
        title={customBtnLbl ? customBtnLbl : "Save"}
        onPress={handleDataUpdate}
        style={{ margin: 10 }}
      />
      {/* <Spinner isModalVisible={isModalVisible} /> */}
      <Text style={{ marginTop: 30 }}>DOWNLOAD HELPER WINDOWS</Text>
      <a
        href={require("assets/divine-pos-helper.exe")}
        download="Divine Pos Helper.exe"
      >
        <Button title="DOWNLOAD HELPER WINDOWS" />
      </a>
      <Text style={{ marginTop: 30 }}>DOWNLOAD HELPER MAC</Text>
      <a
        href={require("assets/divine-pos-helper.pkg")}
        download="Divine Pos Helper.pkg"
      >
        <Button title="DOWNLOAD HELPER MAC" />
      </a>
    </ScrollView>
  );
};

export default EditStoreDetails;
