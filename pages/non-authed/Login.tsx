import React, { useState } from "react";
import { signIn } from "state/firebaseFunctions";
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
} from "react-native";
import { Feather } from "@expo/vector-icons";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(false);
  const history = useHistory();

  const attemptSignIn = () => {
    if (email && password) {
      signIn(email, password).catch((error) => {
        console.log(error);
        // seterror(error.message);
        alert(error.message);
      });
    } else {
      alert("Please enter your email and password");
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
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <a href="https://divinepos.com" style={{ textDecoration: "none" }}>
            <View style={styles.backBtn}>
              <Feather name="arrow-left" style={styles.leftIcon} />
              <Text style={styles.backTxt}>Back</Text>
            </View>
          </a>
          <a href="https://divinepos.com" style={{ textDecoration: "none" }}>
            <img
              src={require("assets/dpos-logo-black.png")}
              style={styles.logo}
            />
          </a>
        </View>
      </View>
      <View style={styles.mainPageContainer}>
        <View style={styles.logInContainer}>
          <Text style={styles.logIn}>Log In</Text>
          <View style={styles.bottomContainer}>
            <View style={styles.inputsContainer}>
              <View style={styles.emailInputGroup}>
                <Text style={styles.emailAddress}>Email address</Text>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter email"
                  value={email}
                  onChangeText={(val) => setEmail(val)}
                />
              </View>
              <View style={styles.passwordInputGroup}>
                <Text style={styles.password}>Password</Text>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  value={password}
                  onChangeText={(val) => setPassword(val)}
                />
              </View>
            </View>
            <View style={styles.btnBottomContainer}>
              <TouchableOpacity style={styles.loginBtn} onPress={attemptSignIn}>
                <Text style={styles.loginTxt}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => history.push("/sign-up")}>
                <Text style={styles.signUpTxt}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => history.push("/reset-password")}>
                <Text style={styles.forgotPassword}>Forgot password</Text>
              </TouchableOpacity>
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
    width: 1020,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  topContainer: {
    width: 1020,
    height: 575,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    width: 1020,
    height: "15%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  headerInnerContainer: {
    width: 601,
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
    width: 423,
    height: 318,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    width: 423,
    height: 177,
    justifyContent: "space-between",
    alignItems: "center",
  },
  emailInputGroup: {
    width: 423,
    height: 80,
    justifyContent: "space-between",
  },
  emailAddress: {
    fontWeight: "700",
    color: "#333333",
    fontSize: 15,
  },
  emailInput: {
    width: 423,
    height: 51,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
  },
  passwordInputGroup: {
    width: 423,
    height: 80,
    justifyContent: "space-between",
  },
  password: {
    fontWeight: "700",
    color: "#333333",
    fontSize: 15,
  },
  passwordInput: {
    width: 423,
    height: 51,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
  },
  btnBottomContainer: {
    width: 422,
    height: 109,
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginBtn: {
    width: 422,
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
