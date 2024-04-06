import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemContainer from './cartOrder/ItemContainer';

const ProductsSection = ({
    catalog,
}) => {
  return (
    <View style={styles.scrollAreaProducts}>
      <ScrollView
        contentContainerStyle={styles.scrollAreaProducts_contentContainerStyle}
      >
        {catalog.products.map((product, index) => (
          <ItemContainer
            product={product}
            productIndex={index}
            key={index}
            userUid={catalog.docID}
            style={styles.itemContainer}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default ProductsSection

const styles = StyleSheet.create({
  scrollAreaProducts: {
    width: "95%",
    // height: "45%",
    height: "60%",
    justifyContent: "center",
  },
  scrollAreaProducts_contentContainerStyle: {
    flexWrap: "wrap",
    justifyContent: "space-between", // or 'space-between' if you want equal spacing
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 10,
    marginLeft: 10,
  },
  itemContainer: {
    height: 160,
    width: 290, // Ensure this width accounts for any margins or padding
    marginBottom: 30,
    // marginRight: 20, // You may need to adjust this based on the number of items per row
  },
});