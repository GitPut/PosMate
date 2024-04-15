import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal-web";
import OptionSelectorItemContainer from "./OptionSelectorItemContainer";

function TableOption({
  label,
  isRequired,
  myObjProfile,
  setmyObjProfile,
  index,
  e,
  optionsSelectedLabel,
}) {
  const [localMyObjProfile, setlocalMyObjProfile] = useState(myObjProfile);
  const [modalVisible, setmodalVisible] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setlocalMyObjProfile(myObjProfile);
  }, [myObjProfile]);

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
    <View style={[width > 800 ? styles.container : styles.containerMobile]}>
      <Text style={width > 800 ? styles.lbl : styles.lblMobile}>
        {label} {isRequired ? "*" : ""}
      </Text>
      <View style={width < 800 ? { width: "100%" } : { width: "70%" }}>
        <Pressable
          style={styles.dropdown}
          onPress={() => {
            setmodalVisible(true);
          }}
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
            <Entypo name="chevron-small-down" style={styles.downIcon} />
          )}
        </Pressable>
      </View>
      <Modal
        isVisible={modalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              setmodalVisible(false);
              setmyObjProfile(localMyObjProfile); // Save the local changes
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: height,
              width: width,
            }}
          >
            <Pressable>
              <div style={{ cursor: "default" }}>
                <View
                  style={[
                    styles.modalContainer,
                    { height: height * 0.9, width: width * 0.9, padding: 20 },
                  ]}
                >
                  <View style={styles.innerContainer}>
                    <View style={styles.header}>
                      <Pressable
                        onPress={clearOptions}
                        style={{
                          backgroundColor: "rgba(208,2,27,1)",
                          borderRadius: 50,
                          height: 40,
                          width: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons name="refresh" style={styles.resetIcon} />
                      </Pressable>
                      <Text style={styles.optionName}>{e.label}</Text>
                      <Pressable
                        onPress={() => {
                          setmodalVisible(false);
                          setmyObjProfile(localMyObjProfile);
                        }}
                        style={{
                          backgroundColor: "#314ab0",
                          borderRadius: 50,
                          height: 40,
                          width: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons name="checkmark" style={styles.closeIcon} />
                      </Pressable>
                    </View>
                    <View style={styles.scrollArea}>
                      <ScrollView
                        contentContainerStyle={
                          styles.scrollArea_contentContainerStyle
                        }
                      >
                        <View style={styles.flexwrapRow}>
                          {localMyObjProfile.options[index].optionsList.map(
                            (option, listIndex) => (
                              <OptionSelectorItemContainer
                                key={listIndex}
                                style={styles.optionSelectorItemContainer}
                                option={option}
                                onMinusPress={() =>
                                  onMinusPress({ option, listIndex })
                                }
                                onPlusPress={() =>
                                  onPlusPress({ option, listIndex })
                                }
                              />
                            )
                          )}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </div>
            </Pressable>
          </Pressable>
        </View>
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
  modalContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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
  innerContainer: {
    width: "90%",
    height: "90%",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeIcon: {
    color: "white",
    fontSize: 40,
  },
  optionName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  resetIcon: {
    color: "white",
    fontSize: 35,
  },
  scrollArea: {
    width: "100%",
    height: "85%",
  },
  scrollArea_contentContainerStyle: {
    height: "100%",
    width: "100%",
    paddingRight: 15,
    paddingLeft: 15,
  },
  flexwrapRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionSelectorItemContainer: {
    marginBottom: 20,
  },
});

export default TableOption;
