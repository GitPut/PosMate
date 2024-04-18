import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { logout } from "state/firebaseFunctions";
import { storeDetailState } from "state/state";
import { auth } from "state/firebaseConfig";

function HeaderLogoutDropdown({ isPosHeader }) {
  const dropdownRef = useRef(); // Reference to the original button
  const [dropdownLayout, setDropdownLayout] = useState();
  const [openDropdown, setopenDropdown] = useState(false);
  const storeDetails = storeDetailState.use();

  useEffect(() => {
    // Ensure this code runs in a web environment
    if (dropdownRef.current && typeof window !== "undefined") {
      const element = dropdownRef.current; // Assuming this ref points to a DOM element
      // You might need to adjust this to get the actual DOM node in React Native Web

      const boundingRect = element.getBoundingClientRect();

      setDropdownLayout({
        x: boundingRect.left,
        y: boundingRect.top, // Adjust based on scroll position
        width: boundingRect.width,
        height: boundingRect.height,
      });
    }
  }, [openDropdown]); // Recalculate when scroll position changes

  return (
    <View style={{ zIndex: 1000 }}>
      <Pressable
        style={styles.userBtn}
        activeOpacity={0.8}
        onPress={() => setopenDropdown((prev) => !prev)}
        ref={dropdownRef}
      >
        <View style={styles.iconWithNameGroup}>
          <Image
            source={require("assets/image_bTyU..png")}
            resizeMode="contain"
            style={styles.userIcon}
          />
          <Text style={styles.username}>
            {isPosHeader ? storeDetails.name : auth.currentUser?.displayName}
          </Text>
        </View>
        <Entypo
          name={openDropdown ? "chevron-small-up" : "chevron-small-down"}
          style={styles.chevronDownIcon}
        />
      </Pressable>
      <Modal visible={openDropdown} transparent={true}>
        <Pressable
          style={{
            width: "100%",
            height: "100%",
          }}
          onPress={() => {
            setopenDropdown(false);
          }} // Hide modal when the background is pressed
        />
        {dropdownLayout && (
          <View
            style={{
              position: "absolute",
              top: dropdownLayout.y,
              left: dropdownLayout.x,
              width: dropdownLayout.width,
              minWidth: 150,
            }}
          >
            <Pressable
              style={styles.userBtn}
              onPress={() => setopenDropdown((prev) => !prev)}
            >
              <View style={styles.iconWithNameGroup}>
                <View
                  style={[styles.userIcon, { backgroundColor: "transparent" }]}
                />
                <Text style={styles.username}>
                  {isPosHeader
                    ? storeDetails.name
                    : auth.currentUser?.displayName}
                </Text>
              </View>
              <Entypo
                name={openDropdown ? "chevron-small-up" : "chevron-small-down"}
                style={styles.chevronDownIcon}
              />
            </Pressable>
            {openDropdown && (
              <Pressable
                style={{
                  backgroundColor: "rgba(255,255,255,1)",
                  borderRadius: 10,
                  shadowColor: "rgba(0,0,0,1)",
                  shadowOffset: {
                    width: 3,
                    height: 3,
                  },
                  elevation: 30,
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: dropdownLayout.width,
                  height: 43,
                  position: "absolute",
                  bottom: -50,
                  left: 0,
                  padding: 10,
                }}
                onPress={logout}
              >
                <Text style={styles.logoutFromAccount}>Logout</Text>
                <Feather name="log-out" style={styles.logoutIcon} />
              </Pressable>
            )}
          </View>
        )}
      </Modal>
    </View>
  );
}

export default HeaderLogoutDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to fill the available screen space
    backgroundColor: "#eef2ff",
  },
  header: {
    height: 75, // Consider if this needs adjustment
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(238,242,255,1)",
  },
  logo: {
    height: 70,
    width: 222,
    marginRight: 20,
    marginLeft: 20,
  },
  rightSideRow: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 50,
  },
  backToPOSBtn: {
    width: 140,
    height: 32,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  pos: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  userBtn: {
    height: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 150,
  },
  iconWithNameGroup: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userIcon: {
    height: 39,
    width: 40,
    marginRight: 10,
  },
  username: {
    color: "#435869",
    fontSize: 15,
    marginRight: 10,
  },
  chevronDownIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  leftMenu: {
    width: 278,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuOptionsContainer: {
    width: 201,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    marginLeft: 15,
  },
  rightSide: {
    width: "78%",
    height: "100%",
    justifyContent: "flex-end",
  },
  page: {
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 45,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    height: "100%",
  },
  logoutFromAccount: {
    fontWeight: "700",
    color: "#121212",
  },
  logoutIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 26,
  },
});
