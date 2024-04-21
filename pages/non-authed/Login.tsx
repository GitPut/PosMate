import React, { useEffect, useState } from "react";
import { signIn } from "state/firebaseFunctions";
import { useHistory } from "react-router-dom";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAlert } from "react-alert";

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const history = useHistory();
  const { width } = useWindowDimensions();
  const [useSmallDesign, setuseSmallDesign] = useState<boolean>(width < 1024);
  const [secureEntry, setsecureEntry] = useState<boolean>(true);
  const alertP = useAlert();

  useEffect(() => {
    const third = width / 3;
    if (third < 200) {
      setuseSmallDesign(true);
    } else {
      setuseSmallDesign(false);
    }
  }, [width]);

  const attemptSignIn = () => {
    if (email && password) {
      signIn(email, password).catch((error) => {
        console.log(error);
        alertP.error("Invalid email or password");
      });
    } else {
      alertP.error("Please enter your email and password");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      attemptSignIn();
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
      <View
        style={[styles.headerContainer, useSmallDesign && { width: "90%" }]}
      >
        <a
          href="https://divinepos.com"
          style={{
            textDecoration: "none",
            position: "absolute",
            left: 0,
            bottom: 24,
          }}
        >
          <View style={styles.backBtn}>
            <Feather
              name={useSmallDesign ? "chevron-left" : "arrow-left"}
              style={styles.leftIcon}
            />
            {!useSmallDesign && <Text style={styles.backTxt}>Back</Text>}
          </View>
        </a>
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
          <Text style={styles.logIn}>Log In</Text>
          <View style={styles.bottomContainer}>
            <View style={styles.inputsContainer}>
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
              <View style={styles.passwordInputGroup}>
                <Text style={styles.password}>Password</Text>
                <View>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter password"
                    secureTextEntry={secureEntry}
                    textContentType="password"
                    value={password}
                    onChangeText={(val) => setPassword(val.replace(/\s/g, ""))}
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
              <Pressable style={styles.loginBtn} onPress={attemptSignIn}>
                <Text style={styles.loginTxt}>Log In</Text>
              </Pressable>
              <Pressable onPress={() => history.push("/sign-up")}>
                <Text style={styles.signUpTxt}>
                  Don&apos;t have an account? Sign Up
                </Text>
              </Pressable>
              <Pressable onPress={() => history.push("/reset-password")}>
                <Text style={styles.forgotPassword}>Forgot password</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
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
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  headerContainer: {
    width: "70%",
    height: "15%",
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
    height: 318,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    width: "100%",
    height: 177,
    justifyContent: "space-between",
    alignItems: "center",
  },
  emailInputGroup: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
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
    height: 109,
    justifyContent: "space-between",
    alignItems: "center",
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

export default Login;
