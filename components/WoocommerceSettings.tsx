import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Button, Switch, TextInput } from "@react-native-material/core";
import { setWoocommerceState, woocommerceState } from "state/state";
import { updateWooCredentials } from "state/firebaseFunctions";

const WoocommerceSettings = () => {
  const wooCredentials = woocommerceState.use();
  const [apiUrl, setapiUrl] = useState(wooCredentials.apiUrl);
  const [ck, setck] = useState(wooCredentials.ck);
  const [cs, setcs] = useState(wooCredentials.cs);
  const [useWoocommerce, setuseWoocommerce] = useState(
    wooCredentials.useWoocommerce
  );

  const handleDataUpdate = () => {
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

  return (
    <ScrollView style={{ padding: 25 }}>
      <Text style={{ fontSize: 17, fontWeight: "600" }}>
        Current categories
      </Text>
      <TextInput
        placeholder="Enter Woocommerce 'API Url'"
        onChangeText={(val) => setapiUrl(val)}
        style={{ margin: 10 }}
        value={apiUrl}
      />
      <TextInput
        placeholder="Enter Woocommerce 'CK'"
        onChangeText={(val) => setck(val)}
        style={{ margin: 10 }}
        value={ck}
      />
      <TextInput
        placeholder="Enter Woocommerce 'CS'"
        onChangeText={(val) => setcs(val)}
        style={{ margin: 10 }}
        value={cs}
      />
      <Switch
        value={useWoocommerce}
        onValueChange={(val) => setuseWoocommerce(val)}
      />
      <Button title="Save" onPress={handleDataUpdate} style={{ margin: 10 }} />
      {/* <Spinner isModalVisible={isModalVisible} /> */}
    </ScrollView>
  );
};

export default WoocommerceSettings;
