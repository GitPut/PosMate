import ProductImage from "components/ProductImage/ProductImage";
import AvocatImage from "assets/AvocatImage.jpg";
import React from "react";
import { StyleSheet, Pressable, Text, View, ViewStyle } from "react-native";
import { userStoreState } from "state/state";
import { Feather } from "@expo/vector-icons";

interface CategoryOptionBoxProps {
  style?: ViewStyle | ViewStyle[];
  category: string;
  editMode: boolean;
  deleteCategory: () => void;
  seteditCategoryModal: (category: string) => void;
}

function CategoryOptionBox({
  style,
  category,
  editMode,
  deleteCategory,
  seteditCategoryModal,
}: CategoryOptionBoxProps) {
  const catalog = userStoreState.use();
  const listOfImageUrls = catalog.products.filter(
    (item) => item.category === category && item.imageUrl
  );
  const imageUrl =
    listOfImageUrls.length > 0 ? listOfImageUrls[0].imageUrl : null;

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => {
        seteditCategoryModal(category);
      }}
    >
      <View>
        <ProductImage
          source={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
          style={styles.productImage}
          key={category}
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
