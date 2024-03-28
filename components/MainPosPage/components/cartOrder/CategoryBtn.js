import React, { Component } from "react";
import { StyleSheet, Pressable, Text, Image, View } from "react-native";
import ProductImage from "components/ProductImage";

function CategoryBtn({ style, isSelected, onPress, category, imageUrl }) {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        isSelected
          ? { backgroundColor: "rgba(29,41,78,1)" }
          : { backgroundColor: "#f9fafc" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.categoryLbl,
          isSelected ? { color: "white" } : { color: "rgba(0,0,0,1)" },
        ]}
      >
        {category ? category : "Placeholder"}
      </Text>
      {imageUrl && (
        <View>
          <ProductImage
            source={{ uri: imageUrl }}
            resizeMode="contain"
            style={styles.categoryImg}
          />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryLbl: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    margin: "null",
    textAlign: "center",
  },
  categoryImg: {
    height: 96,
    width: 95,
    marginTop: 0,
    marginBottom: 0,
    margin: "null",
  },
});

export default CategoryBtn;
