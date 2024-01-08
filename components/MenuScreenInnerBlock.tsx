import { View, Text, FlatList, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import ProductDisplayBtn from "components/ProductDisplayBtn";
import { userStoreState } from "state/state";

const MenuScreenInnerBlock = ({ visible, height, category }) => {
  const catalog = userStoreState.use();

  // Custom sorting function
  const customSort = (a, b) => {
    // Handle cases where one or both items don't have a rank
    const rankA = a.rank || Number.MAX_SAFE_INTEGER;
    const rankB = b.rank || Number.MAX_SAFE_INTEGER;

    // Compare based on ranks
    return rankA - rankB;
  };

  if (catalog.products?.length > 0) {
    // return catalog.products.map((product, index) => {
    //   const isVisible = section
    //     ? product.catagory === section || product.category === section
    //     : product.catagory === catalog.categories[0] ||
    //       product.category === catalog.categories[0];

    //   return (
    //     <>
    //       {isVisible && (
    //         <ProductDisplayBtn
    //           product={product}
    //           productIndex={index}
    //           key={index}
    //         />
    //       )}
    //     </>
    //   );
    // });

    const renderItem = ({ item, index }) => (
      <ProductDisplayBtn product={item} productIndex={index} key={index} />
    ); // Defined outside the render method
    const keyExtractor = (item) => item.id; // Defined outside the render method
    const getItemLayout = (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }); // Defined outside the render method

    return (
      <div
        style={visible === false ? { display: "none" } : { display: "block" }}
      >
        <FlatList
          style={{ width: "100%", height: "100%" }}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
          }}
          data={catalog.products
            .filter((product) => {
              const isVisible = product.category === category;
              console.log("rank: ", product.rank);
              return isVisible;
            })
            .sort(customSort)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      </div>
    );
  } else {
    return (
      <View
        style={{
          width: "100%",
          height: height * 0.8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "archivo-500",
            color: "rgba(74,74,74,1)",
            fontSize: 20,
          }}
        >
          This category has no products...
        </Text>
      </View>
    );
  }
};

export default MenuScreenInnerBlock;
