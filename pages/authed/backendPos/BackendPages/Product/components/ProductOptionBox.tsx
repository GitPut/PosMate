import ProductImage from "components/ProductImage/ProductImage";
import React from "react";
import { StyleSheet, Pressable, Text, View, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ProductProp } from "types/global";

interface ProductOptionBoxProps {
  style?: ViewStyle | ViewStyle[];
  product: ProductProp;
  editMode?: boolean;
  deleteProduct?: () => void;
  setexistingProduct: (val: ProductProp) => void;
  isTemplate?: boolean;
}

function ProductOptionBox({
  style,
  product,
  editMode,
  deleteProduct,
  setexistingProduct,
  isTemplate,
}: ProductOptionBoxProps) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => setexistingProduct(product)}
    >
      <View>
        <ProductImage
          source={product.imageUrl ? product.imageUrl : "https://via.placeholder.com/150"}
          style={styles.productImage}
        />
      </View>
      <Text style={styles.productNameTxt}>
        {product.name.length > 20
          ? product.name.substring(0, 20) + "..."
          : product.name}
      </Text>
      <Text style={styles.productPriceTxt}>${product.price}</Text>
      {editMode ? (
        <View>
          <View style={[styles.editProductBtn, { borderRadius: 0 }]}>
            <Feather name="edit-3" style={styles.editProductIcon} />
            <Text style={styles.editProductTxt}>Edit Product</Text>
          </View>
          <Pressable
            onPress={deleteProduct}
            style={[styles.editProductBtn, { backgroundColor: "#d33" }]}
          >
            <Feather name="trash" style={styles.editProductIcon} />
            <Text style={styles.editProductTxt}>Delete Product</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.editProductBtn}>
          <Feather name="edit-3" style={styles.editProductIcon} />
          <Text style={styles.editProductTxt}>
            {!isTemplate ? "Edit Product" : "View Template"}
          </Text>
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

export default ProductOptionBox;
