import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import { setStoreDetailState, storeDetailState } from "state/state";
import { updateStoreDetails } from "state/firebaseFunctions";
import DropDown from "./DropDown";

const EditStoreDetails = ({ customBtnLbl, customBtnExtraFunction }) => {
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

  const handleDataUpdate = () => {
    if (name !== null && phoneNumber !== null && address !== null && settingsPassword !== null) {
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
      customBtnExtraFunction();
    }
  };

  return (
    <ScrollView style={{ padding: 25 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <TextInput
          placeholder="Enter Store Name"
          onChangeText={(val) => setname(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={name}
        />
        <TextInput
          placeholder="Enter Store Website Url"
          onChangeText={(val) => setwebsite(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={website}
        />
        <TextInput
          placeholder="Enter Store Phone Number"
          onChangeText={(val) => setphoneNumber(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={phoneNumber}
        />
        <TextInput
          placeholder="Enter Store Address"
          onChangeText={(val) => setaddress(val)}
          style={{ margin: 10, minWidth: "30%" }}
          value={address}
        />
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
    </ScrollView>
  );
};

export default EditStoreDetails;
