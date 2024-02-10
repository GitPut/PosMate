import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@react-native-material/core";
import ProductOptionDropDown from "./ProductOptionDropDown";
import { addCartState, cartState, setCartState } from "state/state";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProductOption1Selectable from "./ProductOption1Selectable";
import ProductOptionMultiChoiceDropdown from "./ProductOptionMultiChoiceDropdown";

const ProductListing = ({ product, itemIndex, goBack }) => {
  const cart = cartState.use();
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [extraInput, setextraInput] = useState(
    myObj.extraDetails ? myObj.extraDetails : ""
  );
  const [openOptions, setopenOptions] = useState(0);

  const InnerDisplayOption = ({
    index,
    e,
    optionVal,
    setoptionVal,
    innerViewRef,
  }) => {
    if (openOptions === index) {
      return (
        <View
          style={{ flexWrap: "wrap", flexDirection: "row" }}
          ref={innerViewRef}
        >
          {e.numOfSelectable === "1" ? (
            <ProductOption1Selectable
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
                    }
                  }
                );

                newMyObjProfile.options[index].optionsList[listIndex].selected =
                  true;
                setoptionVal(option);
                setmyObjProfile(newMyObjProfile);
              }}
              value={optionVal}
              style={{ marginBottom: 25 }}
            />
          ) : (
            <ProductOptionMultiChoiceDropdown
              e={e}
              index={index}
              myObjProfile={myObjProfile}
              setmyObjProfile={setmyObjProfile}
            />
          )}
        </View>
      );
    } else {
      return <></>;
    }
  };

  const DisplayOption = ({ e, index, scrollviewRef }) => {
    const viewRef = useRef(null);
    const innerViewRef = useRef(null);
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

    const scrollToItem = () => {
      if (scrollviewRef.current && viewRef.current) {
        // viewRef.current.measureLayout(
        //   scrollviewRef.current,
        //   (x, y) => {
        scrollviewRef.current.scrollTo({ y: 70 * index, animated: true });
        //   },
        //   () => console.error("Failed to measure layout")
        // );
        // innerViewRef.current.measureLayout(
        //   scrollviewRef.current,
        //   (x, y) => {
        //     scrollviewRef.current.scrollTo({ y, animated: true });
        //   },
        //   () => console.error("Failed to measure layout")
        // );
      }
    };

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
              {e.isRequired && "* "}
              {e.label}
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
                    }
                  }
                );

                newMyObjProfile.options[index].optionsList[listIndex].selected =
                  true;
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
            ref={viewRef}
          >
            <TouchableOpacity
              onPress={() => {
                if (openOptions === index) {
                  setopenOptions(null);
                } else {
                  setopenOptions(index);
                  scrollToItem();
                }
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 18 }}>
                {e.isRequired && "* "}
                {e.label}
                {e.numOfSelectable > 0 &&
                  ` - Selections Allowed: ${e.numOfSelectable}`}
              </Text>
              <Ionicons
                name={openOptions === index ? "chevron-up" : "chevron-down"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <InnerDisplayOption
              index={index}
              e={e}
              optionVal={optionVal}
              setoptionVal={setoptionVal}
              innerViewRef={innerViewRef}
            />
          </View>
        );
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

  const scrollviewRef = useRef(null);

  return (
    <View style={{ padding: "5%", backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={goBack}
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color="#4A4A4A"
          />
          <Text
            style={{
              fontFamily: "archivo-600",
              fontSize: 22,
              color: "#4A4A4A",
            }}
          >
            Dashboard
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: "archivo-600", fontSize: 24 }}>
          {myObj.name}
        </Text>
        <Text
          style={{ fontFamily: "archivo-600", fontSize: 22, color: "#4A4A4A" }}
        >
          Total: ${parseFloat(total).toFixed(2)}
        </Text>
      </View>
      <ScrollView style={styles.modalContainer} ref={scrollviewRef}>
        {myObj.description && (
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 15 }}>
            Description: {myObj.description}
          </Text>
        )}
        {myObjProfile.options.map((e, index) => (
          <DisplayOption
            e={e}
            index={index}
            key={index}
            scrollviewRef={scrollviewRef}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Write any extra info here.."
          onChangeText={(val) => setextraInput(val)}
          value={extraInput}
          style={{
            width: "70%",
            height: 45,
            borderColor: "lightgrey",
            borderWidth: 1,
            padding: 5,
            borderRadius: 3,
            paddingLeft: 10,
            fontSize: 14,
          }}
        />
        <Button
          title={itemIndex >= 0 ? "Save" : "Add To Cart"}
          onPress={AddToCart}
          style={{ backgroundColor: "#3351F3", width: 140, height: 40 }}
          titleStyle={{ fontSize: 16, textTransform: "capitalize" }}
        />
      </View>
    </View>
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
    marginTop: 25,
    marginBottom: 25,
    padding: "5%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(232,232,232,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.03,
    shadowRadius: 10,
    height: "70%",
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
    fontSize: 25,
    color: "black",
    fontWeight: "600",
  },
  multiOption: {
    // backgroundColor: "rgba(205,213,255,1)",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.03,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15,
    margin: 5,
    minWidth: 150,
  },
  optionNameTxt: {
    fontFamily: "archivo-600",
    fontSize: 18,
  },
  optionPriceTxt: {
    fontFamily: "archivo-600",
    fontSize: 16,
    padding: 10,
  },
});
