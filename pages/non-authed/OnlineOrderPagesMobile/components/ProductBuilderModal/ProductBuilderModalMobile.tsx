import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import GoBackBtn from "./GoBackBtn";
import OneTimeSelectableOptionGroup from "./OneTimeSelectableOptionGroup";
import DropdownSelectableOption from "./DropdownSelectableOption";
import AddToCartBtn from "./AddToCartBtn";
import MultipleTimeSelectableOptionGroup from "./MultipleTimeSelectableOptionGroup";
import { addCartState, cartState, setCartState } from "state/state";
import { Entypo, Feather } from "@expo/vector-icons";
import ProductImage from "components/ProductImage";

function ProductBuilderModalMobile({ product, itemIndex, goBack, imageUrl }) {
  const cart = cartState.use();
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [extraInput, setextraInput] = useState(
    myObj.extraDetails ? myObj.extraDetails : ""
  );
  const [openOptions, setopenOptions] = useState(null);

  const DisplayOption = ({ e, index }) => {
    const checkCases = () => {
      if (e.selectedCaseList?.length > 0) {
        const listOfTrueIfS = [];

        e.selectedCaseList.forEach((ifStatement) => {
          const caseKeyList = myObjProfile.options.filter(
            (op) => op.label == ifStatement.selectedCaseKey
          );

          if (caseKeyList.length > 0) {
            const caseValueList = caseKeyList[0].optionsList.filter(
              (opL) => opL.label == ifStatement.selectedCaseValue
            );

            if (caseValueList.length > 0) {
              if (caseValueList[0].selected === true) {
                listOfTrueIfS.push(ifStatement);
              }
            }
          }
        });

        if (e.selectedCaseList?.length === listOfTrueIfS.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    };

    const [optionVal, setoptionVal] = useState();

    const selectedList = e.optionsList.filter((checkOp) => checkOp.selected);

    if (selectedList.length > 0 && !optionVal) {
      setoptionVal(selectedList[0]);
    }

    if (!(e.selectedCaseList?.length > 0) || checkCases()) {
      if (e.optionType?.toLowerCase() === "dropdown") {
        return (
          <View style={{ marginBottom: 5 }}>
            <DropdownSelectableOption
              id={index}
              style={styles.dropdownSelectableOption}
              setopenDropdown={setopenOptions}
              openDropdown={openOptions}
              label={e.label}
              isRequired={e.isRequired}
              options={e.optionsList}
              setValue={({ option, listIndex }) => {
                const newMyObjProfile = structuredClone(myObjProfile);
                newMyObjProfile.options[index].optionsList.forEach(
                  (element, indexOfOl) => {
                    if (element.selected) {
                      newMyObjProfile.options[index].optionsList[
                        indexOfOl
                      ].selected = false;
                    }
                  }
                );

                newMyObjProfile.options[index].optionsList[listIndex].selected =
                  true;
                setoptionVal(option);
                setmyObjProfile(newMyObjProfile);
              }}
              value={optionVal}
            />
          </View>
        );
      } else {
        if (e.numOfSelectable === "1") {
          return (
            <OneTimeSelectableOptionGroup
              label={e.label}
              isRequired={e.isRequired}
              options={e.optionsList}
              setValue={({ option, listIndex }) => {
                const newMyObjProfile = structuredClone(myObjProfile);
                newMyObjProfile.options[index].optionsList.forEach(
                  (element, indexOfOl) => {
                    if (element.selected) {
                      newMyObjProfile.options[index].optionsList[
                        indexOfOl
                      ].selected = false;
                    }
                  }
                );

                newMyObjProfile.options[index].optionsList[listIndex].selected =
                  true;
                setoptionVal(option);
                setmyObjProfile(newMyObjProfile);
              }}
              value={optionVal}
              style={styles.oneTimeSelectableOptionGroup}
            />
          );
        } else {
         const optionsSelected = myObjProfile.options[
            index
          ].optionsList.filter((op) => op.selectedTimes > 0);
          const optionsSelectedLabel =
            optionsSelected.length > 0
              ? optionsSelected.map((op, index) => {
                  if (index > 0) return `, ${op.label} (${op.selectedTimes})`;
                  return `${op.label} (${op.selectedTimes})`;
                })
              : "";

          return (
            <MultipleTimeSelectableOptionGroup
              e={e}
              index={index}
              myObjProfile={myObjProfile}
              setmyObjProfile={setmyObjProfile}
              id={index}
              style={styles.dropdownSelectableOption}
              setopenDropdown={setopenOptions}
              openDropdown={openOptions}
              label={e.label}
              isRequired={e.isRequired}
              optionsSelectedLabel={optionsSelectedLabel}
            />
          );
        }
      }
    } else if (checkCases() === false) {
      const newMyObjProfile = structuredClone(myObjProfile);
      newMyObjProfile.options[index].optionsList.forEach(
        (item, indexOfItem) => {
          if (item.selected === true) {
            newMyObjProfile.options[index].optionsList[indexOfItem].selected =
              false;
            setmyObjProfile(newMyObjProfile);
          }
        }
      );
    }
  };

  useEffect(() => {
    settotal(getPrice());
    console.log("myObjProfile: ", myObjProfile);
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
      if (
        op.optionType?.toLowerCase() === "dropdown" ||
        op.numOfSelectable === "1"
      ) {
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
          alert(op.label + " is required. Please fill out to add to cart");
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
              opWVal += e.selectedTimes + " X " + e.label + "\n";
            } else {
              opWVal += e.selectedTimes + " X " + e.label;
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

      if (itemIndex >= 0) {
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
      setextraInput(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={goBack}>
              <Feather
                name="chevron-left"
                style={{ color: "grey" }}
                size={40}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#1D294E",
                borderRadius: 10,
                justifyContent: "space-between",
                alignItems: "center",
                width: 58,
                height: 34,
                flexDirection: "row",
                padding: 5,
              }}
            >
              <Feather
                name="shopping-cart"
                style={{ color: "white" }}
                size={20}
              />
              <Text style={{ color: "white", fontSize: 20 }}>
                {cart.length}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.leftSideGroup,
              myObj.description && { marginTop: 100 },
            ]}
          >
            <View style={styles.itemInfoContainer}>
              <View>
                <ProductImage
                  source={
                    imageUrl
                      ? { uri: imageUrl }
                      : require("../../assets/images/image_xJCw..png")
                  }
                  resizeMode="contain"
                  style={[
                    styles.itemImg,
                    myObj.description && { width: 200, height: 200 },
                  ]}
                />
              </View>
              <View style={styles.itemInfoTxtGroup}>
                <View style={styles.topTxtGroup}>
                  <Text style={styles.productName}>{myObj.name}</Text>
                  {myObj.calorieDetails && (
                    <Text style={styles.calorieDetails}>280 cal/slice</Text>
                  )}
                </View>
                {myObj.description && (
                  <Text style={styles.description}>
                    Description: {myObj.description}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.writeNoteContainer}>
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
          <View style={styles.rightSideGroup}>
            <ScrollView
              contentContainerStyle={{
                height: "90%",
                width: "100%",
                padding: 20,
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              {myObjProfile.options.map((e, index) => (
                <DisplayOption e={e} index={index} key={index} />
              ))}
            </ScrollView>
            <View style={styles.totalLblRow}>
              <Text style={styles.totalLbl}>
                Total: ${parseFloat(total).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.addToCartRow}>
            <AddToCartBtn
              style={styles.addToCartBtn}
              title={itemIndex >= 0 ? "Save" : "Add To Cart"}
              onPress={AddToCart}
            />
          </View>
        </View>
      </ScrollView>
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
    flex: 1,
  },
  productBuilderGroup: {
    width: "90%",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  goBackRow: {
    alignSelf: "stretch",
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
    width: "80%",
    minHeight: 350,
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
    justifyContent: "center",
  },
  productName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 30,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
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
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 999,
    marginTop: 25,
  },
  oneTimeSelectableOptionGroup: {
    marginBottom: 20,
  },
  dropdownSelectableOption: {
    height: 44,
    marginBottom: 20,
    width: "100%",
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
    marginBottom: 25,
  },
  addToCartBtn: {
    height: 41,
    width: 147,
    zIndex: -100,
  },
});

export default ProductBuilderModalMobile;
