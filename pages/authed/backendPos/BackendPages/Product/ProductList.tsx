import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import ProductOptionBox from "./components/ProductOptionBox";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { onlineStoreState,  updateUserStoreState, userStoreState } from "state/state";
import { auth, db, } from "state/firebaseConfig";
import Swal from "sweetalert2";
import AddProductModal from "./modals/AddProductModal";
import Modal from "react-native-modal-web";
import ProductTemplatesModal from "./modals/ProductTemplatesModal";
import { ProductProp } from "types/global";

function ProductList() {
  const catalog = userStoreState.use()
  const onlineStoreDetails = onlineStoreState.use()
  const [searchFilterValue, setsearchFilterValue] = useState<string>('')
  const [selectedCategory, setselectedCategory] = useState<string | null>()
  const [editMode, seteditMode] = useState<boolean>(false)
  const [addProductModal, setaddProductModal] = useState<boolean>(false)
  const [existingProduct, setexistingProduct] = useState < ProductProp | null>(null)
  const [isProductTemplate, setisProductTemplate] = useState<boolean>(false)
  const [productTemplatesModalVisible, setproductTemplatesModalVisible] = useState<boolean>(false)

  const confirmText = (props: ProductProp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#2b3659",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (t) {
      if (t.value) {
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your product has been deleted.",
          confirmButtonColor: "#2b3659",
        });
        const localCatalog = structuredClone(catalog);
        if (localCatalog.products.length > 1) {
          localCatalog.products = localCatalog.products.filter((item) => item.id !== props.id);
        } else {
          localCatalog.products = [];
        }
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("products")
          .doc(props.id.toString())
          .delete()
        if (onlineStoreDetails.onlineStoreSetUp) {
          db.collection("public")
            .doc(auth.currentUser?.uid)
            .collection("products")
            .doc(props.id.toString())
            .delete()
        }
        updateUserStoreState({ products: localCatalog.products })
      }
    });
  };

  useEffect(() => {
    catalog.products.map((product) => {
      if (product.category === selectedCategory && product.name.toLowerCase().includes(searchFilterValue.toLocaleLowerCase())) {
        const getItem = document.getElementById(product.id)
        if (getItem) {
          getItem.style.display = "flex";
        }
      }
      else if (product.category === selectedCategory && !searchFilterValue) {
        const getItem = document.getElementById(product.id)
        if (getItem) {
          getItem.style.display = "flex";
        }
      } else if (searchFilterValue.length > 0 && product.name.toLowerCase().includes(searchFilterValue.toLocaleLowerCase()) && !selectedCategory) {
        const getItem = document.getElementById(product.id)
        if (getItem) {
          getItem.style.display = "flex";
        }
      } else if (!searchFilterValue && !selectedCategory) {
        const getItem = document.getElementById(product.id)
        if (getItem) {
          getItem.style.display = "flex";
        }
      } else {
        const getItem = document.getElementById(product.id)
        if (getItem) {
          getItem.style.display = "none";
        }
      }
    });
  }, [searchFilterValue, selectedCategory, catalog.products]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.productManagementTxt}>Product Management</Text>
        <View style={{ width: '60%' }}>
          <TextInput style={styles.searchProductBox} placeholder="Search" value={searchFilterValue} onChangeText={(val) => setsearchFilterValue(val)} />
          <Feather name="search" style={{ color: 'grey', fontSize: 20, position: 'absolute', top: 5, right: 5 }} />
        </View>
        <Pressable style={styles.manageProductsBtn}
          onPress={() => seteditMode(prev => !prev)}
        >
          <MaterialCommunityIcons
            name="format-list-checks"
            style={styles.manageProductIcon}
          />
          <Text style={styles.manageProductsTxt}>Manage Products</Text>
        </Pressable>
      </View>
      <View style={styles.categoriesScrollView}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={
            styles.categoriesScrollView_contentContainerStyle
          }
        >
          {catalog.categories.map((category, index) => (
            <Pressable key={index}
              style={[{ marginRight: 35 }, selectedCategory === category ? { borderBottomWidth: 2, borderBottomColor: 'black' } : { borderBottomWidth: 2, borderBottomColor: 'grey' }]}
              onPress={() => setselectedCategory(prev => prev === category ? null : category)}>
              <Text style={[styles.categoryOpt1Txt, selectedCategory === category ? { color: 'black' } : { color: 'grey' }]}>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))', // Create columns that are at least 215px wide
            gap: 30, // Space between items
            width: '100%',
          }}>
            {/* <View style={styles.productsMap}> */}
            <Pressable style={[styles.addProductBtn, editMode && { height: 322 }]} onPress={() => setaddProductModal(true)}>
              <Feather
                name="plus"
                style={styles.addProductPlusIcon}
              />
              <Text style={styles.addNewItemTxt}>Add New Item</Text>
              <Text style={styles.addNewItemTxt}>Or</Text>
              <Pressable style={styles.templateBtn} onPress={() => setproductTemplatesModalVisible(true)}>
                <Text style={styles.templatesBtnLbl}>Choose Template</Text>
              </Pressable>
            </Pressable>
            {catalog.products.map((product, index) => <div key={index} id={product.id}>
              <ProductOptionBox
                style={[styles.productOptionBox, editMode ? { height: 322 } : {}]}
                product={product}
                editMode={editMode}
                deleteProduct={() => confirmText(product)}
                setexistingProduct={setexistingProduct}
              />
            </div>)}
            {/* </View> */}
          </div>
        </ScrollView>
      </View>
      <Modal
        isVisible={(addProductModal || existingProduct) ? true : false}
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
          <AddProductModal
            addProductModal={addProductModal}
            setaddProductModal={setaddProductModal}
            existingProduct={existingProduct}
            setexistingProduct={setexistingProduct}
            isProductTemplate={isProductTemplate}
            setisProductTemplate={setisProductTemplate}
          />
        </View>
      </Modal>
      <Modal
        isVisible={productTemplatesModalVisible ? true : false}
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
          <ProductTemplatesModal
            setproductTemplatesModalVisible={setproductTemplatesModalVisible}
            setexistingProduct={setexistingProduct}
            setisProductTemplate={setisProductTemplate}
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
    width: '100%',
  },
  topRow: {
    width: '95%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 25,
  },
  scrollArea: {
    flex: 1, // Take up remaining space
    width: '95%',
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1, // Allow the container to grow as needed
    justifyContent: "flex-start", // Align items to the start
  },
  productManagementTxt: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 16
  },
  searchProductBox: {
    width: '100%',
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    paddingLeft: 10
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
    justifyContent: "space-around"
  },
  manageProductIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 22
  },
  manageProductsTxt: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 14
  },
  categoriesScrollView: {
    width: '85%',
    marginBottom: 30,
  },
  categoriesScrollView_contentContainerStyle: {
    width: '100%',
  },
  categoryOpt1Txt: {
    // color: "#121212"
    color: 'grey',
    padding: 10
  },
  categoryOpt2Txt: {
    color: "#121212",
    marginLeft: 100
  },
  productsMap: {
    width: '100%',
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
    marginBottom: 30
  },
  addProductPlusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25
  },
  addNewItemTxt: {
    color: "#121212",
    fontSize: 16,
    marginTop: 20
  },
  templateBtn: {
    width: 175,
    height: 48,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  templatesBtnLbl: {
    fontWeight: '700',
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    marginRight: 10
  },
  productOptionBox: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30
  },
  productOptionBox1: {
    height: 285,
    width: 215,
    marginRight: 30,
    marginLeft: 0,
    marginBottom: 30
  },
  productOptionBox2: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30
  },
  productOptionBox3: {
    height: 285,
    width: 215,
    marginLeft: 0,
    marginBottom: 30,
    marginRight: 30
  }
});

export default ProductList;
