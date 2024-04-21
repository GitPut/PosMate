import React from "react";
import { StyleSheet, Pressable, Text, View, ViewStyle } from "react-native";
import ProductImage from "components/ProductImage";

interface CategoryBtnProps {
  style?: ViewStyle;
  isSelected: boolean;
  onPress: () => void;
  category?: string;
  imageUrl?: string | null;
}

function CategoryBtn({
  style,
  isSelected,
  onPress,
  category,
  imageUrl,
}: CategoryBtnProps) {
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
    textAlign: "center",
  },
  categoryImg: {
    height: 96,
    width: 95,
    marginTop: 0,
    marginBottom: 0,
  },
});

export default CategoryBtn;
