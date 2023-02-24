import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { userStoreState } from "state/state";
import ProductDisplayBtn from "components/ProductDisplayBtn";
import useWindowDimensions from "components/useWindowDimensions";
const wh = Dimensions.get("window").height;

const MenuScreen = ({ navigation, catalog }) => {
  const { height, width } = useWindowDimensions();
  const [section, setsection] = useState(null);

  const InnerBlock = () => {
    if (catalog.products) {
      if (catalog.products.length > 0) {
        if (!section) {
          return catalog.products
            .filter((e) => e.catagory === catalog.categories[0])
            .map((product, index) => (
              <ProductDisplayBtn
                product={product}
                productIndex={index}
                key={index}
                navigation={navigation}
              />
            ));
        } else {
          return catalog.products
            .filter((e) => e.catagory === section)
            .map((product, index) => (
              <ProductDisplayBtn
                product={product}
                productIndex={index}
                key={index}
                navigation={navigation}
              />
            ));
        }
      }
    }
  };

  const SectionSelector = () => {
    return (
      <View
        style={{
          backgroundColor: "#E6E6E6",
          width: "90%",
          height: 50,
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-evenly",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {catalog.categories?.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setsection(category);
              }}
            >
              <Text
                style={[
                  (section === null &&
                    index === 0 && {
                      color: "black",
                      fontWeight: "600",
                      borderBottomWidth: 1,
                    }) ||
                    (section === category && {
                      color: "black",
                      fontWeight: "600",
                      borderBottomWidth: 1,
                    }),
                  { fontSize: 16 },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles({ height, width }).container}>
      <SectionSelector />
      <ScrollView
        style={styles({ height, width }).scrollview}
        contentContainerStyle={styles({ height, width }).wrapper}
      >
        {/* <View style={styles.wrapper}> */}
        <InnerBlock />
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = (props) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      //flex: 2,
      height: props.height - 80,
      width: props.width * 0.7,
    },
    wrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingLeft: 50,
      paddingRight: 50,
    },
    scrollview: {
      width: "100%",
    },
  });
