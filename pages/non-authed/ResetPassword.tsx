import React, { useEffect, useState } from "react";
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
import Axios from "axios";
import { useAlert } from "react-alert";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const {  width } = useWindowDimensions();
  const [useSmallDesign, setuseSmallDesign] = useState(width < 1024);
  const alertP = useAlert();

  useEffect(() => {
    const third = width / 3;
    if (third < 200) {
      setuseSmallDesign(true);
    } else {
      setuseSmallDesign(false);
    }
  }, [width]);

  const submit = () => {
    if (email === "") {
      alertP.error("Please enter an email address");
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
        alertP.success("We've sent a link to reset your password.");
      })
      .catch(function (error) {
        console.log(error);
        // seterror(true);
        alertP.error("There was an error resetting your password.");
      });
    setEmail("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
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
          />
        </a>
      </View>
      <View style={styles.mainPageContainer}>
        <View
          style={[
            styles.resetPasswordContainer,
            useSmallDesign && { width: "90%" },
          ]}
        >
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
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={(val) => setEmail(val.replace(/\s/g, ""))}
                  onKeyPress={handleKeyDown}
                />
              </View>
            </View>
            <View style={styles.btnBottomContainer}>
              <Pressable style={styles.submitBtn} onPress={submit}>
                <Text style={styles.submit}>Submit</Text>
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
    width: "100%",
    height: 318,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    width: "100%",
    height: 159,
    alignItems: "center",
    justifyContent: "space-between",
  },
  txt: {
    color: "#121212",
    fontSize: 16,
    width: "100%",
    height: 48,
    textAlign: "justify",
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
  btnBottomContainer: {
    width: "100%",
    height: 109,
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitBtn: {
    width: "100%",
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
