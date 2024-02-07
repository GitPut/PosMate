import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { addCartState, cartState } from "state/state";
import ProductListing from "./ProductListing";
import { auth, storage } from "state/firebaseConfig";

const ProductDisplayBtn = ({ product, productIndex }) => {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;
  const [productImage, setproductImage] = useState();
  const cart = cartState.use();

  useEffect(() => {
    if (product.hasImage) {
      const imageUrlSaved = localStorage.getItem(
        "imageUrl" + auth.currentUser.uid + product.id
      );
      if (imageUrlSaved) {
        setproductImage(imageUrlSaved);
      } else {
        storage
          .ref(auth.currentUser.uid + "/images/" + product.id)
          .getDownloadURL()
          .then((url) => {
            setproductImage(url);
            localStorage.setItem(
              "imageUrl" + auth.currentUser.uid + product.id,
              url
            );
          });
      }
    }
  }, []);

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
    <TouchableOpacity
      key={productIndex}
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
            },
            cart
          );
        }
      }}
      style={[styles.touchable]}
    >
      <div
        style={{
          height: "200px",
          width: "200px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${productImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "archivo-500",
              color: "rgba(255,255,255,1)",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {product.name}
          </Text>
        </View>
      </div>
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
              style={{
                height: "100%",
                width: "70%",
                borderTopRightRadius: 3,
              }}
            >
              <ProductListing
                product={product}
                // itemIndex={productIndex}
                goBack={() => fadeOut()}
              />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              height: "100%",
              width: "30%",
              padding: 20,
              shadowColor: "rgba(0,0,0,1)",
              shadowOffset: {
                width: -3,
                height: 3,
              },
              elevation: 30,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              position: "absolute",
              opacity: shadowOpacity,
              right: 0,
              bottom: 0,
            }}
          />
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default ProductDisplayBtn;

const styles = StyleSheet.create({
  touchable: {
    margin: 15,
    width: 200,
    height: 200,
    backgroundColor: "rgba(125,126,132,1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
});
