import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text, TextInput } from "@react-native-material/core";
import { storeDetailState, transListState, userStoreState } from "state/state";
import { updateTransList } from "state/firebaseFunctions";
import ChangeScreen from "./ChangeScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import useWindowDimensions from "./useWindowDimensions";
import { useFonts } from "expo-font";
import Axios from "axios";
import { auth } from "state/firebaseConfig";

const SettingsPasswordModal = ({ setsettingsPasswordModalVis, navigation }) => {
  const { height, width } = useWindowDimensions();
  const [password, setpassword] = useState("");
  const storeDetails = storeDetailState.use();
  const [inccorectPass, setinccorectPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useFonts({
    Password: require("/assets/password.ttf"),
  });

  const SendEmail = () => {
    var data = JSON.stringify({
      email: auth.currentUser?.email,
      password: storeDetails.settingsPassword,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://us-central1-posmate-5fc0a.cloudfunctions.net/sendSettingsPass",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Settings password has been sent to your account email");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setsettingsPasswordModalVis(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: width,
        }}
      />
      <View
        style={{
          backgroundColor: "white",
          height: 300,
          width: 350,
          borderRadius: 30,
          shadowColor: "rgba(0,0,0,1)",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          elevation: 30,
          shadowOpacity: 0.57,
          shadowRadius: 10,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: "600",
            width: "50%",
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            marginBottom: 25,
            color: "rgba(74,74,74,1)",
            fontWeight: "600",
            width: "50%",
            textAlign: "center",
          }}
        >
          Authorization
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(241,241,241,1)",
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
            <Ionicons
              name="finger-print"
              size={32}
              color="rgba(71,106,229,1)"
            />
          </View>
          <TextInput
            color="black"
            placeholder="Enter Password"
            inputStyle={[
              { width: 200 },
              { backgroundColor: "rgba(241,241,241,1)" },
              !showPassword &&
                password.length !== 0 && { fontFamily: "Password" },
            ]}
            value={password}
            onChangeText={(val) => setpassword(val)}
            textContentType="none"
            autoCorrect={false}
          />
          {/* <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            onFocus={() => setShowPassword(false)}
          /> */}
          <View
            style={{
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              height: 60,
            }}
          >
            {!showPassword ? (
              <Ionicons
                name="eye"
                size={32}
                color="rgba(74,74,74,1)"
                onPress={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <Ionicons
                name="eye-off"
                size={32}
                color="rgba(74,74,74,1)"
                onPress={() => setShowPassword((prev) => !prev)}
              />
            )}
          </View>
        </View>
        {inccorectPass && (
          <Text style={{ marginBottom: 10 }}>Password is inccorect!</Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(155,155,155,1)",
            borderRadius: 30,
            width: 150,
            height: 61,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            if (password == storeDetails.settingsPassword) {
              navigation.navigate("settings");
              setsettingsPasswordModalVis(false);
              setinccorectPass(false);
            } else {
              setinccorectPass(true);
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 20, paddingRight: 10 }}>
            Go
          </Text>
          <Feather name="arrow-up-right" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={SendEmail} style={{ marginTop: 10 }}>
          <Text style={{ color: "blue", fontSize: 14 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SettingsPasswordModal;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    height: "95%",
    width: "100%",
    alignItems: "center",
  },
});
