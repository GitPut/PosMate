import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import OptionsItem from "../components/OptionsItem";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  onlineStoreState,
  setUserStoreState,
  userState,
  userStoreState,
} from "state/state";
import { useHistory } from "react-router-dom";
import { auth, db, storage } from "state/firebaseConfig";
import GeneralDropdown from "components/GeneralDropdown";
import { Button } from "react-native";
import GeneralSwitch from "components/GeneralSwitch";
import productTemplateCatalog from "../assets/productTemplateCatalog";
import ProductOptionBox from "../components/ProductOptionBox";

function ProductTemplatesModal({
  productTemplatesModalVisible,
  setproductTemplatesModalVisible,
  setexistingProduct,
}) {
  const { width, height } = useWindowDimensions();
  const catalog = productTemplateCatalog;
  const [selectedCategory, setselectedCategory] = useState();

  useEffect(() => {
    catalog.products.map((product, index) => {
      if (product.category === selectedCategory) {
        const getItem = document.getElementById(product.id);
        if (getItem) {
          getItem.style.display = "flex";
        }
      } else if (!selectedCategory) {
        const getItem = document.getElementById(product.id);
        if (getItem) {
          getItem.style.display = "flex";
        }
      } else {
        const getItem = document.getElementById(product.id);
        if (getItem) {
          getItem.style.display = "none";
        }
      }
    });
  }, [selectedCategory]);

  return (
    <Pressable
      onPress={() => {
        setproductTemplatesModalVisible(false);
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
              styles.container,
              { height: height * 0.9, width: width * 0.7, padding: 20 },
            ]}
          >
            <View style={styles.topRow}>
              <Text style={styles.productManagementTxt}>
                Product Management
              </Text>
              <Pressable
                style={styles.templateBtn}
                onPress={() => setproductTemplatesModalVisible(false)}
              >
                <Ionicons name="close" style={styles.chevronDownIcon} />
              </Pressable>
            </View>
            <View style={styles.categoriesScrollView}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={
                  styles.categoriesScrollView_contentContainerStyle
                }
              >
                {catalog.categories.map((category, index) => (
                  <Pressable
                    key={index}
                    style={[
                      { marginRight: 35 },
                      selectedCategory === category
                        ? { borderBottomWidth: 2, borderBottomColor: "black" }
                        : { borderBottomWidth: 2, borderBottomColor: "grey" },
                    ]}
                    onPress={() =>
                      setselectedCategory((prev) =>
                        prev === category ? null : category
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.categoryOpt1Txt,
                        selectedCategory === category
                          ? { color: "black" }
                          : { color: "grey" },
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View style={styles.scrollArea}>
              <ScrollView
                contentContainerStyle={styles.scrollArea_contentContainerStyle}
              >
                <View style={styles.productsMap}>
                  {catalog.products.map((product, index) => {
                    const newProduct = {
                      ...product,
                      isTemplate: true,
                      id: Math.random().toString(36).substr(2, 9),
                    };
                    return (
                      <div key={index} id={product.id}>
                        <ProductOptionBox
                          style={[styles.productOptionBox]}
                          index={index}
                          product={newProduct}
                          setexistingProduct={(setval) => {
                            setexistingProduct(setval);
                            setproductTemplatesModalVisible(false);
                          }}
                          isTemplate={true}
                        />
                      </div>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "space-around",
  },
  topRow: {
    width: "95%",
    height: 49,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productAdd: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 21,
  },
  templateBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  templatesBtnLbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginRight: 10,
  },
  chevronDownIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  innerScrollArea: {
    width: "90%",
  },
  innerScrollArea_contentContainerStyle: {
    paddingRight: 20,
  },
  imageUploadGroup: {
    width: "100%",
    height: 179,
    justifyContent: "space-between",
  },
  productImageUploadTxt: {
    color: "#121212",
    fontSize: 17,
    marginBottom: 5,
  },
  productImageUpContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a8a8a8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  uploadImageInner: {
    width: 400,
    height: 98,
    alignItems: "center",
    justifyContent: "space-between",
  },
  upProductImageIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 70,
  },
  dragDropImageTxt: {
    color: "#121212",
    fontSize: 16,
  },
  spacer: {
    width: "100%",
    height: 53,
  },
  productSmallDetailsRow: {
    width: "100%",
    height: 79,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productNameInputGroup: {
    width: 195,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  productNameTxt: {
    color: "#121212",
    fontSize: 17,
  },
  productNameBox: {
    width: 195,
    height: 52,
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  productPriceInputGroup: {
    width: 197,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  productPriceTxt: {
    color: "#121212",
    fontSize: 17,
  },
  productPriceBox: {
    width: 197,
    height: 52,
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  productCategoryInputGroup: {
    width: 197,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  category: {
    color: "#121212",
    fontSize: 17,
    marginBottom: 5,
  },
  categoryDropDownBox: {
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
  },
  productRankInputGroup: {
    width: 156,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  rankTxt: {
    color: "#121212",
    fontSize: 17,
  },
  rankBox: {
    width: 154,
    height: 52,
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  spacer2: {
    width: "100%",
    height: 36,
  },
  displayOnlineSwitchRow: {
    width: 300,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  displayOnlineStoreTxt: {
    color: "#121212",
    fontSize: 17,
  },
  onlineStoreSwitch: {
    width: 40,
    height: 20,
    backgroundColor: "#E6E6E6",
  },
  spacer3: {
    width: "100%",
    height: 28,
  },
  productDescriptionInputGroup: {
    width: "100%",
    height: 141,
    justifyContent: "space-between",
  },
  productDescriptionTxt: {
    color: "#121212",
    fontSize: 17,
  },
  productDiscBox: {
    width: "100%",
    height: 114,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a8a8a8",
    padding: 10,
  },
  spacer4: {
    width: "100%",
    height: 31,
  },
  optionsTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  spacer5: {
    width: "100%",
    height: 31,
  },
  optionsItem: {
    alignSelf: "stretch",
  },
  createOptionBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  createOptionTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  cancelAndSaveBtns: {
    width: "95%",
    height: 47,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#eef2ff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  cancelTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  saveBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
  },
  saveTxt: {
    fontWeight: "700",
    color: "#eef2ff",
    fontSize: 20,
    marginTop: 11,
    marginLeft: 65,
  },
  scrollArea: {
    flex: 1, // Take up remaining space
    width: "95%",
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1, // Allow the container to grow as needed
    justifyContent: "flex-start", // Align items to the start
  },
  productManagementTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  searchProductBox: {
    width: 675,
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    paddingLeft: 10,
  },
  manageProductsBtn: {
    width: 181,
    height: 38,
    backgroundColor: "#fdfdff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  manageProductIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 22,
  },
  manageProductsTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 14,
  },
  categoriesScrollView: {
    width: "85%",
    marginBottom: 30,
  },
  categoriesScrollView_contentContainerStyle: {
    width: "100%",
  },
  categoryOpt1Txt: {
    // color: "#121212"
    color: "grey",
    padding: 10,
  },
  categoryOpt2Txt: {
    color: "#121212",
    marginLeft: 100,
  },
  productsMap: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  addProductBtn: {
    width: 215,
    height: 285,
    borderWidth: 3,
    borderColor: "#858585",
    borderRadius: 10,
    borderStyle: "dashed",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    marginBottom: 30,
  },
  addProductPlusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  addNewItemTxt: {
    color: "#121212",
    fontSize: 16,
    marginTop: 20,
  },
  productOptionBox: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30,
  },
  productOptionBox1: {
    height: 285,
    width: 215,
    marginRight: 30,
    marginLeft: 0,
    marginBottom: 30,
  },
  productOptionBox2: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30,
  },
  productOptionBox3: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30,
  },
});

export default ProductTemplatesModal;
