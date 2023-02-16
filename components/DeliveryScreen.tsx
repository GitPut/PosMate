import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { cartState, setCartState } from "state/state";
import { Switch } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const DeliveryScreen = ({
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
}) => {
  const [localAddress, setlocalAddress] = useState(null);

  useEffect(() => {
    setAddress(localAddress?.label);
  }, [localAddress]);

  return (
    <View
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.modalContainer}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "600",
            color: "rgba(74,74,74,1)",
            marginBottom: 20,
          }}
        >
          Create Phone Order
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(243,243,243,1)",
            borderRadius: 30,
            height: 60,
            marginBottom: 25,
          }}
        >
          <View
            style={{
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(218,216,216,1)",
              borderRadius: 30,
              height: 60,
            }}
          >
            <MaterialCommunityIcons
              name="account"
              size={32}
              color="rgba(71,106,229,1)"
            />
          </View>
          <TextInput
            placeholder="Enter name"
            style={{ width: "80%" }}
            inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
            value={name}
            onChangeText={(val) => setName(val)}
            autoCorrect={false}
            textContentType={"name"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(243,243,243,1)",
            borderRadius: 30,
            height: 60,
            marginBottom: 25,
          }}
        >
          <View
            style={{
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(218,216,216,1)",
              borderRadius: 30,
              height: 60,
            }}
          >
            <MaterialCommunityIcons
              name="phone"
              size={32}
              color="rgba(74,74,74,1)"
            />
          </View>
          <TextInput
            placeholder="Enter Phone #"
            style={{ width: "80%" }}
            inputStyle={{ backgroundColor: "rgba(243,243,243,1)" }}
            value={phone}
            onChangeText={(val) => setPhone(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <Text style={{ fontWeight: "400", marginRight: 20, marginLeft: 30 }}>
            Delivery Included?
          </Text>
          <Switch
            value={deliveryChecked}
            onValueChange={() => {
              setDeliveryChecked(!deliveryChecked);
            }}
          />
        </View>
        {deliveryChecked && (
          <GooglePlacesAutocomplete
            apiOptions={{
              region: "CA",
            }}
            debounce={800}
            apiKey={GOOGLE_API_KEY}
            // onSelect={handleAddress}
            selectProps={{
              localAddress,
              onChange: setlocalAddress,
            }}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <div style={{ width: "80%" }}>
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
        {/* <Text>ADDRESS: {address}</Text> */}
        <Button
          title="Order"
          // onPress={GetTrans}
          onPress={() => {
            setDeliveryModal(false);
            setOngoingDelivery(true);
          }}
          contentContainerStyle={styles.btn}
          style={{ margin: 25 }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setDeliveryModal(false);
            setOngoingDelivery(null);
            setName(null);
            setPhone(null);
            setAddress(null);
          }}
          contentContainerStyle={styles.btn}
          style={{ margin: 25 }}
        />
      </View>
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  halfRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  toppingsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 25,
  },
  touchable: {
    margin: 25,
    width: 300,
  },
  modalContainer: {
    padding: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.57,
    shadowRadius: 10,
    width: "35%",
  },
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 25,
    marginBottom: 25,
  },
});
