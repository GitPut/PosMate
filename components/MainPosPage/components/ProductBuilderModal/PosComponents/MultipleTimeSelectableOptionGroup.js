import React, { useEffect, useRef, useState } from "react";
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

function MultipleTimeSelectableOptionGroup({
  setopenDropdown,
  openDropdown,
  id,
  label,
  isRequired,
  myObjProfile,
  setmyObjProfile,
  index,
  e,
  optionsSelectedLabel,
  scrollY,
}) {
  const options = e.optionsList;
  const [localMyObjProfile, setlocalMyObjProfile] = useState(myObjProfile);
  const [localOptionsSelectedLabel, setlocalOptionsSelectedLabel] =
    useState("");
  const dropdownRef = useRef(); // Reference to the original button
  const [dropdownLayout, setDropdownLayout] = useState();
  const width = useWindowDimensions().width;

  const onMinusPress = ({ option, listIndex }) => {
    const newMyObjProfile = structuredClone(localMyObjProfile);
    //filter out all options[index].optionsList that have selectedTimes > 0 then map through and multiply by countsAs
    const thisItemCountsAs = option.countsAs ? parseInt(option.countsAs) : 1;

    if (
      newMyObjProfile.options[index].optionsList[listIndex].selectedTimes > 0
    ) {
      newMyObjProfile.options[index].optionsList[listIndex].selectedTimes -=
        1 * thisItemCountsAs;
    }

    setlocalMyObjProfile(newMyObjProfile);
  };

  const onPlusPress = ({ option, listIndex }) => {
    const newMyObjProfile = structuredClone(localMyObjProfile);
    //filter out all options[index].optionsList that have selectedTimes > 0 then map through and multiply by countsAs

    const selectedItems = newMyObjProfile.options[index].optionsList.filter(
      (op) => op.selectedTimes > 0
    );

    const thisItemCountsAs = option.countsAs ? parseInt(option.countsAs) : 1;

    let selectedTimesTotal = thisItemCountsAs;

    selectedItems.map((op) => {
      selectedTimesTotal += op.countsAs
        ? parseInt(op.selectedTimes) * parseInt(op.countsAs)
        : parseInt(op.selectedTimes);
    });

    if (
      parseInt(e.numOfSelectable) >= selectedTimesTotal ||
      !e.numOfSelectable ||
      parseInt(e.numOfSelectable) === 0
    ) {
      if (newMyObjProfile.options[index].optionsList[listIndex].selectedTimes) {
        newMyObjProfile.options[index].optionsList[
          listIndex
        ].selectedTimes += 1;
      } else {
        newMyObjProfile.options[index].optionsList[listIndex].selectedTimes = 1;
      }
      setlocalMyObjProfile(newMyObjProfile);
    }
  };

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

  useEffect(() => {
    setlocalMyObjProfile(myObjProfile);
  }, [myObjProfile]);

  useEffect(() => {
    const optionsSelected = localMyObjProfile.options[index].optionsList.filter(
      (op) => op.selectedTimes > 0
    );
    setlocalOptionsSelectedLabel(
      optionsSelected.length > 0
        ? optionsSelected.map((op, index) => {
            if (index > 0) return `, ${op.label} (${op.selectedTimes})`;
            return `${op.label} (${op.selectedTimes})`;
          })
        : ""
    );
  }, [localMyObjProfile]);

  const clearOptions = () => {
    const newMyObjProfile = structuredClone(localMyObjProfile);
    newMyObjProfile.options[index].optionsList.map((op) => {
      op.selectedTimes = 0;
    });
    setlocalMyObjProfile(newMyObjProfile);
  };

  const clearOptionsMain = () => {
    const newMyObjProfile = structuredClone(localMyObjProfile);
    newMyObjProfile.options[index].optionsList.map((op) => {
      op.selectedTimes = 0;
    });
    setmyObjProfile(newMyObjProfile);
  };

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
              setmyObjProfile(localMyObjProfile); // Save the local changes
            } else {
              setopenDropdown(id);
            }
          }}
          activeOpacity={1}
        >
          {optionsSelectedLabel !== "" ? (
            <Text style={styles.placeholder}>{optionsSelectedLabel}</Text>
          ) : (
            <Text style={styles.placeholder}>Select {label}</Text>
          )}
          {optionsSelectedLabel.length > 0 ? (
            <Pressable
              style={[styles.downIcon, { marginTop: 5, marginRight: 5 }]}
              onPress={clearOptionsMain}
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
            setmyObjProfile(localMyObjProfile); // Save the local changes
          }} // Hide modal when the background is pressed
          activeOpacity={1}
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
                  setmyObjProfile(localMyObjProfile); // Save the local changes
                } else {
                  setopenDropdown(id);
                }
              }}
              activeOpacity={1}
            >
              {localOptionsSelectedLabel !== "" ? (
                <Text style={styles.placeholder}>
                  {localOptionsSelectedLabel}
                </Text>
              ) : (
                <Text style={styles.placeholder}>Select {label}</Text>
              )}
              {localOptionsSelectedLabel.length > 0 ? (
                <Pressable
                  style={[styles.downIcon, { marginTop: 5, marginRight: 5 }]}
                  onPress={clearOptions}
                >
                  <MaterialIcons name="clear" size={24} color="red" />
                </Pressable>
              ) : (
                <Entypo
                  name={
                    openDropdown === id
                      ? "chevron-small-up"
                      : "chevron-small-down"
                  }
                  style={styles.downIcon}
                />
              )}
            </Pressable>
            {openDropdown === id && (
              <ScrollView
                scrollEventThrottle={16} // Adjust as needed for performance
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
                    style={{
                      width: "100%",
                      height: 44,
                      backgroundColor: "white",
                      padding: 10,
                      borderBottomWidth: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                    onPress={() => onPlusPress({ option, listIndex })}
                    activeOpacity={0.5}
                  >
                    <Pressable
                      onPress={() => onMinusPress({ option, listIndex })}
                      activeOpacity={0.5}
                    >
                      <Entypo name="squared-minus" size={24} color="black" />
                    </Pressable>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "80%",
                      }}
                    >
                      <Text>
                        {`${option.label} ${
                          option.priceIncrease
                            ? `(+$${option.priceIncrease})`
                            : ""
                        }`}
                      </Text>
                      <Text
                        style={{
                          border: "none",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 40,
                          borderWidth: 1,
                          borderColor: "black",
                        }}
                      >
                        {localMyObjProfile.options[index].optionsList[listIndex]
                          .selectedTimes > 0
                          ? localMyObjProfile.options[index].optionsList[
                              listIndex
                            ].selectedTimes
                          : 0}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => onPlusPress({ option, listIndex })}
                      activeOpacity={0.5}
                    >
                      <Entypo name="squared-plus" size={24} color="black" />
                    </Pressable>
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

export default MultipleTimeSelectableOptionGroup;
