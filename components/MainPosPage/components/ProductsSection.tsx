// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ItemContainer from './cartOrder/ItemContainer';

// const ProductsSection = ({
//     catalog,
// }) => {
//   return (
//     <View style={styles.scrollAreaProducts}>
//       <ScrollView
//         contentContainerStyle={styles.scrollAreaProducts_contentContainerStyle}
//       >
//         {catalog.products.map((product, index) => (
//           <ItemContainer
//             product={product}
//             productIndex={index}
//             key={index}
//             userUid={catalog.docID}
//             style={styles.itemContainer}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// export default ProductsSection

// const styles = StyleSheet.create({
//   scrollAreaProducts: {
//     width: "95%",
//     // height: "45%",
//     height: "60%",
//     justifyContent: "center",
//   },
//   scrollAreaProducts_contentContainerStyle: {
//     flexWrap: "wrap",
//     justifyContent: "space-between", // or 'space-between' if you want equal spacing
//     flexDirection: "row",
//     alignItems: "flex-start",
//     paddingRight: 10,
//     marginLeft: 10,
//   },
//   itemContainer: {
//     height: 160,
//     width: 290, // Ensure this width accounts for any margins or padding
//     marginBottom: 30,
//     // marginRight: 20, // You may need to adjust this based on the number of items per row
//   },
// });
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
              productIndex={index}
              key={index}
              userUid={catalog.docID}
              // Pass inline style or className to ItemContainer if needed
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  scrollAreaProducts: {
    width: "96%",
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
