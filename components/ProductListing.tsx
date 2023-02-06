import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import ProductOptionDropDown from "./ProductOptionDropDown";
import { addCartState, cartState, setCartState } from "state/state";

const ProductListing = ({ navigation, route }) => {
  const { product, itemIndex } = route.params;
  const cart = cartState.use();
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [extraInput, setextraInput] = useState(
    myObj.extraDetails ? myObj.extraDetails : null
  );

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
          <View
            style={{
              marginBottom: 25,
              width: "100%",
            }}
            key={index}
          >
            <Text style={{ fontWeight: "700", fontSize: 18 }}>
              Label: {e.label}
            </Text>
            <ProductOptionDropDown
              label={e.label}
              options={e.optionsList}
              setValue={({ option, listIndex }) => {
                const newMyObjProfile = structuredClone(myObjProfile);
                newMyObjProfile.options[index].optionsList.forEach(
                  (element, indexOfOl) => {
                    if (element.selected) {
                      newMyObjProfile.options[index].optionsList[
                        indexOfOl
                      ].selected = false;
                      // settotal((prevState) =>
                      //   (
                      //     parseFloat(prevState) -
                      //     parseFloat(
                      //       newMyObjProfile.options[index].optionsList[
                      //         indexOfOl
                      //       ].priceIncrease !== null
                      //         ? newMyObjProfile.options[index].optionsList[
                      //             indexOfOl
                      //           ].priceIncrease
                      //         : 0
                      //     )
                      //   ).toFixed(2)
                      //);
                    }
                  }
                );

                newMyObjProfile.options[index].optionsList[listIndex].selected =
                  true;
                // settotal((prevState) =>
                //   (
                //     parseFloat(prevState) +
                //     parseFloat(
                //       newMyObjProfile.options[index].optionsList[listIndex]
                //         .priceIncrease !== null
                //         ? newMyObjProfile.options[index].optionsList[listIndex]
                //             .priceIncrease
                //         : 0
                //     )
                //   ).toFixed(2)
                // );
                setoptionVal(option);
                setmyObjProfile(newMyObjProfile);
              }}
              value={optionVal}
              style={{ marginBottom: 25 }}
            />
          </View>
        );
      } else {
        return (
          <View
            style={{
              marginBottom: 25,
              flexWrap: "wrap",
              width: "100%",
            }}
            key={index}
          >
            <Text style={{ fontWeight: "700", fontSize: 18 }}>
              Label: {e.label}
            </Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {e.optionsList.map((selection, listIndex) => {
                return (
                  <TouchableOpacity
                    key={listIndex}
                    style={[
                      myObjProfile.options[index].optionsList[listIndex]
                        .selected == true && {
                        backgroundColor: "green",
                      },
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        margin: 5,
                        borderColor: "black",
                        borderWidth: 2,
                        // width: "50%",
                      },
                    ]}
                    onPress={() => {
                      const newMyObjProfile = structuredClone(myObjProfile);
                      if (
                        !newMyObjProfile.options[index].optionsList[listIndex]
                          .selected == false
                      ) {
                        newMyObjProfile.options[index].optionsList[
                          listIndex
                        ].selected = false;
                      } else {
                        if (
                          newMyObjProfile.options[index].optionsList.filter(
                            (op) => op.selected === true
                          ).length < parseInt(e.numOfSelectable) ||
                          !e.numOfSelectable
                        ) {
                          newMyObjProfile.options[index].optionsList[
                            listIndex
                          ].selected = true;
                        }
                      }
                      setmyObjProfile(newMyObjProfile);
                    }}
                  >
                    <Text style={styles.h2Black}>Name: {selection.label}</Text>
                    <View style={{ width: 20 }} />
                    <Text style={styles.h2Black}>
                      Price: $
                      {selection.priceIncrease !== null
                        ? selection.priceIncrease
                        : 0}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      }
    } else if (checkCases() === false) {
      const newMyObjProfile = structuredClone(myObjProfile);
      // let newSubtract = 0;
      newMyObjProfile.options[index].optionsList.forEach(
        (item, indexOfItem) => {
          if (item.selected === true) {
            newMyObjProfile.options[index].optionsList[indexOfItem].selected =
              false;
            setmyObjProfile(newMyObjProfile);
          }
        }
      );
      // console.log("new subtract: ", newSubtract);
      // if (newSubtract > 0) {
      //   settotal((prevState) =>
      //     (parseFloat(prevState) - newSubtract).toFixed(2)
      //   );
      // }
    }
    // return null;
  };

  useEffect(() => {
    settotal(getPrice());
  }, [myObjProfile]);

  const getPrice = () => {
    let total = parseFloat(myObjProfile.price);
    myObjProfile.options.forEach((op) => {
      op.optionsList
        .filter((f) => f.selected === true)
        .map((e) => (total += parseFloat(e.priceIncrease)));
    });
    return total;
  };

  const AddToCart = () => {
    const opsArray = [];

    myObjProfile.options.forEach((op) => {
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
      }
    });

    const objWTotal = {
      ...myObjProfile,
      total: total,
      extraDetails: extraInput,
    };

    if (itemIndex >= 0) {
      let copyCart = structuredClone(cart);
      copyCart[itemIndex] = {
        name: myObjProfile.name,
        price: total,
        description: myObj.description,
        options: opsArray,
        extraDetails: extraInput,
        editableObj: objWTotal,
      };
      setCartState(copyCart);
    } else {
      addCartState({
        name: myObjProfile.name,
        price: total,
        description: myObj.description,
        options: opsArray,
        extraDetails: extraInput,
        editableObj: objWTotal,
      });
    }

    navigation.goBack();
    setmyObjProfile(myObj);
    settotal(myObjProfile.price);
    setextraInput(null);
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.h2Black}>Name: {myObj.name}</Text>
      {myObj.description && (
        <Text style={styles.h2Black}>Name: {myObj.description}</Text>
      )}
      <Text style={[{ marginBottom: 25 }, styles.h2Black]}>Price: {total}</Text>
      {myObjProfile.options.map((e, index) => (
        <DisplayOption e={e} index={index} key={index} />
      ))}
      <TextInput
        placeholder="Write any extra info here.."
        multiline={true}
        onChangeText={(val) => setextraInput(val)}
        value={extraInput}
        style={{ marginTop: 15, marginBottom: 15 }}
        inputStyle={{ padding: 10 }}
      />
      <Button
        title={itemIndex >= 0 ? "Save" : "Add To Cart"}
        onPress={AddToCart}
        style={styles.btn}
      />
      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
        style={styles.btn}
      />
    </ScrollView>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  halfRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  toppingsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 25,
  },
  touchable: {
    margin: 25,
    width: 300,
  },
  modalContainer: {
    padding: 50,
  },
  btn: {
    marginBottom: 25,
  },
  dropDown: {
    marginBottom: 25,
  },
  h2White: {
    fontSize: 17,
    color: "white",
  },
  h2Black: {
    fontSize: 20,
    color: "black",
  },
});
