import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import AddToCartBtn from "components/MainPosPage/components/ProductBuilderModal/AddToCartBtn";
import DropdownSelectableOption from "components/MainPosPage/components/ProductBuilderModal/DropdownSelectableOption";
import MultipleTimeSelectableOptionGroup from "components/MainPosPage/components/ProductBuilderModal/MultipleTimeSelectableOptionGroup";
import TableOption from "components/MainPosPage/components/ProductBuilderModal/TableOption";
import OneTimeSelectableOptionGroup from "components/MainPosPage/components/ProductBuilderModal/OneTimeSelectableOptionGroup";
import ItemNoOptionsView from "./ItemNoOptionsView";

function ProductBuilderView({ product, imageUrl }) {
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [openOptions, setopenOptions] = useState(null);

  useEffect(() => {
    setmyObjProfile(product);
  }, [product]);

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
    }
    // else if (checkCases() === false) {
    else {
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
      return <></>;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
        }}
        style={{ width: "100%", height: "100%", padding: 20 }}
      >
        <Text style={{ fontWeight: "700", color: "#121212", fontSize: 21 }}>
          Preview
        </Text>
        {product.options.length > 0 ? (
          <>
            <View style={styles.productBuilderGroup}>
              <View style={styles.itemInfoContainer}>
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    resizeMode="contain"
                    style={[
                      styles.itemImg,
                      myObj.description && { width: 300, height: 150 },
                    ]}
                  />
                )}
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
              <View
                style={{
                  width: "100%",
                  padding: 20,
                  paddingLeft: 30,
                  paddingRight: 30,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <View>
                  {myObjProfile.options.map((e, index) => (
                    <DisplayOption key={index} e={e} index={index} />
                  ))}
                </View>
              </View>
              <View style={styles.totalLblRow}>
                <Text style={styles.totalLbl}>
                  Total: ${parseFloat(total).toFixed(2)}
                </Text>
              </View>
            </View>
            {/* <View style={styles.addToCartRow}>
              <AddToCartBtn
                style={styles.addToCartBtn}
                title="Add To Cart"
                onPress={() => {
                  //
                }}
              />
            </View> */}
          </>
        ) : (
          <ItemNoOptionsView product={product} />
        )}
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
    borderRadius: 10,
  },
  productBuilderGroup: {
    width: "100%",
    height: "85%",
    paddingTop: 20,
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
  },
  leftSideGroup: {
    width: "35%",
    height: "100%",
    justifyContent: "space-between",
  },
  itemInfoContainer: {
    height: 350,
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

export default ProductBuilderView;
