import React, { useState } from "react";
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
import Axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, seterror] = useState(false);
  const history = useHistory();

  const submit = () => {
    if (email === "") {
      alert("Please enter an email address");
      return;
    }
    const data = JSON.stringify({
      email: email,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://us-central1-posmate-5fc0a.cloudfunctions.net/sendPasswordResetEmail",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert(
          "If we found an account associated with that email address, we've sent a link to reset your password."
        );
      })
      .catch(function (error) {
        console.log(error);
        // seterror(true);
        alert(
          "There was an error resetting your password. Please try again, or contact us if you continue to have problems."
        );
      });
    setEmail("");
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
          <TouchableOpacity onPress={() => history.push("/log-in")}>
            <View style={styles.backBtn}>
              <Feather name="arrow-left" style={styles.leftIcon} />
              <Text style={styles.backTxt}>Back</Text>
            </View>
          </TouchableOpacity>
          <a href="https://divinepos.com" style={{ textDecoration: "none" }}>
            <img
              src={require("assets/dpos-logo-black.png")}
              style={styles.logo}
            />
          </a>
        </View>
      </View>
      <View style={styles.mainPageContainer}>
        <View style={styles.resetPasswordContainer}>
          <Text style={styles.resetPassword}>Reset password</Text>
          <View style={styles.bottomContainer}>
            <View style={styles.inputsContainer}>
              <Text style={styles.txt}>
                Please enter in your account email and we will send you a
                password reset link to your email
              </Text>
              <View style={styles.emailInputGroup}>
                <Text style={styles.emailAddress}>Email address</Text>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter email"
                  value={email}
                  onChangeText={(val) => setEmail(val)}
                />
              </View>
            </View>
            <View style={styles.btnBottomContainer}>
              <TouchableOpacity style={styles.submitBtn} onPress={submit}>
                <Text style={styles.submit}>Submit</Text>
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
  resetPasswordContainer: {
    width: 423,
    height: 408,
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetPassword: {
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
    height: 159,
    alignItems: "center",
    justifyContent: "space-between",
  },
  txt: {
    color: "#121212",
    fontSize: 16,
    width: 423,
    height: 48,
    textAlign: "justify",
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
  btnBottomContainer: {
    width: 422,
    height: 109,
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitBtn: {
    width: 422,
    height: 44,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
});

export default ResetPassword;
