import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { userStoreState } from "state/state";
import { Button } from "@react-native-material/core";
import { addCartState } from "state/state";

const DisplayTest = ({ product, productIndex }) => {
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.price);
  const [modalVisible, setModalVisible] = useState(false);

  const DisplayOption = ({ e, index }) => {
    let isSelected = false;

    const selectedCaseList = myObjProfile.options.filter(
      (op) => op.label == e.selectedCaseKey
    );

    let selectedValueList;

    if (selectedCaseList.length > 0) {
      selectedValueList = selectedCaseList[0].optionsList.filter(
        (opL) => opL.label == e.selectedCaseValue
      );

      if (selectedValueList.length > 0) {
        isSelected = selectedValueList[0].selected === true;
      }
    }

    if (e.selectedCaseKey === null || isSelected) {
      return (
        <View style={{ marginBottom: 25 }} key={index}>
          <Text style={{ fontWeight: "700", fontSize: 18 }}>
            Label: {e.label}
          </Text>
          {e.optionsList.map((selection, listIndex) => {
            return (
              <TouchableOpacity
                key={listIndex}
                style={[
                  myObjProfile.options[index].optionsList[listIndex].selected ==
                  true
                    ? {
                        backgroundColor: "green",
                      }
                    : {
                        borderColor: "black",
                        borderWidth: 2,
                      },
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    margin: 5,
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
                    settotal(
                      (prevState) =>
                        parseFloat(prevState) -
                        parseFloat(
                          newMyObjProfile.options[index].optionsList[listIndex]
                            .priceIncrease
                        )
                    );
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
                      settotal(
                        (prevState) =>
                          parseFloat(prevState) +
                          parseFloat(
                            newMyObjProfile.options[index].optionsList[
                              listIndex
                            ].priceIncrease
                          )
                      );
                    }
                  }
                  setmyObjProfile(newMyObjProfile);
                }}
              >
                <Text style={styles.h2Black}>Name: {selection.label}</Text>
                <Text style={styles.h2Black}>
                  Price: ${selection.priceIncrease}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else if (isSelected === false) {
      const newMyObjProfile = structuredClone(myObjProfile);
      let newSubtract = 0;
      newMyObjProfile.options[index].optionsList.forEach(
        (item, indexOfItem) => {
          if (item.selected === true) {
            newSubtract += parseFloat(
              newMyObjProfile.options[index].optionsList[indexOfItem]
                .priceIncrease
            );
            newMyObjProfile.options[index].optionsList[indexOfItem].selected =
              false;
          }
        }
      );
      if (newSubtract > 0) {
        settotal((prevState) => parseFloat(prevState) - newSubtract);
        setmyObjProfile(newMyObjProfile);
      }
    }
    // return null;
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

    addCartState({
      name: myObjProfile.name,
      price: total.toFixed(2),
      description: myObj.description,
      options: opsArray,
    });

    setModalVisible(false);
    setmyObjProfile(myObj);
    settotal(myObjProfile.price);
  };

  return (
    <View key={productIndex}>
      <Button
        title={myObj.name}
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      />
      <Modal visible={modalVisible}>
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.h2Black}>Name: {myObj.name}</Text>
          <Text style={[{ marginBottom: 25 }, styles.h2Black]}>
            Price: {total}
          </Text>
          {myObj.options.map((e, index) => (
            <DisplayOption e={e} index={index} key={index} />
          ))}
          <Button title="Add To Cart" onPress={AddToCart} style={styles.btn} />
          <Button
            title="Close"
            onPress={() => setModalVisible(false)}
            style={styles.btn}
          />
        </ScrollView>
      </Modal>
    </View>
  );
};

export default DisplayTest;

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
