import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  Modal,
  useWindowDimensions,
} from "react-native";
import { addCartState, cartState } from "state/state";
import ProductImage from "components/ProductImage";
import ProductBuilderModal from "../ProductBuilderModal/ProductBuilderModal";

function ItemContainer({ product, style }) {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;
  const cart = cartState.use();
  const screenWidth = useWindowDimensions().width;

  const fadeIn = () => {
    // Will change xPos value to 0 in 3 seconds
    setshowProductScreen(true);
    Animated.timing(xPos, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(shadowOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(shadowOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(xPos, {
      toValue: -1000,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setshowProductScreen(false));
  };

  return (
    <div id={product.id}>
      {product.hasImage ? (
        <Pressable
          onPress={() => {
            if (product.options.length > 0) {
              // navigation.navigate("Product Listing", { product: product });
              // setshowProductScreen(true);
              fadeIn();
            } else {
              addCartState(
                {
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  options: [],
                  extraDetails: null,
                  imageUrl: product.imageUrl,
                },
                cart
              );
            }
          }}
          style={[styles.container, style]}
        >
          <ProductImage
            source={{ uri: product.imageUrl }}
            resizeMode="contain"
            style={styles?.itemImg}
          />
          <View style={styles?.rightSide}>
            <Text style={styles?.familyCombo}>
              {product.name ? product.name : "Placeholder"}
            </Text>
            <Text style={styles?.price}>
              ${product.price ? product.price : "Placeholder"}
            </Text>
            <View style={styles?.openBtnRow}></View>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            if (product.options.length > 0) {
              fadeIn();
            } else {
              addCartState(
                {
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  options: [],
                  extraDetails: null,
                  imageUrl: null,
                },
                cart
              );
            }
          }}
          style={[
            // {
            //   backgroundColor: "#ffffff",
            //   borderRadius: 20,
            //   justifyContent: "space-between",
            //   alignItems: "flex-start",
            //   padding: 20,
            // },
            styles.container,
            style,
          ]}
        >
          <View>
            <Text style={styles?.familyCombo}>
              {product.name ? product.name : "Placeholder"}
            </Text>
            <Text style={styles?.price}>
              ${product.price ? product.price : "Placeholder"}
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
        </Pressable>
      )}
      {showProductScreen && (
        <Modal transparent={true}>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
              position: "absolute",
              height: "100%",
              width: "100%",
              bottom: 0,
              left: xPos,
              zIndex: 0,
            }}
          >
            <View
              style={[
                screenWidth > 1400
                  ? {
                      height: "100%",
                      width: "70%",
                      borderTopRightRadius: 3,
                    }
                  : {
                      height: "100%",
                      width: "100%",
                      borderTopRightRadius: 3,
                    },
              ]}
            >
              <ProductBuilderModal
                product={product}
                goBack={() => fadeOut()}
                imageUrl={product.imageUrl}
              />
            </View>
          </Animated.View>
        </Modal>
      )}
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
  },
  itemImg: {
    height: 133, // Fixed height for the image
    width: 117, // Fixed width for the image
    margin: 6,
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
    height: 60,
    alignSelf: "stretch",
    paddingBottom: 50,
    width: "90%",
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

export default ItemContainer;
