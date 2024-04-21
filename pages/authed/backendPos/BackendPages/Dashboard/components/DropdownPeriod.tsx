import React, {  useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { Entypo } from "@expo/vector-icons";

function DropdownPeriod({ value, setValue }: { value: string; setValue: (val: string) => void }) {
  const dropdownRef = useRef<View>(null); // Reference to the original button
  const [dropdownLayout, setDropdownLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();
  const [openDropdown, setopenDropdown] = useState<boolean>(false);
  const options = ["Today", "This Week", "This Month", "This Year", "All Time"];

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
        style={[
          styles.container,
          openDropdown && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        onPress={() => setopenDropdown((prev) => !prev)}
        ref={dropdownRef}
      >
        <Text style={styles.dropdownPeriodLbl}>{value}</Text>
        <Entypo name="chevron-small-down" style={styles.chevronDownIcon} />
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
              width: 110,
            }}
          >
            <Pressable
              style={[
                styles.container,
                {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomColor: "black",
                },
              ]}
              onPress={() => setopenDropdown((prev) => !prev)}
            >
              <Text style={styles.dropdownPeriodLbl}>{value}</Text>
              <Entypo
                name="chevron-small-down"
                style={styles.chevronDownIcon}
              />
            </Pressable>
            {openDropdown && (
              <View
                style={{
                  width: 110,
                  position: "absolute",
                  backgroundColor: "white",
                  bottom: -150,
                  height: 150,
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderColor: "#9e9e9e",
                }}
              >
                {options.map((option, listIndex) => (
                  <Pressable
                    style={[
                      styles.container,
                      {
                        justifyContent: "flex-start",
                        paddingLeft: 5,
                        borderRadius: 0,
                      },
                      listIndex < options.length - 1 && {
                        borderBottomWidth: 1,
                        borderColor: "#9e9e9e",
                      },
                    ]}
                    key={listIndex}
                    onPress={() => {
                      setValue(option);
                      setopenDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownPeriodLbl}>{option}</Text>
                  </Pressable>
                ))}
              </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9f9f9f",
    height: 30,
    width: 110,
    padding: 5,
  },
  dropdownPeriodLbl: {
    color: "#81838b",
    fontSize: 13,
    marginRight: 0,
  },
  chevronDownIcon: {
    color: "#808080",
    fontSize: 25,
  },
});

export default DropdownPeriod;
