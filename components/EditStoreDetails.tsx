import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import { setStoreDetailState, storeDetailState } from "state/state";
import { updateStoreDetails } from "state/firebaseFunctions";

const EditStoreDetails = () => {
  const storeDetails = storeDetailState.use();
  const [name, setname] = useState(storeDetails.name);
  const [phoneNumber, setphoneNumber] = useState(storeDetails.phoneNumber);
  const [address, setaddress] = useState(storeDetails.address);
  const [website, setwebsite] = useState(storeDetails.website);

  const handleDataUpdate = () => {
    if (name !== null && phoneNumber !== null && address !== null) {
      setStoreDetailState({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        website: website,
      });
      updateStoreDetails({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        website: website,
      });
    }
  };

  return (
    <ScrollView style={{ padding: 25 }}>
      <Text style={{ fontSize: 17, fontWeight: "600" }}>
        Current categories
      </Text>
      <TextInput
        placeholder="Enter Store Name"
        onChangeText={(val) => setname(val)}
        style={{ margin: 10 }}
        value={name}
      />
      <TextInput
        placeholder="Enter Store Website Url"
        onChangeText={(val) => setwebsite(val)}
        style={{ margin: 10 }}
        value={website}
      />
      <TextInput
        placeholder="Enter Store Phone Number"
        onChangeText={(val) => setphoneNumber(val)}
        style={{ margin: 10 }}
        value={phoneNumber}
      />
      <TextInput
        placeholder="Enter Store Address"
        onChangeText={(val) => setaddress(val)}
        style={{ margin: 10 }}
        value={address}
      />
      <Button title="Save" onPress={handleDataUpdate} style={{ margin: 10 }} />
      {/* <Spinner isModalVisible={isModalVisible} /> */}
    </ScrollView>
  );
};

export default EditStoreDetails;
