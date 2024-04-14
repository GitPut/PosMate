import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import GoBackBtn from "./GoBackBtn";
import OneTimeSelectableOptionGroup from "./OneTimeSelectableOptionGroup";
import DropdownSelectableOption from "./DropdownSelectableOption";
import AddToCartBtn from "./AddToCartBtn";
import MultipleTimeSelectableOptionGroup from "./MultipleTimeSelectableOptionGroup";
import { addCartState, cartState, setCartState } from "state/state";
import TableOption from "./TableOption";
import { useAlert } from "react-alert";

function ProductBuilderModal({ product, itemIndex, goBack, imageUrl }) {
  const cart = cartState.use();
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [extraInput, setextraInput] = useState(
    myObj.extraDetails ? myObj.extraDetails : ""
  );
  const [openOptions, setopenOptions] = useState(null);
  const alertP = useAlert()

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
          alertP.error(op.label + " is required. Please fill out to add to cart");
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
      setextraInput("");
    }
  };

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
      if (e.optionType === "Dropdown") {
        return (
          <DropdownSelectableOption
            id={index}
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

              if (option) {
                newMyObjProfile.options[index].optionsList[listIndex].selected =
                  true;
              }
              setoptionVal(option);

              setmyObjProfile(newMyObjProfile);
            }}
            value={optionVal}
          />
        );
      } else if (e.optionType === "Quantity Dropdown") {
        const optionsSelected = myObjProfile.options[index].optionsList.filter(
          (op) => op.selectedTimes > 0
        );
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
            setopenDropdown={setopenOptions}
            openDropdown={openOptions}
            label={e.label}
            isRequired={e.isRequired}
            optionsSelectedLabel={optionsSelectedLabel}
          />
        );
      } else if (e.optionType === "Table View") {
        const optionsSelected = myObjProfile.options[index].optionsList.filter(
          (op) => op.selectedTimes > 0
        );
        const optionsSelectedLabel =
          optionsSelected.length > 0
            ? optionsSelected.map((op, index) => {
                if (index > 0) return `, ${op.label} (${op.selectedTimes})`;
                return `${op.label} (${op.selectedTimes})`;
              })
            : "";

        return (
          <TableOption
            e={e}
            index={index}
            myObjProfile={myObjProfile}
            setmyObjProfile={setmyObjProfile}
            id={index}
            setopenDropdown={setopenOptions}
            openDropdown={openOptions}
            label={e.label}
            isRequired={e.isRequired}
            optionsSelectedLabel={optionsSelectedLabel}
          />
        );
      } else {
        return (
          <OneTimeSelectableOptionGroup
            label={e.label}
            isRequired={e.isRequired}
            options={e.optionsList}
            setValue={({ option, listIndex }) => {
              if (parseFloat(e.numOfSelectable) === 1) {
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
              } else {
                console.log("INside else of one time selectable option group");
                const newMyObjProfile = structuredClone(myObjProfile);
                const totalSelected = myObjProfile.options[
                  index
                ].optionsList.filter((op) => op.selected === true).length;
                if (
                  newMyObjProfile.options[index].optionsList[listIndex].selected
                ) {
                  console.log(
                    "Inside if of one time selectable option group is selected part"
                  );
                  newMyObjProfile.options[index].optionsList[
                    listIndex
                  ].selected = false;
                } else {
                  console.log(
                    "Inside else of one time selectable option group else part"
                  );
                  if (
                    totalSelected < e.numOfSelectable ||
                    e.numOfSelectable === 0 ||
                    !e.numOfSelectable
                  ) {
                    console.log(
                      "Inside if of one time selectable option group else part not selected"
                    );
                    newMyObjProfile.options[index].optionsList[
                      listIndex
                    ].selected = true;
                  }
                }
                setmyObjProfile(newMyObjProfile);
              }
            }}
            value={e.numOfSelectable === 1 ? optionVal : false}
          />
        );
      }
    } else if (checkCases() === false) {
      // else {
      // console.log("Inside else of checkCases() === false");
      const newMyObjProfile = structuredClone(myObjProfile);
      newMyObjProfile.options[index].optionsList.forEach(
        (item, indexOfItem) => {
          if (item.selected === true) {
            // console.log("item.selected === true");
            newMyObjProfile.options[index].optionsList[indexOfItem].selected =
              false;
            setmyObjProfile(newMyObjProfile);
          } else if (item.selectedTimes > 0) {
            // console.log("item.selectedTimes > 0");
            newMyObjProfile.options[index].optionsList[
              indexOfItem
            ].selectedTimes = 0;
            setmyObjProfile(newMyObjProfile);
          }
        }
      );
      return <></>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productBuilderGroup}>
        <View
          style={[
            styles.goBackRow,
            // !myObj.description ? { marginBottom: 20 } : { marginBottom: 120 },
            { marginBottom: 100 },
          ]}
        >
          <GoBackBtn onPress={goBack} style={styles.goBackBtn} />
        </View>
        <View style={styles.leftRightGroup}>
          <View style={styles.leftSideGroup}>
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
                ]}
              />
              <View style={styles.itemInfoTxtGroup}>
                <View style={styles.topTxtGroup}>
                  <Text style={styles.productName}>{myObj.name}</Text>
                  <>
                    {myObj.calorieDetails && (
                      <Text style={styles.calorieDetails}>280 cal/slice</Text>
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
              <View>
                {myObjProfile.options.map((e, index) => (
                  <DisplayOption key={index} e={e} index={index} />
                ))}
              </View>
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
            title={itemIndex >= 0 ? "Save" : "Add To Cart"}
            onPress={AddToCart}
          />
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
    width: "90%",
    height: "85%",
    justifyContent: "space-between",
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
