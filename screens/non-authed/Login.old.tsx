import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  IconButton,
  Button,
  Text,
  Switch,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { signIn } from "state/firebaseFunctions";
import Img from "assets/random-img1.png";
import Logo from "assets/dpos-logo-black.png";
import CustomButton from "components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const attemptSignIn = () => {
    if (email && password) {
      signIn(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColorAccent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.rightHalfContainer}>
        <View style={styles.loginContainer}>
          <Image
            source={Logo}
            style={{ width: 250, height: 160, resizeMode: "contain" }}
          />
          <Text
            style={{
              marginBottom: 35,
              color: "rgba(155,155,155,1)",
              fontSize: 20,
            }}
          >
            Online E-Transaction Point-of-Sale Software
          </Text>
          <Text
            style={{
              color: "rgba(0,0,0,1)",
              fontSize: 20,
              marginBottom: 10,
              fontWeight: "600",
              marginLeft: "3%",
            }}
          >
            Login
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
                name="person-circle-outline"
                size={32}
                color="rgba(71,106,229,1)"
              />
            </View>
            <TextInput
              placeholder="Enter email"
              style={{ width: "80%" }}
              inputStyle={{ backgroundColor: "rgba(241,241,241,1)" }}
              value={email}
              onChangeText={(val) => setEmail(val)}
              autoCorrect={false}
              textContentType={"emailAddress"}
            />
          </View>
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
              placeholder="Enter Password"
              style={{ width: "75%" }}
              inputStyle={{ backgroundColor: "rgba(241,241,241,1)" }}
              value={password}
              onChangeText={(val) => setPassword(val)}
              secureTextEntry={!showPassword}
            />
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
          <CustomButton title="Login" onPress={attemptSignIn} />
          <Text
            style={{
              color: "rgba(0,0,0,1)",
              fontSize: 15,
              marginBottom: 10,
              fontWeight: "400",
              marginLeft: "3%",
              marginTop: 25,
            }}
          >
            Or{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
        <Image source={Img} style={styles.img} />
      </View>
      {/* <SafeAreaView style={styles.safeareaContainer}>
        <Image
          source={require("assets/pathblazer-logo.png")}
          style={styles.logo}
        />
        <View style={styles.innerContainer}>
          <TextInput
            label="Email"
            variant="outlined"
            style={{ width: "100%", marginBottom: 10 }}
            value={email}
            onChangeText={(val) => setEmail(val)}
            autoCorrect={false}
            textContentType={"emailAddress"}
          />
          <TextInput
            label="Password"
            variant="outlined"
            trailing={(props) => (
              <IconButton
                onPress={() => setShowPassword((prevState) => !prevState)}
                icon={(props) => <Icon name="eye" {...props} />}
                {...props}
              />
            )}
            value={password}
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={!showPassword}
            style={{ width: "100%" }}
          />
        </View>
        <View style={styles.innerContainer}>
          <Button
            title="Login"
            uppercase={false}
            contentContainerStyle={{
              width: "100%",
              height: 60,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{ marginBottom: 10 }}
            onPress={attemptSignIn}
          />
          <Text variant="subtitle1" style={{ marginBottom: 10 }}>
            Or
          </Text>
          <Button
            title="Register"
            uppercase={false}
            contentContainerStyle={{
              width: "100%",
              height: 60,
              backgroundColor: "grey",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </SafeAreaView> */}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  leftColorAccent: {
    backgroundColor: "rgba(31,35,48,1)",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: "8%",
    height: "100%",
    alignItems: "center",
    paddingTop: 50,
  },
  rightHalfContainer: {
    width: "92%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 70,
  },
  loginContainer: {
    padding: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 0,
      width: 3,
    },
    elevation: 150,
    shadowOpacity: 0.22,
    shadowRadius: 50,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,1)",
    width: 518,
    height: 676,
  },
  img: {
    height: 768,
    width: 541,
    resizeMode: "contain",
  },
});
