import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductImage from "components/ProductImage/ProductImage";
import { ProductProp } from "types/global";

const ItemNoOptionsView = ({ product }: { product: ProductProp }) => {
  return (
    <View style={{ marginTop: 50 }}>
      {product.hasImage ? (
        <View style={[styles.container]}>
          <ProductImage
            source={product.imageUrl ?? ""}
            style={styles?.itemImg}
          />
          <View style={styles?.rightSide}>
            <Text style={styles?.familyCombo}>
              {product.name ? product.name : "Product Name..."}
            </Text>
            <Text style={styles?.price}>
              ${product.price ? product.price : "Product Price..."}
            </Text>
            <View style={styles?.openBtnRow}></View>
          </View>
        </View>
      ) : (
        <View
          style={[
            {
              backgroundColor: "#ffffff",
              borderRadius: 20,
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 20,
              height: 160,
              width: 290, // Ensure this width accounts for any margins or padding
              marginBottom: 30,
            },
          ]}
        >
          <View>
            <Text style={styles?.familyCombo}>
              {product.name ? product.name : "Product Name..."}
            </Text>
            <Text style={styles?.price}>
              ${product.price ? product.price : "0"}
            </Text>
            <View
              style={[
                styles?.openBtnRow,
                {
                  width: 250,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                },
              ]}
            ></View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemNoOptionsView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 160,
    width: 290, // Ensure this width accounts for any margins or padding
    marginBottom: 30,
  },
  itemImg: {
    height: 133,
    width: 117,
    margin: 6,
  },
  rightSide: {
    width: "40%",
    justifyContent: "space-between",
    margin: 6,
    alignSelf: "stretch",
    marginTop: 12,
    marginRight: 11,
    height: "100%",
  },
  familyCombo: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
    height: 42,
    alignSelf: "stretch",
    paddingBottom: 50,
  },
  price: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 18,
    height: 24,
    alignSelf: "stretch",
  },
  openBtnRow: {
    height: 42,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  openBtn: {
    width: 35,
    height: 32,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
});
