import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  onlineStoreState,
  setUserStoreState,
  userStoreState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import Swal from "sweetalert2";
import CategoryOptionBox from "./components/CategoryOptionBox";
import AddCategoryModal from "./modals/AddCategoryModal";
import Modal from "react-native-modal-web";

function CategoryList() {
  const catalog = userStoreState.use();
  const [searchFilterValue, setsearchFilterValue] = useState<string>("");
  const onlineStoreDetails = onlineStoreState.use();
  const [editMode, seteditMode] = useState<boolean>(false);
  const [addCategoryModal, setaddCategoryModal] = useState<
    boolean | string | null
  >(false);
  const [editCategoryModal, seteditCategoryModal] = useState<string | null>(
    null
  );

  const confirmText = (category: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#2b3659",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (t) {
      if (t.value) {
        Swal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          color: "#2b3659",
          confirmButtonColor: "#2b3659",
        });
        // const localCatalog = structuredClone(catalog);
        // if (localCatalog.categories.length > 1) {
        //   // localCatalog.categories.splice(props.id - 2, 1);
        //   localCatalog.categories = catalog.categories.filter(
        //     (e) => e !== category
        //   );
        // } else {
        //   localCatalog.categories = [];
        // }

        db.collection("users")
          .doc(auth.currentUser?.uid)
          .update({
            categories: catalog.categories.filter((e) => e !== category),
          });
        // .catch((e) => {
        //   // console.log("ERROR HAS OCCURE FB: ", e)
        // });
        if (onlineStoreDetails.onlineStoreSetUp) {
          db.collection("public")
            .doc(auth.currentUser?.uid)
            .update({
              categories: catalog.categories.filter((e) => e !== category),
            });
          // .catch((e) => {
          //   // console.log("ERROR HAS OCCURE FB: ", e)
          // });
        }
        setUserStoreState({
          products: catalog.products,
          categories: catalog.categories.filter((e) => e !== category),
        });
      }
    });
  };

  useEffect(() => {
    catalog.categories.map((category: string, index: number) => {
      if (
        category
          .toLowerCase()
          .includes(searchFilterValue.toLocaleLowerCase()) ||
        !searchFilterValue
      ) {
        const getItem = document.getElementById(index.toString());
        if (getItem) {
          getItem.style.display = "flex";
        }
      } else {
        const getItem = document.getElementById(index.toString());
        if (getItem) {
          getItem.style.display = "none";
        }
      }
    });
  }, [searchFilterValue]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.productManagementTxt}>Category Management</Text>
        <View style={{ width: "60%" }}>
          <TextInput
            style={styles.searchProductBox}
            placeholder="Search"
            value={searchFilterValue}
            onChangeText={(val) => setsearchFilterValue(val)}
          />
          <Feather
            name="search"
            style={{
              color: "grey",
              fontSize: 20,
              position: "absolute",
              top: 5,
              right: 5,
            }}
          />
        </View>
        <Pressable
          style={styles.manageProductsBtn}
          onPress={() => seteditMode((prev) => !prev)}
        >
          <MaterialCommunityIcons
            name="format-list-checks"
            style={styles.manageProductIcon}
          />
          <Text style={styles.manageProductsTxt}>Manage Categories</Text>
        </Pressable>
      </View>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))", // Create columns that are at least 215px wide
              gap: 30, // Space between items
              width: "100%",
            }}
          >
            <Pressable
              style={[styles.addProductBtn, editMode && { height: 322 }]}
              onPress={() => setaddCategoryModal(true)}
            >
              <Feather name="plus" style={styles.addProductPlusIcon} />
              <Text style={styles.addNewItemTxt}>Add New Category</Text>
            </Pressable>
            {catalog.categories.map((category) => (
              <div key={category} id={category}>
                <CategoryOptionBox
                  style={[
                    styles.productOptionBox,
                    editMode ? { height: 322 } : {},
                  ]}
                  category={category}
                  editMode={editMode}
                  deleteCategory={() => confirmText(category)}
                  seteditCategoryModal={seteditCategoryModal}
                />
              </div>
            ))}
          </div>
        </ScrollView>
      </View>
      <Modal
        isVisible={addCategoryModal ? true : false}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddCategoryModal
            setaddCategoryModal={setaddCategoryModal}
            index={catalog.categories.length}
          />
        </View>
      </Modal>
      <Modal
        isVisible={editCategoryModal ? true : false}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddCategoryModal
            setaddCategoryModal={(val) => {
              if (typeof val === "boolean" && !val) {
                seteditCategoryModal(null);
              } else {
                setaddCategoryModal(val);
              }
            }}
            index={catalog.categories.findIndex((e) => e === editCategoryModal)}
            existingCategory={editCategoryModal}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start to avoid stretching
    width: "100%",
  },
  topRow: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 25,
  },
  scrollArea: {
    flex: 1, // Take up remaining space
    width: "95%",
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1, // Allow the container to grow as needed
    justifyContent: "flex-start", // Align items to the start
  },
  productManagementTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  searchProductBox: {
    width: "100%",
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    paddingLeft: 10,
  },
  manageProductsBtn: {
    width: 181,
    height: 38,
    backgroundColor: "#fdfdff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  manageProductIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 22,
  },
  manageProductsTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 14,
  },
  categoriesScrollView: {
    width: "85%",
    marginBottom: 30,
  },
  categoriesScrollView_contentContainerStyle: {
    width: "100%",
  },
  categoryOpt1Txt: {
    // color: "#121212"
    color: "grey",
    padding: 10,
  },
  categoryOpt2Txt: {
    color: "#121212",
    marginLeft: 100,
  },
  productsMap: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  addProductBtn: {
    width: 215,
    height: 285,
    borderWidth: 3,
    borderColor: "#858585",
    borderRadius: 10,
    borderStyle: "dashed",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    marginBottom: 30,
  },
  addProductPlusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
  },
  addNewItemTxt: {
    color: "#121212",
    fontSize: 16,
    marginTop: 20,
  },
  productOptionBox: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30,
  },
  productOptionBox1: {
    height: 285,
    width: 215,
    marginRight: 30,
    marginLeft: 0,
    marginBottom: 30,
  },
  productOptionBox2: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30,
  },
  productOptionBox3: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30,
  },
});

export default CategoryList;
