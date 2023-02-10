import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@react-native-material/core";
import { logout } from "state/firebaseFunctions";
import useWindowDimensions from "components/useWindowDimensions";
import Logo from "assets/dpos-logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import StatsScreen from "./StatsScreen";
import EditStoreDetails from "components/EditStoreDetails";
import ProductAndCatManager from "./ProductAndCatManager";
import { woocommerceState } from "state/state";
import { auth, db } from "state/firebaseConfig";

const SettingsHome = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [currentSettingPage, setcurrentSettingPage] = useState(null);

  const Header = () =>
    useMemo(() => {
      return (
        <View
          style={{
            width: "100%",
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(31,35,48,1)",
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableOpacity>
          <Image
            source={Logo}
            style={{ width: 200, height: 160, resizeMode: "contain" }}
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("SettingsHome")}
            // change to call help number
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="help-circle-outline" size={32} color="white" />
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginLeft: 10,
                fontWeight: "600",
              }}
            >
              Help
            </Text>
          </TouchableOpacity>
        </View>
      );
    }, []);

  return (
    <View style={{ flex: 1, height: height, width: width }}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View
          style={{
            height: "100%",
            width: "10%",
            backgroundColor: "rgba(31,35,48,1)",
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 3,
              height: 3,
            },
            elevation: 30,
            shadowOpacity: 0.91,
            shadowRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setcurrentSettingPage(null)}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Ionicons
              name="ios-stats-chart"
              size={32}
              color={
                currentSettingPage !== "productManager" &&
                currentSettingPage !== "storeManager"
                  ? "white"
                  : "#777777"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcurrentSettingPage("productManager")}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={32}
              color={
                currentSettingPage === "productManager" ? "white" : "#777777"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcurrentSettingPage("storeManager")}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons
              name="store"
              size={32}
              color={
                currentSettingPage === "storeManager" ? "white" : "#777777"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons name="logout" size={32} color="#777777" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%", height: "100%" }}>
          <Header />
          {/* <MenuScreen catalog={catalog} navigation={navigation} /> */}
          <View
            style={{
              height: height - 80,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            {/* <Text>HEllo</Text> */}
            {currentSettingPage !== "productManager" &&
              currentSettingPage !== "storeManager" && <StatsScreen />}
            {currentSettingPage === "storeManager" && <EditStoreDetails />}
            {currentSettingPage === "productManager" && (
              <ProductAndCatManager navigation={navigation} />
            )}
          </View>
        </View>
      </View>
    </View>
    // <View>
    //   <Text>Settings Home</Text>
    //   <Button
    //     title="Edit Categories"
    //     onPress={() => navigation.navigate("EditCategories")}
    //     style={{ marginBottom: 15 }}
    //   />
    //   <Button
    //     title="Edit Products"
    //     onPress={() => navigation.navigate("EditProductList")}
    //     style={{ marginBottom: 15 }}
    //   />
    //   <Button
    //     title="Edit Woocommerce Settings"
    //     onPress={() => navigation.navigate("EditWoocommerce")}
    //     style={{ marginBottom: 15 }}
    //   />
    //   <Button
    //     title="Edit Store Details"
    //     onPress={() => navigation.navigate("StoreDetails")}
    //     style={{ marginBottom: 15 }}
    //   />
    //   <Button
    //     title="View Transactions"
    //     onPress={() => navigation.navigate("Transactions")}
    //     style={{ marginBottom: 15 }}
    //   />
    //   <Button title="Logout" onPress={logout} style={{ marginBottom: 15 }} />
    // </View>
  );
};

export default SettingsHome;

const styles = StyleSheet.create({});
