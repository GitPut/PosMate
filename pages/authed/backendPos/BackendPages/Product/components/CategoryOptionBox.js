import ProductImage from "components/ProductImage";
import AvocatImage from "assets/AvocatImage.jpg";
import React, { Component } from "react";
import { StyleSheet, Pressable, Image, Text, View } from "react-native";
import { useHistory } from "react-router-dom";
import { userStoreState } from "state/state";
import { Feather } from "@expo/vector-icons";

function CategoryOptionBox({
  style,
  category,
  index,
  editMode,
  deleteCategory,
  seteditCategoryModal,
}) {
  const catalog = userStoreState.use();
  let imageUrl = catalog.products.filter(
    (item) => item.category === category && item.imageUrl
  );
  imageUrl = imageUrl.length > 0 ? imageUrl[0].imageUrl : null;

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => {
        seteditCategoryModal(category);
      }}
      activeOpacity={0.8}
    >
      <View>
        <ProductImage
          source={imageUrl ? { uri: imageUrl } : AvocatImage}
          resizeMode="contain"
          style={styles.productImage}
        />
      </View>
      <Text style={styles.productNameTxt}>
        {category.length > 20 ? category.substring(0, 20) + "..." : category}
      </Text>
      {editMode ? (
        <View>
          <View style={[styles.editProductBtn, { borderRadius: 0 }]}>
            <Feather name="edit-3" style={styles.editProductIcon} />
            <Text style={styles.editProductTxt}>Edit Category</Text>
          </View>
          <Pressable
            onPress={deleteCategory}
            style={[styles.editProductBtn, { backgroundColor: "#d33" }]}
          >
            <Feather name="trash" style={styles.editProductIcon} />
            <Text style={styles.editProductTxt}>Delete Category</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.editProductBtn}>
          <Feather name="edit-3" style={styles.editProductIcon} />
          <Text style={styles.editProductTxt}>Edit Category</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImage: {
    height: 125,
    width: 127,
    marginTop: 20,
  },
  productNameTxt: {
    color: "#121212",
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  productPriceTxt: {
    fontWeight: "700",
    color: "#20c85c",
    fontSize: 20,
  },
  editProductBtn: {
    width: 215,
    height: 37,
    borderRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#2b3659",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editProductIcon: {
    color: "rgba(255,254,254,1)",
    fontSize: 20,
  },
  editProductTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    marginLeft: 10,
  },
});

export default CategoryOptionBox;
