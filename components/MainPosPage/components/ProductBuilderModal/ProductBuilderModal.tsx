import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import GoBackBtn from "./PosComponents/GoBackBtn";
import AddToCartBtn from "./PosComponents/AddToCartBtn";
import {
  addCartState,
  cartState,
  setCartState,
  ProductBuilderState,
  resetProductBuilderState,
} from "state/state";
import { useAlert } from "react-alert";
import DisplayOption from "./PosComponents/DisplayOption";

function ProductBuilderModal() {
  const { product, itemIndex, imageUrl, isOnlineOrder } =
    ProductBuilderState.use();
  const cart = cartState.use();
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [extraInput, setextraInput] = useState(
    myObj.extraDetails ? myObj.extraDetails : ""
  );
  const [openOptions, setopenOptions] = useState(null);
  const alertP = useAlert();
  const [scrollY, setscrollY] = useState(0);
  const width = useWindowDimensions().width;

  const goBack = () => resetProductBuilderState();

  useEffect(() => {
    settotal(getPrice());
  }, [myObjProfile]);

  const getPrice = () => {
    let total = parseFloat(myObjProfile.price);
    myObjProfile.options.forEach((op) => {
      op.optionsList
        .filter((f) => f.selected === true)
        .map(
          (e) => (total += e.priceIncrease ? parseFloat(e.priceIncrease) : 0)
        );
    });
    myObjProfile.options.forEach((op) => {
      op.optionsList
        .filter((f) => f.selectedTimes > 0)
        .map((e) => {
          const thisItemSelectedTimes = e.selectedTimes
            ? parseInt(e.selectedTimes)
            : 0;
          const thisItemCountsAs = e.countsAs ? parseInt(e.countsAs) : 1;
          total += e.priceIncrease
            ? parseFloat(e.priceIncrease) *
              thisItemCountsAs *
              thisItemSelectedTimes
            : 0;
        });
    });
    return total;
  };

  const AddToCart = () => {
    const opsArray = [];
    let stop = false;

    myObjProfile.options.forEach((op) => {
      if (op.optionType === "Dropdown" || op.optionType === "Row") {
        let opWVal = `${op.label}: `;
        const numberOfSelected = op.optionsList.filter(
          (f) => f.selected === true
        ).length;

        if (numberOfSelected > 0) {
          opWVal = `${op.label}: `;

          op.optionsList.map((e, index) => {
            if (e.selected === true) {
              if (index < op.optionsList.length - 1 && numberOfSelected > 1) {
                opWVal += e.label + " , ";
              } else {
                opWVal += e.label;
              }
            }
          });
          opsArray.push(opWVal);
        } else if (numberOfSelected === 0 && op.isRequired === true) {
          alertP.error(
            op.label + " is required. Please fill out to add to cart"
          );
          stop = true;
        }
      } else {
        const selectedItems = op.optionsList.filter(
          (op) => op.selectedTimes > 0
        );
        if (selectedItems.length > 0) {
          let opWVal = `${op.label}:\n`;
          selectedItems.map((e, index) => {
            if (index < selectedItems.length - 1) {
              opWVal += "   " + e.selectedTimes + " X " + e.label + "\n";
            } else {
              opWVal += "   " + e.selectedTimes + " X " + e.label;
            }
          });
          opsArray.push(opWVal);
        }
      }
    });
    if (!stop) {
      const objWTotal = {
        ...myObjProfile,
        total: total,
        extraDetails: extraInput,
      };

      if (itemIndex !== null) {
        const copyCart = structuredClone(cart);
        copyCart[itemIndex] = {
          name: myObjProfile.name,
          price: total,
          description: myObj.description,
          options: opsArray,
          extraDetails: extraInput,
          editableObj: objWTotal,
          imageUrl: imageUrl ? imageUrl : null,
        };
        setCartState(copyCart);
      } else {
        addCartState(
          {
            name: myObjProfile.name,
            price: total,
            description: myObj.description,
            options: opsArray,
            extraDetails: extraInput,
            editableObj: objWTotal,
            imageUrl: imageUrl ? imageUrl : null,
          },
          cart
        );
      }

      goBack();
      setmyObjProfile(myObj);
      settotal(myObjProfile.price);
      setextraInput("");
    }
  };

  return (
    <View style={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflowY: "auto", // Ensure scrolling only happens when necessary
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: width > 800 ? "95%" : "100%", // Responsive width
            justifyContent: width > 800 ? "center" : "space-between",
            display: "flex",
            flexDirection: width > 800 ? "row" : "column", // Responsive flex direction
            alignItems: "center",
            margin: "auto", // Center horizontally in all cases
            height: "96%",
          }}
        >
          <View
            style={
              width > 800
                ? styles.productBuilderGroup
                : styles.productBuilderGroupMobile
            }
          >
            <View style={[styles.goBackRow, { marginBottom: 50 }]}>
              <GoBackBtn onPress={goBack} />
            </View>
            <View
              style={[
                width > 800 && styles.groupsContainer,
                myObj.description && { marginTop: 50 },
              ]}
            >
              <View style={width > 800 && styles.leftSideGroup}>
                <View style={styles.itemInfoContainer}>
                  <Image
                    source={
                      imageUrl
                        ? { uri: imageUrl }
                        : require("../../assets/images/image_xJCw..png")
                    }
                    resizeMode="contain"
                    style={[
                      styles.itemImg,
                      myObj.description && { width: 300, height: 150 },
                      width < 800 && { width: 300, height: 200 },
                    ]}
                  />
                  <View style={styles.itemInfoTxtGroup}>
                    <View style={styles.topTxtGroup}>
                      <Text style={styles.productName}>{myObj.name}</Text>
                      <>
                        {myObj.calorieDetails && (
                          <Text style={styles.calorieDetails}>
                            {myObj.calorieDetails}
                          </Text>
                        )}
                      </>
                    </View>
                    <>
                      {myObj.description && (
                        <Text style={styles.description}>
                          Description: {myObj.description}
                        </Text>
                      )}
                    </>
                  </View>
                </View>
                <View
                  style={[
                    styles.writeNoteContainer,
                    width < 800 && { marginTop: 15 },
                  ]}
                >
                  <Text style={styles.notesLbl}>Notes:</Text>
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Write any extra info here..."
                    placeholderTextColor="#90949a"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(val) => setextraInput(val)}
                    value={extraInput}
                  />
                </View>
              </View>
              <View
                style={
                  width > 800
                    ? styles.rightSideGroup
                    : styles.rightSideGroupMobile
                }
              >
                <ScrollView
                  contentContainerStyle={{
                    height: "90%",
                    width: "100%",
                    padding: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                  }}
                  onScroll={(e) => setscrollY(e.nativeEvent.contentOffset.y)}
                  scrollEventThrottle={16}
                >
                  {myObjProfile.options.map((option, index) => (
                    <DisplayOption
                      key={index}
                      e={option}
                      index={index}
                      myObjProfile={myObjProfile}
                      setMyObjProfile={setmyObjProfile}
                      setopenOptions={setopenOptions}
                      openOptions={openOptions}
                      isOnlineOrder={isOnlineOrder}
                      scrollY={scrollY}
                    />
                  ))}
                </ScrollView>
                <View style={styles.totalLblRow}>
                  <Text style={styles.totalLbl}>
                    Total: ${parseFloat(total).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.addToCartRow}>
              <AddToCartBtn
                style={styles.addToCartBtn}
                title={itemIndex ? "Save" : "Add To Cart"}
                onPress={AddToCart}
              />
            </View>
          </View>
        </div>
      </div>
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
    width: "90%",
    height: "85%",
    justifyContent: "space-between",
  },
  productBuilderGroupMobile: {
    width: "90%",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 40,
  },
  goBackRow: {
    alignSelf: "stretch",
  },
  goBackBtn: {
    height: 32,
    width: 126,
  },
  groupsContainer: {
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
    height: 250,
    width: 250,
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
    justifyContent: "center",
  },
  productName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 30,
    paddingLeft: "3%",
    paddingRight: "3%",
    textAlign: "center",
  },
  calorieDetails: {
    color: "rgba(131,126,126,1)",
    marginBottom: 25,
  },
  description: {
    color: "rgba(131,126,126,1)",
    width: "90%",
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
  rightSideGroupMobile: {
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 999,
    marginTop: 15,
  },
  oneTimeSelectableOptionGroup: {
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
