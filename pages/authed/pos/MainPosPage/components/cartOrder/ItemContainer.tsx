import React, { useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { addCartState, cartState, setProductBuilderState } from "state/state";
import ProductImage from "components/ProductImage/ProductImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProductProp } from "types/global";

interface ItemContainerProps {
  product: ProductProp;
  onLayout?: () => void;
  width: number;
}

function ItemContainer({ product, onLayout, width }: ItemContainerProps) {
  const cart = cartState.use();

  return (
    <div id={product.id} style={{ display: "none" }}>
      <Pressable
        onLayout={onLayout}
        onPress={() => {
          if (product.options.length > 0) {
            setProductBuilderState({
              product: product,
              itemIndex: null,
              imageUrl: product.imageUrl ? product.imageUrl : null,
              isOpen: true,
            });
          } else {
            addCartState(
              {
                name: product.name,
                price: product.price,
                description: product.description,
                options: [],
                extraDetails: null,
                imageUrl: product.imageUrl ? product.imageUrl : null,
              },
              cart
            );
          }
        }}
        style={width > 1250 ? styles.container : styles.containerMobile}
      >
        {product.hasImage && product.imageUrl && (
          <ProductImage
            key={product.id} // Ensure each key is unique
            source={product.imageUrl}
            style={width < 1250 ? styles.itemImgSmall : styles.itemImg}
            alt={product.name}
          />
        )}
        <View style={styles.rightSide}>
          <Text style={styles.familyCombo}>{product.name}</Text>
          <View
            style={[
              {
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 10,
                paddingTop: 10,
                marginBottom: 20,
              },
            ]}
          >
            <Text style={styles.price}>${product.price}</Text>
            <View style={styles.openBtn}>
              <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
            </View>
          </View>
        </View>
      </Pressable>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around", // or 'flex-start' if you want all items aligned to the start
    alignItems: "center",
    height: 160, // Fixed height for each container
    width: "100%", // Take up the full width available
    paddingLeft: 10,
  },
  containerMobile: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    justifyContent: "center", // or 'flex-start' if you want all items aligned to the start
    alignItems: "center",
    height: 240, // Fixed height for each container
    width: "100%", // Take up the full width available
    paddingLeft: 10,
    paddingTop: 10,
  },
  itemImg: {
    height: 133, // Fixed height for the image
    width: 117, // Fixed width for the image
    // margin: 6,
  },
  itemImgSmall: {
    height: 100, // Fixed height for the image
    width: 117, // Fixed width for the image
    // margin: 6,
  },
  rightSide: {
    flex: 1, // Take up the remaining space after the image
    justifyContent: "space-between",
    marginTop: 14,
    alignSelf: "stretch",
    height: 150,
  },
  familyCombo: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
    alignSelf: "stretch",
    width: "90%",
  },
  price: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 18,
  },
  openBtn: {
    width: 35,
    height: 35,
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

export default ItemContainer;
