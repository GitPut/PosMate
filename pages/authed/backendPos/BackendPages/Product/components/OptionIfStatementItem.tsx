import React from "react";
import { StyleSheet, View, Text, Pressable, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Option, ProductProp } from "types/global";
import GeneralDropdownStringOptions from "components/GeneralDropdownStringOptions";

interface IfStatement {
  selectedCaseKey: string | null;
  selectedCaseValue: string | null;
}

interface OptionIfStatementItemProps {
  style?: ViewStyle;
  ifStatement: IfStatement;
  indexOfIf: number;
  scrollY: number;
  index: number;
  setnewProductOptions: (
    val: ((prev: Option[]) => Option[]) | Option[]
  ) => void;
  sete: (val: ((prev: Option) => Option) | Option) => void;
  ifOptionOptions: string[];
  newProduct: ProductProp;
}

function OptionIfStatementItem({
  style,
  ifStatement,
  indexOfIf,
  scrollY,
  index,
  setnewProductOptions,
  sete,
  ifOptionOptions,
  newProduct,
}: OptionIfStatementItemProps) {
  const local = newProduct.options.filter(
    (localE) => localE.label == ifStatement.selectedCaseKey
  );
  const optionLblsValuesLocal: string[] = [];

  if (local.length > 0) {
    local[0].optionsList.forEach((el) => {
      if (!el.label) return;
      optionLblsValuesLocal.push(el.label);
    });
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.optionSelectionNameInputGroup}>
        <Text style={styles.selectionNameInputLbl}>If Option</Text>
        <GeneralDropdownStringOptions
          placeholder="Choose Option"
          value={ifStatement.selectedCaseKey}
          setValue={(val) => {
            let clone: Option[] = [];
            setnewProductOptions((prev) => {
              clone = structuredClone(prev);
              const selectedCaseList = clone[index].selectedCaseList;
              if (selectedCaseList) {
                selectedCaseList[indexOfIf].selectedCaseKey = val;
              }
              return clone;
            });
            sete((prev) => ({
              ...prev,
              selectedCaseList: clone[index].selectedCaseList,
            }));
          }}
          options={ifOptionOptions.filter((ifOptionValue) =>
            !ifOptionValue || ifOptionValue === "" ? false : true
          )}
          scrollY={scrollY}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MaterialCommunityIcons name="equal" color="black" size={30} />
      </View>
      <View style={styles.selectionPriceIncreaseInputGroup}>
        <Text style={styles.selectionPriceIncreaseLbl}>Value Of Option</Text>
        <GeneralDropdownStringOptions
          placeholder="Choose Option"
          value={ifStatement?.selectedCaseValue}
          setValue={(val) => {
            let clone: Option[] = [];
            setnewProductOptions((prev) => {
              clone = structuredClone(prev);
              const selectedCaseList = clone[index].selectedCaseList;
              if (selectedCaseList) {
                selectedCaseList[indexOfIf].selectedCaseValue = val;
              }
              return clone;
            });
            sete((prev) => ({
              ...prev,
              selectedCaseList: clone[index].selectedCaseList,
            }));
          }}
          options={optionLblsValuesLocal}
          scrollY={scrollY}
        />
      </View>
      <Pressable
        style={styles.deleteBtn}
        onPress={() => {
          let clone: Option[] = [];
          setnewProductOptions((prev) => {
            clone = structuredClone(prev);
            clone[index].selectedCaseList?.splice(indexOfIf, 1);
            return clone;
          });
          sete((prev) => ({
            ...prev,
            selectedCaseList: clone[index].selectedCaseList,
          }));
        }}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          style={styles.deleteIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  optionSelectionNameInputGroup: {
    height: 84,
    justifyContent: "space-between",
  },
  selectionNameInputLbl: {
    color: "#121212",
    fontSize: 17,
  },
  selectionNameInput: {
    width: 200,
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    padding: 10,
  },
  selectionPriceIncreaseInputGroup: {
    width: 199,
    height: 84,
    justifyContent: "space-between",
  },
  selectionPriceIncreaseLbl: {
    color: "#121212",
    fontSize: 17,
  },
  selectionPriceIncreaseInput: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    alignSelf: "stretch",
    padding: 10,
  },
  btnsRow: {
    width: 197,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 0,
    marginLeft: 0,
  },
  moveUpBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronUp: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  moveDownBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronDown: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  deleteBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 27,
  },
  optionSelectionNameInputGroupLimit: {
    width: 280,
    height: 84,
    justifyContent: "space-between",
  },
  selectionPriceIncreaseInputGroupLimit: {
    width: 140,
    height: 84,
    justifyContent: "space-between",
  },
  selectionLimitInputGroupLimit: {
    width: 120,
    height: 84,
    justifyContent: "space-between",
  },
  limit: {
    color: "#121212",
    fontSize: 17,
  },
  selectionLimitInput: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#9b9b9b",
    borderRadius: 5,
    alignSelf: "stretch",
  },
});

export default OptionIfStatementItem;
