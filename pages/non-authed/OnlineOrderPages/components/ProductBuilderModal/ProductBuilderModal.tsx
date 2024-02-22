import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import GoBackBtn from "./GoBackBtn";
import OneTimeSelectableOptionGroup from "./OneTimeSelectableOptionGroup";
import DropdownSelectableOption from "./DropdownSelectableOption";
import AddToCartBtn from "./AddToCartBtn";
import MultipleTimeSelectableOptionGroup from "./MultipleTimeSelectableOptionGroup";

function ProductBuilderModal(props) {
  const [openDropdown, setopenDropdown] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.productBuilderGroup}>
        <View style={styles.goBackRow}>
          <GoBackBtn style={styles.goBackBtn} />
        </View>
        <View style={styles.leftRightGroup}>
          <View style={styles.leftSideGroup}>
            <View style={styles.itemInfoContainer}>
              <Image
                source={require("../../assets/images/image_xJCw..png")}
                resizeMode="contain"
                style={styles.itemImg}
              ></Image>
              <View style={styles.itemInfoTxtGroup}>
                <View style={styles.topTxtGroup}>
                  <Text style={styles.productName}>Veggie Pizza</Text>
                  <Text style={styles.calorieDetails}>280 cal/slice</Text>
                </View>
                <Text style={styles.description}>
                  Description: Tomato sauce, mozzarella cheese, mushroom, sliced
                  tomato, red onions, green pepper
                </Text>
              </View>
            </View>
            <View style={styles.writeNoteContainer}>
              <Text style={styles.notesLbl}>Notes:</Text>
              {/* <View style={styles.noteInput}>
                <Text style={styles.noteInputTxt}>
                  Write any extra info here...
                </Text>
              </View> */}
              <TextInput
                style={styles.noteInput}
                placeholder="Write any extra info here..."
                placeholderTextColor="#90949a"
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
          <View style={styles.rightSideGroup}>
            <ScrollView
              contentContainerStyle={{
                justifyContent: "space-between",
                height: "90%",
                width: "100%",
                padding: 20,
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              <OneTimeSelectableOptionGroup
                style={styles.oneTimeSelectableOptionGroup}
              ></OneTimeSelectableOptionGroup>
              <MultipleTimeSelectableOptionGroup
                id={1}
                style={styles.dropdownSelectableOption}
                setopenDropdown={setopenDropdown}
                openDropdown={openDropdown}
              />
              <DropdownSelectableOption
                id={5}
                style={styles.dropdownSelectableOption}
                setopenDropdown={setopenDropdown}
                openDropdown={openDropdown}
              />
              <DropdownSelectableOption
                id={2}
                style={styles.dropdownSelectableOption}
                setopenDropdown={setopenDropdown}
                openDropdown={openDropdown}
              />
              <DropdownSelectableOption
                id={3}
                style={styles.dropdownSelectableOption}
                setopenDropdown={setopenDropdown}
                openDropdown={openDropdown}
              />
              <DropdownSelectableOption
                id={4}
                style={styles.dropdownSelectableOption}
                setopenDropdown={setopenDropdown}
                openDropdown={openDropdown}
              />
            </ScrollView>
            <View style={styles.totalLblRow}>
              <Text style={styles.totalLbl}>Total: $10.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.addToCartRow}>
          <AddToCartBtn style={styles.addToCartBtn}></AddToCartBtn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf2ff",
    width: "100%",
    height: "100%",
  },
  productBuilderGroup: {
    width: "80%",
    height: "85%",
    justifyContent: "space-between",
  },
  goBackRow: {
    alignSelf: "stretch",
    marginBottom: 120,
  },
  goBackBtn: {
    height: 32,
    width: 126,
  },
  leftRightGroup: {
    height: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  leftSideGroup: {
    width: "35%",
    height: "100%",
    justifyContent: "space-between",
  },
  itemInfoContainer: {
    height: "60%",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  itemImg: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  itemInfoTxtGroup: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTxtGroup: {
    marginTop: 7,
    marginBottom: 15,
    alignItems: "center",
  },
  productName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 30,
  },
  calorieDetails: {
    color: "rgba(131,126,126,1)",
    marginBottom: 25,
  },
  description: {
    color: "rgba(131,126,126,1)",
    width: 214,
    textAlign: "left",
    paddingBottom: 50,
  },
  writeNoteContainer: {
    height: "35%",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  notesLbl: {
    fontWeight: "700",
    color: "#121212",
    marginBottom: 10,
  },
  noteInput: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    padding: 10,
  },
  noteInputTxt: {
    color: "#90949a",
  },
  rightSideGroup: {
    width: "60%",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 999,
  },
  oneTimeSelectableOptionGroup: {
    height: 82,
    marginBottom: 20,
    alignSelf: "stretch",
  },
  dropdownSelectableOption: {
    height: 44,
    marginBottom: 20,
    alignSelf: "stretch",
  },
  totalLblRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    paddingTop: 20,
  },
  totalLbl: {
    fontWeight: "700",
    color: "#00c937",
    fontSize: 22,
    marginTop: 0,
  },
  addToCartRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    marginTop: 25,
    height: 41,
    zIndex: -100,
  },
  addToCartBtn: {
    height: 41,
    width: 147,
    zIndex: -100,
  },
});

export default ProductBuilderModal;
