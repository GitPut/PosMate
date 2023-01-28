import { Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { auth } from "state/firebaseConfig";
import { sectionState, setsectionState, userStoreState } from "state/state";
// import { useNavigation } from "react-navigation-hooks";

const CustomHeader = ({ navigation, route, options, back }) => {
  const [settings, setSettings] = useState(false);
  const catalog = userStoreState.use();
  const section = sectionState.use();

  useEffect(() => {
    //       const prevScreen = localStorage.getItem("localScreen");
    const settingsOn = localStorage.getItem("settingsOn");
    setSettings(settingsOn);
    //     if (
    //       section === "EditCategories" ||
    //       section === "EditProductList" ||
    //       section === "EditWoocommerce" ||
    //       section === "StoreDetails" ||
    //       section === "Transactions"
    //     ) {
    //       navigation.navigate(section);
    //       //setSettings(true);
    //       setsectionState(prevScreen);
    //     } else {
    //       //setSettings(false);
    //       setsectionState(prevScreen);
    //       navigation.navigate("Home");
    //     }
    //   }, [settings, section]);
  }, []);

  if (settings == true) {
    //edit settings menu
    return (
      <View
        style={{
          width: "100%",
          height: 120,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "red",
        }}
      >
        <Button
          titleStyle={
            section === "EditCategories"
              ? { color: "white", fontWeight: "700" }
              : { color: "black", fontWeight: "700" }
          }
          style={
            section === "EditCategories"
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" }
          }
          onPress={() => {
            localStorage.setItem("localScreen", "EditCategories");
            localStorage.setItem("settingsOn", true);
            navigation.navigate("EditCategories");
            setsectionState("EditCategories");
          }}
          title="Add Category"
        />
        <Button
          titleStyle={
            section === "EditProductList"
              ? { color: "white", fontWeight: "700" }
              : { color: "black", fontWeight: "700" }
          }
          style={
            section === "EditProductList"
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" }
          }
          onPress={() => {
            localStorage.setItem("localScreen", "EditProductList");
            navigation.navigate("EditProductList");
            localStorage.setItem("settingsOn", true);
            setsectionState("EditProductList");
          }}
          title="Add Product"
        />
        <Button
          titleStyle={
            section === "EditWoocommerce"
              ? { color: "white", fontWeight: "700" }
              : { color: "black", fontWeight: "700" }
          }
          style={
            section === "EditWoocommerce"
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" }
          }
          onPress={() => {
            localStorage.setItem("localScreen", "EditWoocommerce");
            navigation.navigate("EditWoocommerce");
            localStorage.setItem("settingsOn", true);
            setsectionState("EditWoocommerce");
          }}
          title="Woocommerce"
        />
        <Button
          titleStyle={
            section === "StoreDetails"
              ? { color: "white", fontWeight: "700" }
              : { color: "black", fontWeight: "700" }
          }
          style={
            section === "StoreDetails"
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" }
          }
          onPress={() => {
            localStorage.setItem("localScreen", "StoreDetails");
            navigation.navigate("StoreDetails");
            localStorage.setItem("settingsOn", true);
            setsectionState("StoreDetails");
          }}
          title="Store Details"
        />
        <Button
          titleStyle={
            section === "Transactions"
              ? { color: "white", fontWeight: "700" }
              : { color: "black", fontWeight: "700" }
          }
          style={
            section === "Transactions"
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" }
          }
          onPress={() => {
            localStorage.setItem("localScreen", "Transactions");
            navigation.navigate("Transactions");
            localStorage.setItem("settingsOn", true);
            setsectionState("Transactions");
          }}
          title="Transaction"
        />
        <Button
          titleStyle={{ color: "black", fontWeight: "700" }}
          style={{ backgroundColor: "white" }}
          onPress={() => {
            localStorage.removeItem("localScreen");
            auth.signOut();
          }}
          title="Logout"
        />
        <Button
          titleStyle={{ color: "black", fontWeight: "700" }}
          style={{ backgroundColor: "white" }}
          onPress={() => {
            localStorage.removeItem("localScreen");
            setsectionState();
            setSettings(false);
            localStorage.setItem("settingsOn", false);
          }}
          title="X"
        />
      </View>
    );
  }
  return (
    <View
      style={{
        width: "100%",
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "red",
      }}
    >
      {catalog.categories?.map((category, index) => {
        if (!section && index === 0) {
          return (
            <Button
              key={index}
              titleStyle={{ color: "white", fontWeight: "700" }}
              style={{ backgroundColor: "blue" }}
              onPress={() => {
                setsectionState(category);
              }}
              title={category}
            />
          );
        }

        return (
          <Button
            key={index}
            titleStyle={
              section === category
                ? { color: "white", fontWeight: "700" }
                : { color: "black", fontWeight: "700" }
            }
            style={
              section === category
                ? { backgroundColor: "blue" }
                : { backgroundColor: "white" }
            }
            onPress={() => {
              setsectionState(category);
              localStorage.setItem("localScreen", category);
            }}
            title={category}
          />
        );
      })}
      <Button
        titleStyle={{ color: "black", fontWeight: "700" }}
        style={{ backgroundColor: "white" }}
        onPress={() => setSettings(true)}
        title="Settings"
      />
    </View>
  );
};

export default CustomHeader;
