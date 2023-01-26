import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import { Button } from "@react-native-material/core";
import ViewTransactions from "./ViewTransactions";
import AddCategory from "components/AddCategory";
import AddProduct from "components/AddProduct";
import EditProductList from "components/EditProductList";
import { userStoreState } from "state/state";
import { auth } from "state/firebaseConfig";
import WoocommerceSettings from "components/WoocommerceSettings";
import EditStoreDetails from "components/EditStoreDetails";

const HomeScreen = () => {
  const catalog = userStoreState.use();
  const [section, setSection] = useState();
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    const prevScreen = localStorage.getItem("localScreen");
    setSection(prevScreen);
    if (
      prevScreen === "add-category" ||
      prevScreen === "add-product" ||
      prevScreen === "edit-woocommerce" ||
      prevScreen === "edit-store-details"
    )
      setSettings(true);
  }, []);

  const Menu = () => {
    if (settings === true) {
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
              section === "add-category"
                ? { color: "white", fontWeight: "700" }
                : { color: "black", fontWeight: "700" }
            }
            style={
              section === "add-category"
                ? { backgroundColor: "blue" }
                : { backgroundColor: "white" }
            }
            onPress={() => {
              setSection("add-category");
              localStorage.setItem("localScreen", "add-category");
            }}
            title="Add Category"
          />
          <Button
            titleStyle={
              section === "add-product"
                ? { color: "white", fontWeight: "700" }
                : { color: "black", fontWeight: "700" }
            }
            style={
              section === "add-product"
                ? { backgroundColor: "blue" }
                : { backgroundColor: "white" }
            }
            onPress={() => {
              setSection("add-product");
              localStorage.setItem("localScreen", "add-product");
            }}
            title="Add Product"
          />
          <Button
            titleStyle={
              section === "edit-woocommerce"
                ? { color: "white", fontWeight: "700" }
                : { color: "black", fontWeight: "700" }
            }
            style={
              section === "edit-woocommerce"
                ? { backgroundColor: "blue" }
                : { backgroundColor: "white" }
            }
            onPress={() => {
              setSection("edit-woocommerce");
              localStorage.setItem("localScreen", "edit-woocommerce");
            }}
            title="Woocommerce"
          />
          <Button
            titleStyle={
              section === "edit-store-details"
                ? { color: "white", fontWeight: "700" }
                : { color: "black", fontWeight: "700" }
            }
            style={
              section === "edit-store-details"
                ? { backgroundColor: "blue" }
                : { backgroundColor: "white" }
            }
            onPress={() => {
              setSection("edit-store-details");
              localStorage.setItem("localScreen", "edit-store-details");
            }}
            title="Store Details"
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
              setSettings(false);
              setSection();
              localStorage.removeItem("localScreen");
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
                  setSection(category);
                  localStorage.setItem("localScreen", category);
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
                setSection(category);
                localStorage.setItem("localScreen", category);
              }}
              title={category}
            />
          );
        })}
        <Button
          titleStyle={
            section === "transList"
              ? { color: "white", fontWeight: "700" }
              : { color: "black", fontWeight: "700" }
          }
          style={
            section === "transList"
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" }
          }
          onPress={() => {
            setSection("transList");
            localStorage.setItem("localScreen", "transList");
          }}
          title="Transaction"
        />
        <Button
          titleStyle={{ color: "black", fontWeight: "700" }}
          style={{ backgroundColor: "white" }}
          onPress={() => setSettings(true)}
          title="Settings"
        />
      </View>
    );
  };

  const Screen = () => {
    if (section === "add-category") return <AddCategory />;
    if (section === "add-product") return <EditProductList />;
    if (section === "edit-woocommerce") return <WoocommerceSettings />;
     if (section === "edit-store-details") return <EditStoreDetails />;
    if (section === "transList")
      return (
        <View style={{ height: "85%" }}>
          <ViewTransactions />
        </View>
      );
    return (
      <View style={{ flexDirection: "row", height: "85%" }}>
        <MenuScreen catalog={catalog} section={section} />
        <CartScreen />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Menu />
      <Screen />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
