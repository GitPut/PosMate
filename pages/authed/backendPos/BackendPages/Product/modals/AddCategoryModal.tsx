import React, {  useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { updateData } from "state/firebaseFunctions";
import { setUserStoreState, userStoreState } from "state/state";
import { useAlert } from "react-alert";

interface AddCategoryModalProps {
  setaddCategoryModal: (val: boolean) => void;
  existingCategory?: string | null;
  index: number;
}

function AddCategoryModal({ setaddCategoryModal, existingCategory, index }: AddCategoryModalProps) {
  const { height, width } = useWindowDimensions();
  const [categoryName, setcategoryName] = useState(
    existingCategory ? existingCategory : ""
  );
  const [categoryPosition, setcategoryPosition] = useState(index);
  const catalog = userStoreState.use();
  const alertP = useAlert();

  const Update = () => {
    if (categoryName === "") {
      alertP.error("Category name cannot be empty");
      return;
    }
    const localCatalog = structuredClone(catalog);
    const newCategories = [];
    localCatalog.categories = localCatalog.categories.filter(
      (category) => category !== existingCategory
    );
    if (localCatalog.categories.length > 0) {
      if (categoryPosition !== localCatalog.categories.length) {
        localCatalog.categories.forEach((category, index) => {
          if (index === categoryPosition) {
            newCategories.push(categoryName);
            newCategories.push(category);
          } else {
            newCategories.push(category);
          }
        });
      } else {
        localCatalog.categories.forEach((category) => {
          newCategories.push(category);
        });
        newCategories.push(categoryName);
      }
    } else {
      newCategories.push(categoryName);
    }
    updateData(newCategories);
    setUserStoreState({ ...catalog, categories: newCategories });
    setaddCategoryModal(false);
    //make it update online store too
  };

  return (
    <Pressable
      onPress={() => setaddCategoryModal(false)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <Text style={styles.addCategoryTxt}>Add Category</Text>
            <View style={styles.bottomContainer}>
              <View style={styles.nameAndPosRow}>
                <View style={styles.categoryNameGroup}>
                  <Text style={styles.categoryNameLbl}>Category Name</Text>
                  <TextInput
                    style={styles.categoryNameInput}
                    placeholder="Enter Category Name"
                    value={categoryName}
                    onChangeText={(val) => setcategoryName(val)}
                  />
                </View>
                <View style={styles.categoryPositionGroup}>
                  <Text style={styles.categoryPosition}>Category Position</Text>
                  <View style={styles.minusPlusSelectorRow}>
                    <Pressable
                      style={styles.minusContainer}
                      onPress={() =>
                        setcategoryPosition((prev) =>
                          prev !== 0 ? prev - 1 : prev
                        )
                      }
                    >
                      <Feather name="minus" style={styles.minusIcon} />
                    </Pressable>
                    <View style={styles.indexContainer}>
                      <Text style={styles.text}>{categoryPosition}</Text>
                    </View>
                    <Pressable
                      style={styles.plusContainer}
                      onPress={() =>
                        setcategoryPosition((prev) =>
                          prev < catalog.categories.length ? prev + 1 : prev
                        )
                      }
                    >
                      <Feather name="plus" style={styles.plusIcon} />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.btnsRow}>
                <Pressable
                  onPress={() => setaddCategoryModal(false)}
                  style={styles.cancelBox}
                >
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={Update}
                  style={styles.saveBox}
                >
                  <Text style={styles.saveTxt}>Save</Text>
                </Pressable>
              </View>
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
    alignItems: "center",
    justifyContent: "flex-start",
    width: 511,
    height: 582,
  },
  addCategoryTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 21,
    marginTop: 40,
    marginBottom: 40,
  },
  bottomContainer: {
    width: 377,
    height: 321,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameAndPosRow: {
    width: 377,
    height: 77,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryNameGroup: {
    width: 197,
    height: 77,
    justifyContent: "space-between",
  },
  categoryNameLbl: {
    color: "#121212",
    fontSize: 17,
  },
  categoryNameInput: {
    width: 197,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9b9b9b",
    padding: 10,
  },
  categoryPositionGroup: {
    width: 150,
    height: 77,
    justifyContent: "space-between",
  },
  categoryPosition: {
    color: "#121212",
    fontSize: 17,
  },
  minusPlusSelectorRow: {
    width: 150,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  minusContainer: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(179,179,179,1)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  minusIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
  },
  indexContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  plusContainer: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(179,179,179,1)",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
  },
  displayOnlineRow: {
    width: 377,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  displayOnlineStoreTxt: {
    color: "#121212",
    textDecorationLine: "underline",
    fontSize: 17,
    marginRight: 40,
  },
  switchBox: {
    width: 42,
    height: 20,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
  },
  btnsRow: {
    width: 377,
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelBox: {
    width: 173,
    height: 47,
    backgroundColor: "#eef2ff",
    borderRadius: 20,
    shadowColor: "#f0f0f0",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 1,
    shadowRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelTxt: {
    fontWeight: "700",
    color: "#1c294e",
    fontSize: 20,
  },
  saveBox: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    shadowColor: "#d8d8d8",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 1,
    shadowRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  saveTxt: {
    fontWeight: "700",
    color: "#eef2ff",
    fontSize: 20,
  },
});

export default AddCategoryModal;
