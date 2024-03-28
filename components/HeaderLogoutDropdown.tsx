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

function GeneralDropdown({ styles, storeDetails }) {
  const dropdownRef = useRef(); // Reference to the original button
  const [dropdownLayout, setDropdownLayout] = useState();
  const [openDropdown, setopenDropdown] = useState(false);

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
  }, []); // Recalculate when scroll position changes

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
          <Text style={styles.username}>{storeDetails.name}</Text>
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
            }}
          >
            <Pressable
              style={styles.userBtn}
              activeOpacity={0.8}
              onPress={() => setopenDropdown((prev) => !prev)}
            >
              <View style={styles.iconWithNameGroup}>
                <View
                  style={[styles.userIcon, { backgroundColor: "transparent" }]}
                />
                <Text style={styles.username}>{storeDetails.name}</Text>
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

export default GeneralDropdown;
