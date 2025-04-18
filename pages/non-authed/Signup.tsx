import React, { useEffect, useState } from "react";
import { signUp } from "state/firebaseFunctions";
import { useHistory } from "react-router-dom";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAlert } from "react-alert";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const history = useHistory();
  const { width } = useWindowDimensions();
  const [useSmallDesign, setuseSmallDesign] = useState(width < 1024);
  const [secureEntry, setsecureEntry] = useState(true);
  const alertP = useAlert();

  useEffect(() => {
    const third = width / 3;
    if (third < 200) {
      setuseSmallDesign(true);
    } else {
      setuseSmallDesign(false);
    }
  }, [width]);

  const attemptSignUp = () => {
    if (email && password) {
      signUp(email, password, name, phoneNumber).catch(() => {
        // console.log(error);
        alertP.error("There was a issue signing up. Please try again.");
      });
    } else {
      alertP.error("Please enter your email and password");
    }
  };

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Enter") {
      attemptSignUp();
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("./images/background.png")}
      imageStyle={{
        resizeMode: "cover",
      }}
      key={"background"}
    >
      <ScrollView
        style={{ height: "100%", width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.headerContainer,
            useSmallDesign && { width: "90%" },
            { height: 110 },
          ]}
        >
          <Pressable
            onPress={() => history.push("/log-in")}
            style={{ position: "absolute", left: 0, bottom: 24 }}
          >
            <View style={styles.backBtn}>
              <Feather
                name={useSmallDesign ? "chevron-left" : "arrow-left"}
                style={styles.leftIcon}
              />
              {!useSmallDesign && <Text style={styles.backTxt}>Back</Text>}
            </View>
          </Pressable>
          <a href="https://divinepos.com" style={{ textDecoration: "none" }}>
            <img
              src={require("assets/dpos-logo-black.png")}
              style={styles.logo}
              key={"logo"}
            />
          </a>
        </View>
        <View style={styles.mainPageContainer}>
          <View
            style={[styles.logInContainer, useSmallDesign && { width: "90%" }]}
          >
            <Text style={styles.logIn}>Sign Up</Text>
            <View style={styles.bottomContainer}>
              <View style={styles.inputsContainer}>
                <View style={styles.emailInputGroup}>
                  <Text style={styles.emailAddress}>Full name</Text>
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Enter name"
                    textContentType="name"
                    value={name}
                    onChangeText={(val) => setname(val)}
                    onKeyPress={handleKeyDown}
                  />
                </View>
                <View style={styles.emailInputGroup}>
                  <Text style={styles.emailAddress}>Phone number</Text>
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Enter phone number"
                    textContentType="telephoneNumber"
                    value={phoneNumber}
                    onChangeText={(val) =>
                      setphoneNumber(val.replace(/\s/g, ""))
                    }
                    onKeyPress={handleKeyDown}
                  />
                </View>
                <View style={styles.emailInputGroup}>
                  <Text style={styles.emailAddress}>Email address</Text>
                  <TextInput
                    style={styles.emailInput}
                    placeholder="Enter email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(val) => setEmail(val.replace(/\s/g, ""))}
                    onKeyPress={handleKeyDown}
                  />
                </View>
                <View style={styles.emailInputGroup}>
                  <Text style={styles.password}>Password</Text>
                  <View>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter password"
                      secureTextEntry={secureEntry}
                      textContentType="password"
                      value={password}
                      onChangeText={(val) =>
                        setPassword(val.replace(/\s/g, ""))
                      }
                      onKeyPress={handleKeyDown}
                    />
                    <Pressable
                      onPress={() => setsecureEntry(!secureEntry)}
                      style={{ position: "absolute", right: 15, top: 15 }}
                    >
                      <Feather
                        name={secureEntry ? "eye-off" : "eye"}
                        style={{ fontSize: 20, color: "#333333" }}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.btnBottomContainer}>
                <a
                  href="https://divinepos.com/terms-conditions/"
                  style={{ textDecoration: "none", marginBottom: 25 }}
                >
                  <Text style={styles.signUpTxt}>
                    By creating an account, I agree to Divine POS&apos;s terms
                    of service
                  </Text>
                </a>
                <Pressable style={styles.loginBtn} onPress={attemptSignUp}>
                  <Text style={styles.loginTxt}>Sign Up</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  mainPageContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  headerContainer: {
    width: "70%",
    // height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerInnerContainer: {
    width: "60%",
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 72,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  backTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  logo: {
    height: 68,
    width: 196,
    objectFit: "contain",
  },
  logInContainer: {
    width: 423,
    height: 408,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logIn: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 36,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emailInputGroup: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    marginBottom: 25,
  },
  emailAddress: {
    fontWeight: "700",
    color: "#333333",
    fontSize: 15,
  },
  emailInput: {
    width: "100%",
    height: 51,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
  },
  passwordInputGroup: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
  },
  password: {
    fontWeight: "700",
    color: "#333333",
    fontSize: 15,
  },
  passwordInput: {
    width: "100%",
    height: 51,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
  },
  btnBottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 25,
  },
  loginBtn: {
    width: "100%",
    height: 44,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
  signUpTxt: {
    color: "#313b47",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#313b47",
    fontSize: 16,
  },
});

export default Signup;
