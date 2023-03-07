import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Foundation from "@expo/vector-icons/Foundation";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const HelpModal = ({ setshowHelpModal }) => {
  const { width, height } = useWindowDimensions();
  const [screen, setscreen] = useState("manageProducts");

  const DisplayHelpScreen = () => {
    if (screen === "manageProducts") return <ManageProducts />;

    return null;
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: "black",
          opacity: 0.5,
          height: "100%",
          width: "100%",
        }}
        onPress={() => setshowHelpModal(false)}
      />
      <View
        style={{
          height: height * 0.75,
          width: width * 0.65,
          backgroundColor: "white",
          borderTopLeftRadius: 0,
          borderRadius: 10,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -38,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setscreen("manageProducts")}
            style={[
              {
                borderTopLeftRadius: 10,
                backgroundColor:
                  screen === "manageProducts" ? "rgba(98,96,96,1)" : "#D2D2D2",
              },
              styles.menuBtn,
            ]}
          >
            <Text style={[styles.menuTxt]}>Managing Products</Text>
          </TouchableOpacity>
          <View style={{ height: "100%", width: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setscreen("connectToWoo")}
            style={[
              {
                backgroundColor:
                  screen === "connectToWoo" ? "rgba(98,96,96,1)" : "#D2D2D2",
              },
              styles.menuBtn,
            ]}
          >
            <Text style={[styles.menuTxt]}>Connecting WooCommerce</Text>
          </TouchableOpacity>
          <View style={{ height: "100%", width: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setscreen("saveCustomers")}
            style={[
              {
                backgroundColor:
                  screen === "saveCustomers" ? "rgba(98,96,96,1)" : "#D2D2D2",
              },

              styles.menuBtn,
            ]}
          >
            <Text style={[styles.menuTxt]}>Saving Customers</Text>
          </TouchableOpacity>
          <View style={{ height: "100%", width: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setscreen("phoneOrder")}
            style={[
              {
                backgroundColor:
                  screen === "phoneOrder" ? "rgba(98,96,96,1)" : "#D2D2D2",
              },
              styles.menuBtn,
            ]}
          >
            <Text style={[styles.menuTxt]}>Phone Orders</Text>
          </TouchableOpacity>
          <View style={{ height: "100%", width: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setscreen("connectPrinter")}
            style={[
              {
                borderTopRightRadius: 10,
                backgroundColor:
                  screen === "connectPrinter" ? "rgba(98,96,96,1)" : "#D2D2D2",
              },
              styles.menuBtn,
            ]}
          >
            <Text style={[styles.menuTxt]}>Connecting Printer</Text>
          </TouchableOpacity>
          <View style={{ height: "100%", width: 1, backgroundColor: "grey" }} />
        </View>
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Text style={styles.headerTxt}>Need more help? Contact Us</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={styles.billingBtn}>
                  <Foundation name="mail" style={styles.billingIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.billingBtn}>
                  <Foundation name="telephone" style={styles.billingIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <DisplayHelpScreen />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const imageStyles = {
  height: 600,
  resizeMode: "contain",
};

const ManageProducts = () => (
  <Slide>
    <Image
      source={require("assets/help/manageProducts/1.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/2.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/3.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/4.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/5.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/6.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/7.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/8.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/9.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/10.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/11.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/12.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/13.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/14.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/14.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/15.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/16.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/17.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/18.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/19.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/20.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/21.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/22.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/23.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/24.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/25.png")}
      style={imageStyles}
    />
    <Image
      source={require("assets/help/manageProducts/26.png")}
      style={imageStyles}
    />
  </Slide>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  headerRowContainer: {
    width: "90%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTxt: {
    fontFamily: "archivo-600",
    color: "rgba(98,96,96,1)",
    fontSize: 20,
  },
  billingBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#E6E6E6",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  billingIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  detailInputContainer: {
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(155,152,152,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 45,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    padding: 30,
    minHeight: "75%",
    marginTop: 15,
    borderTopLeftRadius: 0,
  },
  materialStackedLabelTextbox1: {
    height: 60,
    width: 483,
  },
  materialStackedLabelTextbox2: {
    height: 60,
    width: 483,
    marginLeft: 43,
  },
  materialStackedLabelTextbox1Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 36,
    marginRight: 32,
  },
  materialStackedLabelTextbox3: {
    height: 60,
    width: 483,
  },
  materialStackedLabelTextbox5: {
    height: 60,
    width: 483,
    marginLeft: 43,
  },
  materialStackedLabelTextbox3Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 36,
    marginRight: 32,
  },
  materialStackedLabelTextbox4: {
    height: 60,
    width: 483,
  },
  materialStackedLabelTextbox6: {
    height: 60,
    width: 483,
    marginLeft: 43,
  },
  materialStackedLabelTextbox4Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 29,
    marginLeft: 36,
    marginRight: 32,
  },
  materialStackedLabelTextbox7: {
    height: 60,
    width: 483,
  },
  materialButtonViolet2: {
    height: 48,
    width: 483,
    marginLeft: 43,
    marginTop: 12,
  },
  materialStackedLabelTextbox7Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 36,
    marginRight: 32,
  },
  helperDownloadContainer: {
    width: "100%",
    height: 79,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  helperTxt: {
    fontFamily: "archivo-500",
    color: "#121212",
    fontSize: 19,
    width: 483,
    height: 52,
  },
  menuTxt: {
    fontFamily: "archivo-500",
    color: "black",
    fontSize: 16,
  },
  badgeWindows: {
    width: 200,
    height: 79,
  },
  badgeMac: {
    width: 200,
    height: 79,
  },
  menuBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HelpModal;
