import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

interface GeneralDropdownArrayOptionsProps {
  placeholder: string;
  value: string | null;
  setValue: (
    val?: { label: string; value?: string; id?: string },
    index?: number
  ) => void;
  options: { label: string; value?: string; id?: string }[];
  scrollY: number;
}

// Define function overloads for setValue
function GeneralDropdownArrayOptions(
  props: GeneralDropdownArrayOptionsProps
): JSX.Element {
  const { placeholder, value, setValue, options, scrollY } = props;
  const dropdownRef = useRef<View>(null); // Reference to the original button
  const [dropdownLayout, setDropdownLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();
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
  }, [scrollY]); // Recalculate when scroll position changes

  return (
    <View style={{ zIndex: 1000 }}>
      <Pressable
        style={styles.dropdown}
        onPress={() => setopenDropdown((prev) => !prev)}
        ref={dropdownRef}
      >
        <Text style={styles.placeholder}>{value ? value : placeholder}</Text>
        {value ? (
          <Pressable
            onPress={() => setValue()}
            style={{ marginTop: 5, marginRight: 5 }}
          >
            <MaterialIcons name="clear" size={24} color="red" />
          </Pressable>
        ) : (
          <Entypo
            name={openDropdown ? "chevron-small-up" : "chevron-small-down"}
            style={styles.downIcon}
          />
        )}
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
              width: 190,
            }}
          >
            <Pressable
              style={[
                styles.dropdown,
                {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomColor: "black",
                },
              ]}
              onPress={() => setopenDropdown((prev) => !prev)}
            >
              <Text style={styles.placeholder}>
                {value ? value : placeholder}
              </Text>
              <Entypo
                name={openDropdown ? "chevron-small-up" : "chevron-small-down"}
                style={styles.downIcon}
              />
            </Pressable>
            {openDropdown && (
              <ScrollView
                style={{
                  width: 190,
                  position: "absolute",
                  backgroundColor: "white",
                  bottom: options.length > 3 ? -50 * 3 : -50 * options.length,
                  height: options.length > 3 ? 50 * 3 : 50 * options.length,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderColor: "#9e9e9e",
                }}
              >
                {options.map((option, listIndex) => {
                  return (
                    <Pressable
                      key={listIndex}
                      onPress={() => {
                        setValue(option, listIndex);
                        setopenDropdown(false);
                      }}
                      style={[
                        {
                          width: "100%",
                          height: 50,
                          backgroundColor: "white",
                          padding: 10,
                          justifyContent: "center",
                        },
                        listIndex < options.length - 1 && {
                          borderBottomWidth: 1,
                          borderColor: "#9e9e9e",
                        },
                      ]}
                    >
                      <Text style={styles.placeholder}>{option.label}</Text>
                    </Pressable>
                  );
                })}
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
  },
  dropdown: {
    width: 190,
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    paddingLeft: 10,
    paddingRight: 10,
  },
  placeholder: {
    color: "grey",
    fontSize: 14,
  },
  downIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    margin: 0,
    marginTop: 2,
    marginRight: 2,
  },
});

export default GeneralDropdownArrayOptions;
