import React, { useEffect, useState } from "react";
import { signUp } from "state/firebaseFunctions";
import { useHistory } from "react-router-dom";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [error, seterror] = useState(false);
  const history = useHistory();
  const { height, width } = useWindowDimensions();
  const [useSmallDesign, setuseSmallDesign] = useState(width < 1024);

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
      signUp(email, password, name, phoneNumber).catch((error) => {
        console.log(error);
        // seterror(error.message);
        alert(error.message);
      });
    } else {
      alert("Please enter your email and password");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
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
          <TouchableOpacity
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
          </TouchableOpacity>
          <a href="https://divinepos.com" style={{ textDecoration: "none" }}>
            <img
              src={require("assets/dpos-logo-black.png")}
              style={styles.logo}
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
                    value={email}
                    onChangeText={(val) => setphoneNumber(val)}
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
                    onChangeText={(val) => setEmail(val)}
                    onKeyPress={handleKeyDown}
                  />
                </View>
                <View style={styles.emailInputGroup}>
                  <Text style={styles.password}>Password</Text>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                    onKeyPress={handleKeyDown}
                  />
                </View>
              </View>
              <View style={styles.btnBottomContainer}>
                <a
                  href="https://divinepos.com/terms-conditions/"
                  style={{ textDecoration: "none", marginBottom: 25 }}
                >
                  <Text style={styles.signUpTxt}>
                    By creating an account, I agree to Divine POS's terms of
                    service
                  </Text>
                </a>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={attemptSignUp}
                >
                  <Text style={styles.loginTxt}>Sign Up</Text>
                </TouchableOpacity>
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
