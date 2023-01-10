import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import { Button } from "@react-native-material/core";
import ViewTransactions from "./ViewTransactions";
import { db } from "state/firebaseConfig";
import { userState } from "state/state";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";

const HomeScreen = () => {
  const user = userState.use();
  const [section, setSection] = useState();
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [addProductModal, setaddProductModal] = useState(false);
  const [addCategoryModal, setaddCategoryModal] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        const data = doc.data();
        setproducts(data.products);
        setcategories(data.categories);
      });

    return () => unsubscribe();
  }, []);

  const Menu = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 120,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "red",
        }}
      >
        {categories &&
          categories.map((category) => (
            <Button
              titleStyle={{ color: "black", fontWeight: "700" }}
              style={{ backgroundColor: "white" }}
              onPress={() => setSection(category)}
              title={category}
            />
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Menu />
      {section === "transList" ? (
        <View style={{ height: "85%" }}>
          <ViewTransactions />
        </View>
      ) : (
        <View style={{ flexDirection: "row", height: "85%" }}>
          <MenuScreen section={section} products={products} />
          <CartScreen />
        </View>
      )}
      <Modal visible={addProductModal}>
        <AddProduct
          setaddProductModal={setaddProductModal}
          categories={categories}
        />
      </Modal>
      <Modal visible={addCategoryModal}>
        <AddCategory setaddCategoryModal={setaddCategoryModal} />
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
