import { Animated, ImageSourcePropType, ImageStyle } from "react-native";
import React, { useEffect, useRef } from "react";

interface ProductImageProps {
  source: ImageSourcePropType;
  style: ImageStyle;
  resizeMode: ImageStyle["resizeMode"];
}

const ProductImage = ({ source, style, resizeMode }: ProductImageProps) => {
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
        source={require("assets/product-loading.gif")}
        resizeMode="cover"
        style={[
          style,
          {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: loadingImgAnim,
            resizeMode: "cover",
          },
        ]}
      />
    </>
  );
};

export default ProductImage;
