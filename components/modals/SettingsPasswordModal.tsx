import {
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { setIsSignedInSettingsState, storeDetailState } from "state/state";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import Axios from "axios";
import { auth } from "state/firebaseConfig";
import { useHistory } from "react-router-dom";
import Modal from "react-native-modal";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import { useAlert } from "react-alert";

const SettingsPasswordModal = () => {
  const { height, width } = useWindowDimensions();
  const [password, setpassword] = useState("");
  const storeDetails = storeDetailState.use();
  const [inccorectPass, setinccorectPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { settingsPasswordModalVis } = posHomeState.use();
  const alertP = useAlert();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (password == storeDetails.settingsPassword) {
        setIsSignedInSettingsState(true);
        history.push("/authed/dashboard");
        localStorage.setItem("isAuthedBackend", true);
        // setsettingsPasswordModalVis(false);
        updatePosHomeState({ settingsPasswordModalVis: false });
        setinccorectPass(false);
      } else {
        setinccorectPass(true);
      }
    }
  };

  useFonts({
    Password: require("/assets/password.ttf"),
  });

  const SendEmail = () => {
    const data = JSON.stringify({
      email: auth.currentUser?.email,
      password: storeDetails.settingsPassword,
    });

    const config = {
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
        alertP.error("Settings password has been sent to your account email");
      })
      .catch(function (error) {
        alertP.error(error);
      });
  };

  return (
    <Modal
      isVisible={settingsPasswordModalVis}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            updatePosHomeState({ settingsPasswordModalVis: false });
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <Pressable>
            <div style={{ cursor: "default" }}>
              <View style={styles.container}>
                <View style={styles.topLabelSectionContainer}>
                  <Text style={styles.settingsLabel}>Settings</Text>
                  <Text style={styles.authorizationLabel}>Authorization</Text>
                </View>
                <View>
                  <TextInput
                    placeholder="Enter Password"
                    style={[
                      styles.passwordTxtInput,
                      !showPassword &&
                        password.length !== 0 && { fontFamily: "Password" },
                    ]}
                    value={password}
                    onChangeText={(val) => setpassword(val)}
                    textContentType="none"
                    autoCorrect={false}
                    onKeyPress={handleKeyDown}
                  />
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      right: 5,
                      top: 0,
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
                  <Text style={{ marginBottom: 10 }}>
                    Password is inccorect!
                  </Text>
                )}
                <View style={styles.bottomSectionContainer}>
                  <Pressable
                    onPress={() => {
                      if (password == storeDetails.settingsPassword) {
                        setIsSignedInSettingsState(true);
                        history.push("/authed/dashboard");
                        // setsettingsPasswordModalVis(false);
                        updatePosHomeState({ settingsPasswordModalVis: false });
                        setinccorectPass(false);
                        localStorage.setItem("isAuthedBackend", true);
                      } else {
                        setinccorectPass(true);
                      }
                    }}
                    style={[
                      styles.goBtn,
                      password.length < 1 && { opacity: 0.8 },
                    ]}
                    disabled={password.length < 1}
                  >
                    <Text style={styles.goBtnTxt}>Go</Text>
                  </Pressable>
                  <Pressable onPress={SendEmail}>
                    <Text style={styles.forgotPasswordTxt}>
                      Forgot Password?
                    </Text>
                  </Pressable>
                </View>
              </View>
            </div>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

export default SettingsPasswordModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "space-between",
    width: 366,
    height: 288,
  },
  topLabelSectionContainer: {
    width: 87,
    height: 51,
    alignItems: "center",
    justifyContent: "space-between",
    margin: "",
    marginTop: 29,
  },
  settingsLabel: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 24,
  },
  authorizationLabel: {
    color: "#5f5f5f",
  },
  passwordTxtInput: {
    width: 294,
    height: 36,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#a4a4a4",
    borderRadius: 10,
    padding: 10,
  },
  bottomSectionContainer: {
    width: 132,
    height: 65,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "",
    marginBottom: 16,
  },
  goBtn: {
    width: 132,
    height: 36,
    backgroundColor: "#1d284e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  goBtnTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  forgotPasswordTxt: {
    color: "#8b8484",
    textDecorationLine: "underline",
  },
});
