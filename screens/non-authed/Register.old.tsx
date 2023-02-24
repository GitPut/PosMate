import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  IconButton,
  Button,
  Text,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { signUp } from "state/firebaseFunctions";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const attemptSignUp = () => {
    if (email && password) {
      signUp(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeareaContainer}>
        <Image
          source={require("assets/pathblazer-logo.png")}
          style={styles.logo}
        />
        <View style={styles.innerContainer}>
          <TextInput
            color="black"
            label="Email"
            variant="outlined"
            style={{ width: "100%", marginBottom: 10 }}
            value={email}
            onChangeText={(val) => setEmail(val)}
            autoCorrect={false}
            textContentType={"emailAddress"}
          />
          <TextInput
            color="black"
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
            title="Register"
            uppercase={false}
            contentContainerStyle={{
              width: "100%",
              height: 60,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{ marginBottom: 10 }}
            onPress={attemptSignUp}
          />
          <View style={{ flexDirection: "row" }}>
            <Text variant="subtitle1" style={{ marginBottom: 10 }}>
              Or
            </Text>
            <Text
              variant="subtitle1"
              style={{ marginBottom: 10, marginLeft: 5, color: "blue" }}
              onPress={() => navigation.goBack()}
            >
              Go Back
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  safeareaContainer: {
    flex: 1,
    height: "60%",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logo: {
    width: 250,
    resizeMode: "contain",
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
