import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import AddProduct from "components/ProductBuilder";
import Confirmation from "components/Confirmation";

const ProductAndCatManager = ({ navigation }) => {
  const catalog = userStoreState.use();
  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedProduct, setselectedProduct] = useState({
    product: null,
    index: null,
    isNew: false,
  });
  const [newCategoryName, setnewCategoryName] = useState(null);
  const [confirmDeleteCat, setconfirmDeleteCat] = useState({
    name: null,
    index: null,
  });
  const [confirmDeleteProd, setconfirmDeleteProd] = useState({
    name: null,
    index: null,
  });

  useEffect(() => {
    if (catalog.categories.length > 0) {
      setselectedCategory(catalog.categories[0]);
    }
  }, []);

  function handleNewCategory() {
    updateData([...catalog.categories, newCategoryName], catalog.products);
    setnewCategoryName(null);
  }

  function handleRemoveCategory(index) {
    const localCatalog = structuredClone(catalog);
    localCatalog.categories.splice(index, 1);

    updateData(localCatalog.categories, localCatalog.products);
    // setisModalVisible(true);
  }

  function handleRemoveProduct(index) {
    const localCatalog = structuredClone(catalog);
    localCatalog.products.splice(index, 1);

    updateData(localCatalog.categories, localCatalog.products);
    // setisModalVisible(true);
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "90%",
          height: 60,
          flexDirection: "row",
          marginBottom: 20,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "archivo-600",
            color: "rgba(98,96,96,1)",
            fontSize: 20,
          }}
        >
          Edit Store Catalog
        </Text>
      </View>
      {/* <Button
        title="Edit Products"
        onPress={() => navigation.navigate("Edit ProductList")}
      />
      <Button
        title="Edit Categories"
        onPress={() => navigation.navigate("Edit Categories")}
      /> */}
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerLbl}>Categories</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => setnewCategoryName("")}
              style={styles.addNewContainer}
            >
              <Entypo name="plus" style={styles.addNewIcon} />
              <Text style={styles.addNewTxt}>Add new category</Text>
            </TouchableOpacity>
            {catalog.categories.map((e, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setselectedCategory(e)}
                  style={[
                    styles.selectedItemContainer,
                    e === selectedCategory && { backgroundColor: "#ebebeb" },
                  ]}
                >
                  <Text style={styles.selectedItemTxt}>{e}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => setselectedCategory(e)}
                      style={{ paddingRight: 10 }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          setconfirmDeleteCat({ name: e, index: index })
                        }
                      >
                        <Feather
                          name="more-vertical"
                          style={styles.selectedItemIcon}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                    {e === selectedCategory && (
                      <Feather
                        name="chevron-right"
                        style={[styles.selectedItemIcon]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
            {newCategoryName !== null && (
              <View>
                <TextInput
                  style={[
                    styles.selectedItemContainer,
                    {
                      borderWidth: 1,
                      borderColor: "#1b73e8",
                      borderRadius: 6,
                      paddingTop: 5,
                      paddingBottom: 5,
                    },
                  ]}
                  placeholder="Enter new category name"
                  autoFocus
                  value={newCategoryName}
                  onChangeText={(val) =>
                    val.length > 0
                      ? setnewCategoryName(val)
                      : setnewCategoryName(null)
                  }
                />
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    right: "1%",
                  }}
                  onPress={handleNewCategory}
                >
                  <Entypo name="check" style={[styles.addNewIcon]} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.left}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerLbl}>
              Products {selectedCategory && `in ${selectedCategory}`}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() =>
                setselectedProduct({ product: null, index: null, isNew: true })
              }
              style={styles.addNewContainer}
            >
              <Entypo name="plus" style={styles.addNewIcon} />
              <Text style={styles.addNewTxt}>Add new product</Text>
            </TouchableOpacity>
            {catalog.products
              .filter((prod) =>
                prod.category
                  ? prod.category == selectedCategory
                  : prod.catagory == selectedCategory
              )
              .map((e, index) => {
                let productIndex = index;

                if (e.id) {
                  const findIndex = catalog.products.findIndex(
                    (find) => find.id === e.id
                  );
                  productIndex = findIndex;
                }

                return (
                  <TouchableOpacity
                    // onPress={() => setselectedProduct(e)}
                    onPress={() =>
                      // navigation.navigate("AddProduct", {
                      //   existingProduct: e,
                      //   existingProductIndex: index,
                      // })
                      setselectedProduct({
                        product: e,
                        index: productIndex,
                        isNew: false,
                      })
                    }
                    style={[
                      styles.selectedItemContainer,
                      e === selectedProduct && { backgroundColor: "#ebebeb" },
                    ]}
                  >
                    <Text style={styles.selectedItemTxt}>{e.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setconfirmDeleteProd({
                          name: e.name,
                          index: productIndex,
                        })
                      }
                    >
                      <Feather
                        name="more-vertical"
                        style={styles.selectedItemIcon}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </View>
      {(selectedProduct.isNew || selectedProduct.product) && (
        <Modal transparent>
          <AddProduct
            existingProductProp={selectedProduct.product}
            existingProductIndexProp={selectedProduct.index}
            goBack={() =>
              setselectedProduct({ product: null, index: null, isNew: false })
            }
            productCategory={selectedCategory}
          />
        </Modal>
      )}
      {confirmDeleteCat.name && (
        <Modal transparent>
          <Confirmation
            confirmLbl={` Are you sure you want to delete category "${confirmDeleteCat.name}"?`}
            yesAction={() => {
              handleRemoveCategory(confirmDeleteCat.index);
              setconfirmDeleteCat({ name: null, index: null });
            }}
            noAction={() => setconfirmDeleteCat({ name: null, index: null })}
          />
        </Modal>
      )}
      {confirmDeleteProd.name && (
        <Modal transparent>
          <Confirmation
            confirmLbl={` Are you sure you want to delete category "${confirmDeleteProd.name}"?`}
            yesAction={() => {
              handleRemoveProduct(confirmDeleteProd.index);
              setconfirmDeleteProd({ name: null, index: null });
            }}
            noAction={() => setconfirmDeleteProd({ name: null, index: null })}
          />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    flexDirection: "row",
    width: "90%",
    height: "80%",
  },
  left: {
    width: "50%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  headerContainer: {
    width: "100%",
    height: 40,
    borderWidth: 0,
    borderColor: "#dcdcdc",
    borderBottomWidth: 1,
    backgroundColor: "#fafafa",
  },
  headerLbl: {
    fontFamily: "archivo-500",
    color: "#717171",
    marginTop: 14,
    marginLeft: 43,
  },
  bottomContainer: {
    width: "100%",
  },
  addNewContainer: {
    width: "100%",
    height: 38,
    flexDirection: "row",
    alignItems: "center",
  },
  addNewIcon: {
    color: "#2076e9",
    fontSize: 30,
    marginLeft: 10,
  },
  addNewTxt: {
    fontFamily: "archivo-500",
    color: "#1b73e8",
    marginLeft: 10,
  },
  selectedItemContainer: {
    height: 33,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 10,
  },
  selectedItemTxt: {
    fontFamily: "archivo-500",
    color: "#252525",
  },
  selectedItemIcon: {
    color: "#6a6a6a",
    fontSize: 20,
  },
});

export default ProductAndCatManager;
