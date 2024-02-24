import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const ProductImage = ({ source, style, resizeMode }) => {
  const loadingImgAnim = useRef(new Animated.Value(1)).current;
  const productImgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadingImgAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(productImgAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  return (
    <>
      <Animated.Image
        source={source}
        resizeMode={resizeMode}
        style={[style, { opacity: productImgAnim }]}
      />
      <Animated.Image
        source={require("../../assets/images/product-loading.gif")}
        style={[
          style,
          { position: "absolute", top: 0, left: 0, opacity: loadingImgAnim },
        ]}
      />
    </>
  );
};

export default ProductImage;
