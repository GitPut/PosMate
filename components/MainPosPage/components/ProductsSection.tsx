import React from "react";
import ItemContainer from "./cartOrder/ItemContainer";

const ProductsSection = ({ catalog }) => {
  return (
    <div style={styles.scrollAreaProducts}>
      <div style={{ ...styles.scrollAreaProducts, overflowY: "auto" }}>
        {/* ScrollView from 'react-native-web' */}
        <div style={styles.gridContainer}>
          {catalog.products.map((product, index) => (
            <ItemContainer
              product={product}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  scrollAreaProducts: {
    width: "95%",
    height: "60vh",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
    gap: "20px",
    width: "100%",
  },
  // Make sure ItemContainer uses this style or an equivalent CSS class
  itemContainer: {
    height: "160px",
    marginBottom: "30px",
  },
};

export default ProductsSection;
