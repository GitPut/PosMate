import React from "react";
import ItemContainer from "./cartOrder/ItemContainer";
import { useWindowDimensions } from "react-native";
import { UserStoreStateProps } from "types/global";

interface ProductsSectionProps {
  catalog: UserStoreStateProps;
}

const ProductsSection = ({ catalog } : ProductsSectionProps) => {
  const { width } = useWindowDimensions();

  const styles = {
    scrollAreaProducts: {
      width: "95%",
      height: width > 800 ? "60vh" : "50vh",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns:
        width > 1250
          ? "repeat(auto-fill, minmax(250px, 1fr))"
          : "repeat(auto-fill, minmax(140px, 1fr))", // Fixed syntax
      gap: "20px",
    },
  };

  return (
    <div style={styles.scrollAreaProducts}>
      <div style={{ overflowY: "auto", height: "100%" }}>
        {" "}
        {/* Adjusted styles */}
        <div style={styles.gridContainer}>
          {catalog.products.map((product, index) => (
            <ItemContainer product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
