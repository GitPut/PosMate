import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  useWindowDimensions,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

function DropdownSelectableOption({
  setopenDropdown,
  openDropdown,
  id,
  label,
  isRequired,
  value,
  setValue,
  options,
  scrollY,
}) {
  const dropdownRef = useRef(); // Reference to the original button
  const [dropdownLayout, setDropdownLayout] = useState();
  const width = useWindowDimensions().width;

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
  }, [scrollY]); // Recalculate when scroll position changes

  return (
    <View
      style={[
        width > 800 ? styles.container : styles.containerMobile,
        openDropdown === id && { zIndex: 1000 },
      ]}
    >
      <Text style={width > 800 ? styles.lbl : styles.lblMobile}>
        {label} {isRequired ? "*" : ""}
      </Text>
      <View
        ref={dropdownRef}
        style={width < 800 ? { width: "100%" } : { width: "70%" }}
      >
        <Pressable
          style={styles.dropdown}
          onPress={() => {
            if (openDropdown === id) {
              setopenDropdown(null);
            } else {
              setopenDropdown(id);
            }
          }}
          activeOpacity={1}
        >
          <Text style={styles.placeholder}>
            {value
              ? `${value.label} (+$${
                  value.priceIncrease !== null ? value.priceIncrease : 0
                })`
              : label}
          </Text>
          {value ? (
            <Pressable
              onPress={() => {
                setValue({ option: null, listIndex: null });
              }}
              style={{ marginTop: 5, marginRight: 5 }}
            >
              <MaterialIcons name="clear" size={24} color="red" />
            </Pressable>
          ) : (
            <Entypo
              name={
                openDropdown === id ? "chevron-small-up" : "chevron-small-down"
              }
              style={styles.downIcon}
            />
          )}
        </Pressable>
      </View>
      <Modal visible={openDropdown === id} transparent={true}>
        <Pressable
          style={{
            width: "100%",
            height: "100%",
          }}
          onPress={() => {
            setopenDropdown(null);
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
              style={styles.dropdown}
              onPress={() => {
                if (openDropdown === id) {
                  setopenDropdown(null);
                } else {
                  setopenDropdown(id);
                }
              }}
            >
              <Text style={styles.placeholder}>
                {value
                  ? `${value.label} (+$${
                      value.priceIncrease !== null ? value.priceIncrease : 0
                    })`
                  : label}
              </Text>
              <Entypo
                name={
                  openDropdown === id
                    ? "chevron-small-up"
                    : "chevron-small-down"
                }
                style={styles.downIcon}
              ></Entypo>
            </Pressable>
            {openDropdown === id && (
              <ScrollView
                style={{
                  width: "100%",
                  position: "absolute",
                  backgroundColor: "white",
                  bottom: options.length > 3 ? -44 * 3 : -44 * options.length,
                  height: options.length > 3 ? 44 * 3 : 44 * options.length,
                  borderRadius: 10,
                  borderWidth: 1,
                }}
              >
                {options.map((option, listIndex) => (
                  <Pressable
                    key={listIndex}
                    id={option.id}
                    onPress={() => {
                      setValue({
                        option: {
                          label: option.label,
                          priceIncrease:
                            option.priceIncrease !== null
                              ? option.priceIncrease
                              : 0,
                        },
                        listIndex: listIndex,
                      });
                      setopenDropdown(null);
                    }}
                    style={{
                      width: "100%",
                      height: 44,
                      backgroundColor: "white",
                      padding: 10,
                      borderBottomWidth: 1,
                    }}
                    activeOpacity={1}
                  >
                    <Text>{`${option.label}  (+$${
                      option.priceIncrease !== null ? option.priceIncrease : 0
                    })`}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "stretch",
    height: 44,
  },
  containerMobile: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  lbl: {
    fontWeight: "700",
    color: "#3e3f41",
    width: "25%",
  },
  lblMobile: {
    fontWeight: "700",
    color: "#3e3f41",
    width: "100%",
    marginBottom: 10,
  },
  dropdown: {
    width: "100%",
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6987d3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  placeholder: {
    fontWeight: "500",
    color: "#7f838c",
    fontSize: 12,
    margin: 10,
  },
  downIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    margin: 0,
    marginTop: 2,
    marginRight: 2,
  },
});

export default DropdownSelectableOption;
